// https://stackoverflow.com/questions/18310484/modify-http-responses-from-a-chrome-extension/51594799#51594799

;(() => {
	const _open = XMLHttpRequest.prototype.open
	window.XMLHttpRequest.prototype.open = function (_, url) {
		const _onreadystatechange = this.onreadystatechange,
			_this = this
		_this.onreadystatechange = () => {
			if (_this.readyState === 4 && _this.status === 200 && url.includes('enhance/player/url')) {
				try {
					const data = JSON.parse(_this.responseText)
					data.data.forEach((song) => (song.url = song.url.replace(/(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net')))
					Object.defineProperty(_this, 'responseText', { value: JSON.stringify(data) })
				} catch (_) {}
			}
			if (_onreadystatechange) _onreadystatechange.call(_this)
		}
		return _open.apply(_this, arguments)
	}
})()
