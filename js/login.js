document.addEventListener('DOMContentLoaded', function() {
  // Verificar si hay información de sesión almacenada en Local Storage después de 3 segundos de carga de la página
  setTimeout(function() {
    if (!localStorage.getItem('session')) {
      // No hay información de sesión, mostrar el #overlay -> #message del INDEX.html
      var overlay = document.getElementById('overlay');
      overlay.style.display = 'block';
  // Redireccionar al usuario a la página de inicio de sesión después de 3 segundos
  setTimeout(function() {
    window.location.href = 'login.html';
  }, 3000);
  //---------------------------------------------------------------------------------------
    } else {
      // Hay información de sesión, considerar al usuario como loggeado y permitirle acceder a la página principal directamente
      //el Console.log lo usaremos solo para verificar en el F12 que pasó exitosamente el usuario.
      console.log('Usuario loggeado');
    }
  }, 3000);


});