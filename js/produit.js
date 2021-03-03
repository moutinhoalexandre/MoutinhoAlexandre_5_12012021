//Mise à jour de la pill du panier
pillOnStorage();

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
    let product = data;
    // insertion de la card du produit
    let selectionProduct = document.getElementById('product');
    selectionProduct.innerHTML +=
        `<div class="col-md-7">
            <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="Product Image" >
        </div>
        <div class="col-md-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-7" style="margin-top: 10px">
                        <h5 class="card-title">${product.name}</h5>
                    </div>
                    <div class="col-5 text-end" style="margin-top: 10px">
                        <h5 class="card-title">${convertPrice(product.price)}</h5>
                    </div>
                </div>
                <select id="option" class="form-select mb-3" aria-label="choisir la version" >
                </select>
                <p class="card-text">${product.description}</p>
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
                <button id="btnAddBasket" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" >Ajouter au Panier</button>
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

    for (let lenses of product.lenses){
        versionChoice.innerHTML +=
            `<option value="${lenses}">${lenses}</option>`;
    }

    let btnAddBasket = document.getElementById("btnAddBasket");
    btnAddBasket.addEventListener("click", (e) => {
        e.preventDefault();
        let list = document.getElementById("option");
        let quantity = document.getElementById("quantity")

        // créer un nouveau produit
        let objectProduct = new productClass(
          newId,
          product.name,
          product.description,
          product.price,
          list.value,
          quantity.value,
          product.imageUrl
        );
        let baskets = JSON.parse(localStorage.getItem('cameras')) || [];
        
        // vérifie s'il est déja présent
        // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
        let alreadyPresent = false;
        let indexModification;
        for (basket of baskets) {
            switch (objectProduct.option) {
                case basket.option:
                    alreadyPresent = true;
                    indexModification = baskets.indexOf(basket);
            }
        }

        // si déjaPresent incremente seulement la quantité
        if (alreadyPresent) {
            baskets[indexModification].quantity = +baskets[indexModification].quantity + +objectProduct.quantity;
            localStorage.setItem("cameras", JSON.stringify(baskets));
        // si non, ajoute le produit au localStorage
        } else {
            let basket = JSON.parse(localStorage.getItem("cameras")) || [];
            basket.push(objectProduct);
            localStorage.setItem("cameras", JSON.stringify(basket));          
        }
    })




    

    
    
    
}
)



