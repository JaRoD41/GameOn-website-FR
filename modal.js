function editNav() {
	var x = document.getElementById('myTopnav')
	if (x.className === 'topnav') {
		x.className += ' responsive'
	} else {
		x.className = 'topnav'
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const closeBtn = document.querySelectorAll('.close') // ajout de la gestion du X pour fermer la modale

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
	modalbg.style.display = 'block'
}

// close modal form
function closeModal() {
	modalbg.style.display = 'none' // passage en display:none au clic sur la X
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener('click', closeModal)) // fermeture du formulaire au clic sur le X

// Gestion du formulaire et des validations de champs

// déclaration des différentes zones d'input et de messages d'erreur //

const firstInput = document.getElementById('first')
const lastInput = document.getElementById('last')
const emailInput = document.getElementById('email')
const birthdateInput = document.getElementById('birthdate')
const quantityInput = document.getElementById('quantity')
const checkbox1Input = document.getElementById('checkbox1')
const formSubmit = document.getElementById('formSubmitBtn')

const zoneFirstErrorMsg = document.querySelector('#firstErrorMsg')
const zoneLastErrorMsg = document.querySelector('#lastErrorMsg')
const zoneEmailErrorMsg = document.querySelector('#emailErrorMsg')
const zoneBirthdateErrorMsg = document.querySelector('#birthdateErrorMsg')
const zoneQuantityErrorMsg = document.querySelector('#quantityErrorMsg')
const zoneCheckboxErrorMsg = document.querySelector('#checkboxErrorMsg')

// recupération des inputs du formulaire

const firstCheck = firstInput.value
const message = 'test'

formSubmit.addEventListener('submit', function (e) {
	setValidationMessage(e, message)
	e.preventDefault()
})

//********************* affichage des messages d'erreur  ***********************************/

// clear validation message
// function clearValidationMessage(element) {
// 	element.setAttribute('data-error-visible', 'false')
// 	element.setAttribute('data-error', '')
// }

// set validation message
// function setValidationMessage(element, message) {
// 	element.setAttribute('data-error-visible', 'true')
// 	element.setAttribute('data-error', message)
// }

const form = document.querySelector('form[name="reserve"]')
const field = form.querySelectorAll('.text-control')

function validateField(field) {
	// Récupération de la valeur du champ
	const value = field.value.trim()

	// Récupération du conteneur parent du champ
	const container = field.closest('.formData')

	// Get the error message element
	const errorMessage = container.querySelector('.error-message')

	// Initialisation de la variable de validité à true
	let isValid = true

	// Vérification de la longueur de la valeur du champ
	if (value.length < 2) {
		container.setAttribute(
			'data-error',
			'Le champ doit contenir au moins 2 caractères'
		)
		container.setAttribute('data-error-visible', true)
		isValid = false
	}

	// Vérification du format de l'adresse e-mail
	if (field.type === 'email' && !value.includes('@')) {
		container.setAttribute(
			'data-error',
			'Le champ doit contenir une adresse e-mail valide'
		)
		container.setAttribute('data-error-visible', true)
		isValid = false
	}

	// Si le champ est valide, suppression de la classe d'erreur et de la classe de style d'erreur visible
	if (isValid) {
		container.removeAttribute('data-error')
		container.setAttribute('data-error-visible', false)
	}

	return isValid
}

form.addEventListener('change', (event) => {
	event.preventDefault()

	// récupère le champs de formulaire concerné
	const currentField = event.target

	// valide le champs en cours
	validateField(currentField)
})
