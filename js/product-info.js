const container = document.getElementById("container");

function showProduct(array) {
    const divProduct = document.createElement('div');
    const product = `
    <div class="text-center">
    <h2 class="display2 my-4">${array.name}</h2>
  </div>
  <div class="row">
    <div class="col-6">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>Precio</b><br>${array.currency} ${array.cost}</li>
        <li class="list-group-item"><b>Descripción</b><br>${array.description}</li>
        <li class="list-group-item"><b>Categoría</b><br>${array.category}</li>
        <li class="list-group-item"><b>Cantidad de vendidos</b><br>${array.soldCount}</li>
      </ul>
    </div>
    <div class="col-6">
      <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${array.images[0]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${array.images[1]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${array.images[2]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${array.images[3]}" class="d-block w-100">
          </div>
           <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
    </div>
        `;

    divProduct.innerHTML = product;
    container.appendChild(divProduct);
}


async function fetchDataAndShow() {
    const productID = localStorage.productID;
    urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`

    const response = await fetch(urlProduct);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    showProduct(data);
}

fetchDataAndShow()

