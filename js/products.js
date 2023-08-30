const contenedor = document.getElementById('elContenedor');
const inputSearch = document.getElementById('inputSearch');
const formSearch = document.getElementById('formSearch');

const tituloCat = document.getElementById('tituloCategoria')

// tituloCat.textContent=item.catName;

function mostrarProducto(dataArray) {
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de mostrar los resultados


  if (dataArray.length === 0) {
    const sinResultados = document.createElement('div');
    sinResultados.innerHTML += '<p id="notFound"> No se encontraron resultados. </p>';
    contenedor.appendChild(sinResultados);
  } else {
    for (const item of dataArray) {
        const divDeProducto = document.createElement('div');
        divDeProducto.classList.add('divProducto','row','list-group-item','d-flex','justify-content-between')
        const productHTML = `
        <div class="col-3 imagenProducto ">
        <img src="${item.image}" class="img-thumbnail">
    </div>
    <div class="col-6">
        <h3>${item.name} - ${item.currency} ${item.cost}</h3>
        <p>${item.description}</p>
    </div>
    <div class="col-3 text-muted text-end">
        <small>${item.soldCount} vendidos</small>
    </div>
        `;
        divDeProducto.innerHTML = productHTML;

        contenedor.appendChild(divDeProducto);
    }
  }
}


// ESTE BLOQUE DEBAJO PERMITE MOSTRAR LOS PRODUCTOS DE DIVERSAS CATEGORIAS DE LA API por su ID.
// AGREGAMOS LA FUNCIÓN DE FILTRADO EN TIEMPO REAL (input)
const idCat = localStorage.catID;
const modifiedURL = `https://japceibal.github.io/emercado-api/cats_products/${idCat}.json`;
fetch(modifiedURL)
.then(response => response.json())
.then(data => {
  mostrarProducto(data.products); 
  tituloCat.textContent = data.catName;
  formSearch.addEventListener('input', function (event) {
    const busqueda = inputSearch.value.toLowerCase();
    filtrarProductos(busqueda, data.products); 
    event.preventDefault(); 
  });
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


// DEBAJO IMPLEMENTACION DE CÓDIGO PARA EL MOTOR DE BÚSQUEDA
function filtrarProductos(busqueda, dataArray) {
  const resultados = dataArray.filter(item => {
    const titulo = item.name.toLowerCase();
    const descripcion = item.description.toLowerCase();
    return titulo.includes(busqueda) || descripcion.includes(busqueda);
  });
  mostrarProducto(resultados);
}