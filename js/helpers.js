// Funciones para exportar e importar :D


 function userEmailFunction (){
const userEmail = document.getElementById('user-email');
userEmail.innerHTML = localStorage.getItem("email");
const cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function(e){
    if (confirm("Estás seguro que quieres borrar tus datos?")) {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('email');
    } else{
        e.preventDefault();
    }
});}

 function sidebarFunction() {
    const sidebar = document.getElementById("sidebar");
    const userEmail = document.getElementById('user-email');
userEmail.addEventListener("click", (e)=>{
    e.preventDefault();

    if(sidebar.classList.contains("sidebar-on")){
        sidebar.classList.add("sidebar-off");
    }

    sidebar.classList.toggle("sidebar-on");
});
}

function themeFunction() {
    const themeButton = document.getElementById("theme-selector");

themeButton.addEventListener("click", (e)=>{
    
    document.body.classList.toggle("dark-theme")
})
}