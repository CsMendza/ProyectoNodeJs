window.onload = init;
var Headers = {};
var url = "http://localhost:3000"

function init() {
    if(localStorage.getItem("token")){
        Headers = {
            Headers:{
                'Authorization': "bearer "+ localStorage.getItem("token")
            }
        }
        cargarEmpleados();
    }
    else{
        window.location.href = "login.html";
    }
}

function cargarEmpleados() {
    axios.get(url + "/empleados", Headers)
    .then(function (res) {
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
}