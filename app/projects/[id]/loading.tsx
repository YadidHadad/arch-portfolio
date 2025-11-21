export default function Loading() {
	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Back Button Skeleton */}
			<div className="container mx-auto px-4 py-6">
				<div className="h-6 w-32 bg-gray-200  animate-pulse"></div>
			</div>

			{/* Hero Section Skeleton */}
			<div className="  mb-8">
				<div className="container mx-auto px-4 py-12">
					{/* Category Badge */}
					<div className="mb-4">
						<div className="h-6 w-24 bg-gray-200  animate-pulse"></div>
					</div>

					{/* Title */}
					<div className="h-12 w-3/4 bg-gray-200  mb-6 animate-pulse"></div>

					{/* Key Metrics */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
						{[1, 2, 3, 4].map((i) => (
							<div key={i}>
								<div className="h-4 w-20 bg-gray-200  mb-2 animate-pulse"></div>
								<div className="h-8 w-32 bg-gray-200  animate-pulse"></div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Image Gallery Skeleton */}
			<div className="container mx-auto px-4 mb-12">
				<div className="space-y-4">
					{/* Main Image */}
					<div className="w-full h-[600px] bg-gray-200 animate-pulse"></div>

					{/* Thumbnail Strip */}
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className="h-32 bg-gray-200 animate-pulse"
							></div>
						))}
					</div>
				</div>
			</div>

			{/* Description Section Skeleton */}
			<div className="">
				<div className="container mx-auto px-4 py-12">
					<div className="max-w-4xl">
						<div className="h-8 w-64 bg-gray-200  mb-6 animate-pulse"></div>
						<div className="space-y-3">
							<div className="h-4 w-full bg-gray-200  animate-pulse"></div>
							<div className="h-4 w-full bg-gray-200  animate-pulse"></div>
							<div className="h-4 w-3/4 bg-gray-200  animate-pulse"></div>
						</div>
					</div>
				</div>
			</div>

			{/* Project Details Skeleton */}
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-4xl  p-8 ">
					<div className="h-7 w-48 bg-gray-200  mb-6 animate-pulse"></div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="border-b pb-4">
								<div className="h-3 w-24 bg-gray-200  mb-2 animate-pulse"></div>
								<div className="h-5 w-40 bg-gray-200  animate-pulse"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
