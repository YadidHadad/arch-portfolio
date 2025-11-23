import DashboardClient from '@/components/DashboardClient'
import Link from 'next/link'

async function getProjects() {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

		const res = await fetch(`${baseUrl}/api/projects`, {
			cache: 'no-store',
		})

		if (!res.ok) {
			throw new Error('Failed to fetch projects')
		}

		return res.json()
	} catch (error) {
		console.error('Error fetching projects:', error)
		return { success: false, data: [] }
	}
}

async function getMostViewed() {
	console.log('📞 Calling getMostViewed function...')

	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

		const res = await fetch(`${baseUrl}/api/projects`, {
			cache: 'no-store',
		})

		console.log('📞 Fetch response received:', res)

		if (!res.ok) {
			throw new Error('Failed to fetch most viewed')
		}

		return res.json()
	} catch (error) {
		console.error('Error fetching most viewed:', error)
		return { success: false, data: [] }
	}
}

export default async function Dashboard() {
	const { data: projects } = await getProjects()
	const { data: mostViewed } = await getMostViewed()

	console.log('Projects fetched:', projects.length)
	console.log('Most viewed fetched:', mostViewed)

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-16 ">
				{/* Stats Overview */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					{/* Total Projects - Blue accent */}
					<div className=" p-6  border-l-4 border-blue-500">
						<div className="text-gray-500 text-sm uppercase tracking-wide mb-2">Total Projects</div>
						<div className="text-4xl font-bold text-gray-900">{projects?.length || 0}</div>
					</div>

					{/* Total Area */}
					<div className=" p-6  border-l-4 border-blue-500">
						<div className="text-gray-500 text-sm uppercase tracking-wide mb-2">Total Area</div>
						<div className="text-4xl font-bold text-gray-900">
							{projects?.reduce((sum: number, p: any) => sum + (p.squareMeters || 0), 0).toLocaleString()}
							<span className="text-lg text-gray-500 ml-1">m²</span>
						</div>
					</div>

					{/* Total Units - Blue accent */}
					<div className=" p-6  border-l-4 border-blue-500">
						<div className="text-gray-500 text-sm uppercase tracking-wide mb-2">Total Units</div>
						<div className="text-4xl font-bold text-gray-900">
							{projects?.reduce((sum: number, p: any) => sum + (p.units || 0), 0).toLocaleString()}
						</div>
					</div>

					{/* Average Project Size */}
					<div className=" p-6  border-l-4 border-blue-500">
						<div className="text-gray-500 text-sm uppercase tracking-wide mb-2">Avg Project Size</div>
						<div className="text-4xl font-bold text-gray-900">
							{projects && projects.length > 0
								? Math.round(
										projects.reduce((sum: number, p: any) => sum + (p.squareMeters || 0), 0) / projects.length
								  ).toLocaleString()
								: 0}
							<span className="text-lg text-gray-500 ml-1">m²</span>
						</div>
					</div>
				</div>

				{/* Most Viewed Projects - One Line Compact */}
				<div className=" p-6  border border-gray-100 mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-800">Most Viewed Projects</h2>
					<div className="flex items-center gap-4 overflow-x-auto pb-2 justify-evenly">
						{mostViewed && mostViewed.length > 0 ? (
							mostViewed.map((project: any, index: number) => (
								<Link key={project._id} href={`/projects/${project._id}`} className="flex-shrink-0 p-3  group">
									<div className="flex items-center gap-2 mb-1">
										<span className="text-sm font-bold text-gray-400">{index + 1}</span>
										<h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
											{project.title}
										</h3>
									</div>
									<div className="flex items-center gap-1.5 justify-center">
										<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
										<span className="font-bold text-blue-600 text-sm">{project.views || 0}</span>
									</div>
								</Link>
							))
						) : (
							<p className="text-gray-500 text-center py-4 text-sm">
								No view data yet. Visit some project pages to generate view statistics!
							</p>
						)}
					</div>
				</div>

				{/* Charts */}
				<DashboardClient projects={projects || []} />
			</div>
		</div>
	)
}
