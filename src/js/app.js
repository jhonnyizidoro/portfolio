import { scrollOnClick } from './scroll'
import { showModal, hideModal } from './modal'

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

	//Close modal button
	const closeModalButton = document.querySelector('.modal__close')
	closeModalButton.addEventListener('click', () => {
		hideModal()
	})

	//Contact form
	const contactForm = document.querySelector('.contact__form')
	contactForm.addEventListener('submit', event => {
		event.preventDefault()
		const data = new FormData(contactForm)
		fetch('https://formcarry.com/s/k0vNoDe2TYA', {
			method: 'POST',
			body: data,
		}).then(response => {
			console.log(response)
			if (response.status === 200) {
				showModal('O formulário foi enviado com sucesso!<br>Assim que possível entrarei em contato com você.', 'success')
				contactForm.reset()
			} else {
				showModal('Ocorreu um erro com o serviço de envio de e-mail ):<br>Entre em contato comigo por gentileza<br>Email: <b>jhonny-cwb@hotmail.com</b><br>Celular: <b>+55 (41) 99179-1053</b>', 'error')
			}
		}).catch(error => {
			showModal('Ocorreu um erro desconhecido ao enviar o formulário ):<br>Entre em contato comigo por gentileza<br>Email: <b>jhonny-cwb@hotmail.com</b><br>Celular: <b>+55 (41) 99179-1053</b>', 'error')
		})
	})

})