'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
	const pathname = usePathname()
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		// Check authentication status
		fetch('/api/auth/check')
			.then((res) => res.json())
			.then((data) => setIsAuthenticated(data.authenticated))
			.catch(() => setIsAuthenticated(false))
	}, [pathname])

	console.log('Navigation - isAuthenticated:', isAuthenticated)

	const handleLogout = async () => {
		await fetch('/api/auth/logout', { method: 'POST' })
		setIsAuthenticated(false)
		router.push('/')
		router.refresh()
	}

	if (pathname === '/') {
		return null
	}

	return (
		<nav className="flex justify-center gap-6 p-6 text-black" role="navigation" aria-label="Main navigation">
			<span className="font-semibold text-gray-800" aria-label="Yadid Hadad Architecture Portfolio">
				Yadid Hadad Architecture Portfolio
			</span>
			<div className="text-blue-500" aria-hidden="true">
				|
			</div>
			<Link
				href="/projects"
				className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-all ${
					pathname === '/projects' || pathname.startsWith('/projects/') ? 'font-bold text-black' : 'text-gray-600'
				}`}
				aria-current={pathname === '/projects' || pathname.startsWith('/projects/') ? 'page' : undefined}
			>
				Projects
			</Link>
			<Link
				href="/analytics"
				className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-all ${
					pathname === '/analytics' ? 'font-bold text-black' : 'text-gray-600'
				}`}
				aria-current={pathname === '/analytics' ? 'page' : undefined}
			>
				Analytics
			</Link>
			<Link
				href="/about"
				className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-all ${
					pathname === '/about' ? 'font-bold text-black' : 'text-gray-600'
				}`}
				aria-current={pathname === '/about' ? 'page' : undefined}
			>
				About
			</Link>
			{/* Only show Admin link if authenticated */}
			{isAuthenticated && (
				<Link
					href="/admin"
					className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-all ${
						pathname === '/admin' ? 'font-bold text-black' : 'text-gray-600'
					}`}
					aria-current={pathname === '/admin' ? 'page' : undefined}
				>
					Admin
				</Link>
			)}
			{/* Logout button if authenticated */}
			{isAuthenticated && (
				<button
					onClick={handleLogout}
					className="text-gray-600 hover:text-black hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-all"
					aria-label="Logout from your admin account"
				>
					Logout
				</button>
			)}
		</nav>
	)
}
