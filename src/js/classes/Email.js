const Email = {
	send: a => {
		return new Promise((n, e) => {
			a.nocache = Math.floor(1e6 * Math.random() + 1)
			a.Action = 'Send'
			const t = JSON.stringify(a)
			Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, e => {
				n(e)
			})
		})
	},
	ajaxPost: (e, n, t) => {
		const a = Email.createCORSRequest('POST', e)
		a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		a.onload = () => {
			const e = a.responseText
			null != t && t(e)
		}
		a.send(n)
	},
	ajax: (e, n) => {
		const t = Email.createCORSRequest('GET', e)
		t.onload = () => {
			const e = t.responseText
			null != n && n(e)
		}
		t.send()
	},
	createCORSRequest: (e, n) => {
		const t = new XMLHttpRequest
		return 'withCredentials' in t ? t.open(e, n, !0) : 'undefined' != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
	}
}

export {
	Email
}