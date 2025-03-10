const MODES = {
	DISABLED: 0,
	ENABLED: 1, // Only one mode for enabling/disabling
}

const RULE_IDS = {
	REAL_IP: 100,
	CACHE_CONTROL: 101,
}

const HEADERS = {
	REAL_IP: {
		header: 'X-Real-IP',
		value: '211.161.244.70',
	},
	CACHE_CONTROL: {
		header: 'Cache-Control',
		value: 'no-cache',
	},
}

// Rule templates for network requests
const getRules = () => [
	{
		id: RULE_IDS.REAL_IP,
		priority: 1,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: HEADERS.REAL_IP.header,
					operation: 'set',
					value: HEADERS.REAL_IP.value,
				},
			],
		},
		condition: {
			urlFilter: '*://music.163.com/*',
			resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'other'],
		},
	},
	{
		id: RULE_IDS.CACHE_CONTROL,
		priority: 1,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: HEADERS.CACHE_CONTROL.header,
					operation: 'set',
					value: HEADERS.CACHE_CONTROL.value,
				},
			],
		},
		condition: {
			urlFilter: '*://*.music.126.net/*',
			resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'other'],
		},
	},
]

// Update rules based on mode
async function updateRules(mode) {
	try {
		// Get all current rules
		const rules = await chrome.declarativeNetRequest.getDynamicRules()
		console.log('Current rules:', rules)
		const ruleIds = rules.map((rule) => rule.id)

		// Remove existing rules
		await chrome.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: ruleIds,
		})
		console.log('Rules removed')

		// Add new rules if enabled
		if (mode === MODES.ENABLED) {
			await chrome.declarativeNetRequest.updateDynamicRules({
				addRules: getRules(),
			})
			console.log('New rules added:', getRules())
		}

		// Verify rules update
		const updatedRules = await chrome.declarativeNetRequest.getDynamicRules()
		console.log('Updated rules:', updatedRules)
	} catch (error) {
		console.error('Failed to update rules:', error)
	}
}

// Update UI based on mode
async function updateUI(mode) {
	const icons = {
		[MODES.DISABLED]: {
			16: 'images/grey16.png',
			48: 'images/grey48.png',
			128: 'images/grey128.png',
		},
		[MODES.ENABLED]: {
			16: 'images/red16.png',
			48: 'images/red48.png',
			128: 'images/red128.png',
		},
	}

	const titles = {
		[MODES.DISABLED]: 'disabled',
		[MODES.ENABLED]: 'enabled',
	}

	await chrome.action.setIcon({ path: icons[mode] })
	const title = `${chrome.i18n.getMessage('name')} [${chrome.i18n.getMessage(titles[mode])}]`
	await chrome.action.setTitle({ title })
}

// Sync extension state
async function syncState(mode) {
	await Promise.all([chrome.storage.local.set({ mode }), updateUI(mode), updateRules(mode)])
}

// Listen for icon click
chrome.action.onClicked.addListener(async () => {
	const { mode = MODES.ENABLED } = await chrome.storage.local.get('mode')
	const newMode = mode === MODES.ENABLED ? MODES.DISABLED : MODES.ENABLED
	await syncState(newMode)
})

// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
	const { mode } = await chrome.storage.local.get('mode')
	const initialMode = mode ?? MODES.ENABLED
	await syncState(initialMode)
})
