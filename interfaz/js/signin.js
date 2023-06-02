window.onload = init;

function init (){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': 'bearer '+ localStorage.getItem('token')
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href = 'index.html'
    }
}


function signin(){
    var name = document.getElementById('input-name').value;
    var lname = document.getElementById('input-lname').value;
    var mail = document.getElementById('input-mail').value;
    var phone = document.getElementById('input-phone').value;
    var direccion = document.getElementById('input-direction').value;

    axios({
        method:'post',
        url: 'http://localhost:3000/empleados',
        data: {
            nombre: name,
            apellidos: lname,
            email: mail,
            telefono: phone,
            direccion: direccion
        },
        headers: {
            'Authorization': 'bearer '+ localStorage.getItem('token')
        }
    }).then(function(res){
        console.log(res);
        alert("Empleado Registrado correctamente");
    }).catch(function(err){
        console.log(err);
    })
}