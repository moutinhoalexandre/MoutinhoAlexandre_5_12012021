//Variables Globales
const URL = `https://teddies-api.herokuapp.com/api/cameras`;
const BASKET = JSON.parse(localStorage.getItem("cameras")) || [];

// convertir le prix
function convertPrice(productPrice) {
  let price = `${productPrice}`;
  price = Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price / 100);
  return price;
}

// création de la class produit
class Product {
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
function displayTotalBasket() {
  let totalBasket = 0;
  BASKET.forEach((camera) => {
    totalBasket = totalBasket + camera.price * camera.quantity;
  });
  return totalBasket;
}

//ajoute le tableau de commande
function displayProductListTable(product) {
  const INDEX_PRODUCT = BASKET.indexOf(product);
  const PRODUCT_LIST = document.getElementById("productsBasket");
  PRODUCT_LIST.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imgurl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal" data-index="${INDEX_PRODUCT}"><span class="fas fa-minus-square text-danger" data-index="${INDEX_PRODUCT}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" data-index="${INDEX_PRODUCT}"><span class="fas fa-plus-square text-success" data-index="${INDEX_PRODUCT}"></span></button>
        </td>
        <td class="align-middle">
            <span>${convertPrice(product.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(product.quantity * product.price)}</span>
        </td>
    </tr>`;
}

//affiche le totalBasket
function totalPrice() {
  const TOTAL_PRICE = document.getElementById("totalPrice");
  TOTAL_PRICE.innerHTML += `${convertPrice(displayTotalBasket())}`;
}

// calcul du basketPreview
function basketPreview() {
  if (BASKET.length == 0) {
  } else {
    let addBasketPreview = document.getElementById("basketPreview");
    let calculBasketPreview = 0;
    for (product of BASKET) {
      calculBasketPreview += product.quantity;
    }
    addBasketPreview.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculBasketPreview}</span>`;
  }
}

// supprimer le Panier
function clearBasket() {
  localStorage.clear();
}
