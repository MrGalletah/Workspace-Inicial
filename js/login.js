document.addEventListener('DOMContentLoaded', function(){
    //variables del valor de los campos del form Login.
    const botonIngresar = document.getElementById('regBtn');
    const emailInput = document.querySelector('.login input[type="email"]');
    const passwordInput = document.querySelector('.login input[type="password"]');
    const loggeado = localStorage.getItem('loggedIn');

    function verificarCampos(){
        //funcion para ver si los campos se completan correctamente, devuelve true or false
        const valorEmail = emailInput.value;
        const valorPassword = passwordInput.value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorEmail);

        return valorEmail !== '' && emailValido && valorPassword.length >= 6;
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

    //Boton Ingresar por defecto al cargar la pagina.
    botonIngresar.disabled = true;

    if (loggeado) {
        window.location.href = 'index.html';
    } else {
        botonIngresar.addEventListener('click', function(evento){
            if (verificarCampos()) {
                localStorage.setItem('loggedIn', 'true');
            } else {
                evento.preventDefault();
            }
        });
    }


});

  // Debajo tenémos el MOSTRAR Y OCULTAR contraseña:

  const passInput = document.getElementById("password");
  const passButton = document.getElementById("buttonPassword");
  const hidePass = document.getElementById("hidePassword");
  const showPass = document.getElementById("showPassword");
  
  passButton.addEventListener("click", function() {
      if (passInput.type === "password") {
          passInput.type = "text";
          showPass.style.display = "inline";
          hidePass.style.display = "none";
      } else {
          passInput.type = "password";
          showPass.style.display = "none";
          hidePass.style.display = "inline";
      }
  });