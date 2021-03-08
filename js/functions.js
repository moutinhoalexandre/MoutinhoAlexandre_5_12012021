//Variables Globales
let url = `http://localhost:3000/api/cameras`;

// convertir le prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    }).format(price / 100);
    return price;
}

// création de la class produit
class productClass {
    constructor(id, name, description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price;
        this.option = option;
        this.quantity = +quantity;
        this.imgurl = imgurl;
        
    }
}

// calcul du total
function displayTotalBasket () {
    let totalBasket = 0;
    (JSON.parse(localStorage.getItem('cameras')) || []).forEach((camera)=> {
        totalBasket = totalBasket + (camera.price * camera.quantity); 
        
    })
    return totalBasket
    }

// calcul du pillOnStorage
function pillOnStorage() {
    let basket = JSON.parse(localStorage.getItem('cameras')) || [];
    if (basket.length == 0){
    }else {
        let ajoutPill = document.getElementById("pillOnStorage");
        let calculPill = 0;
        for(product of basket){
            calculPill += product.quantity;
    }
    ajoutPill.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculPill}</span>`;
}
}

// supprimer le Panier 
function clearBasket() {
    localStorage.clear();
}

// ajout produit
function addProduct (){
    let buttonAdd= document.querySelectorAll('plus');
    for (add of buttonAdd){
        add.addEventListener('click', event=>{
            basket[event.target.id].qte ++;
            localStorage.setItem(0, JSON.stringify(basket));
            location.reload();
        })
    }
}

//supprime un produit
function minusProduct() {
  let buttonMinus = document.getElementsByClassName("minus");
  for (minus of buttonMinus) {
    minus.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      if (basket[index].quantity > 1) {
        basket[index].quantity --;
      } else {
        basket.splice(index, 1);
      }
      localStorage.setItem("cameras", JSON.stringify(basket));
      location.reload();
    });
  }
}

// ajoute un produit
function addProduct() {
  let buttonAdd = document.getElementsByClassName("plus");
  for (add of buttonAdd) {
    add.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      basket[index].quantity ++;
      localStorage.setItem("cameras", JSON.stringify(basket));
      location.reload();
    });
  }
}
