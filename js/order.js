let baskets = JSON.parse(localStorage.getItem("cameras")) || [];
let order = JSON.parse(localStorage.getItem("order")) || [];
let date = JSON.parse(localStorage.getItem("date")) || [];
let total = displayTotalBasket();

console.log(order.contact.firstName);
console.log(date[0].hours);

// Mes informations

let informations = document.getElementById("contact");
contact.innerHTML += `
    <p class="fs-5"><span class="fw-bold text-capitalize">${
      order.contact.firstName
    }</span>, merci pour votre achat sur notre site !</p>
    <p class="fs-5"> Votre commande passé le <span class="fw-bold">${
      date[0].date
    }</span> à <span class="fw-bold">${
  date[0].hours
}</span> d'un montant total de <span class="fw-bold">${convertPrice(
  total
)}</span> a été validée. </p>
    <p class="fs-5">Elle porte la référence <span class="fw-bold">${
      order.orderId
    }</span> </p>
    <p class="fs-5">Votre facture va vous être envoyé par mail à : <span class="fw-bold">${
      order.contact.email
    }</span>.</p>
    <p class="fs-5">Elle sera envoyé à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${
  order.contact.lastName
}</p>
        <p class="text-capitalize">${order.contact.address} </p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
    `;

// Récapitulatif de ma commande
let fullBasket = document.getElementById("section");
  fullBasket.innerHTML += `
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
  </div>`;
for (basket of baskets) {
    let indexProduct = baskets.indexOf(basket);
    let basketList = document.getElementById("productsBaskets");
    basketList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${basket.imgurl
        }" class="img-fluid img-thumbnail" alt="...">
        </td>
        <td class="align-middle">
            <span>${basket.name}</span>
        </td>
        <td class="align-middle">
            <span>${basket.option}</span>
        </td>
        <td class="align-middle">
              <span class="mx-0 mx-lg-3"> ${basket.quantity}</span>
        </td>
        <td class="align-middle">
            <span>${convertPrice(basket.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(basket.quantity * basket.price)}</span>
        </td>
    </tr>`;
}

let totalPrice = document.getElementById("totalPrice");
totalPrice.innerHTML += `${convertPrice(total)}`;

let print = document.getElementById("print");
print.addEventListener("click", (e) => {
    e.preventDefault;
    window.print();
})

let accueil = document.getElementById("accueil");
accueil.addEventListener("click", (e) => {
    clearBasket()
})

let panier = document.getElementById("pillOnStorage");
panier.addEventListener("click", (e) => {
  clearBasket();
});