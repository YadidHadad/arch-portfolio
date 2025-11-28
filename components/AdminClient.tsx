'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Project {
	_id: string
	title: string
	architect: string
	developer: string
	description: string
	category: string
	year: number
	location?: string
	squareMeters?: number
	units?: number
	images: string[]
	views?: number
}

export default function AdminClient({ initialProjects }: { initialProjects: Project[] }) {
	const router = useRouter()
	const [projects, setProjects] = useState<Project[]>(initialProjects)
	const [showModal, setShowModal] = useState(false)
	const [editingProject, setEditingProject] = useState<Project | null>(null)
	const [formData, setFormData] = useState({
		title: '',
		architect: '',
		developer: '',
		description: '',
		category: '',
		year: new Date().getFullYear(),
		location: '',
		squareMeters: 0,
		units: 0,
		images: [''],
	})

	const categories = ['Residential', 'Commercial', 'Preservation', 'Mixed-Use', 'High-Rise', 'Educational', 'Office']

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: name === 'year' || name === 'squareMeters' || name === 'units' ? parseInt(value) || 0 : value,
		}))
	}

	const handleImageChange = (index: number, value: string) => {
		const newImages = [...formData.images]
		newImages[index] = value
		setFormData((prev) => ({ ...prev, images: newImages }))
	}

	const addImageField = () => {
		setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }))
	}

	const removeImageField = (index: number) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}))
	}

	const openAddModal = () => {
		setEditingProject(null)
		setFormData({
			title: '',
			architect: '',
			developer: '',
			description: '',
			category: 'Residential',
			year: new Date().getFullYear(),
			location: '',
			squareMeters: 0,
			units: 0,
			images: [''],
		})
		setShowModal(true)
	}

	const openEditModal = (project: Project) => {
		setEditingProject(project)
		setFormData({
			title: project.title,
			architect: project.architect,
			developer: project.developer,
			description: project.description,
			category: project.category,
			year: project.year,
			location: project.location || '',
			squareMeters: project.squareMeters || 0,
			units: project.units || 0,
			images: project.images.length > 0 ? project.images : [''],
		})
		setShowModal(true)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const projectData = {
			...formData,
			images: formData.images.filter((img) => img.trim() !== ''),
		}

		try {
			const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects'

			const method = editingProject ? 'PUT' : 'POST'

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(projectData),
			})

			if (response.ok) {
				const result = await response.json()

				if (editingProject) {
					// Update existing project in state
					setProjects(
						projects.map((p) =>
							p._id === editingProject._id
								? {
										...p,
										...projectData,
										_id: editingProject._id,
								  }
								: p
						)
					)
				} else {
					// Add new project to state
					setProjects([
						{
							...projectData,
							_id: result.data.insertedId,
							views: 0,
						},
						...projects,
					])
				}
				setShowModal(false)
				router.refresh()

				// setTimeout(() => {
				// 	alert(
				// 		editingProject
				// 			? 'Project updated successfully!'
				// 			: 'Project created successfully!'
				// 	)
				// }, 100)
			} else {
				alert('Failed to save project')
			}
		} catch (error) {
			console.error('Error saving project:', error)
			alert('Error saving project')
		}
	}

	const handleDelete = async (id: string, title: string) => {
		if (!confirm(`Are you sure you want to delete "${title}"?`)) {
			return
		}

		try {
			const response = await fetch(`/api/projects/${id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				setProjects(projects.filter((p) => p._id !== id))
				alert('Project deleted successfully!')
			} else {
				alert('Failed to delete project')
			}
		} catch (error) {
			console.error('Error deleting project:', error)
			alert('Error deleting project')
		}
	}

	return (
		<div>
			{/* Add New Project Button */}
			<div className="mb-6">
				<button
					onClick={openAddModal}
					className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label="Add new project to portfolio"
				>
					+ Add New Project
				</button>
			</div>

			{/* Projects Table */}
			<div className="bg-white shadow-sm border border-gray-100 rounded">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200" role="table" aria-label="List of all portfolio projects">
						<thead className="bg-gray-50">
							<tr role="row">
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Project
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Architect
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Developer
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Category
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Area
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Units
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Views
								</th>
								<th
									className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
									role="columnheader"
									scope="col"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{projects.map((project) => (
								<tr key={project._id} className="hover:bg-gray-50 focus-within:bg-gray-50" role="row">
									<td className="px-6 py-4" role="cell">
										<div className="text-sm font-medium text-gray-900">{project.title}</div>
										<div className="text-sm text-gray-500">{project.location}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" role="cell">
										{project.category}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" role="cell">
										{project.architect}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" role="cell">
										{project.developer}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" role="cell">
										{project.squareMeters ? `${project.squareMeters.toLocaleString()} m²` : '-'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" role="cell">
										{project.units || '-'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" role="cell">
										{project.views || 0}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" role="cell">
										<button
											onClick={() => openEditModal(project)}
											className="text-blue-600 hover:text-blue-900 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
											aria-label={`Edit ${project.title}`}
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(project._id, project.title)}
											className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1"
											aria-label={`Delete ${project.title}`}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={() => setShowModal(false)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
				>
					<div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
						<div className="p-6">
							<h2 id="modal-title" className="text-2xl font-bold mb-6">
								{editingProject ? 'Edit Project' : 'Add New Project'}
							</h2>

							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Title */}
								<div>
									<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
										Title <span aria-label="required">*</span>
									</label>
									<input
										id="title"
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										aria-required="true"
									/>
									<label htmlFor="architect" className="block text-sm font-medium text-gray-700 mb-1">
										Architect <span aria-label="required">*</span>
									</label>
									<input
										id="architect"
										type="text"
										name="architect"
										value={formData.architect}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										aria-required="true"
									/>
									<label htmlFor="developer" className="block text-sm font-medium text-gray-700 mb-1">
										Developer <span aria-label="required">*</span>
									</label>
									<input
										id="developer"
										type="text"
										name="developer"
										value={formData.developer}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										aria-required="true"
									/>
								</div>

								{/* Description */}
								<div>
									<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
										Description
									</label>
									<textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								{/* Category & Year */}
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
											Category <span aria-label="required">*</span>
										</label>
										<select
											id="category"
											name="category"
											value={formData.category}
											onChange={handleInputChange}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
											aria-required="true"
										>
											<option value="">Select a category</option>
											{categories.map((cat) => (
												<option key={cat} value={cat}>
													{cat}
												</option>
											))}
										</select>
									</div>
									<div>
										<label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
											Year <span aria-label="required">*</span>
										</label>
										<input
											id="year"
											type="number"
											name="year"
											value={formData.year}
											onChange={handleInputChange}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
											aria-required="true"
										/>
									</div>
								</div>

								{/* Location */}
								<div>
									<label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
										Location
									</label>
									<input
										id="location"
										type="text"
										name="location"
										value={formData.location}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								{/* Square Meters & Units */}
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label htmlFor="squareMeters" className="block text-sm font-medium text-gray-700 mb-1">
											Area (m²)
										</label>
										<input
											id="squareMeters"
											type="number"
											name="squareMeters"
											value={formData.squareMeters}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<div>
										<label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-1">
											Units
										</label>
										<input
											id="units"
											type="number"
											name="units"
											value={formData.units}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								</div>

								{/* Images */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Image URLs</label>
									{formData.images.map((image, index) => (
										<div key={index} className="flex gap-2 mb-2">
											<input
												type="url"
												value={image}
												onChange={(e) => handleImageChange(index, e.target.value)}
												placeholder="https://example.com/image.jpg"
												className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
												aria-label={`Image URL ${index + 1}`}
											/>
											{formData.images.length > 1 && (
												<button
													type="button"
													onClick={() => removeImageField(index)}
													className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
													aria-label={`Remove image ${index + 1}`}
												>
													Remove
												</button>
											)}
										</div>
									))}
									<button
										type="button"
										onClick={addImageField}
										className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
										aria-label="Add another image URL"
									>
										+ Add Image
									</button>
								</div>

								{/* Buttons */}
								<div className="flex gap-4 pt-4">
									<button
										type="submit"
										className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									>
										{editingProject ? 'Update Project' : 'Create Project'}
									</button>
									<button
										type="button"
										onClick={() => setShowModal(false)}
										className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
