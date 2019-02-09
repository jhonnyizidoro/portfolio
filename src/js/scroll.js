import jump from 'jump.js'

const scrollOnClick = (triggerSelector, targetSelector, duration = 1000, offset = 0) => {
	const trigger = document.querySelector(triggerSelector)
	trigger.addEventListener('click', () => {
		if (document.querySelector(targetSelector)) {
			jump(targetSelector, {
				offset,
				duration
			})
		}
	})
}

export { scrollOnClick }