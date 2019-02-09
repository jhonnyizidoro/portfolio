const showModal = (message, type) => {
	const modal = document.querySelector('.modal')
	const modalMessage = document.querySelector('.modal__message')
	const modalAvatar = document.querySelector('.modal__avatar')

	modalAvatar.src = ''
	if (type === 'success') {
		modalAvatar.src = modalAvatar.dataset.success
	} else if (type === 'error') {
		modalAvatar.src = modalAvatar.dataset.error
	}

	modalMessage.innerHTML = message
	modal.classList.add('modal--visible')
}

const hideModal = () => {
	const modal = document.querySelector('.modal')
	modal.classList.remove('modal--visible')
}

export {
	showModal,
	hideModal
}