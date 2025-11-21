export default function Loading() {
	return (
		<div className="container mx-auto ">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div
						key={i}
						className="h-[500px] bg-gray-200  animate-pulse"
					></div>
				))}
			</div>
		</div>
	)
}
