//Mise à jour du basketPreview
basketPreview();

const ORDER_FORM = document.getElementById("orderForm");
const EMPTY_BASKET = document.getElementById("emptyBasket");

// indique que le panier est vide
if (BASKET.length < 1) {
  ORDER_FORM.classList.add("d-none");
  // sinon affiche le tableau avec les produits
} else {
  ORDER_FORM.classList.add("d-none");
  EMPTY_BASKET.classList.add("d-none");
  const FULL_BASKET = document.getElementById("basket");
  FULL_BASKET.classList.toggle("d-none");
  for (product of BASKET) {
    displayProductListTable(product);
   ;
  }

  // ajouter produit
  function AddProduct(event) {
    const INDEX = event.target.getAttribute("data-index");
    BASKET[INDEX].quantity++;
    localStorage.setItem("cameras", JSON.stringify(BASKET));
    location.reload();
  }

  const BUTTON_ADD = document.getElementsByClassName("plus");
  for (add of BUTTON_ADD) {
    add.addEventListener("click", AddProduct);
  }

  //supprimer un produit
  function minusProduct(event) {
    const INDEX = event.target.getAttribute("data-index");
    if (BASKET[INDEX].quantity > 1) {
      BASKET[INDEX].quantity--;
    } else {
      BASKET.splice(INDEX, 1);
    }
    localStorage.setItem("cameras", JSON.stringify(BASKET));
    location.reload();
  }

  const BUTTON_MINUS = document.getElementsByClassName("minus");
  for (minus of BUTTON_MINUS) {
    minus.addEventListener("click", minusProduct);
  }

  //affiche le prix total
  totalPrice();

  //affiche le formulaire et cache les boutons valider/supprimer panier
  const VALIDATION_BASKET = document.getElementById("validationBasket");
  const CACHE_BUTTON = document.getElementById("cacheButton");
  VALIDATION_BASKET.addEventListener("click", () => {
    ORDER_FORM.classList.toggle("d-none");
    CACHE_BUTTON.classList.add("d-none");
  });

  //vide le panier
  const BUTTON_CLEAR_BASKET = document.getElementById("clearBasket");
  BUTTON_CLEAR_BASKET.addEventListener("click", () => {
    clearBasket();
    location.reload();
  });

  //validation du formulaire et envoie en POST
  const ORDER = document.getElementById("order");
  const ORDER_FORM_VALIDITY = document.getElementById("orderFormValidity");

  ORDER.addEventListener("click", (event) => {
    if (ORDER_FORM_VALIDITY.checkValidity()) {
      event.preventDefault();

      // on stocke l'heure et la date de la commande
      const TODAY_DATE = new Date();
      let nowadays = TODAY_DATE.getDate();
      let month = TODAY_DATE.getMonth() + 1;
      let todayHours = TODAY_DATE.getHours();
      let todayMinutes = TODAY_DATE.getMinutes();

      if (nowadays < 10) {
        nowadays = "0" + nowadays;
      }

      if (month < 10) {
        month = "0" + month;
      }

      if (todayHours < 10) {
        todayHours = "0" + todayHours;
      }

      if (todayMinutes < 10) {
        todayMinutes = "0" + todayMinutes;
      }

      const DATE = nowadays + "-" + month + "-" + TODAY_DATE.getFullYear();
      const HOURS = todayHours + ":" + todayMinutes;
      const FULL_DATE = { DATE, HOURS };
      const INFO_ORDER = JSON.parse(localStorage.getItem("date")) || [];
      INFO_ORDER.push(FULL_DATE);
      localStorage.setItem("date", JSON.stringify(INFO_ORDER));

      // on prépare les infos pour l'envoie en POST
      let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
      let products = [];
      for (listId of BASKET) {
        products.push(listId.id);
      }

      // on envoie en POST
      fetch("https://teddies-api.herokuapp.com/api/cameras/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("order", JSON.stringify(data));
          document.location.href = "order.html";
        })
        .catch((erreur) => console.log("erreur : " + erreur));
    }
  });
}
