const ORDER = JSON.parse(localStorage.getItem("order")) || [];
const DATE = JSON.parse(localStorage.getItem("date")) || [];

// affiche Mes informations
const INFORMATIONS = document.getElementById("contact");
INFORMATIONS.innerHTML += `
    <p class="fs-5"><span class="fw-bold text-capitalize">${ORDER.contact.firstName}</span>, merci pour votre achat sur notre site !</p>
    <p class="fs-5"> Votre commande passée le <span class="fw-bold">${DATE[0].DATE}</span> à <span class="fw-bold">${DATE[0].HOURS}</span> d'un montant total de <span class="fw-bold">${convertPrice(displayTotalBasket())}</span> a été validée.</p>
    <p class="fs-5">Elle porte la référence <span class="fw-bold">${ORDER.orderId}</span>.</p>
    <p class="fs-5">Votre facture va vous être transmise par mail à : <span class="fw-bold">${ORDER.contact.email}</span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${ORDER.contact.firstName} ${ORDER.contact.lastName}</p>
        <p class="text-capitalize">${ORDER.contact.address}</p>
        <p class="text-capitalize">${ORDER.contact.city}</p>
    </div>
    `;

// affiche Récapitulatif de ma commande
for (product of BASKET) {
  displayProductListTable(product);
}
const DELETE_ELEMENT = document.getElementsByClassName("rounded");
for(element of DELETE_ELEMENT){
  element.classList.add("d-none");
}

//affiche le prix total
totalPrice();

//bouton imprimer
const PRINT = document.getElementById("print");
PRINT.addEventListener("click", (e) => {
  e.preventDefault;
  window.print();
});

//vide le localStorage
const CLICK_HOME = document.getElementById("accueil");
CLICK_HOME.addEventListener("click", () => {
  clearBasket();
});

const CLICK_BASKET = document.getElementById("basketPreview");
CLICK_BASKET.addEventListener("click", () => {
  clearBasket();
});