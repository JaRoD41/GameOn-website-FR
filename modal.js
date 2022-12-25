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

// Récupération du conteneur parent du champ
const form = document.querySelector('form[name="reserve"]')
const field = form.querySelectorAll('.text-control')
// const container = field.closest('.formData')

// écoute du clic sur le bouton COMMANDER //

const formSubmitButton = document.getElementById('formSubmitBtn')
formSubmitButton.addEventListener('click', function (e) {
	e.preventDefault() // on empeche le formulaire de fonctionner par defaut si aucun contenu
	areAllValidated() === true ? console.log('tout est validé !') : checkAll()
	console.log('areAllValidated :', areAllValidated());
})

// test du champ prénom //
function firstValidation() {
	const firstCheck = document.getElementById('first')
	const zoneFirstErrorMsg = document.querySelector('#firstError')
	let firstCheckValue = document.getElementById('first').value.trim()
	const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
	// création d'une constante correspondant aux conditions de validation vérifiées
	const firstvalid =
		firstCheckValue.length >= 2 && regexFirstName.test(firstCheckValue)
	// mise en place d'une condition ternaire pour la validation/style du formulaire
	zoneFirstErrorMsg.innerHTML = firstvalid
		? ''
		: 'Merci de renseigner un prénom valide'
	firstCheck.style.border = firstvalid ? '' : '2px solid #e54858'
	// retourne la valeur de firstvalid true ou false pour la fonction de contrôle final
	return firstvalid
}

// test du champ nom //
function lastValidation() {
	const lastCheck = document.getElementById('last')
	const zoneLastErrorMsg = document.querySelector('#lastError')
	let lastCheckValue = document.getElementById('last').value.trim()
	const regexLastName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
	const lastvalid =
		lastCheckValue.length >= 2 && regexLastName.test(lastCheckValue)

	zoneLastErrorMsg.innerHTML = lastvalid
		? ''
		: 'Merci de renseigner un nom valide'

	lastCheck.style.border = lastvalid ? '' : '2px solid #e54858'
	return lastvalid
}

// test du champ email //
function emailValidation() {
	const emailCheck = document.getElementById('email')
	const zoneEmailErrorMsg = document.querySelector('#emailError')
	let emailCheckValue = document.getElementById('email').value.trim()
	const regexEmail =
		/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/
	const emailvalid = regexEmail.test(emailCheckValue)

	zoneEmailErrorMsg.innerHTML = emailvalid
		? ''
		: 'Merci de renseigner une adresse email valide'

	emailCheck.style.border = emailvalid ? '' : '2px solid #e54858'
	return emailvalid
}

function birthValidation() {
	const birthCheck = document.getElementById('birthdate')
	const zoneBirthErrorMsg = document.querySelector('#birthError')
	let birthCheckValue = document.getElementById('birthdate').value

	// mise en place d'une vérification d'âge minimum de participation de 15 ans

	const minimumAge = 15
	const today = new Date()
	const birthDate = new Date(birthCheckValue)
	let ageInYears = today.getFullYear() - birthDate.getFullYear()

	// utilisation d'un opérateur ternaire pour remplacer le if/else
	// si le mois en cours est inférieur au mois de naissance ou que le mois de naissance === mois en cours && le jour actuel < au jour de naissance, alors on diminue le nombre d'années de l'âge de 1
	ageInYears =
		today.getMonth() < birthDate.getMonth() ||
		(today.getMonth() == birthDate.getMonth() &&
			today.getDate() < birthDate.getDate())
			? ageInYears - 1
			: ageInYears

	// utilisation d'opérateurs ternaires pour remplacer les if/else
	// test si champ vide et si trop jeune pour participer //
	const errorMessage =
		birthCheckValue === ''
			? 'Merci de renseigner une date de naissance'
			: //si champ vide alors on affiche le message, sinon -> 2eme condition de minimum âge avec message ou non
			ageInYears < minimumAge
			? "Désolé, l'âge minimum requis est de 15 ans"
			: ''

	zoneBirthErrorMsg.innerHTML = errorMessage
	birthCheck.style.border = errorMessage === '' ? '' : '2px solid #e54858'

	// retourne true si aucun message d'erreur n'est défini, ou false s'il y en a un
	return errorMessage === ''
}

// test du champ quantité doit être un NOMBRE compris entre 0 et 99 //
function quantityValidation() {
	let quantityCheckValue = document.getElementById('quantity').value
	const quantityCheck = document.getElementById('quantity')
	const zoneQuantityErrorMsg = document.querySelector('#quantityError')
	const quantityvalid =
		quantityCheckValue >= 0 &&
		quantityCheckValue <= 99 &&
		quantityCheckValue != ''
	
	zoneQuantityErrorMsg.innerHTML = quantityvalid
		? ''
		: 'Merci de renseigner un nombre compris entre 0 et 99'

	quantityCheck.style.border = quantityvalid ? '' : '2px solid #e54858'
	return quantityvalid
}


// test si une case du choix de la ville est bien cochée //
function boxCheckValidation() {
	const zoneBoxCheckErrorMsg = document.querySelector('#boxCheckError')
	const boxCheck = document.querySelector('input[name="location"]:checked')

	zoneBoxCheckErrorMsg.innerHTML = boxCheck ? '' : 'Merci de choisir une ville'
	return boxCheck
}

function acceptValidation() {
	const acceptCheckErrorMsg = document.querySelector('#acceptError')
	const acceptCheck = document.querySelector('#checkbox1:checked')

	acceptCheckErrorMsg.innerHTML = acceptCheck
		? ''
		: "Merci de lire et accepter les conditions d'utilisation"
	return acceptCheck
}

// fonction pour appeler toutes les fonctions de contrôle créées
function checkAll() {
	firstValidation()
	lastValidation()
	emailValidation()
	birthValidation()
	quantityValidation()
	boxCheckValidation()
	acceptValidation()
}

// fonction qui vérifie que tous les champs du formulaire sont OK
function areAllValidated() {
	if (
		firstValidation() === true &&
		lastValidation() === true &&
		emailValidation() === true &&
		birthValidation() === true &&
		quantityValidation() === true &&
		boxCheckValidation() === true &&
		acceptValidation() === true
	) {
		return true
	}
	return false
}

