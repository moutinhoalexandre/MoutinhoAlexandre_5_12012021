//definition de l'URL de l'API
url = `http://localhost:3000/api/cameras`;

//fetch de l'URL
fetch(url)
.then(response => response.json())
.then((data) => {
    let produits = data;
    //boucle pour chaque iteration d'un produit
    for (let produit of produits) {
        //recupère l'élément liste dans le HTML
        let card = document.getElementById('liste');
        //convertit le prix
        let price = produit.price;
        price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0
        }).format(price / 100);
        // insertion de la card du produit
        card.innerHTML += 
        `<div class="col-sm-12 col-md-6 col-lg-6 pb-3 ">
                <div class="card border bg-light">
                    <div class="card-body">
                        <div class="row">
                            <img src="${produit.imageUrl}" class="card-img-top scale-on-hover" alt="${produit.name}">
                            <div class="col-7" style="margin-top: 10px">
                                <h5 class="card-title">${produit.name}</h5>
                            </div>
                            <div class="col-5 text-end" style="margin-top: 10px">
                                <h5 class="card-title">${price}</h5>
                            </div>
                        </div>
                        <p class="card-text text-truncate">${produit.description}</p>
                        <a href="./produit.html?_id=${produit._id}" class="btn btn-success">Voir ce produit</a>
                    </div>
                </div>
            </div>`
    }
}
).catch(erreur => console.log('erreur : ' + erreur));