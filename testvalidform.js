// déclaration des différentes zones d'input et de messages d'erreur //

const firstCheck = document.getElementById('first')
const lastCheck = document.getElementById('last')
const emailCheck = document.getElementById('email')
const birthCheck = document.getElementById('birthdate')
const quantityCheck = document.getElementById('quantity')
const boxCheck = document.getElementById('checkbox1')

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

  // mise en place d'une vérification d'âge minimum de participation

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

	function formValidation() {
		// si une erreur est trouvée, un message est retourné et la valeur false également //

		// test du champ prénom //
		if (
			regexFirstName.test(firstCheckValue) == false ||
			firstCheckValue === null
		) {
			zoneFirstNameErrorMsg.innerHTML = 'Merci de renseigner un prénom valide'
			return false
			// test du champ nom //
		} else if (
			regexLastName.test(lastCheckValue) == false ||
			lastCheckValue === null
		) {
			zoneLastNameErrorMsg.innerHTML =
				'Merci de renseigner un nom de famille valide'
			return false
			// test du champ email //
		} else if (
			regexEmail.test(emailCheckValue) == false ||
			emailCheckValue === null
		) {
			zoneAddressErrorMsg.innerHTML =
				'Merci de renseigner une adresse email valide'
			return false
			// test du champ date de naissance (si champ vide) //
		} else if (birthCheckValue === null) {
			console.log('Merci de renseigner votre date de naissance !')
			return false
			// test du champ date de naissance (si âge requis OK) //
		} else if (ageInYears >= minimumAge) {
			console.log("youpi ! vous avez l'âge requis !!!")
			return false
			// test du champ date de naissance (si trop jeune pour participer) //
		} else if (ageInYears < minimumAge) {
			console.log('Trop jeune ! rentre chez ta maman !')
			return false

      
		} else if (regexEmail.test(checkEmail) == false || checkEmail === null) {
			zoneEmailErrorMsg.innerHTML =
				'Merci de renseigner une adresse email valide'
			return false
		}
		// si tous les champs du formulaire sont correctement remplis //
		else {
			// on crée un objet contact pour l'envoi par l'API //

			console.log('TOUT EST OK !! YOUPIIIIII !!')
		}
	}
	formValidation()
})
