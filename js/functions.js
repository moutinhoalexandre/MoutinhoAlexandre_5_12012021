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

class product {
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
    JSON.parse(localStorage.getItem('camera')).forEach((cameras)=> {
        console.log(cameras.price * cameras.quantity)
        totalBasket = totalBasket + (cameras.price * cameras.quantity);        
    })
    return
    }

// calcul du pillon
function pillOnStorage() {
            let baskets = JSON.parse(localStorage.getItem('camera')) || [];
            if (baskets.length == 0){
            }else {
            let ajoutPill = document.getElementById("pillOnStorage");
            let calculPill = 0;
            for(basket of baskets){
                calculPill += basket.quantity;
            }
            ajoutPill.innerHTML = `Panier <span class="badge rounded-pill bg-success align-middle my-auto">${calculPill}</span>`;
        }
    }

// supprimer le Panier 
function clearBasket() {
    localStorage.clear();
    location.reload()
}
