document.addEventListener('DOMContentLoaded', function(){
    //variables del valor de los campos del form Login.
    const botonIngresar = document.getElementById('regBtn');
    const emailInput = document.querySelector('.login input[type="email"]');
    const passwordInput = document.querySelector('.login input[type="password"]');

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
    botonIngresar.classList.add('disabled');


    botonIngresar.addEventListener('click', function(evento){
        //si esta todo OK , nos redirecciona a la pagina principal
        if(!verificarCampos()){
            evento.preventDefault();
        } else {
            window.location.href ='index.html';
        }
    });
});