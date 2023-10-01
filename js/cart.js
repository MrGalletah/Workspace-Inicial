

userEmailFunction();

const arrayCartStandar = [];
const cartProducts = document.getElementById('cartProducts');
async function fetchCart() {
    try {
      const response = await fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json');
      const data = await response.json();
      arrayCartStandar.push(...data.articles);
      console.log(arrayCartStandar);
      let standar = '';
      standar += `
      <div class="col-2 text-center"><img src="${arrayCartStandar[0].image}" class="img-thumbnail mt-2" alt="${arrayCartStandar[0].name}"></div>
      <div class="col-3 text-center">${arrayCartStandar[0].name}</div>
      <div class="col-3 text-center">${arrayCartStandar[0].currency} ${arrayCartStandar[0].unitCost}</div>
      <div class="col-2 text-center"> <input id="cantStandar" type="number" value="1" max="999" min="0" class="text-center"> </div>
      <div class="col-2 text-center fw-bold"> ${arrayCartStandar[0].currency} ${arrayCartStandar[0].unitCost} </div>
    `;
      cartProducts.innerHTML = standar;
    } catch (error) {
      console.log('Error al obtener los datos:', error);
    }
  }
  
  fetchCart();