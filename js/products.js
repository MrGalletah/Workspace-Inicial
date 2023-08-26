const contenedor = document.getElementById('elContenedor');
const inputSearch = document.getElementById('inputSearch');
const formSearch = document.getElementById('formSearch');

function mostrarProducto(dataArray) {
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de mostrar los resultados
    for (const item of dataArray) {
        const divDeProducto = document.createElement('div');
        divDeProducto.classList.add('divProducto','row','list-group-item','d-flex','justify-content-between')
        const productHTML = `
        <div class="col-3">
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
// ESTE BLOQUE DEBAJO PERMITE MOSTRAR LOS PRODUCTOS DE DIVERSAS CATEGORIAS DE LA API por su ID.
const idCat = localStorage.catID;
const modifiedURL = `https://japceibal.github.io/emercado-api/cats_products/${idCat}.json`;
fetch(modifiedURL)
    .then(response => response.json())
    .then(data => {
        mostrarProducto(data.products);
    })
  
// DEBAJO IMPLEMENTACION DE CÓDIGO PARA EL MOTOR DE BÚSQUEDA
////////////////////////////////////////////////////////////////

function filtrarProductos(searchText, dataArray) {
    const resultados = dataArray.filter(item => {
    const titulo = item.name.toLowerCase();
    const descripcion = item.description.toLowerCase();
    return titulo.includes(searchText) || descripcion.includes(searchText);
    });
  mostrarProducto(resultados);
}

formSearch.addEventListener('input', function (event) {
  const searchText = inputSearch.value.toLowerCase();
  filtrarProductos(searchText, productos);
  event.preventDefault(); // Evitar el envío del formulario
});

// Datos de ejemplo (reemplaza con tus datos reales)

 const productos = [
  {
    name: "onix",
    currency: 'USD',
    cost: 10,
    description: 'Descripción del producto 1',
    soldCount: 5,
    image: '../img/prod50921_1.jpg'
  },
  {
    name: 'Producto 2',
    currency: 'USD',
    cost: 20,
    description: 'Descripción del producto 2',
    soldCount: 10,
    image: 'imagen2.jpg'
  },
  // Agrega más productos aquí...
]; 