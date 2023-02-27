//Affichage id commande via local storage

// function afficherNoCommande() {
//     let commandeNumber = document.querySelector("#orderId");
//     let commandeID = JSON.parse(localStorage.getItem("idCommande"));
//     commandeNumber.innerHTML = `${commandeID}`;
// }
// afficherNoCommande();

/*Affichage via id dans url*/

//Récupération de l'id depuis l'url
let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");

//ou
// const orderId = new URL(location.href).searchParams.get("orderId");

//Affichage du numéro de commande
document.getElementById("orderId").textContent = orderId;