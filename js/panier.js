let baskets = JSON.parse(localStorage.getItem('camera'));

if (!baskets) {
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
    alert("le panier est plein")
}
