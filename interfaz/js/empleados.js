window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers : {
            headers={
            'Authorization': "Bearer " + localStorage.getItem("token")
            }
        };
        cargarEmpleados();
    } else {
        window.location.href = "login.html";
    }
}

function cargarEmpleados() {
    axios.get(url + "/empleados", { headers: headers })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
}
