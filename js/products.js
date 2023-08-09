const autos101 = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const contenedor = document.getElementsByClassName('contenedor')[0];

function mostrarProducto(dataArray) {
    for (const item of dataArray) {
        const divDeProducto = document.createElement('div');
        divDeProducto.classList.add('div-producto');
        const productHTML = `
            <img src="${item.image}">
            <p class="titulo-producto"> ${item.name} - ${item.currency} ${item.cost}</p>
            <p class="descripcion-producto"> ${item.description}</p>
            <p class="vendidos-producto"> ${item.soldCount} vendidos</p>

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
    