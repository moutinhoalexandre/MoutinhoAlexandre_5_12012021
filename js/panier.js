//Mise à jour de la pill du panier
pillOnStorage();

let baskets = JSON.parse(localStorage.getItem("camera"));
let total = 0;

if (!baskets) {
  let formulaireCommande = document.getElementById("formulaireCommande");
  formulaireCommande.classList.add("d-none");
  let emptyBasket = document.getElementById("section");
  emptyBasket.innerHTML += 
  `<div class="container my-3 py-1">
      <div class="text-center my-5 shadow p-3 mb-5 bg-body rounded">
        <h1 class="fs-1 font-weight-bold text-secondary my-5">Votre panier semble vide, commencez vos achats</h1>
        <a role="button" class="btn btn-success text-uppercase my-3" href="index.html">ça se passe par içi</a> 
      </div>
    </div>`;
} else {
  let fullBasket = document.getElementById("section");
  fullBasket.innerHTML += 
  `<table class="table table-hover my-auto mx-5">
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
  </table>`;
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
                    <span class="mx-3"> ${basket.quantity}</span>
                    <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" ">
                      <span class="fas fa-plus-square text-success" id="${indexProduct}" ></span>
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

let buttonClearBasket = document.getElementById("clearBasket");
buttonClearBasket.addEventListener("click", (e) => {
  clearBasket();
});

let panier = JSON.parse(localStorage.getItem("camera")) || [];

let buttonMinus = document.getElementsByClassName("minus");
for (minus of buttonMinus) {
  minus.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    if (panier[index].quantity > 1) {
      panier[index].quantity--;
    } else {
      panier.splice(index, 1);
    }

    localStorage.setItem("camera", JSON.stringify(panier));
    location.reload();
  });
}

let buttonAdd = document.getElementsByClassName("plus");
for (add of buttonAdd) {
  add.addEventListener("click", (event) => {
    console.log(event.target.id);
    panier[event.target.id].quantity++;
    console.log(panier[event.target.id].quantity);
    localStorage.setItem("camera", JSON.stringify(panier));
    location.reload();
  });
}
