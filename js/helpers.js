// Funciones para exportar e importar :D


 function userEmailFunction (){
    const sibedarEmail = document.getElementById("sidebarEmail")
const userEmail = document.getElementById('user-email');
userEmail.innerHTML = localStorage.getItem("email");
sibedarEmail.innerHTML = localStorage.getItem("email");
const cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function(e){
    if (confirm("Estás seguro que quieres borrar tus datos?")) {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('email');
    } else{
        e.preventDefault();
    }
});}



//function theme
function themeFunction() {
    let indexImg = document.getElementById("coverIndex")
    const themeButton = document.getElementById("theme-selector");

    themeButton.addEventListener("click", (e)=>{
        
        document.body.classList.toggle("dark-theme")
        if(document.body.classList.contains("dark-theme")){
            saveTheme()
            try{
                indexImg.src = "img/cover_back_DARK.png"
            }
            catch (e){console.log(e)}
        } else if(!document.body.classList.contains("dark-theme")){
            deleteTheme()
            try{
                indexImg.src = "img/cover_back.png"

            }
            catch (e){console.log(e)}
        }
    })
    
    const saveTheme = ()=>{
        localStorage.setItem("Theme", "Dark")
    }
    const retrieveTheme = ()=>{
       let theme = localStorage.getItem("Theme", "Dark")
        if (theme){
            document.body.classList.add("dark-theme")
        themeButton.checked = true;
        try{

            indexImg.src = "img/cover_back_DARK.png"
        }
        catch (e){console.log(e)}
    } else {
        try{indexImg.src = "img/cover_back.png"}
        catch (e){console.log(e)}
    } 
    }
    const deleteTheme = ()=>{
        localStorage.removeItem("Theme", "Dark")
    }
    const themeOnLoadFunction = ()=>{
    
        window.onload = retrieveTheme() 
    }
    themeOnLoadFunction()
}


function loginTheme() {
    let theme = localStorage.getItem("Theme", "Dark")
if (theme){
    document.body.classList.add("dark-theme")
themeButton.checked = true;}
}