
// récupération de l'id du produit
// let newId = location.search.substring(5);
var searchParams = new URLSearchParams(location.search);
let newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
let newUrl = `https://teddies-api.herokuapp.com/api/cameras/${newId}`;
let versionChoice;

fetch(newUrl)
.then(response => response.json())
.then((data) => {
    let produit = data;
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
                        <h5 class="card-title">${convertPrice(produit.price)}</h5>
                    </div>
                </div>
                <select id="option" class="form-select mb-3" aria-label="choisir la version" >
                </select>
                <p class="card-text">${produit.description}</p>
                <div class="row">
                    <div class="col-5 col-sm-3 col-md-5 col-lg-4 col-xl-3 my-auto">
                        <p>Quantité :</p>
                    </div>
                    <div class="col-4 col-sm-3 col-md-4 col-lg-3 ">
                    <select id="quantity" class="form-select mb-3" aria-label="Quantité" >
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>
                </div>
                <button id="btnAjoutPanier" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" >Ajouter au Panier</button>
            </div>
            <div class="toast show position-absolute top-50 start-50 translate-middle bg-danger" id="myToast" hidden>
                <div id="liveToast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex my-2">
                        <div class="toast-body me-auto py-0 text-white" id="message">
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Close" id="closeToast"></button>
                    </div>
                </div>
            </div>
        </div>
        `;
    
    // insertion des versions du produit
    let versionChoice = document.getElementById("option");

    for (let lenses of produit.lenses){
        versionChoice.innerHTML +=
            `<option value="${lenses}">${lenses}</option>`;
    }

    let btnAjoutPanier = document.getElementById("btnAjoutPanier");
    btnAjoutPanier.addEventListener("click", (e) => {
        e.preventDefault();
        let liste;
        liste = document.getElementById("option");
        let quantity;
        quantity = document.getElementById("quantity")

        // créer un nouveau produit
        let objetProduit = new product(newId, produit.name, produit.description, produit.price, liste.value, quantity.value, produit.imageUrl);
        let baskets = JSON.parse(localStorage.getItem('camera')) || [];
        
        // vérifie s'il est déja présent
        // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
        let dejaPresent = false;
        let indexmodification;
        for (basket of baskets) {
            switch (objetProduit.option) {
                case basket.option:
                    dejaPresent = true;
                    indexModification = baskets.indexOf(basket);
            }
        }

        // si déjaPresent incremente seulement la quantité
        if (dejaPresent) {
            baskets[indexModification].quantity = +baskets[indexModification].quantity + +objetProduit.quantity;
            localStorage.setItem("camera", JSON.stringify(baskets));
        // si non, ajoute le produit au localStorage
        } else {
            let basket = JSON.parse(localStorage.getItem("camera")) || [];
            basket.push(objetProduit);
            localStorage.setItem("camera", JSON.stringify(basket));          
        }

    })




    

    
    
    
}
)



