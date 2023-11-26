
    
document.addEventListener('DOMContentLoaded', function(){
    const botonIngresar = document.getElementById('regBtn');
    const loggeado = localStorage.getItem('token');
    botonIngresar.disabled = true;
 
    if (loggeado) {
        window.location.href = 'index.html';
    } else {
        botonIngresar.addEventListener('click', function(evento){
            if (verificarCampos()) {
                const dataVerified = {
                    "user": "userVerified",
                     "password": "passwordVerified"
                 }
                fetch('http://localhost:3000/login', {
                    method: 'POST',
                    body: JSON.stringify(dataVerified),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('email', email.value);
                localStorage.setItem('token', JSON.stringify(data.token));
                window.location.href = 'index.html';
                })
            } else {
                const incorrectData = {
                    "user": "userIncorrect",
                    "password": "passwordIncorrect"
                }
                fetch('http://localhost:3000/login', {
                    method: "POST",
                    body: JSON.stringify(incorrectData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
            }
            evento.preventDefault();
        });
    }

   const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

        function verificarCampos(){ 
        //funcion para ver si los campos se completan correctamente, devuelve true or false
        const valorEmail = emailInput.value;
        const valorPassword = passwordInput.value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorEmail);
        if(valorEmail !== '' && emailValido && valorPassword.length >= 6){
           return true; 
        } else {
            return false;
        }
    }

    function actualizarBotonIngreso(){
        //funcion para agregar o quitar el atributo disabled en el boton Ingresar
        const formularioValido = verificarCampos();
        botonIngresar.disabled = !formularioValido;
        if(formularioValido){
            botonIngresar.classList.remove('disabled');
        } else {
            botonIngresar.classList.add('disabled');
        }
    }
    

    //evento que con el input llama a la funcion actualizarBoton
    emailInput.addEventListener('input', actualizarBotonIngreso);
    passwordInput.addEventListener('input', actualizarBotonIngreso);



    // Debajo tenémos el MOSTRAR Y OCULTAR contraseña:

    const passButton = document.getElementById("buttonPassword");
    const hidePass = document.getElementById("hidePassword");
    const showPass = document.getElementById("showPassword");
    
    passButton.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showPass.style.display = "inline";
            hidePass.style.display = "none";
        } else {
            passwordInput.type = "password";
            showPass.style.display = "none";
            hidePass.style.display = "inline";
        }
    });
  
    // Debajo haremos un JS que active Brillo extra al candadito cada vez que el usuario teclea en el INPUT Password
   // ****************** PROBANDO DESTELLOS DE LUZ AL TECLEAR EL USUARIO ******************
    passwordInput.addEventListener("input", function() {
      passButton.classList.add("active");
    
      setTimeout(function() {
        passButton.classList.remove("active");
      }, 200);
    });
});
loginTheme()


