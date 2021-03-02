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

// calcul du total du panier

// function displayTotalBasket () {
//     let totalBasket = 0;
//     console.log(baskets.quantity);
//     totalProduct = baskets.quantity * baskets.price;
//     console.log(totalProduct)
//     totalBasket += totalProduct;
//     return totalBasket;

// }

function displayTotalBasket () {
    let totalBasket = 0;
    JSON.parse(localStorage.getItem('camera')).forEach((cameras)=> {
        console.log(cameras.price * cameras.quantity)
        totalBasket = totalBasket + (cameras.price * cameras.quantity);
        
    })
    return
    }

