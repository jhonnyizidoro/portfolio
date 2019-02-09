const addLoading = buttonSelector => {
	const button = document.querySelector(buttonSelector)
	button.innerHTML = 'Enviando'
	button.style.backgroundImage = "url('images/loading.svg')"
	button.style.paddingRight = '3rem'
}

const removeLoading = buttonSelector => {
	const button = document.querySelector(buttonSelector)
	button.innerHTML = 'Enviar'
	button.style.backgroundImage = ''
	button.style.paddingRight = ''
}

export {
	addLoading,
	removeLoading
}