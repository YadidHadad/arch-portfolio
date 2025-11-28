'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
	const [isVisible, setIsVisible] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		// Check if user has already consented
		const consent = localStorage.getItem('cookie-consent')
		if (!consent) {
			// Defer setState to avoid cascading renders
			setTimeout(() => {
				setMounted(true)
				setIsVisible(true)
			}, 0)
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookie-consent', 'accepted')
		setIsVisible(false)
	}

	const handleReject = () => {
		localStorage.setItem('cookie-consent', 'rejected')
		setIsVisible(false)
	}

	if (!mounted || !isVisible) {
		return null
	}

	return (
		<div
			className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 text-white p-4 md:p-6 shadow-lg"
			role="region"
			aria-label="Cookie consent notice"
		>
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
					{/* Message */}
					<div className="md:col-span-2">
						<h2 className="text-lg font-semibold mb-2">Privacy & Cookies</h2>
						<p className="text-sm text-gray-300">
							We use cookies to enhance your experience, including authentication and session management. We also use localStorage to
							save your accessibility preferences. By continuing to browse, you consent to our use of cookies.
						</p>
						<p className="text-xs text-gray-400 mt-2">
							<a href="/privacy" className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded px-1">
								Privacy Policy
							</a>
						</p>
					</div>

					{/* Buttons */}
					<div className="flex gap-3 flex-col sm:flex-row md:col-span-1 md:justify-end">
						<button
							onClick={handleReject}
							className="px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
							aria-label="Reject cookies"
						>
							Reject
						</button>
						<button
							onClick={handleAccept}
							className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
							aria-label="Accept cookies"
						>
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
