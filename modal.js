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

const quantityCheck = document.getElementById('quantity')
const boxCheck = document.getElementById('checkbox1')

const zoneQuantityErrorMsg = document.querySelector('#quantityError')
const zoneBoxCheckErrorMsg = document.querySelector('#boxCheckError')

// Récupération du conteneur parent du champ
const form = document.querySelector('form[name="reserve"]')
const field = form.querySelectorAll('.text-control')
// const container = field.closest('.formData')

// écoute du clic sur le bouton COMMANDER //

const formSubmitButton = document.getElementById('formSubmitBtn')
formSubmitButton.addEventListener('click', function (e) {
	e.preventDefault() // on empeche le formulaire de fonctionner par defaut si aucun contenu
	console.log('check prénom :', firstValidation())
	console.log('check nom :', lastValidation())
	console.log('check email :', emailValidation())
	console.log('check naissance :', birthValidation())
	console.log('check quantité :', quantityValidation())
	// console.log("check prénom :", firstValidation());

	// test du champ prénom //
	function firstValidation() {
		const firstCheck = document.getElementById('first')
		const zoneFirstErrorMsg = document.querySelector('#firstError')
		let firstCheckValue = document.getElementById('first').value.trim()
		const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
		if (firstCheckValue.length < 2 || !regexFirstName.test(firstCheckValue)) {
			zoneFirstErrorMsg.innerHTML = 'Merci de renseigner un prénom valide'
			firstCheck.style.border = '2px solid #e54858'
			return false
		} else {
			zoneFirstErrorMsg.innerHTML = ''
			firstCheck.style.border = ''
			return true
		}
	}

	// test du champ nom //
	function lastValidation() {
		const lastCheck = document.getElementById('last')
		const zoneLastErrorMsg = document.querySelector('#lastError')
		let lastCheckValue = document.getElementById('last').value.trim()
		const regexLastName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
		if (lastCheckValue.length < 2 || !regexLastName.test(lastCheckValue)) {
			zoneLastErrorMsg.innerHTML = 'Merci de renseigner un nom valide'
			lastCheck.style.border = '2px solid #e54858'
			return false
		} else {
			zoneLastErrorMsg.innerHTML = ''
			lastCheck.style.border = ''
			return true
		}
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
		if (birthCheckValue === "") {
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
		if (
			quantityCheckValue < 0 ||
			quantityCheckValue > 99 ||
			isNaN(quantityCheckValue) == true ||
			quantityCheckValue === null
		) {
			console.log('Merci de renseigner un nombre compris entre 0 et 99')
			return false
		}
		console.log('ça roule ! quantité valide !')
		return true
	}

	firstValidation()
	lastValidation()
	emailValidation()
	birthValidation()
	quantityValidation()
})
// console.log('TOUT EST OK !! YOUPIIIIII !!')
