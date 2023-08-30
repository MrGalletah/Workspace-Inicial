const contenedor = document.getElementById('elContenedor');

function mostrarProducto(dataArray) {
    contenedor.innerHTML = '';
    for (const item of dataArray) {
        const divDeProducto = document.createElement('div');
        divDeProducto.classList.add('divProducto', 'row', 'list-group-item', 'd-flex', 'justify-content-between');
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

let productsArray = [];

// Fetch de los productos
async function fetchDataAndShow() {
    const idCat = localStorage.catID;
    const modifiedURL = `https://japceibal.github.io/emercado-api/cats_products/${idCat}.json`;

    const response = await fetch(modifiedURL);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    productsArray = data.products;

    mostrarProducto(productsArray);
}

fetchDataAndShow(productsArray);

// Funcion btn Filtrar
const btnFilter = document.getElementById("filter");
btnFilter.addEventListener("click", function() {
    filterPrice(priceMin, priceMax);
});

// Funcion para filtrar precio
let priceMin = "";
let priceMax = "";
const minimo = document.getElementById("min");
const maximo = document.getElementById("max");


function filterPrice(priceMin, priceMax) {
    let productsFiltered = [];
    const minValue = parseFloat(minimo.value);
    const maxValue = parseFloat(maximo.value);

    if (!isNaN(minValue) && !isNaN(maxValue)) {
        productsFiltered = productsArray.filter(element => element.cost >= minValue && element.cost <= maxValue);
    } else if (!isNaN(minValue)) {
        productsFiltered = productsArray.filter(element => element.cost >= minValue);
    } else if (!isNaN(maxValue)) {
        productsFiltered = productsArray.filter(element => element.cost <= maxValue);
    } else {
        productsFiltered = productsArray;
    }

    contenedor.innerHTML = '';
    mostrarProducto(productsFiltered);
}


// Funcion btn limpiar
const btnClean = document.getElementById("clean");
btnClean.addEventListener("click", clean);

function clean() {
    priceMin = "";
    priceMax = "";
    minimo.value = "";
    maximo.value = "";
    contenedor.innerHTML = '';
    fetchDataAndShow(productsArray);
}

function sortByMaxPrice(products) {
    return products.slice().sort((a, b) => b.cost - a.cost);
}

function sortByMinPrice(products) {
    return products.slice().sort((a, b) => a.cost - b.cost);
}

function sortBySoldCount(products) {
    return products.slice().sort((a, b) => b.soldCount - a.soldCount);
}

const btnSortMaxPrice = document.getElementById("orderAS");
const btnSortMinPrice = document.getElementById("orderDES");
const btnSortSoldCount = document.getElementById("relevancia")

btnSortMaxPrice.addEventListener("click", function () {
    const sortedProducts = sortByMaxPrice(productsArray);
    mostrarProducto(sortedProducts);
});

btnSortMinPrice.addEventListener("click", function () {
    const sortedProducts = sortByMinPrice(productsArray);
    mostrarProducto(sortedProducts);
});

btnSortSoldCount.addEventListener("click", function () {
    const sortedProducts = sortBySoldCount(productsArray);
    mostrarProducto(sortedProducts);
});const contenedor = document.getElementById('elContenedor');
const tituloCat = document.getElementById('tituloCategoria')
const inputSearch = document.getElementById('inputSearch');
const formSearch = document.getElementById('formSearch');

// tituloCat.textContent=item.catName;

function mostrarProducto(dataArray) {
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
    }

  if (dataArray.length === 0) {
    const sinResultados = document.createElement('div');
    sinResultados.innerHTML += '<p id="notFound"> No se encontraron resultados. </p>';
    contenedor.appendChild(sinResultados);
  } else {
    for (const item of dataArray) {
      const divDeProducto = document.createElement('div');
      divDeProducto.classList.add('divProducto', 'row', 'list-group-item', 'd-flex', 'justify-content-between');
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
