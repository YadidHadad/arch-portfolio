import { redirect } from 'next/navigation'
import { verifyAuth } from '@/lib/auth'
import AdminClient from '@/components/AdminClient'
import connectDB from '@/lib/mongodb'

async function getProjects() {
	try {
		const mongoose = await connectDB()
		const db = mongoose.connection.db
		if (!db) {
			throw new Error('Database connection not established')
		}
		const projects = await db
			.collection('projects')
			.find({})
			.sort({ createdAt: -1 })
			.toArray()

		return {
			success: true,
			data: JSON.parse(JSON.stringify(projects)),
		}
	} catch (error) {
		console.error('Error fetching projects:', error)
		return { success: false, data: [] }
	}
}

export default async function AdminPage() {
	const isAuthenticated = await verifyAuth()

	if (!isAuthenticated) {
		redirect('/login')
	}
	const { data: projects } = await getProjects()

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2 text-gray-900">
						Admin Panel
					</h1>
					<p className="text-gray-600">
						Manage your architectural projects
					</p>
				</div>

				<AdminClient initialProjects={projects || []} />
			</div>
		</div>
	)
}
