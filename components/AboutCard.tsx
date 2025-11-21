'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { PROFILE_IMAGE } from '@/lib/constants'

export default function AboutCard() {
	return (
		<Link href="/about">
			<div className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[500px] cursor-pointer">
				{/* Background Image - Portrait photo */}
				<div className="absolute inset-0 bg-gray-100">
					<img
						src={PROFILE_IMAGE}
						alt="About Me"
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						onError={(e) => {
							e.currentTarget.style.display = 'none'
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
				</div>

				{/* Content */}
				<div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
					{/* Badge */}
					<div className="mb-3">
						<span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide">
							Profile
						</span>
					</div>

					{/* Title */}
					<h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
						About Me
					</h3>

					{/* Description */}
					<p className="text-sm text-gray-200 mb-3">
						Learn more about my architectural journey, philosophy,
						and the passion behind my designs.
					</p>

					{/* Arrow Icon */}
					<div className="flex items-center gap-2 text-sm text-gray-300">
						<span>View Profile</span>
						<svg
							className="w-4 h-4 group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Link>
	)
}
