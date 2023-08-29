
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si hay información de sesión almacenada en Local Storage después de 3 segundos de carga de la página
  setTimeout(function() {
    if (!localStorage.getItem('loggedIn')) {
      // No hay información de sesión, mostrar el #overlay -> #message del INDEX.html
      var overlay = document.getElementById('overlay');
      overlay.style.display = 'block';
  // Redireccionar al usuario a la página de inicio de sesión después de 3 segundos
  setTimeout(function() {
    window.location.href = 'login.html';
  }, 6000);
  //---------------------------------------------------------------------------------------
    } else {
      // Hay información de sesión, considerar al usuario como loggeado y permitirle acceder a la página principal directamente
      //el Console.log lo usaremos solo para verificar en el F12 que pasó exitosamente el usuario.
      console.log('Usuario loggeado');
    }
  }, 3000);
});


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });


    const userEmail = document.getElementById('user-email');

    userEmail.innerHTML = localStorage.getItem("email")

    cerrarSesion.addEventListener('click', function(e){
      if (confirm("Estas seguro que quieres borrar tus datos?")) {
       localStorage.removeItem('loggedIn')
      localStorage.removeItem('email')
      } else{
        e.preventDefault()
      }
    });
    

    
    const sidebar = document.getElementById("sidebar")

    userEmail.addEventListener("click", (e)=>{
      e.preventDefault()

      if(sidebar.classList.contains("sidebar-on")){
        sidebar.classList.add("sidebar-off")
      }

      sidebar.classList.toggle("sidebar-on")

    })






});
