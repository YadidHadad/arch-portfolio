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
		<nav className="flex justify-center gap-6 p-6  text-black">
			Yadid Hadad Architecture Portfolio
			<div className="text-blue-500">|</div>
			<Link
				href="/projects"
				className={`hover:underline transition-all ${
					pathname === '/projects' || pathname.startsWith('/projects/') ? 'font-bold text-black' : 'text-gray-600'
				}`}
			>
				Projects
			</Link>
			<Link
				href="/analytics"
				className={`hover:underline transition-all ${pathname === '/analytics' ? 'font-bold text-black' : 'text-gray-600'}`}
			>
				Analytics
			</Link>
			<Link href="/about" className={`hover:underline transition-all ${pathname === '/about' ? 'font-bold text-black' : 'text-gray-600'}`}>
				About
			</Link>
			{/* Only show Admin link if authenticated */}
			{isAuthenticated && (
				<Link href="/admin" className={`hover:underline transition-all ${pathname === '/admin' ? 'font-bold text-black' : 'text-gray-600'}`}>
					Admin
				</Link>
			)}
			{/* Logout button if authenticated */}
			{isAuthenticated && (
				<button onClick={handleLogout} className="text-gray-600 hover:text-black hover:underline transition-all">
					Logout
				</button>
			)}
		</nav>
	)
}
