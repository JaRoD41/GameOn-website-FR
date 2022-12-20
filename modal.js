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

// déclaration des différentes zones d'input et de messages d'erreur //

const firstCheck = document.getElementById('first')
const lastCheck = document.getElementById('last')
const emailCheck = document.getElementById('email')
const birthCheck = document.getElementById('birthdate')
const quantityCheck = document.getElementById('quantity')
const boxCheck = document.getElementById('checkbox1')

const zoneFirstErrorMsg = document.querySelector('#firstError')
const zoneLastErrorMsg = document.querySelector('#lastError')
const zoneEmailErrorMsg = document.querySelector('#emailError')
const zoneBirthErrorMsg = document.querySelector('#birthError')
const zoneQuantityErrorMsg = document.querySelector('#quantityError')
const zoneBoxCheckErrorMsg = document.querySelector('#boxCheckError')

// déclaration des regex de contrôle des inputs du formulaire //

const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
const regexLastName = regexFirstName
const regexEmail =
	/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/

// écoute du clic sur le bouton COMMANDER //

const formSubmitButton = document.getElementById('formSubmitBtn')

formSubmitButton.addEventListener('click', function (e) {
	e.preventDefault() // on empeche le formulaire de fonctionner par defaut si aucun contenu

	// recupération des inputs du formulaire //

	let firstCheckValue = document.getElementById('first').value.trim()
	let lastCheckValue = document.getElementById('last').value.trim()
	let emailCheckValue = document.getElementById('email').value.trim()
	let birthCheckValue = document.getElementById('birthdate').value
	let quantityCheckValue = document.getElementById('quantity').value.trim()

	// mise en place des conditions de validation des champs du formulaire //

	// mise en place d'une vérification d'âge minimum de participation de 15 ans

	const minimumAge = 15
	const today = new Date()
	const birthDate = new Date(birthCheckValue)
	let ageInYears = today.getFullYear() - birthDate.getFullYear()

	if (
		today.getMonth() < birthDate.getMonth() ||
		(today.getMonth() == birthDate.getMonth() &&
			today.getDate() < birthDate.getDate())
		// si le mois en cours est inférieur au mois de naissance ou que le mois de naissance === mois en cours && le jour actuel < au jour de naissance, alors on diminue le nombre d'années de l'âge de 1
	) {
		ageInYears--
	}

	// si une erreur est trouvée, un message est retourné et la valeur false également //

	// Récupération du conteneur parent du champ
	const form = document.querySelector('form[name="reserve"]')
	const field = form.querySelectorAll('.text-control')
	// const container = field.closest('.formData')

	// test du champ prénom //
	function firstValidation() {
		if (
			firstCheckValue.length < 2 ||
			firstCheckValue === '' ||
			!firstCheckValue.match(regexFirstName)
		) {
			console.log('Merci de renseigner un prénom valide')
			return false
		}
		console.log('Merci de renseigner un prénom valide')
		return false
	}

	// test du champ nom //
	function lastValidation() {
		if (
			lastCheckValue.length < 2 ||
			lastCheckValue === '' ||
			!lastCheckValue.match(regexLastName)
		) {
			console.log('Merci de renseigner un nom de famille valide')
			return false
		}
	}

	// test du champ email //
	function emailValidation() {
		if (emailCheckValue === '' || !emailCheckValue.match(regexEmail)) {
			console.log('Merci de renseigner un email valide')
			return false
		}
	}

	function birthValidation() {
		// test du champ date de naissance (si champ vide) //
		if (birthCheckValue === null) {
			console.log('Merci de renseigner votre date de naissance')

			return false
		}
		// test du champ date de naissance (si trop jeune pour participer) //
		if (ageInYears < minimumAge) {
			console.log("Désolé, l'âge minimum requis est de 15 ans")
		}
	}

	// test du champ quantité doit être un NOMBRE compris entre 0 et 99 //
	function quantityValidation() {}
	if (
		quantityCheckValue < 0 ||
		quantityCheckValue > 99 ||
		isNaN(quantityCheckValue) == true ||
		quantityCheckValue === null
	) {
		console.log('Merci de renseigner un nombre compris entre 0 et 99')

		return false
	}

	if (isValid) {
		// container.removeAttribute('data-error')
		// container.setAttribute('data-error-visible', false)
		console.log('TOUT EST OK !! YOUPIIIIII !!')
	}

	return isValid

	formValidation()
})
