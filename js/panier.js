//Mise à jour de la pill du panier
pillOnStorage();

let baskets = JSON.parse(localStorage.getItem('camera'));
let total = 0;

if (!baskets) {
  let formulaireCommande =document.getElementById('formulaireCommande');
  formulaireCommande.classList.add("d-none");
    let emptyBasket = document.getElementById("section");
    emptyBasket.innerHTML +=
        `<div class="container my-3 py-1">
        <div class="text-center my-5 shadow p-3 mb-5 bg-body rounded">
                <h1 class="fs-1 font-weight-bold text-secondary my-5">Votre panier semble vide, commencez vos achats
                </h1>
                <a role="button" class="btn btn-success text-uppercase my-3" href="index.html">ça se passe par içi</a> 
            </div>
        </div>`
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
        </table>
        `
        //  let totalPrices = displayTotalBasket();
        //  console.log(totalPrices)
        //  let totalPrice = document.getElementById("totalPrice");
        //  totalPrice.innerHTML +=
        //  `${displayTotalBasket()} `

    for (basket of baskets) {
        let basketList = document.getElementById("productsBaskets");
        basketList.innerHTML +=
            `
            <tr class="text-center">
                <td class="w-25">
                    <img src="${basket.imgurl}" class="img-fluid img-thumbnail" alt="...">
                </td>
                <td class="align-middle">
                    <p>${basket.name}</p>
                </td>
                <td class="align-middle">
                    <p>${basket.option}</p>
                </td>
                <td class="align-middle">
                    <p>${basket.quantity}</p>
                </td>
                <td class="align-middle">
                    <p>${convertPrice(basket.price)}</p>
                </td>
                <td class="align-middle bg-light">
                    <p>${convertPrice(basket.quantity*basket.price)}</p>
                </td>

        </tr>`
        total = total + (basket.quantity*basket.price)
    }
    console.log(total);
    // a voir avec le mentor
    // displayTotalBasket();
    // console.log(displayTotalBasket())
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML +=
    `${convertPrice(total)} `
}

let buttonClearBasket = document.getElementById("clearBasket")
buttonClearBasket.addEventListener("click", (e) => {
  
  clearBasket();
})
