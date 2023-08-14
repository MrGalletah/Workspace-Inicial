document.addEventListener('DOMContentLoaded', function(){
    const botonIngresar = document.getElementById('regBtn');
    const emailInput = document.querySelector('.login input[type="email"]');
    const passwordInput = document.querySelector('.login input[type="password"]');

    function verificarCampos(){
        const valorEmail = emailInput.value;
        const valorPassword = passwordInput.value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorEmail);

        return valorEmail !== '' && emailValido && valorPassword.length >= 6;
    }

    function actualizarBotonIngreso(){
        const formularioValido = verificarCampos();
        botonIngresar.disabled = !formularioValido;
        if(formularioValido){
            botonIngresar.classList.remove('disabled');
        } else {
            botonIngresar.classList.add('disabled');
        }
    }

    emailInput.addEventListener('input', actualizarBotonIngreso);
    passwordInput.addEventListener('input', actualizarBotonIngreso);

    botonIngresar.disabled = true;
    botonIngresar.classList.add('disabled');

    botonIngresar.addEventListener('click', function(evento){
        if(!verificarCampos()){
            evento.preventDefault();
        } else {
            window.location.href = 'index.html';
        }
    });
});