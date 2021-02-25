
// récupération de l'id du produit
// let newId = location.search.substring(5);
var searchParams = new URLSearchParams(location.search);
let newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
let newUrl = `http://localhost:3000/api/cameras/${newId}`;
let versionChoice;

fetch(newUrl)
.then(response => response.json())
.then((data) => {
    let produit = data;
    //convertit le prix
    let price = convertPrice(produit.price);
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
                        <h5 class="card-title">${price}</h5>
                    </div>
                </div>
                <select id="option" class="form-select mb-3" aria-label="choisir la version" >
                    <option selected value="choice">Choisir la version</option>
                </select>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
                <a href="" id="btnAjoutPanier" class="btn btn-success">Ajouter au Panier</a>
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
    // let optionSelected = "choice";
    // console.log(optionSelected);

    // // test capture choix option
    // versionChoice.addEventListener(`change`, (e) => {
    // optionSelected = optionValue();
    // console.log(optionValue());
    // console.log(optionSelected);
    // })

    //     console.log(optionSelected);

    let btnAjoutPanier = document.getElementById("btnAjoutPanier");
    btnAjoutPanier.addEventListener("click", (e) => {
        e.preventDefault();
        let liste;
        liste = document.getElementById("option");
        if (liste.value == "choice") {
            let toast = document.getElementById('myToast');
            console.log(toast)
            toast.toggleAttribute("hidden");
            let messageToast = document.getElementById("message");
            console.log(messageToast);
            messageToast.innerHTML = `Veuillez choisir l'option`;
            document.getElementById('closeToast').addEventListener('click', function () {
                toast.setAttribute("hidden", "");
            }
            )
        }
        console.log(liste.value)
    })




    

    
    
    
}
)



