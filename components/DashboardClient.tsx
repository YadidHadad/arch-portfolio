'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import Link from 'next/link'
import { Bar, Pie, Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

interface Project {
	_id: string
	title: string
	architect: string
	developer: string
	description: string
	category: string
	year: number
	squareMeters?: number
	units?: number
	location?: string
}

export default function DashboardClient({ projects }: { projects: Project[] }) {
	// Monochromatic gray palette with blue accents
	const grayPalette = [
		'rgba(71, 85, 105, 0.8)', // slate-600
		'rgba(100, 116, 139, 0.8)', // slate-500
		'rgba(148, 163, 184, 0.8)', // slate-400
		'rgba(203, 213, 225, 0.8)', // slate-300
		'rgba(226, 232, 240, 0.8)', // slate-200
		'rgba(241, 245, 249, 0.8)', // slate-100
	]

	const grayBorders = [
		'rgba(71, 85, 105, 1)',
		'rgba(100, 116, 139, 1)',
		'rgba(148, 163, 184, 1)',
		'rgba(203, 213, 225, 1)',
		'rgba(226, 232, 240, 1)',
		'rgba(241, 245, 249, 1)',
	]

	// Blue accent colors
	const blueAccent = 'rgba(59, 130, 246, 0.8)' // blue-500
	const blueBorder = 'rgba(59, 130, 246, 1)'

	// Projects by Category
	const categoryCounts = projects.reduce((acc: any, project) => {
		acc[project.category] = (acc[project.category] || 0) + 1
		return acc
	}, {})

	const categoryData = {
		labels: Object.keys(categoryCounts),
		datasets: [
			{
				label: 'Projects by Category',
				data: Object.values(categoryCounts),
				backgroundColor: grayPalette,
				borderColor: grayBorders,
				borderWidth: 2,
			},
		],
	}

	// Area by Project
	const areaData = {
		labels: projects.map((p) => (p.title.length > 20 ? p.title.substring(0, 20) + '...' : p.title)),
		datasets: [
			{
				label: 'Area (m²)',
				data: projects.map((p) => p.squareMeters || 0),
				backgroundColor: blueAccent,
				borderColor: blueBorder,
				borderWidth: 2,
			},
		],
	}

	// Units by Project
	const unitsData = {
		labels: projects.map((p) => (p.title.length > 20 ? p.title.substring(0, 20) + '...' : p.title)),
		datasets: [
			{
				label: 'Number of Units',
				data: projects.map((p) => p.units || 0),
				backgroundColor: 'rgba(100, 116, 139, 0.8)', // slate-500
				borderColor: 'rgba(100, 116, 139, 1)',
				borderWidth: 2,
			},
		],
	}

	// Projects by Year
	const yearCounts = projects.reduce((acc: any, project) => {
		acc[project.year] = (acc[project.year] || 0) + 1
		return acc
	}, {})

	const sortedYears = Object.keys(yearCounts).sort()

	const timelineData = {
		labels: sortedYears,
		datasets: [
			{
				label: 'Projects Completed',
				data: sortedYears.map((year) => yearCounts[year]),
				fill: true,
				borderColor: blueBorder,
				backgroundColor: 'rgba(59, 130, 246, 0.1)', // very light blue fill
				tension: 0.3,
				pointRadius: 5,
				pointHoverRadius: 7,
				pointBackgroundColor: blueAccent,
				pointBorderColor: blueBorder,
				pointBorderWidth: 2,
			},
		],
	}

	// Area by Category
	const categoryAreaData = projects.reduce((acc: any, project) => {
		if (project.squareMeters) {
			acc[project.category] = (acc[project.category] || 0) + project.squareMeters
		}
		return acc
	}, {})

	const areaByCategoryData = {
		labels: Object.keys(categoryAreaData),
		datasets: [
			{
				label: 'Total Area by Category (m²)',
				data: Object.values(categoryAreaData),
				backgroundColor: grayPalette,
				borderColor: grayBorders,
				borderWidth: 2,
			},
		],
	}

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					color: '#475569', // slate-600
					font: {
						family: 'system-ui, -apple-system, sans-serif',
					},
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: '#64748b', // slate-500
				},
				grid: {
					color: 'rgba(148, 163, 184, 0.1)', // very light gray
				},
			},
			y: {
				ticks: {
					color: '#64748b',
				},
				grid: {
					color: 'rgba(148, 163, 184, 0.1)',
				},
			},
		},
	}

	return (
		<div className="space-y-8">
			{/* Row 1: Category Distribution and Timeline */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className=" p-6  border border-gray-100">
					<h2 className="text-xl font-bold mb-4 text-gray-800">Projects by Category</h2>
					<div className="h-80 flex items-center justify-center">
						<Pie
							data={categoryData}
							options={{
								...chartOptions,
								scales: undefined, // Pie charts don't have scales
							}}
						/>
					</div>
				</div>

				<div className=" p-6  border border-gray-100">
					<h2 className="text-xl font-bold mb-4 text-gray-800">Project Timeline</h2>
					<div className="h-80">
						<Line data={timelineData} options={chartOptions} />
					</div>
				</div>
			</div>

			{/* Row 2: Area by Project */}
			<div className=" p-6  border border-gray-100">
				<h2 className="text-xl font-bold mb-4 text-gray-800">Area by Project</h2>
				<div className="h-96">
					<Bar
						data={areaData}
						options={{
							...chartOptions,
							scales: {
								y: {
									beginAtZero: true,
									ticks: {
										color: '#64748b',
										callback: function (value) {
											return value.toLocaleString() + ' m²'
										},
									},
									grid: {
										color: 'rgba(148, 163, 184, 0.1)',
									},
								},
								x: {
									ticks: {
										color: '#64748b',
									},
									grid: {
										color: 'rgba(148, 163, 184, 0.1)',
									},
								},
							},
						}}
					/>
				</div>
			</div>

			{/* Row 3: Units and Area by Category */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className=" p-6  border border-gray-100">
					<h2 className="text-xl font-bold mb-4 text-gray-800">Units by Project</h2>
					<div className="h-80">
						<Bar
							data={unitsData}
							options={{
								...chartOptions,
								indexAxis: 'y' as const,
								scales: {
									x: {
										beginAtZero: true,
										ticks: {
											color: '#64748b',
										},
										grid: {
											color: 'rgba(148, 163, 184, 0.1)',
										},
									},
									y: {
										ticks: {
											color: '#64748b',
										},
										grid: {
											color: 'rgba(148, 163, 184, 0.1)',
										},
									},
								},
							}}
						/>
					</div>
				</div>

				<div className=" p-6  border border-gray-100">
					<h2 className="text-xl font-bold mb-4 text-gray-800">Total Area by Category</h2>
					<div className="h-80">
						<Bar
							data={areaByCategoryData}
							options={{
								...chartOptions,
								scales: {
									y: {
										beginAtZero: true,
										ticks: {
											color: '#64748b',
											callback: function (value) {
												return value.toLocaleString() + ' m²'
											},
										},
										grid: {
											color: 'rgba(148, 163, 184, 0.1)',
										},
									},
									x: {
										ticks: {
											color: '#64748b',
										},
										grid: {
											color: 'rgba(148, 163, 184, 0.1)',
										},
									},
								},
							}}
						/>
					</div>
				</div>
			</div>

			{/* Projects Table */}
			<div className=" p-6  border border-gray-100">
				<h2 className="text-xl font-bold mb-4 text-gray-800">All Projects</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Project</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Year</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Area</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Units</th>
							</tr>
						</thead>
						<tbody className=" divide-y divide-gray-200">
							{projects.map((project) => (
								<tr key={project._id} className="hover:bg-blue-50 transition-colors">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:text-blue-600 transition-color">
										<Link href={`/projects/${project._id}`} key={project._id}>
											{project.title}
										</Link>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.category}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.year}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.location || '-'}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
										{project.squareMeters ? `${project.squareMeters.toLocaleString()} m²` : '-'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
										{project.units ? project.units.toLocaleString() : '-'}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
