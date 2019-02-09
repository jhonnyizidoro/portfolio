import { scrollOnClick } from './scroll'
import { sendMail } from './email'
import { hideModal } from './modal'
import { addLoading, removeLoading } from './button'
import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {

	//Better UX for background images avoiding drag
	const images = document.querySelectorAll('img')
	images.forEach(image => {
		image.addEventListener('dragstart', event => event.preventDefault())
	})

	//Click & Scroll events
	scrollOnClick('#knowledges', '.knowledges')
	scrollOnClick('#projects', '.projects', 1500)
	scrollOnClick('#contact', '.contact', 2000)

	//Mask in cellphone input
	const cellphoneInput = document.querySelector('#cellphone')
	new IMask(cellphoneInput, { mask: '(00) 0 0000-0000' })

	//Contact form
	const contactForm = document.querySelector('.contact__form')
	contactForm.addEventListener('submit', event => {
		event.preventDefault()
		addLoading('#submit-contact')
		const formData = new FormData(contactForm)
		sendMail(formData.get('name'), formData.get('email'), formData.get('cellphone'), formData.get('message'))
	})

	//Close modal button
	const closeModalButton = document.querySelector('.modal__close')
	closeModalButton.addEventListener('click', () => {
		hideModal()
		removeLoading('#submit-contact')
		contactForm.reset()
	})

})