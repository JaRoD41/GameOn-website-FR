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

// Gestion du formulaire et des validations des champs

//********************* affichage des messages d'erreur  ***********************************/

const form = document.querySelector('form[name="reserve"]')
const field = form.querySelectorAll('.text-control')

// écoute les changements dans les champs du formulaire
form.addEventListener('change', (event) => {
	event.preventDefault()

	// récupère le champs de formulaire concerné
	const currentField = event.target
	console.log('current field: ', currentField)

	// valide le champs en cours
	validateField(currentField)
})

function validateField(field) {
	// Récupération de la valeur du champ en supprimant les espaces éventuellement présents

	let firstCheck = document.getElementById('first')
	let lastCheck = document.getElementById('last')
	let emailCheck = document.getElementById('email')
	let birthCheck = document.getElementById('birthdate')
	let quantityCheck = document.getElementById('quantity')
	let boxCheck = document.getElementById('checkbox1')

	let firstCheckValue = document.getElementById('first').value.trim()
	let lastCheckValue = document.getElementById('last').value.trim()
	let emailCheckValue = document.getElementById('email').value.trim()
	let birthCheckValue = document.getElementById('birthdate').value
	let quantityCheckValue = document.getElementById('quantity').value.trim()

	const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
	const regexLastName = regexFirstName

	const minimumAge = 15
	const today = new Date()
	const birthDate = new Date(birthCheckValue)
	const ageInMilliseconds = Date.now() - birthDate.getTime()
	let ageInYears = today.getFullYear() - birthDate.getFullYear()


	if (
		today.getMonth() < birthDate.getMonth() ||
		(today.getMonth() == birthDate.getMonth() &&
			today.getDate() < birthDate.getDate())
	) {
		ageInYears--
	}
	// const value = firstCheck.value.trim()

	// Récupération du conteneur parent du champ
	const container = field.closest('.formData')

	// Initialisation de la variable de validité à true
	let isValid = true

	// Vérification de la longueur de la valeur du champ et ajout de la classe et du message d'erreur si incorrect
	if (firstCheckValue.length < 2) {
		firstCheck
			.closest('.formData')
			.setAttribute(
				'data-error',
				'Le champ doit contenir au moins 2 caractères'
			)
		firstCheck.closest('.formData').setAttribute('data-error-visible', true)

		isValid = false
	}

	if (lastCheckValue.length < 2) {
		lastCheck
			.closest('.formData')
			.setAttribute(
				'data-error',
				'Le champ doit contenir au moins 2 caractères'
			)
		lastCheck.closest('.formData').setAttribute('data-error-visible', true)
		isValid = false
	}

	// Vérification du format de l'adresse e-mail
	if (field.type === 'email' && !emailCheckValue.includes('@')) {
		emailCheck
			.closest('.formData')
			.setAttribute(
				'data-error',
				'Le champ doit contenir une adresse e-mail valide. Exemple : contact@nom.com'
			)
		emailCheck.closest('.formData').setAttribute('data-error-visible', true)
		isValid = false
	}
	if (field.type === 'email' && !emailCheckValue.includes('@')) {
		emailCheck
			.closest('.formData')
			.setAttribute(
				'data-error',
				'Le champ doit contenir une adresse e-mail valide. Exemple : contact@nom.com'
			)
		emailCheck.closest('.formData').setAttribute('data-error-visible', true)
		isValid = false
	}

	if (ageInYears >= minimumAge) {
		console.log("youpi ! vous avez l'âge requis !!!")
	} else {
		console.log("Trop jeune ! rentre chez ta maman !")
	}

	// Si le champ est valide, suppression de la classe d'erreur et de la classe de style d'erreur visible
	if (isValid) {
		container.removeAttribute('data-error')
		container.setAttribute('data-error-visible', false)
	}
	console.log('date naissance: ', birthCheckValue)
	console.log("aujourd'hui: ", today)
	return isValid
}
