const autos101 = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const contenedor = document.getElementById('elContenedor');

function mostrarProducto(dataArray) {
    for (const item of dataArray) {
        const divDeProducto = document.createElement('div');
        divDeProducto.classList.add('divProducto','row','list-group-item','d-flex','justify-content-between')
        const productHTML = `
        <div class="col-3">
        <img src="${item.image}" class="img-thumbnail">
    </div>
    <div class="col-6">
        <h3>${item.name} - $${item.cost}</h3>
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

fetch(autos101)
    .then(response => response.json())
    .then(data => {
        mostrarProducto(data.products);
    })
    