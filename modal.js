function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close"); // ajout de la gestion du X pour fermer la modale

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none"; // passage en display:none au clic sur la X
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal)); // fermeture du formulaire au clic sur le X


// Gestion du formulaire et des validations de champs

// déclaration des différentes zones d'input et de messages d'erreur //

const firstInput = document.getElementById("first")
const lastInput = document.getElementById("last")
const emailInput = document.getElementById("email")
const birthdateInput = document.getElementById('birthdate')
const quantityInput = document.getElementById("quantity")
const checkbox1Input = document.getElementById('checkbox1')

const zoneFirstErrorMsg = document.querySelector('#firstErrorMsg')
const zoneLastErrorMsg = document.querySelector('#lastErrorMsg')
const zoneEmailErrorMsg = document.querySelector('#emailErrorMsg')
const zoneBirthdateErrorMsg = document.querySelector('#birthdateErrorMsg')
const zoneQuantityErrorMsg = document.querySelector('#quantityErrorMsg')
const zoneCheckboxErrorMsg = document.querySelector('#checkboxErrorMsg')