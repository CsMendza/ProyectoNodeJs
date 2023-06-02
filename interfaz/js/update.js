var headers = {};
var url = 'http://localhost:3000';
var idEmpleadoActual = localStorage.getItem("idEmpleadoLocal");
var employeeData = 0;

window.onload = init;

function init() {
    console.log('Entrando init');
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        };
        loadEmployees();
        document.querySelector('.btn-primary').addEventListener('click', updatingEmployee);
    } else {
        window.location.href = 'index.html';
    }
}

async function loadEmployees() {
    await axios.get(url + "/empleados/" + idEmpleadoActual, headers)
        .then(function(res) {
            console.log(res.data.empleados[0]);
            employeeData = res.data.empleados[0];
            document.getElementById('input-name').value = employeeData.nombreEmpleado;
            document.getElementById('input-lastname').value = employeeData.apellidosEmpleado;
            document.getElementById('input-mail').value = employeeData.correoEmpleado;
            document.getElementById('input-phone').value = employeeData.telefonoEmpleado;
            document.getElementById('input-direction').value = employeeData.direccionEmpleado;
        }).catch(function(err) {
            console.log(err);
        });
}

async function updatingEmployee() {
    var direccion = document.getElementById('input-direction').value;
    var mail = document.getElementById('input-mail').value;
    var name = document.getElementById('input-name').value;
    var phone = document.getElementById('input-phone').value;
    var lname = document.getElementById('input-lastname').value;
    axios({
        method: 'put',
        url: 'http://localhost:3000/empleados/' + idEmpleadoActual,
        data: {
            nombre: name,
            apellidos: lname,
            email: mail,
            telefono: phone,
            direccion: direccion
        },
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    }).then(function(res) {
        var mail = document.getElementById('input-mail').value;
        window.location.href = 'menuUsuario.html';
    }).catch(function(err) {
        console.log(err);
    });
}
