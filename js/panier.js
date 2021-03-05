//Mise à jour de la pill du panier
pillOnStorage();

let baskets = JSON.parse(localStorage.getItem("cameras")) || [];
let total = 0;

if (baskets.length < 1) {
  let orderForm = document.getElementById("orderForm");
  orderForm.classList.add("d-none");
  let emptyBasket = document.getElementById("section");
  emptyBasket.innerHTML += `
  <div class="container my-3 py-1">
    <div class="text-center my-5 shadow p-3 mb-5 bg-body rounded">
      <h1 class="fs-1 font-weight-bold text-secondary my-5">Votre panier semble vide, commencez vos achats</h1>
      <a role="button" class="btn btn-secondary text-uppercase my-3" href="index.html">ça se passe par ici</a> 
    </div>
  </div>`;
} else {
  orderForm.classList.add("d-none");
  let fullBasket = document.getElementById("section");
  fullBasket.innerHTML += `
   <p class="text-center fs-4 text-light bg-secondary">Contenue du panier</p>
  <div class="table-responsive">
    <table class="table table-hover my-auto mx-0">
      <thead>
        <tr class="text-center fs-5">
          <th scole="col">Produit</th>
          <th scole="col">Nom</th>
          <th scole="col">Option</th>
          <th scole="col">Quantité</th>
          <th scole="col">Prix</th>
          <th scole="col" class="bg-light">Sous-total</th>
        </tr>
      </thead>
      <tbody id="productsBaskets">
      <!--insertion panier.js-->
      </tbody>
      <tfoot>
        <tr class="text-center fs-5 bg-light">
          <th colspan="4" class="bg-white"></th>
          <th colspan="1" >Total : </th>
          <th colspan="1" id="totalPrice"></th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="text-center my-5 row" id="cacheButton">
                <div class="col-12 col-sm-6 my-4">
                    <button type="submit" class="btn btn-secondary mx-5" id="validationBasket">Valider le panier</button>
                </div>
                <div class="col-12 col-sm-6 my-4">
                    <button type="button" class="btn btn-danger mx-5" data-bs-toggle="modal"
                        data-bs-target="#modalClearBasket" >Vider le panier</button>
                </div>

  </div>`;
  for (basket of baskets) {
    let indexProduct = baskets.indexOf(basket);
    let basketList = document.getElementById("productsBaskets");
    basketList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${
              basket.imgurl
            }" class="img-fluid img-thumbnail" alt="...">
        </td>
        <td class="align-middle">
            <span>${basket.name}</span>
        </td>
        <td class="align-middle">
            <span>${basket.option}</span>
        </td>
        <td class="align-middle">
              <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal">
                <span class="fas fa-minus-square text-danger" data-index="${indexProduct}"  ></span>
              </button>
              <span class="mx-0 mx-lg-3"> ${basket.quantity}</span>
              <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" ">
                <span class="fas fa-plus-square text-success" data-index="${indexProduct}" ></span>
              </button>
        </td>
        <td class="align-middle">
            <span>${convertPrice(basket.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(basket.quantity * basket.price)}</span>
        </td>
    </tr>`;
  }
  let total = displayTotalBasket();
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML += `${convertPrice(total)}`;
}

let validationBasket = document.getElementById("validationBasket");
let cacheButton = document.getElementById("cacheButton")
validationBasket.addEventListener("click", () => {
  orderForm.classList.toggle("d-none");
  cacheButton.classList.add("d-none")
})


let buttonClearBasket = document.getElementById("clearBasket");
buttonClearBasket.addEventListener("click", (e) => {
  clearBasket();
  location.reload();
});

let buttonMinus = document.getElementsByClassName("minus");
for (minus of buttonMinus) {
  minus.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    if (baskets[index].quantity > 1) {
      baskets[index].quantity--;
    } else {
      baskets.splice(index, 1);
    }
    localStorage.setItem("cameras", JSON.stringify(baskets));
    location.reload();
  });
}

let buttonAdd = document.getElementsByClassName("plus");
for (add of buttonAdd) {
  add.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    baskets[index].quantity++;
    localStorage.setItem("cameras", JSON.stringify(baskets));
    location.reload();
  });
}

let commande = document.getElementById("order");
let orderFormValidity = document.getElementById("orderFormValidity");

commande.addEventListener("click", (event) => {
  if (orderFormValidity.checkValidity()) {
    event.preventDefault();

    // on stocke l'heure et la date de la commande
    let todayDate = new Date();
    let nowadays = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    let todayHours = todayDate.getHours();
    let todayMinutes = todayDate.getMinutes();
    
    if (nowadays < 10) {
      nowadays = "0" + nowadays
    }

    if (month < 10) {
      month = "0" + month
    }

    if (todayHours < 10) {
      todayHours = "0" + todayHours
    }

    if (todayMinutes < 10) {
      todayMinutes = "0" + todayMinutes
    }

    let date = nowadays + "-" + (month) + "-" + todayDate.getFullYear();
    let hours = todayHours + ":" + todayMinutes;
    let fullDate = {date, hours};
    let infoOrder = JSON.parse(localStorage.getItem("date")) || [];
    infoOrder.push(fullDate);
    localStorage.setItem("date", JSON.stringify(infoOrder));

    // on prépare les infos pour l'envoie en POST
    const contact = {
      firstName : document.getElementById("firstName").value,
      lastName : document.getElementById("lastName").value,
      address : document.getElementById("address").value,
      city : document.getElementById("city").value,
      email : document.getElementById("email").value
    }
    let products = [];
    for (listId of baskets) {
      products.push(listId.id)
    }

    // on envoie en POST
    fetch("https://teddies-api.herokuapp.com/api/cameras/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("order", JSON.stringify(data));
        document.location.href = "order.html";
      })
      .catch((error) => {
        window.alert(error);
      });
  } else {
  }
});

