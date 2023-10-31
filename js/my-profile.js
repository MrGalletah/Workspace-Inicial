userEmailFunction();
themeFunction();

 userEmail = localStorage.getItem("email");

 if(!userEmail){
    window.location.href = 'index.html';
 }
 const emailInput = document.getElementById("email");

 emailInput.value = userEmail
