//Récupération des données contenu dans l'api 

const recupererLesProduits = async function () {
    await fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            return (products = data);
        });
};

//Sélection des éléments HTML/Affichage des produits contenu au sein de l'Api

const productElt = document.querySelector("#items");

// Affichage des produits sur la page d'accueilxxx
async function afficherLesProduits() {
    await recupererLesProduits();
    products.forEach((product) => {
        productElt.innerHTML += `
        <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}" />
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>  
        </article>
        </a>`;
    });
}
afficherLesProduits();
