//Variables Globales
let url = `http://localhost:3000/api/cameras`;

    
// convertir le prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0
    }).format(price / 100);
    return price;

}

// création de la class produit

class product {
    constructor(id, name, description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.option = option;
        this.quantity = quantity;
        this.imgurl = imgurl;
        
    }
}
