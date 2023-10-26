// DOM CONTENT LOAD
document.addEventListener('DOMContentLoaded', function() {
  // Evento de clic en los botones de radio
  cardCheck.addEventListener('click', disableFields);
  bankCheck.addEventListener('click', disableFields);
  
// Llamada a funciones
fetchCartData();
userEmailFunction();
});
window.addEventListener('load', fetchDataAndShow);



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

  updateTotalSum();
}

// Agregar productos al carro
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
  
  // Leer cantidades de localstorage
  const storedQuantity = localStorage.getItem(`quantity_${productID}`);
  if (storedQuantity) {
    quantityInput.value = storedQuantity;
  }

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

    localStorage.setItem(`quantity_${productID}`, selectedQuantity);
  });

  // Remover productos del carro
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

/* 
Validaciónes de MODAL para los métodos de PAGO
*/
     // VARIABLES GLOBALES
const monthInput = document.getElementById('month');
const cardNumber = document.getElementById('cardNumber');
const cardSelected = document.getElementById('cardSelected');
const cvv = document.getElementById('cvv');
const cardIcon = document.getElementById('cardIcon');
const cardCheck = document.getElementById('cardCheck');
const bankCheck = document.getElementById('bankCheck');
const accountNumber = document.getElementById('accountNumber');
const btnSelectPay = document.getElementById('btnSelectPay');
const cancelPay = document.getElementById('cancelPay');

// VALIDACIÓN DEL MES (1 a 12)
/*monthInput.addEventListener('input', function() {
  const inputValue = parseInt(monthInput.value);
  if (inputValue < 1 || inputValue > 12 || isNaN(inputValue)) {
    monthInput.value = '';
  }
});
// VALIDACION DEL AÑO (HASTA 2100)
yearInput.addEventListener('input', function(){
  const inputValue = parseInt(yearInput.value);
  if (inputValue > 2100 || isNaN(inputValue)){
    yearInput.value = '';
  }
})*/

// CAMBIAR IMÁGEN DE TARJETA DE CREDITO AL SELECCIONARLA
cardSelected.addEventListener('change', function() {
  const selectedOption = cardSelected.value;
  if (selectedOption === 'Visa') {
    cardIcon.innerHTML = '<img class="img-thumbnail img-fluid" src="/icons/visa.png" alt="Visa">';
  } else if (selectedOption === 'Master') {
    cardIcon.innerHTML = '<img class="img-thumbnail img-fluid" src="/icons/master.png" alt="MasterCard">';
  } else {
    cardIcon.innerHTML = '';
  }
});
cardIcon.innerHTML = '';

//Variable para guardar el método de pago seleccionado
let methodPaymentSelected = undefined; 

// BlOQUEAR OPCIONES (TARJETA O TRANSFERENCIA) al ingresar al botón "Seleccionar"
btnSelectPay.addEventListener('click', function () {
  if (cardCheck.checked) {
    accountNumber.setAttribute('disabled', 'disabled');
    accountNumber.value = '';
    cardNumber.removeAttribute('disabled');
    cvv.removeAttribute('disabled');
    monthInput.removeAttribute('disabled');
    cardSelected.removeAttribute('disabled');
    methodPaymentSelected = 'card';
  } else if (bankCheck.checked) {
    accountNumber.removeAttribute('disabled');
    cardNumber.setAttribute('disabled', 'disabled');
    cvv.setAttribute('disabled', 'disabled');
    monthInput.setAttribute('disabled', 'disabled');
    cardSelected.setAttribute('disabled', 'disabled');
    methodPaymentSelected = 'bank';
    cardNumber.value = '';
    monthInput.value = '';
    cvv.value = '';
    
    cardSelected.value = 'disabled';
  } else {
    accountNumber.setAttribute('disabled', 'disabled');
    cardNumber.setAttribute('disabled', 'disabled');
    cvv.setAttribute('disabled', 'disabled');
    monthInput.setAttribute('disabled', 'disabled');
    cardSelected.setAttribute('disabled', 'disabled');
    methodPaymentSelected = undefined;
    accountNumber.value = '';
    cardNumber.value = '';
    cvv.value = '';
    monthInput.value = '';
    
    cardSelected.value = 'disabled';
  }
});
// Deshabilitar campos de la opción no seleccionada ALTERNANDO
function disableFields() {
  if (cardCheck.checked) {
    accountNumber.setAttribute('disabled', 'disabled');
    accountNumber.value = '';
    cardNumber.removeAttribute('disabled');
    cvv.removeAttribute('disabled');
    monthInput.removeAttribute('disabled');
    cardSelected.removeAttribute('disabled');
    methodPaymentSelected = 'card';
    accountNumber.classList.remove('is-invalid');
    accountNumber.classList.remove('is-valid');
  } else if (bankCheck.checked) {
    accountNumber.removeAttribute('disabled');
    cardNumber.setAttribute('disabled', 'disabled');
    cvv.setAttribute('disabled', 'disabled');
    monthInput.setAttribute('disabled', 'disabled');
    cardSelected.setAttribute('disabled', 'disabled');
    methodPaymentSelected = 'bank';
    cardNumber.value = '';
    monthInput.value = '';
    cvv.value = '';
    cardSelected.value = 'disabled';
    cardNumber.classList.remove('is-valid');
    cardNumber.classList.remove('is-invalid');
    monthInput.classList.remove('is-valid');
    monthInput.classList.remove('is-invalid');
    cvv.classList.remove('is-valid');
    cvv.classList.remove('is-invalid');
  }
}

// FUNCION PARA ELIMINAR DATOS AL BOTON CANCELAR del modal
cancelPay.addEventListener('click' , function(){
  accountNumber.value = '';
  cardNumber.value = '';
  monthInput.value = '';
  cvv.value = '';
  bankCheck.checked = false;
  cardCheck.checked = false;
})

//Función para remover las alertas
function removeAlert() {
  let successAlert = document.getElementById('successAlert');
  let failAlert = document.getElementById('failAlert');
  if(successAlert) {
    setTimeout(() => {
        divAlert.innerHTML = '';
    }, 4000);
  } else {
    setTimeout(() => {
      divAlert.innerHTML= '';
  }, 4000);
  }
};

//Función que válida que los campos del modal no esten vacíos en consecuencia del método de pago selecionado.
function validateMethodPayment(methodSelected){
  if (methodSelected === 'card'){
   if(monthInput.value !== '' && validateCardExpiration(monthInput.value) && cardNumber.value !== '' && cvv.value !== '' && cardSelected.value !== 'disabled') {
    return true;
   } else {
    return false;
   }
  } else if(methodSelected === 'bank'){
    if(accountNumber.value !== ''){
      return true;
    } else {
      return false;
    }
  }
};

const divAlert = document.getElementById('divAlert');

function validateCardExpiration(cardExpiration){
  const newDate = new Date();
  const currentDate = newDate.toLocaleString('sv-SE', {year:'numeric', month:'2-digit'});
  const currentDateString = currentDate.toString();
  if(cardExpiration > currentDateString){
    return true;
  } else {
    return false
  };
};

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
const selectMethodPayment = document.getElementById('selectMethodPayment');

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

if(validateMethodPayment(methodPaymentSelected)) {
  event.preventDefault();
  btnSelectPay.classList.remove('is-invalid', 'custom');
  btnSelectPay.classList.add('is-valid');
  selectMethodPayment.classList.add('is-valid');
  selectMethodPayment.classList.remove('is-invalid');
} else {
 btnSelectPay.classList.remove('is-valid');
  btnSelectPay.classList.add('is-invalid', 'custom');
  selectMethodPayment.classList.add('is-invalid');
  selectMethodPayment.classList.remove('is-valid');
}

if(methodPaymentSelected === 'card'){
  
  if(monthInput.value === '' || !validateCardExpiration(monthInput.value)) {
    monthInput.classList.add('is-invalid');
    monthInput.classList.remove('is-valid');
  } else {
    monthInput.classList.add('is-valid');
    monthInput.classList.remove('is-invalid');
  }

  if(cvv.value === '') {
  cvv.classList.add('is-invalid');
  cvv.classList.remove('is-valid');
  } else {
  cvv.classList.add('is-valid');
  cvv.classList.remove('is-invalid');
  }

  if(cardNumber.value === '') {
  cardNumber.classList.add('is-invalid');
  cardNumber.classList.remove('is-valid');
  } else {
  cardNumber.classList.add('is-valid');
  cardNumber.classList.remove('is-invalid');
  }

  if(cardSelected.value == 'disabled') {
  cardSelected.classList.add('is-invalid');
  cardSelected.classList.remove('is-valid');
  } else {
  cardSelected.classList.add('is-valid');
  cardSelected.classList.remove('is-invalid');
  }

} else if(methodPaymentSelected === 'bank'){
if(accountNumber.value === ''){
  accountNumber.classList.add('is-invalid');
  accountNumber.classList.remove('is-valid');
  } else {
  accountNumber.classList.add('is-valid');
  accountNumber.classList.remove('is-invalid');
}
}

if(streetAddress.value !== '' && numberAddress.value !== '' && cornerAddress.value !== '' && selectedOption !== "disabled"  && selectedQuantity <= 1 && validateMethodPayment(methodPaymentSelected)) {
  form.classList.add('was-validated');
  divAlert.innerHTML += `
  <div id="successAlert" class="alert alert-success" role="alert" style="z-index: 1;">
  ¡Has comprado con éxito!
  </div>
  `;
  event.preventDefault()
} else {
  divAlert.innerHTML +=`
   <div id="failAlert" class="alert alert-danger" role="alert" style="z-index: 1;">
   Verifica que los datos ingresados sean correctos
</div>
   `;  
   event.preventDefault()
   form.classList.remove('was-validated');
}
removeAlert()
  }, false)

  

})()