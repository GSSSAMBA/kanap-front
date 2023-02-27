// const e = require("express");

//Récupération des infos stocké dans le local storage
let panier = JSON.parse(localStorage.getItem("produit"));

//Affichage des éléments du panier
function afficherPanier() {
    //Si panier vide
    if (panier === null || panier.lenght == 0) {
        document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
    }
   
    // Si il y a des éléments dans le panier
    else {
        for (i = 0; i < panier.length; i++) {
            document.querySelector("#cart__items").innerHTML += `
        <article class="cart__item" data-id="${panier[i][0].idProduct}">
        <div class="cart__item__img">
            <img src="${panier[i][0].image}" alt="${panier[i][0].imageAlt}" />
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${panier[i][0].name}</h2>
                <p>${panier[i][0].price}</p>
                <p>Couleur: ${panier[i][0].choixOpt}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${panier[i][0].qty}" />
                </div>
                <div class="cart__item__content__settings__delete">
                    <p index="${[i]}" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
        }
    }
}

afficherPanier();
//Pour l'instant localstorage rempli mais pas d'affichage présent..........??Weird

//Suppression de la ligne au clic du bouton suppr
function supprimerArticle(e) {
    let index = e.getAttribute("index");
    panier.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    location.reload();
}

//Mise à jour des quantités et total prix si modification des valeurs dans l'input
function getNewQty(e) {
    let index = e.getAttribute("index");
    let newQty = e.value;
    panier[index][0].qty = newQty;

    if (newQty == 0) {
        panier.splice(index, 1);
        localStorage.setItem("produit", JSON.stringify(panier));
        location.reload();
    } 
    // if (newQty > 100){
    //     newQty = 100;
    //  }
    else {
        document.querySelector("#totalQuantity").innerHTML = totalQty();
        document.querySelector("#totalPrice").innerHTML = totalPrice();
        localStorage.setItem("produit", JSON.stringify(panier));
    }
}


// Calcul du total prix
function totalPrice() {
    let totalprix = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        let prix = parseInt(panier[i][0].price);
        totalprix += prix * quantity;
    }
    return totalprix;
}
//Affichage total prix
document.querySelector("#totalPrice").innerHTML = totalPrice();

//Calcul du total quantités
function totalQty() {
    let totalqty = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        totalqty += quantity;
    }
    
    return totalqty;
}

//affichage du total des quantités
document.querySelector("#totalQuantity").innerHTML = totalQty();

//Selection de la div contenant tout le formulaire
let formulaire = document.querySelector(".cart__order__form");

// Selection de la div contenant tout le formulaire
let firstName = formulaire.firstName;
let lastName = formulaire.lastName;
let address = formulaire.address;
let city = formulaire.city;
let email = formulaire.email;
let boutonCommander = formulaire.submit;

//Declaration des RegExp
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let nameRegExp = /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
let addressRegExp = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;

//Verif Prenom
firstName.addEventListener("input", function () {
    verificationFirstName(firstName);
});

function verificationFirstName() {
    let testFirstName = nameRegExp.test(firstName.value);
    if (testFirstName == false) {
        firstName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou de caractères spéciaux`;
        return false;
    } else {
        firstName.nextElementSibling.innerHTML = "";
        return true;
    }
};
//Verification du nom de famille
lastName.addEventListener("input", function () {
    verificationLastName(lastName);
});

function verificationLastName() {
    let testlastName = nameRegExp.test(lastName.value);
    if (testlastName == false) {
        lastName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou de caractères spéciaux`;
        return false;
    } else {
        lastName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verif Ville
city.addEventListener("input", function () {
    verificationCity(city);
})

function verificationCity() {
    let testCity = nameRegExp.test(city.value);
    if (testCity == false) {
        city.nextElementSibling.innerHTML = `Veuillez saisir un nom de ville valide <br> Ne doit pas contenir de chiffre`;
        return false;
    } else {
        city.nextElementSibling.innerHTML = ``;
        return true;
    }
}

// Verif adresse
address.addEventListener("change", function () {
    verificationAddress(address);
});

function verificationAddress() {
    let testAddress = addressRegExp.test(address.value);
    if (testAddress == false) {
        address.nextElementSibling.innerHTML = `Veuillez saisir une adresse valide <br> Ex: 41 résidence Floralia Marseille`;
        return false;
    } else {
        address.nextElementSibling.innerHTML = ``
        return true;
    }
}

//Verif Email
email.addEventListener("change", function () {
    verificationEmail(email);
});

function verificationEmail() {
    let testEmail = emailRegExp.test(email.value);
    if (testEmail == false && email.value != "") {
        email.nextElementSibling.innerHTML = "Veuillez saisir une adresse email valide";
        return false;
    } else {
        email.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Envoie du formulaire au clique du bouton commander
boutonCommander.addEventListener("click", function (event) {
    event.preventDefault();
    //Si tous les éléments du formulaire sont correct
    if (verificationFirstName(firstName) && verificationLastName(lastName) && verificationCity(city) && verificationAddress(address) && verificationEmail(email)) {
        //Recup ID des produits du panier (seul élément à devoir etre envoyé vers serveur)
        function recupIdProduct() {
            let idProduct = [];
            for (let i = 0; i < panier.length; i++) {
                id = panier[i][0].productID;
                idProduct.push(id);
            }
            return idProduct;
        }

        //Variable contenant les ID
        let productID = recupIdProduct();

        //Creation de l'objet commande (contenant les infos du client + id des produits commandé)

        let commande = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productID,
        };

        // Création de l'entete de la requete
        let options = {
            method: "POST",
            body: JSON.stringify(commande),
            headers: { "Content-Type": "application/json" },
        };
        fetch("http://localhost:3000/api/products/order", options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.clear();
                let orderId = data.orderId;
                //localStorage.setItem("idCommande", JSON.stringify(orderId));
                //document.location.href = `confirmation.html`;
                window.location.assign(`confirmation.html?orderId=${orderId}`);
            });
    }
});





