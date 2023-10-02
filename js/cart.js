userEmailFunction();

let selectedQuantity = 1;
const arrayCartStandar = [];
const cartProducts = document.getElementById('cartProducts');

async function fetchCart() {
  try {
    const response = await fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json');
    const data = await response.json();
    arrayCartStandar.push(...data.articles);
    console.log(arrayCartStandar);

    function calculateSubtotal(unitCost, quantity) {
      return unitCost * quantity;
    }

    let standar = '';
    standar += `
      <div class="col-2 text-center"><img src="${arrayCartStandar[0].image}" class="img-thumbnail mt-2" alt="${arrayCartStandar[0].name}"></div>
      <div class="col-3 text-center">${arrayCartStandar[0].name}</div>
      <div class="col-3 text-center">${arrayCartStandar[0].currency} ${arrayCartStandar[0].unitCost}</div>
      <div class="col-2 text-center">
        <input id="cantStandar" type="number" value="${selectedQuantity}" max="999" min="1" class="text-center">
      </div>
      <div class="col-2 text-center fw-bold">${arrayCartStandar[0].currency} ${calculateSubtotal(arrayCartStandar[0].unitCost, selectedQuantity)}</div>
    `;
    cartProducts.innerHTML = standar;
    
    const quantityInput = document.getElementById('cantStandar');
    quantityInput.addEventListener('input', function () {
      selectedQuantity = parseInt(quantityInput.value);
      const subtotal = calculateSubtotal(arrayCartStandar[0].unitCost, selectedQuantity);
      const subtotalElement = document.querySelector('.col-2.text-center.fw-bold');
      subtotalElement.textContent = `${arrayCartStandar[0].currency} ${subtotal}`;
    });
  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
}

fetchCart();
