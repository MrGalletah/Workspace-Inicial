const imageInput = document.getElementById('imgInput');
const displayImage = document.getElementById('displayImage');
const deleteImage = document.getElementById('deleteImage');

userEmailFunction();
themeFunction();

const userEmail = localStorage.getItem('email');

if (!userEmail) {
    window.location.href = 'index.html';
}

const emailInput = document.getElementById('email');
emailInput.value = userEmail;

//Cargar foto si existe
if (localStorage.getItem('image')) {
    displayImage.src = localStorage.getItem('image');
    deleteImage.classList.remove('d-none')

}

// Guardar foto de perfil en localStorage
imageInput.addEventListener('change', (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        localStorage.setItem('image', reader.result);

        displayImage.src = reader.result;
    });

    if (image) {
        reader.readAsDataURL(image);
    }
    deleteImage.classList.remove('d-none')
});

// Borrar foto de perfil
deleteImage.addEventListener('click', () => {
   const confirmation = confirm('Borrar foto de perfil?');

   if (confirmation) {
       localStorage.removeItem('image');
       deleteImage.classList.add('d-none')
       window.location.reload();
   }
});
