//Mise à jour du basketPreview
basketPreview();

// récupération de l'id du produit
const SEARCH_PARAMS = new URLSearchParams(location.search);
const NEW_ID = SEARCH_PARAMS.get("_id");

//modification de l'adresse d'appel à l'API
const NEW_URL = `https://teddies-api.herokuapp.com/api/cameras/${NEW_ID}`;

fetch(NEW_URL)
  .then((response) => response.json())
    .then((data) => {
      const PRODUCT = data;
    addCard(data);

    // fonction pour la création de la card de la page produit
    function addCard(PRODUCT) {
      
      // insertion des information de la card du produit
      const SELECTION_PRODUCT_IMAGE = document.getElementById("productImage");
      SELECTION_PRODUCT_IMAGE.innerHTML += `
        <img src="${PRODUCT.imageUrl}" class="img-fluid img-thumbnail" alt="${PRODUCT.name}">
        `;
      const SELECTION_PRODUCT_NAME = document.getElementById("productName");
      SELECTION_PRODUCT_NAME.innerHTML += `
        <h5 class="card-title">${PRODUCT.name}</h5>
        `;
      const SELECTION_PRODUCT_PRICE = document.getElementById("productPrice");
      SELECTION_PRODUCT_PRICE.innerHTML += `
         <h5 class="card-title">${convertPrice(PRODUCT.price)}</h5>
        `;
      const SELECTION_PRODUCT_DESCRIPTION = document.getElementById("productDescription");
      SELECTION_PRODUCT_DESCRIPTION.innerHTML += `
        <p class="card-text">${PRODUCT.description}</p>
        `;
      addLenses(PRODUCT);
    }

    function addLenses(PRODUCT) {
      const VERSION_CHOICE = document.getElementById("option");
      for (let lenses of PRODUCT.lenses) {
        VERSION_CHOICE.innerHTML += `<option value="${lenses}">${lenses}</option>`;
      }
    }

    const BTN_ADD_BASKET = document.getElementById("btnAddBasket");
    BTN_ADD_BASKET.addEventListener("click", (e) => {
      e.preventDefault();
      const LIST = document.getElementById("option");
      const QUANTITY = document.getElementById("quantity");

      // créer un nouveau produit
      let objectProduct = new Product(
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
        BASKET[indexModification].quantity =
          +BASKET[indexModification].quantity + +objectProduct.quantity;
        localStorage.setItem("cameras", JSON.stringify(BASKET));
        // si non, ajoute le produit au localStorage
      } else {
        BASKET.push(objectProduct);
        localStorage.setItem("cameras", JSON.stringify(BASKET));
      }
    });
  });
