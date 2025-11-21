import ProjectCard from '@/components/ProjectCard'
import AboutCard from '@/components/AboutCard'

async function getProjects() {
	try {
		const res = await fetch('http://localhost:3000/api/projects', {
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

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export default async function Projects() {
	const { data: projects } = await getProjects()

	const randomIndex = getRandomInt(0, projects.length - 1)

	return (
		<div className="container mx-auto ">
			{/* Projects Grid */}
			{projects && projects.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.slice(0, randomIndex).map((project: any) => (
						<ProjectCard
							key={project._id}
							id={project._id}
							title={project.title}
							description={project.description}
							category={project.category}
							year={project.year}
							location={project.location}
							images={project.images}
						/>
					))}

					{/* About Card - Always third */}
					<AboutCard />

					{/* Rest of projects */}
					{projects.slice(randomIndex).map((project: any) => (
						<ProjectCard
							key={project._id}
							id={project._id}
							title={project.title}
							description={project.description}
							category={project.category}
							year={project.year}
							location={project.location}
							images={project.images}
						/>
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">
						No projects found. Add some projects to get started!
					</p>
				</div>
			)}
		</div>
	)
}
