import ImageGallery from '@/components/ImageGallery'
import Link from 'next/link'
import ProjectTimeline from '@/components/ProjectTimeline'

async function getProject(id: string) {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

		const res = await fetch(`${baseUrl}/api/projects`, {
			cache: 'no-store',
		})

		if (!res.ok) {
			return null
		}

		const data = await res.json()
		return data.data
	} catch (error) {
		console.error('Error fetching project:', error)
		return null
	}
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const project = await getProject(id)

	if (!project) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
			</div>
		)
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Back Button */}

			{/* Hero Section */}
			<div className="  mb-8">
				<div className="container mx-auto px-4">
					<div className="mb-4">
						<span className="inline-block   py-1 text-sm font-semibold uppercase tracking-wide">{project.category}</span>
					</div>
					<h1 className="text-5xl font-bold ">{project.title}</h1>
				</div>
			</div>

			{/* Project Details */}
			<div className="container mx-auto px-4">
				<div className="max-w-4xl  ">
					<dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="border-b pb-4">
							<dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Completion Year</dt>
							<dd className="text-lg">{project.year}</dd>
						</div>
						{project.location && (
							<div className="border-b pb-4">
								<dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Location</dt>
								<dd className="text-lg">{project.location}</dd>
							</div>
						)}
						{project.squareMeters && (
							<div className="border-b pb-4">
								<dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Area</dt>
								<dd className="text-lg">{project.squareMeters.toLocaleString()} m²</dd>
							</div>
						)}
						{project.units && (
							<div className="border-b pb-4">
								<dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Number of Units</dt>
								<dd className="text-lg">{project.units.toLocaleString()}</dd>
							</div>
						)}
						{project.developer && (
							<div className="border-b pb-4">
								<dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Developer</dt>
								<dd className="text-lg">{project.units.toLocaleString()}</dd>
							</div>
						)}
						{project.architect && (
							<div className="border-b pb-4">
								<dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Architect</dt>
								<dd className="text-lg">{project.units.toLocaleString()}</dd>
							</div>
						)}
					</dl>
				</div>
			</div>
			{/* Image Gallery */}
			<div className="container mx-auto px-4 py-12 mb-12">
				<ImageGallery images={project.images || []} title={project.title} />
			</div>

			{/* Project Timeline */}
			<div className="">
				<div className="container mx-auto px-4 py-12">
					<ProjectTimeline currentStage={project.currentStage} completedStages={project.completedStages || []} />
				</div>
			</div>

			{/* Description Section */}
			<div>
				<div className="container mx-auto px-4 ">
					<div className="max-w-4xl">
						<h2 className="text-3xl font-bold mb-6">About This Project</h2>
						<p className="text-lg text-gray-700 leading-relaxed">{project.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
