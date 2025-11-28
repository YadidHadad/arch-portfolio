'use client'

import { useState, useEffect } from 'react'

export default function AccessibilityMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const [fontSize, setFontSize] = useState(100)
	const [highContrast, setHighContrast] = useState(false)
	const [reducedMotion, setReducedMotion] = useState(false)
	const [dyslexicFont, setDyslexicFont] = useState(false)

	// Load settings from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem('a11y-settings')
		if (saved) {
			const settings = JSON.parse(saved)
			// Apply settings immediately without setState to avoid cascading renders
			document.documentElement.style.fontSize = `${settings.fontSize || 100}%`
			if (settings.highContrast) document.documentElement.classList.add('high-contrast')
			if (settings.reducedMotion) document.documentElement.classList.add('reduce-motion')
			if (settings.dyslexicFont) document.documentElement.classList.add('dyslexic-font')

			// Update state after DOM manipulation
			setTimeout(() => {
				setFontSize(settings.fontSize || 100)
				setHighContrast(settings.highContrast || false)
				setReducedMotion(settings.reducedMotion || false)
				setDyslexicFont(settings.dyslexicFont || false)
			}, 0)
		}
	}, [])

	// Apply settings to document
	useEffect(() => {
		const settings = { fontSize, highContrast, reducedMotion, dyslexicFont }
		localStorage.setItem('a11y-settings', JSON.stringify(settings))

		// Apply font size
		document.documentElement.style.fontSize = `${fontSize}%`

		// Apply high contrast
		if (highContrast) {
			document.documentElement.classList.add('high-contrast')
		} else {
			document.documentElement.classList.remove('high-contrast')
		}

		// Apply reduced motion
		if (reducedMotion) {
			document.documentElement.classList.add('reduce-motion')
		} else {
			document.documentElement.classList.remove('reduce-motion')
		}

		// Apply dyslexic font
		if (dyslexicFont) {
			document.documentElement.classList.add('dyslexic-font')
		} else {
			document.documentElement.classList.remove('dyslexic-font')
		}
	}, [fontSize, highContrast, reducedMotion, dyslexicFont])

	const resetSettings = () => {
		setFontSize(100)
		setHighContrast(false)
		setReducedMotion(false)
		setDyslexicFont(false)
		localStorage.removeItem('a11y-settings')
		document.documentElement.style.fontSize = '100%'
		document.documentElement.classList.remove('high-contrast', 'reduce-motion', 'dyslexic-font')
	}

	return (
		<div>
			{/* Accessibility Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
				aria-label="Accessibility menu"
				aria-expanded={isOpen}
				aria-controls="accessibility-panel"
			>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
					/>
				</svg>
			</button>

			{/* Accessibility Menu Panel */}
			{isOpen && (
				<div
					id="accessibility-panel"
					className="fixed bottom-20 right-6 z-40 w-80 bg-white rounded-lg shadow-2xl border border-gray-300 p-6"
					role="region"
					aria-label="Accessibility settings"
				>
					<div className="space-y-6">
						{/* Header */}
						<div>
							<h2 className="text-lg font-bold text-gray-900 mb-1">Accessibility Options</h2>
							<p className="text-sm text-gray-600">Customize your browsing experience</p>
						</div>

						{/* Font Size Slider */}
						<div>
							<label htmlFor="font-size" className="block text-sm font-semibold text-gray-700 mb-2">
								Font Size: {fontSize}%
							</label>
							<input
								id="font-size"
								type="range"
								min="75"
								max="200"
								value={fontSize}
								onChange={(e) => setFontSize(Number(e.target.value))}
								className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-label="Adjust font size"
							/>
							<div className="flex justify-between text-xs text-gray-500 mt-1">
								<span>Smaller</span>
								<span>Larger</span>
							</div>
						</div>

						{/* High Contrast Toggle */}
						<div className="flex items-center justify-between">
							<label htmlFor="high-contrast" className="text-sm font-semibold text-gray-700">
								High Contrast
							</label>
							<button
								id="high-contrast"
								onClick={() => setHighContrast(!highContrast)}
								className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									highContrast ? 'bg-blue-600' : 'bg-gray-300'
								}`}
								role="switch"
								aria-checked={highContrast}
								aria-label="Toggle high contrast mode"
							>
								<div
									className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
										highContrast ? 'translate-x-6' : ''
									}`}
								/>
							</button>
						</div>

						{/* Reduced Motion Toggle */}
						<div className="flex items-center justify-between">
							<label htmlFor="reduced-motion" className="text-sm font-semibold text-gray-700">
								Reduce Motion
							</label>
							<button
								id="reduced-motion"
								onClick={() => setReducedMotion(!reducedMotion)}
								className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									reducedMotion ? 'bg-blue-600' : 'bg-gray-300'
								}`}
								role="switch"
								aria-checked={reducedMotion}
								aria-label="Toggle reduced motion"
							>
								<div
									className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
										reducedMotion ? 'translate-x-6' : ''
									}`}
								/>
							</button>
						</div>

						{/* Dyslexic Font Toggle */}
						<div className="flex items-center justify-between">
							<label htmlFor="dyslexic-font" className="text-sm font-semibold text-gray-700">
								Dyslexic-Friendly Font
							</label>
							<button
								id="dyslexic-font"
								onClick={() => setDyslexicFont(!dyslexicFont)}
								className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									dyslexicFont ? 'bg-blue-600' : 'bg-gray-300'
								}`}
								role="switch"
								aria-checked={dyslexicFont}
								aria-label="Toggle dyslexic-friendly font"
							>
								<div
									className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
										dyslexicFont ? 'translate-x-6' : ''
									}`}
								/>
							</button>
						</div>

						{/* Reset Button */}
						<button
							onClick={resetSettings}
							className="w-full mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Reset all accessibility settings to default"
						>
							Reset to Default
						</button>
					</div>

					{/* Close Button */}
					<button
						onClick={() => setIsOpen(false)}
						className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
						aria-label="Close accessibility menu"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			)}
		</div>
	)
}
