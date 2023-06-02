window.onload = init;
var headers = {};
var url = 'http://localhost:3000';
var employeeData = 0;
var empleadosFiltrados;

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        };
        if (localStorage.getItem(empleadosFiltrados)) {
            displayEmployees(empleadosFiltrados);
        }
        loadEmployees();
    } else {
        window.location.href = 'index.html';
    }
}

function loadEmployees() {
    axios.get(url + "/empleados", headers)
        .then(function (res) {
            console.log(res);
            displayEmployees(res.data.message);
        }).catch(function (err) {
            console.log(err);
        });
}

function displayEmployees(empleados) {
    console.log("Displaying...");
    var body = document.querySelector('body');
    for (var i = 0; i < empleados.length; i++) {
        var table = document.querySelector('table');
        if (i == 0) {
            table.innerHTML += `<th>Nombre de empleado</th>
                                <th>Apellidos del empleado</th>
                                <th>Telefono del empleado</th>
                                <th>Correo del emplado</th>
                                <th>Dirección del empleado</th>
                                <th></th><th></th>
                                `;
        }
        table.innerHTML += `<tr>
            <td>${empleados[i].nombre}</td>
            <td>${empleados[i].apellidos}</td>
            <td>${empleados[i].telefono}</td>
            <td>${empleados[i].email}</td>
            <td>${empleados[i].direccion}</td>
            <td>
                <button class="btn btn-primary" onclick="updateEmployee(${empleados[i].id})">Actualizar</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteEmployee(${empleados[i].id})">Borrar</button>
            </td>
        </tr>`;
    }
}

function searchEmployee() {
    console.log("Searching...");
    var nombreDado = document.getElementById("input-search").value;
    var nombreDado = String(nombreDado);
    console.log("Tamos chill");
    axios({
        method: 'get',
        url: url + '/empleados/' + nombreDado,
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    }).then(function (res) {
        empleadosFiltrados = res.data.message;
        var table = document.querySelector('table');
        table.innerHTML = "";
        displayEmployees(empleadosFiltrados);
    }).catch(function (err) {
        console.log(err);
    });
}

function updateEmployee(id) {
    localStorage.setItem('idEmpleadoLocal', id);
    window.location.href = 'modificarEmpleado.html';
}

function deleteEmployee(id) {
    axios({
        method: 'delete',
        url: 'http://localhost:3000/empleados/' + id,
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    }).then(function (res) {
        window.location.reload();
    }).catch(function (err) {
        console.log(err);
    });
}
