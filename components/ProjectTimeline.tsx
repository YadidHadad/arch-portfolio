'use client'

interface Stage {
	name: string
	completed: boolean
}

interface ProjectTimelineProps {
	currentStage?: string
	completedStages?: string[]
}

const stages = [
	'Urban Building Planning',
	'Concept & Preliminary Design',
	'Permitting & Approvals',
	'Detailed Planning',
	'Construction Documentation',
	'Construction Observation',
]

export default function ProjectTimeline({
	currentStage = 'Construction Documentation',
	completedStages = ['Concept & Preliminary Design'],
}: ProjectTimelineProps) {
	const isStageCompleted = (stage: string) => {
		return completedStages.includes(stage)
	}

	const isCurrentStage = (stage: string) => {
		return stage === currentStage
	}

	return (
		<div className="w-full py-8">
			<h3 className="text-xl font-bold mb-6 text-gray-800">
				Project Stages
			</h3>

			<div className="relative">
				{/* Horizontal Line */}
				<div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300"></div>

				{/* Progress Line */}
				<div
					className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500"
					style={{
						width: `${
							(completedStages.length / stages.length) * 100
						}%`,
					}}
				></div>

				{/* Stages */}
				<div className="relative flex justify-between">
					{stages.map((stage, index) => {
						const completed = isStageCompleted(stage)
						const current = isCurrentStage(stage)

						return (
							<div
								key={stage}
								className="flex flex-col items-center"
								style={{ width: `${100 / stages.length}%` }}
							>
								{/* Point/Circle */}
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
										completed
											? 'bg-blue-600 text-white'
											: current
											? 'bg-white border-4 border-blue-600 text-blue-600'
											: 'bg-white border-2 border-gray-300 text-gray-400'
									}`}
								>
									{completed ? (
										// Checkmark
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										// Number
										<span className="text-sm font-semibold">
											{index + 1}
										</span>
									)}
								</div>

								{/* Label */}
								<div
									className={`mt-3 text-center text-sm font-medium px-2 ${
										completed || current
											? 'text-gray-900'
											: 'text-gray-500'
									}`}
								>
									{stage}
								</div>

								{/* Status indicator */}
								{current && (
									<div className="mt-2">
										<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
											In Progress
										</span>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
