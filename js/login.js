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