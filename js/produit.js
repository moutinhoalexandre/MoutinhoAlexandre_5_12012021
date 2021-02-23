
// récupération de l'id du produit
// let newId = location.search.substring(5);
var searchParams = new URLSearchParams(location.search);
let newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
let newUrl = `http://localhost:3000/api/cameras/${newId}`;

fetch(newUrl)
.then(response => response.json())
.then((data) => {
    let produit = data;
    //convertit le prix
        let price = produit.price;
        price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0
        }).format(price / 100);
    // insertion de la card du produit
    let selectionProduct = document.getElementById('product');
    selectionProduct.innerHTML +=
        `<div class="col-md-7">
            <img src="${produit.imageUrl}" class="img-fluid img-thumbnail" alt="Product Image" >
        </div>
        <div class="col-md-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-7" style="margin-top: 10px">
                        <h5 class="card-title">${produit.name}</h5>
                    </div>
                    <div class="col-5 text-end" style="margin-top: 10px">
                        <h5 class="card-title">${price}</h5>
                    </div>
                </div>
                <select class="form-select mb-3" aria-label="choisir la version"id="option">
                    <option selected >Choisir la version</option>
                </select>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
                <a href="" class="btn btn-success">Ajouter au Panier</a>
            </div>
        </div>`;
    // insertion des versions du produit
    let versionChoice = document.getElementById("option");
    produit = data;
    for (let lenses of produit.lenses){
        versionChoice.innerHTML +=
            `<option value="${lenses}">${lenses}</option>`;
    }
    
}

)
