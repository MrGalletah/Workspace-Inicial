document.addEventListener("DOMContentLoaded", function(){
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

    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.addEventListener('click', function(evento){
        localStorage.removeItem('loggedIn')
        window.location.href = 'index.html';
    });
    





});