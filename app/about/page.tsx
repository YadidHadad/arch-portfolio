/* eslint-disable @next/next/no-img-element */
import { PROFILE_IMAGE } from '@/lib/constants'

export default function About() {
	return (
		<div className="max-w-4xl mx-auto">
			{/* Hero Section */}
			<section className="mb-12">
				<div className="flex flex-col md:flex-row gap-8 items-start">
					{/* Profile Image */}
					<div className="w-full md:w-1/3">
						<img
							src={PROFILE_IMAGE}
							alt="Your Name"
							className=" w-full"
						/>
					</div>

					{/* Bio */}
					<div className="w-full md:w-2/3">
						<p className="text-gray-700 mb-4">
							I'm a [architectural designer/architect/student]
							passionate about creating spaces that blend
							functionality with aesthetic innovation. With a
							focus on [sustainable design/modern minimalism/urban
							planning], I strive to design environments that
							enhance people's lives.
						</p>
						<p className="text-gray-700">
							My approach combines [traditional architectural
							principles/cutting-edge technology/
							community-focused design] to deliver projects that
							are both timeless and forward-thinking.
						</p>
					</div>
				</div>
			</section>

			{/* Education */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">Education</h2>
				<div className="space-y-4">
					<div className="border-l-4 border-blue-500 pl-4">
						<h3 className="font-semibold">
							Master of Architecture
						</h3>
						<p className="text-gray-600">
							University Name | 2020-2022
						</p>
					</div>
					<div className="border-l-4 border-blue-500 pl-4">
						<h3 className="font-semibold">
							Bachelor of Architectural Studies
						</h3>
						<p className="text-gray-600">
							University Name | 2016-2020
						</p>
					</div>
				</div>
			</section>

			{/* Experience */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">Experience</h2>
				<div className="space-y-6">
					<div>
						<h3 className="font-semibold text-lg">
							Architectural Designer
						</h3>
						<p className="text-gray-600 mb-2">
							Firm Name | 2022-Present
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-1">
							<li>
								Led residential and commercial design projects
							</li>
							<li>Collaborated with multidisciplinary teams</li>
							<li>Developed sustainable design solutions</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-lg">
							Intern Architect
						</h3>
						<p className="text-gray-600 mb-2">
							Firm Name | 2021-2022
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-1">
							<li>
								Assisted in project documentation and
								presentations
							</li>
							<li>Created 3D visualizations and renderings</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Skills & Software */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">
					Skills & Software
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div className="bg-gray-100 p-4 rounded">
						<h3 className="font-semibold mb-2">Design Software</h3>
						<ul className="text-sm text-gray-700">
							<li>AutoCAD</li>
							<li>Revit</li>
							<li>SketchUp</li>
							<li>Rhino</li>
						</ul>
					</div>
					<div className="bg-gray-100 p-4 rounded">
						<h3 className="font-semibold mb-2">Visualization</h3>
						<ul className="text-sm text-gray-700">
							<li>Lumion</li>
							<li>V-Ray</li>
							<li>Enscape</li>
							<li>Photoshop</li>
						</ul>
					</div>
					<div className="bg-gray-100 p-4 rounded">
						<h3 className="font-semibold mb-2">Other Skills</h3>
						<ul className="text-sm text-gray-700">
							<li>BIM Management</li>
							<li>Sustainable Design</li>
							<li>Hand Sketching</li>
							<li>Model Making</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Design Philosophy */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">
					Design Philosophy
				</h2>
				<p className="text-gray-700 italic bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
					"Architecture should speak of its time and place, but yearn
					for timelessness. I believe in creating spaces that respond
					to human needs while respecting the environment and
					celebrating craftsmanship."
				</p>
			</section>

			{/* Awards & Recognition (Optional) */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">
					Awards & Recognition
				</h2>
				<ul className="space-y-2 text-gray-700">
					<li>
						• First Place - University Design Competition (2021)
					</li>
					<li>• Featured in Architecture Magazine (2023)</li>
					<li>
						• Sustainability Award for Green Building Design (2022)
					</li>
				</ul>
			</section>

			{/* Contact CTA */}
			<section className="bg-gray-50 p-8 rounded-lg text-center">
				<h2 className="text-2xl font-semibold mb-4">
					Let's Work Together
				</h2>
				<p className="text-gray-700 mb-6">
					Interested in collaborating or learning more about my work?
				</p>
				<a
					href="mailto:your.email@example.com"
					className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
				>
					Get in Touch
				</a>
			</section>
		</div>
	)
}
