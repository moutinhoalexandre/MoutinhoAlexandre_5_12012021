//Mise à jour du basketPreview
basketPreview();

// récupération de l'id du produit
const SEARCH_PARAMS = new URLSearchParams(location.search);
const NEW_ID = SEARCH_PARAMS.get("_id");

//modification de l'adresse d'appel à l'API
const NEW_URL = `https://teddies-api.herokuapp.com/api/cameras/${NEW_ID}`;

fetch(NEW_URL)
.then(response => response.json())
.then((data) => {
    const PRODUCT = data;
    // insertion de la card du produit
    const SELECTION_PRODUCT = document.getElementById('product');
    SELECTION_PRODUCT.innerHTML += `
        <div class="col-md-7">
            <img src="${PRODUCT.imageUrl}" class="img-fluid img-thumbnail" alt="${PRODUCT.name}" >
        </div>
        <div class="col-md-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-6 col-sm-7 mt-3">
                        <h5 class="card-title">${PRODUCT.name}</h5>
                    </div>
                    <div class="col-6 col-sm-5 text-end mt-3">
                        <h5 class="card-title">${convertPrice(PRODUCT.price)}</h5>
                    </div>
                </div>
                <select id="option" class="form-select mb-3" aria-label="choisir la version" >
                </select>
                <p class="card-text">${PRODUCT.description}</p>
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
                <button id="btnAddBasket" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal" >Ajouter au Panier</button>
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
    const VERSION_CHOICE = document.getElementById("option");

    for (let lenses of PRODUCT.lenses){
        VERSION_CHOICE.innerHTML +=
            `<option value="${lenses}">${lenses}</option>`;
    };

    const BTN_ADD_BASKET = document.getElementById("btnAddBasket");
    BTN_ADD_BASKET.addEventListener("click", (e) => {
        e.preventDefault();
        const LIST = document.getElementById("option");
        const QUANTITY = document.getElementById("quantity");

        // créer un nouveau produit
        let objectProduct = new Product (
          NEW_ID,
          PRODUCT.name,
          PRODUCT.description,
          PRODUCT.price,
          LIST.value,
          QUANTITY.value,
          PRODUCT.imageUrl
        );        
        // vérifie s'il est déja présent
        // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
        let isAlreadyPresent = false;
        let indexModification;
        for (product of BASKET) {
            switch (product.option) {
                case objectProduct.option:
                isAlreadyPresent = true;
                indexModification = BASKET.indexOf(product);
            }
        }

        // si déjaPresent incremente seulement la quantité
        if (isAlreadyPresent) {
            BASKET[indexModification].quantity = +BASKET[indexModification].quantity + +objectProduct.quantity;
            localStorage.setItem("cameras", JSON.stringify(BASKET));
        // si non, ajoute le produit au localStorage
        } else {
            BASKET.push(objectProduct);
            localStorage.setItem("cameras", JSON.stringify(BASKET));          
        }
    })
}
)



