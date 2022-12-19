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

	function formValidation() {
		// si une erreur est trouvée, un message est retourné et la valeur false également //

		// test du champ prénom //
		if (
			regexFirstName.test(firstCheckValue) == false ||
			firstCheckValue === null
		) {
			firstCheck
				.closest('.formData')
				.setAttribute('data-error', 'Merci de renseigner un prénom valide')
			return false
			// test du champ nom //
		} else if (
			regexLastName.test(lastCheckValue) == false ||
			lastCheckValue === null
		) {
			lastCheck
				.closest('.formData')
				.setAttribute(
					'data-error',
					'Merci de renseigner un nom de famille valide'
				)
			return false
			// test du champ email //
		} else if (
			regexEmail.test(emailCheckValue) == false ||
			emailCheckValue === null
		) {
			emailCheck
				.closest('.formData')
				.setAttribute(
					'data-error',
					'Merci de renseigner une adresse email valide'
				)
			return false
			// test du champ date de naissance (si champ vide) //
		} else if (birthCheckValue === null) {
			birthCheck
				.closest('.formData')
				.setAttribute(
					'data-error',
					'Merci de renseigner votre date de naissance'
				)
			return false
			// test du champ date de naissance (si trop jeune pour participer) //
		} else if (ageInYears < minimumAge) {
			birthCheck
				.closest('.formData')
				.setAttribute(
					'data-error',
					"Désolé, l'âge minimum requis est de 15 ans"
				)
			return false
			// test du champ quantité doit être un NOMBRE compris entre 0 et 99 //
		} else if (
			quantityCheckValue < 0 ||
			quantityCheckValue > 99 ||
			isNaN(quantityCheckValue) == true ||
			quantityCheckValue === null
		) {
			quantityCheck
				.closest('.formData')
				.setAttribute(
					'data-error',
					'Merci de renseigner un nombre compris entre 0 et 99'
				)
			return false
		}
		// si tous les champs du formulaire sont correctement remplis //
		else {
			// on valide le formulaire et on affiche la page de remerciement //

			console.log('TOUT EST OK !! YOUPIIIIII !!')
		}
	}
	formValidation()
})
