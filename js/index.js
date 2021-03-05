//Mise à jour de la pill du panier
pillOnStorage();

//definition de l'URL de l'API
url = `https://teddies-api.herokuapp.com/api/cameras`;

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
        let price = convertPrice(produit.price);
        // insertion de la card du produit
        card.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
                <div class="card border bg-light shadow p-3 mb-5 bg-body rounded">
                    <div class="card-body">
                        <div class="row">
                            <a href="./produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                            <div class="col-6 col-sm-7 mt-3" >
                                <h5 class="card-title">${produit.name}</h5>
                            </div>
                            <div class="col-6 col-sm-5 text-end mt-3">
                                <h5 class="card-title">${price}</h5>
                            </div>
                        </div>
                        <p class="card-text text-truncate">${produit.description}</p>
                        <a href="./produit.html?_id=${produit._id}" class="btn btn-success">Voir ce produit</a>
                    </div>
                </div>
            </div>`;
    }
}
).catch(erreur => console.log('erreur : ' + erreur));