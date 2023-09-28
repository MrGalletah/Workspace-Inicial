const container = document.getElementById("container");
const commentsSection = document.getElementById("commentsSection")
const userCommentSection = document.getElementById("userCommentsSection")
const productID = localStorage.productID;
//import {userEmail, sidebar} from "helpers.js";


sidebarFunction()
userEmailFunction()
themeFunction()

function showProduct(array) {
    const divProduct = document.createElement('div');
    const product = `
    <div class="text-center">
    <h2 class="display2 my-4">${array.name}</h2>
  </div> 
  <div class="row">
    <div class="col-6">
      <ul class="list-group list-group-flush border rounded">
        <li class="list-group-item list-color"><b>Precio</b><br>${array.currency} ${array.cost}</li>
        <li class="list-group-item list-color"><b>Descripción</b><br>${array.description}</li>
        <li class="list-group-item list-color"><b>Categoría</b><br>${array.category}</li>
        <li class="list-group-item list-color"><b>Cantidad de vendidos</b><br>${array.soldCount}</li>
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
  //  container.appendChild(divProduct);
    container.insertBefore(divProduct, container.firstChild)
}


async function fetchDataAndShow() {
    const productID = localStorage.productID;
    urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`
try {
   const response = await fetch(urlProduct);
   const data = await response.json();
   showProduct(data);
}
catch(error) {
  throw new Error(`HTTP error! Status: ${error}`);
}   
}

fetchDataAndShow()


// Star rating based in UserScore

const starRating = (userScore) =>{
  switch (Math.round(userScore)) {
    case 0:
      return ""
      break;
    case 1:
      return "⭐"
      break;
    case 2:
      return "⭐⭐"
      break;  
    case 3:
      return "⭐⭐⭐"
    break;
    case 4:
      return "⭐⭐⭐⭐"
    break;
    case 5:
      return "⭐⭐⭐⭐⭐"
    break;
    default:
      return userScore
      break;

  }
}
// create html comment elemment
const createCommentComponent = (user, score, desc, date)=>{
 const commentElement = document.createElement("div")

  commentElement.innerHTML = `        
<div  class="commentContainer">
<p  class="commentUser">${user}</p>
<p  class="commentScore">${score}</p>
<p  class="commentDesc">${desc}</p>
<p  class="commentDate">${date}</p>
</div>
`
return commentElement
}

// Fetch comments
const getAndRenderComments = async () => {
  const productID = localStorage.productID;
  try {
    const request = await fetch(`${PRODUCT_INFO_COMMENTS_URL}${productID}.json`);
    const response = await request.json();
    console.log(response);
    response.sort(function(a, b) { 
      return new Date(a.dateTime) - new Date(b.dateTime); 
    }); 
    response.forEach((comment)=>{
      commentsSection.appendChild(createCommentComponent(comment.user,starRating(comment.score), comment.description,comment.dateTime))
    })
    renderCommentsLocalStorage()
    console.log(commentsSection)
  } catch (error) {
    console.log(error);
  }
}

// new comments
const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', function (e){
    e.preventDefault();
    const nameUserComment = document.getElementById('nameCommentUser');
    const description = document.getElementById('description');
    const starSelector = document.getElementById('starSelector');
    const scoreUser = starRating(starSelector.selectedIndex + 1);
    const date = new Date().toLocaleString();
    const newComment = createCommentComponent(nameUserComment.value, scoreUser, description.value, date);
    commentsSection.appendChild(newComment);
    const newCommentObject = {
        name: nameUserComment.value,
        description: description.value,
        rate: scoreUser,
        date: date,
    };
    let userComments = JSON.parse(localStorage.getItem(`${productID}`)) || [];
    userComments.push(newCommentObject);
    localStorage.setItem(`${productID}`, JSON.stringify(userComments));
    nameUserComment.value = '';
    description.value = '';
    starSelector.selectedIndex = 0;
});



document.addEventListener('DOMContentLoaded', function () {
  getAndRenderComments();

});

const renderCommentsLocalStorage = ()=>{
  const userComments = JSON.parse(localStorage.getItem(`${productID}`)) || [];
  if (userComments.length > 0) {
      userComments.forEach(comment => {
          commentsSection.append(createCommentComponent(comment.name, comment.rate, comment.description, comment.date));
      });
  }
}
