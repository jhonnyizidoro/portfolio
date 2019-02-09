import { showModal } from './modal'
import { Email } from './classes/Email'

const sendMail = (from, email, cellphone, message) => {
	const body = formatMessage(from, email, cellphone, message)
	let token

	if (window.location.hostname === 'localhost') {
		token = 'f3dd94b8-7101-44ce-931b-79a119c27f24'
	} else {
		token = '93182f59-e470-404e-bd91-4c7eb7ee3680'
	}

	Email.send({
		SecureToken: token,
		To: 'jhonnymenarim@gmail.com',
		From: 'jhonnyizidoro@yahoo.com',
		Subject: 'Novo contato profissional!',
		Body: body
	}).then(message => {
		if (message === 'OK') {
			showModal('O formulário foi enviado com sucesso!<br>Assim que possível entrarei em contato com você.', 'success')
		} else {
			showModal('Ocorreu um erro desconhecido ao enviar o formulário ):<br>Entre em contato comigo por gentileza<br>Email: <b>jhonny-cwb@hotmail.com</b><br>Celular: <b>+55 (41) 99179-1053</b>', 'error')
		}
	})
}

const formatMessage = (from, email, cellphone, message) => {
	return `
		Nova mensagem de <b>${from}</b><br><br>
		<div style="border: 2px solid black; padding: 1rem">${message}</div><br><br>
		Retorne o contato pelo e-mail: <a href="mailto:${email}">${email}</a><br>
		Ou pelo celular <b>${cellphone}</b>.
	`
}

export {
	sendMail
}