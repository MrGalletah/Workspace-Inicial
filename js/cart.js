// Calculo del subtotal
function calculateSubtotal(unitCost, quantity) {
  if (isNaN(quantity)) {
    quantity = 1;
  }

  return unitCost * quantity;
}

let totalSum = 0;

// Calcular suma de subtotales
function updateTotalSum() {
  totalSum = 0;
  const subtotalElements = document.querySelectorAll('.subtotal');
  subtotalElements.forEach(subtotalElement => {
    totalSum += parseFloat(subtotalElement.textContent);
  });

  subtotalSum.textContent = totalSum.toFixed(2);
  updateDeliveryFee();
}

// Cambiar precio de envio en tiempo real
const selectShip = document.getElementById('selectShip');
let selectedOption = selectShip.value;

selectShip.addEventListener('change', () => {
  selectedOption = selectShip.value;
  updateDeliveryFee();
});

function updateDeliveryFee() {
  const subtotalSumValue = parseFloat(subtotalSum.textContent);

  let deliveryFeePercentage = 0;
  const selectShip = document.getElementById('selectShip');
  let selectedOption = selectShip.value;
  // Calcular precio de envio y total
  switch (selectedOption) {
    case "disabled":
      deliveryFeePercentage = 0;
      break;
    case "premium":
      deliveryFeePercentage = 0.15;
      break;
    case "express":
      deliveryFeePercentage = 0.07;
      break;
    case "standard":
      deliveryFeePercentage = 0.05;
      break;
    default:
      deliveryFeePercentage = 0;
  }

  const deliveryFeeValue = subtotalSumValue * deliveryFeePercentage;

  deliveryFee.textContent = deliveryFeeValue.toFixed(2);

  const totalPriceValue = subtotalSumValue + deliveryFeeValue;
  totalPrice.textContent = totalPriceValue.toFixed(2);
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
    updateTotalSum();
  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
}

// Fetch productos de localStorage
async function fetchDataAndShow() {
  const productIDs = JSON.parse(localStorage.getItem('cartProducts')) || [];
  if (!Array.isArray(productIDs)) {
    console.error('Invalid product IDs in localStorage, impossible to fetch.');
    return;
  }

  const cartProducts = document.getElementById('cartProducts');

  for (const productID of productIDs) {
    const urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

    try {
      const response = await fetch(urlProduct);
      const data = await response.json();
      appendProductToCart(data, productID, cartProducts);
    } catch (error) {
      console.error(`Error fetching product with ID ${productID}: ${error}`);
    }
  }

  // Update the total sum after fetching and showing local storage products
  updateTotalSum();
}

// Agregar producto al carro
function appendProductToCart(productData, productID, cartProducts) {
  const productItem = document.createElement("div");
  productItem.className = "cart-item row d-flex align-items-center"; 

  let price = productData.cost;
  if (productData.currency === 'UYU') {
    price /= 40;
  }

  const productHTML = `
    <div class="col-2 text-center"><img src="${productData.images[0]}" class="img-thumbnail mt-2" alt="${productData.name}"></div>
    <div class="col-3 text-center ps-3">${productData.name}</div>
    <div class="col-3 text-center ps-4">USD ${price.toFixed(2)}</div>
    <div class="col-2 text-center ps-5">
      <input class="cart-quantity" type="number" value="1" max="999" min="1" class="text-center">
    </div>
    <div class="col-1 text-center fw-bold ps-5">USD <span class="subtotal">${price.toFixed(2)}</span></div>
    <div class="col-1"><button type="button" class="ms-5 btn btn-danger removeItem" title="Eliminar del carrito" id="removeBtn" data-productID="${productID}">X</button></div>
  `;

  productItem.innerHTML = productHTML;
  cartProducts.appendChild(productItem);

  const quantityInput = productItem.querySelector('.cart-quantity');
  quantityInput.addEventListener('input', function () {
    const selectedQuantity = parseInt(quantityInput.value);
    const subtotalElement = productItem.querySelector('.subtotal');

    let price = productData.cost;
    if (productData.currency === 'UYU') {
      price /= 40;
    }

    const newSubtotal = calculateSubtotal(price, selectedQuantity);
    subtotalElement.textContent = ` ${newSubtotal.toFixed(2)}`;
    updateTotalSum();
    updateDeliveryFee();
  });

  // Remover producto del carrito
  const removeButton = productItem.querySelector('.removeItem');
  removeButton.addEventListener('click', function () {
    const productIDToRemove = removeButton.getAttribute("data-productID");
    cartProducts.removeChild(productItem);
    removeProductFromCart(productIDToRemove);
    updateTotalSum();
    updateDeliveryFee();
  });
}

//Funcion para remover el producto del carrito en el localStorage
function removeProductFromCart(productID) {
  const productIDs = JSON.parse(localStorage.getItem('cartProducts')) || [];
  const updatedProductIDs = productIDs.filter(id => id !== productID);
  localStorage.setItem('cartProducts', JSON.stringify(updatedProductIDs));
  updateTotalSum();
}

let selectedQuantity = 1;
const arrayCartStandar = [];

// Llamada a funciones
fetchCartData();
userEmailFunction();
window.addEventListener('load', fetchDataAndShow);

//Función para realizar las validaciones previas a la compra y aplicar estilos con bootstrap 
(()=> {
  'use strict'

  const form = document.querySelector('.needs-validation');

  form.addEventListener('submit', event => {
    

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

const streetAddress = document.getElementById('streetA');
const numberAddress = document.getElementById('numberA');
const cornerAddress = document.getElementById('cornerA');
//const methodPayment = document.getElementById('')

if(streetAddress.value === ""){
  event.preventDefault();
  streetAddress.classList.remove('is-valid');
  streetAddress.classList.add('is-invalid');
} else {
  streetAddress.classList.remove('is-invalid');
  streetAddress.classList.add('is-valid');
}

if(numberAddress.value === ""){
  event.preventDefault();
  numberAddress.classList.remove('is-valid');
  numberAddress.classList.add('is-invalid');
} else {
  numberAddress.classList.remove('is-invalid');
  numberAddress.classList.add('is-valid');
}

if(cornerAddress.value === ""){
  event.preventDefault();
  cornerAddress.classList.remove('is-valid');
  cornerAddress.classList.add('is-invalid');
} else {
  cornerAddress.classList.remove('is-invalid');
  cornerAddress.classList.add('is-valid');
}

if(selectedOption === "disabled") {
  event.preventDefault();
  selectShip.classList.remove('is-valid');
  selectShip.classList.add('is-invalid');
} else {
  selectShip.classList.remove('is-invalid');
  selectShip.classList.add('is-valid');
}

if(streetAddress.value !== '' && numberAddress.value !== '' && cornerAddress.value !== '' && selectedOption !== "disabled"  && selectedQuantity <= 1) {
  form.classList.add('was-validated');
  const divAlert = document.getElementById('divAlert');
  divAlert.innerHTML += `
  <div class="alert alert-success" role="alert" style="z-index: 1;">
  ¡Has comprado con éxito!
  </div>
  `;
  const successAlert = document.querySelector('.alert');
  event.preventDefault();
  setTimeout(()=> {
    successAlert.style.display = "none";
  }, 4000);
  
} else {
  const divAlert = document.getElementById('divAlert');
  divAlert.innerHTML +=`
   <div class="alert alert-danger" role="alert" style="z-index: 1;">
   Verifica que los datos ingresados sean correctos
</div>
   `;
   const failAlert = document.querySelector('.alert');
   setTimeout(() => {
    failAlert.style.display = "none";
   }, 4000);
}

  }, false)

  

})()


