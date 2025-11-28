'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

interface ProjectCardProps {
	id: string
	title: string
	architect: string
	developer: string
	description: string
	category: string
	year: number
	location?: string
	images: string[]
}

export default function ProjectCard({ id, title, architect, developer, description, category, year, location, images }: ProjectCardProps) {
	// Get first image or use generic architectural placeholder
	const backgroundImage =
		images && images.length > 0 && images[0] ? images[0] : 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200'

	return (
		<Link href={`/projects/${id}`}>
			<div className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[500px] cursor-pointer">
				{/* Background Image */}
				<div className="absolute inset-0 bg-gray-100">
					<img
						src={backgroundImage}
						alt={title}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						onError={(e) => {
							// If image fails to load, hide it and show pale grey background
							e.currentTarget.style.display = 'none'
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
				</div>

				{/* Content */}
				<div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
					{/* Category Badge */}
					<div className="mb-3">
						<span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide">
							{category}
						</span>
					</div>

					{/* Title */}
					<h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>

					{/* Description */}
					<p className="text-sm text-gray-200 mb-3 line-clamp-2">
						{architect} | {developer}
					</p>

					{/* Meta Info */}
					<div className="flex items-center gap-4 text-sm text-gray-300">
						<span className="flex items-center gap-1">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							{year}
						</span>
						{location && (
							<span className="flex items-center gap-1">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								{location}
							</span>
						)}
					</div>
				</div>
			</div>
		</Link>
	)
}
