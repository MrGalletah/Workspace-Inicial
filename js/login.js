  // NUEVO TRABAJO [REDIRECCION AL LOGIN CON DATOS GUARDADOS EN LOCAL STORAGE]

  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
  
      window.location.href = 'index.html'; // Redirecciona al usuario a index.html
    });
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

