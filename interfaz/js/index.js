window.onload = init;
var headers={};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        token=localStorage.getItem("token");
        headers = {
            headers:{
                'Authorization':"bearer " + localStorage.getItem("token")
            } 
        }
        cargarEmpleados();
    }
    else{
        window.location.href="index.html"
    }
}

function cargarEmpleados() {
    axios.get(url+"/empleado",headers)
    .then(function(res) {
        console.log(res);
        mostrarEmpleados(res.data.message)
    }).catch(function (err) {
        console.log(err);
    })
}

function mostrarEmpleados(empleados) {
    var body = document.querySelector("body");
    console.log(empleados)
    for (let i = 0; i < pokemon.length; i++) {
        body.innerHTML+=`<h3>${empleados[i].nombre}</h3>`;
        
    }
}