;(() => {
	const MUSIC_URL_PATTERN = /(m\d+?)(?!c)\.music\.126\.net/
	const MUSIC_URL_REPLACEMENT = '$1c.music.126.net'
	const API_PATTERNS = ['enhance/player/url', 'song/enhance/player/url', '/api/song/enhance/player/url']

	// Check if URL matches any API pattern
	const isTargetUrl = (url) => API_PATTERNS.some((pattern) => url.includes(pattern))

	// Modify song URLs in response
	function modifyResponse(xhr, url) {
		if (xhr.readyState === 4 && xhr.status === 200 && isTargetUrl(url)) {
			try {
				const response = JSON.parse(xhr.responseText)

				if (response.data) {
					response.data.forEach((song) => {
						if (song.url) {
							const originalUrl = song.url
							song.url = song.url.replace(MUSIC_URL_PATTERN, MUSIC_URL_REPLACEMENT)
							console.log('URL modified:', originalUrl, '->', song.url)
						}
					})

					Object.defineProperty(xhr, 'responseText', {
						value: JSON.stringify(response),
						writable: false,
					})
					console.log('Modified response:', response)
				}
			} catch (error) {
				console.error('Failed to process response:', error)
			}
		}
	}

	// Override XMLHttpRequest.open
	const originalOpen = XMLHttpRequest.prototype.open
	XMLHttpRequest.prototype.open = function (method, url, ...args) {
		console.log('XHR intercepted:', method, url)
		const xhr = this
		const originalOnReadyStateChange = xhr.onreadystatechange

		xhr.onreadystatechange = function () {
			modifyResponse(xhr, url)
			if (originalOnReadyStateChange) {
				originalOnReadyStateChange.apply(xhr)
			}
		}

		return originalOpen.call(xhr, method, url, ...args)
	}
})()
