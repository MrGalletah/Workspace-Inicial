// Item de carrito de muestra
function updateCartUI(item) {
  const cartProducts = document.getElementById('cartProducts');
  
  const cartItemHTML = `
    <div class="col-2 text-center"><img src="${item.image}" class="img-thumbnail mt-2" alt="${item.name}"></div>
    <div class="col-3 text-center">${item.name}</div>
    <div class="col-3 text-center">${item.currency} ${item.unitCost}</div>
    <div class="col-2 text-center">
      <input class="cart-quantity" type="number" value="${selectedQuantity}" max="999" min="1" class="text-center">
    </div>
    <div class="col-2 text-center fw-bold">${item.currency} <span class="subtotal">${calculateSubtotal(item.unitCost, selectedQuantity)}</span></div>
  `;

  cartProducts.innerHTML = cartItemHTML;

  const quantityInput = document.querySelector('.cart-quantity');
  quantityInput.addEventListener('input', function () {
    selectedQuantity = parseInt(quantityInput.value);
    if (isNaN(selectedQuantity)) {
      selectedQuantity = 1;
      quantityInput.value = 1;
    }
    const subtotalElement = document.querySelector('.subtotal');
    const subtotal = calculateSubtotal(item.unitCost, selectedQuantity);
    subtotalElement.textContent = `${subtotal}`;
  });
}

// Fetch carrito de compras
async function fetchCartData() {
  try {
    const response = await fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json');
    const data = await response.json();
    arrayCartStandar.push(...data.articles);
    console.log(arrayCartStandar);

    const selectedItem = arrayCartStandar[0];
    updateCartUI(selectedItem);
  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
}

// Fetch productos de localStorage
async function fetchDataAndShow() {
  const productIDs = JSON.parse(localStorage.getItem('cartProducts'));
  if (!productIDs || !Array.isArray(productIDs)) {
    console.error('Invalid product IDs in localStorage, impossible to fetch.');
    return;
  }

  const cartProducts = document.getElementById('cartProducts');

  for (const productID of productIDs) {
    const urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

    try {
      const response = await fetch(urlProduct);
      const data = await response.json();
      appendProductToCart(data, cartProducts);
    } catch (error) {
      console.error(`Error fetching product with ID ${productID}: ${error}`);
    }
  }
}

// Funcion carrito del usuario
function appendProductToCart(productData, cartProducts) {
  const productItem = document.createElement("div");
  productItem.className = "cart-item row d-flex";

  const productHTML = `
    <div class="col-2 text-center"><img src="${productData.images[0]}" class="img-thumbnail mt-2" alt="${productData.name}"></div>
    <div class="col-3 text-center">${productData.name}</div>
    <div class="col-3 text-center">${productData.currency} ${productData.cost}</div>
    <div class="col-2 text-center">
      <input class="cart-quantity" type="number" value="${selectedQuantity}" max="999" min="1" class="text-center">
      <button type="button" class="btn btn-danger removeItem">X</button>
    </div>
    <div class="col-2 text-center fw-bold">${productData.currency} <span class="subtotal">${calculateSubtotal(productData.cost, selectedQuantity)}</span></div>
  `;

  productItem.innerHTML = productHTML;
  cartProducts.appendChild(productItem);

  //calculo del subtotal para productos del usuario
  const quantityInput = productItem.querySelector('.cart-quantity');
  quantityInput.addEventListener('input', function () {
    selectedQuantity = parseInt(quantityInput.value);
    if (isNaN(selectedQuantity)) {
      selectedQuantity = 1;
      quantityInput.value = 1;
    }
    const subtotalElement = productItem.querySelector('.subtotal');
    const subtotal = calculateSubtotal(productData.cost, selectedQuantity);
    subtotalElement.textContent = ` ${subtotal}`;
  });

  //funcion para borrar items del carrito, falta que borre la id del localstorage
  const removeButton = productItem.querySelector('.removeItem');
  removeButton.addEventListener('click', function () {
    const cartItem = removeButton.closest('.cart-item');
    if (cartItem) {
      cartItem.remove();
    }
  });
}


let selectedQuantity = 1;
const arrayCartStandar = [];

// Llamada a funciones
fetchCartData();
userEmailFunction();
window.addEventListener('load', fetchDataAndShow);

