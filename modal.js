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
		if (!regexEmail.test(emailCheckValue)) {
			zoneEmailErrorMsg.innerHTML =
				'Merci de renseigner une adresse email valide'
			emailCheck.style.border = '2px solid #e54858'
			return false
		} else {
			zoneEmailErrorMsg.innerHTML = ''
			emailCheck.style.border = ''
			return true
		}
	}

	// test du champ date de naissance si champ vide et si âge requis OK //
	function birthValidation() {
		const birthCheck = document.getElementById('birthdate')
		const zoneBirthErrorMsg = document.querySelector('#birthError')
		let birthCheckValue = document.getElementById('birthdate').value

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
		// test si champ vide //
		if (birthCheckValue === '') {
			zoneBirthErrorMsg.innerHTML = 'Merci de renseigner une date de naissance'
			birthCheck.style.border = '2px solid #e54858'
			return false
		}
		// test si trop jeune pour participer //
		if (ageInYears < minimumAge) {
			zoneBirthErrorMsg.innerHTML = "Désolé, l'âge minimum requis est de 15 ans"
			birthCheck.style.border = '2px solid #e54858'
			return false
		} else {
			zoneBirthErrorMsg.innerHTML = ''
			birthCheck.style.border = ''
			return true
		}
	}

	// test du champ quantité doit être un NOMBRE compris entre 0 et 99 //
	function quantityValidation() {
		let quantityCheckValue = document.getElementById('quantity').value.trim()
		const quantityCheck = document.getElementById('quantity')
		const zoneQuantityErrorMsg = document.querySelector('#quantityError')

		if (
			quantityCheckValue < 0 ||
			quantityCheckValue > 99 ||
			isNaN(quantityCheckValue) == true ||
			quantityCheckValue === ''
		) {
			zoneQuantityErrorMsg.innerHTML =
				'Merci de renseigner un nombre compris entre 0 et 99'
			quantityCheck.style.border = '2px solid #e54858'
			return false
		} else {
			zoneQuantityErrorMsg.innerHTML = ''
			quantityCheck.style.border = ''
			return true
		}
	}

	// test si une case du choix de la ville est bien cochée //
	function boxCheckValidation() {
		const zoneBoxCheckErrorMsg = document.querySelector('#boxCheckError')
		const boxCheck = document.querySelector('input[name="location"]:checked')

		if (!boxCheck) {
			zoneBoxCheckErrorMsg.innerHTML = 'Merci de choisir une ville'
			return false
		} else {
			zoneBoxCheckErrorMsg.innerHTML = ''
			return true
		}
	}

	function acceptValidation() {
		const acceptCheckErrorMsg = document.querySelector('#acceptError')
		const acceptCheck = document.querySelector('#checkbox1:checked')

		if (!acceptCheck) {
			acceptCheckErrorMsg.innerHTML =
				"Merci de lire et accepter les conditions d'utilisation"
			return false
		} else {
			acceptCheckErrorMsg.innerHTML = ''
			return true
		}
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
})
