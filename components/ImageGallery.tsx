'use client'
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

interface ImageGalleryProps {
	images: string[]
	title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState(0)

	if (!images || images.length === 0) {
		return (
			<div className="bg-gray-200 h-96 flex items-center justify-center">
				<p className="text-gray-500">No images available</p>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Main Image */}
			<div className="relative w-full h-[600px]  overflow-hidden">
				<img
					src={images[selectedImage]}
					alt={`${title} - Image ${selectedImage + 1}`}
					className="w-full h-full object-contain"
					onError={(e) => {
						e.currentTarget.src =
							'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200'
					}}
				/>

				{/* Navigation Arrows */}
				{images.length > 1 && (
					<>
						<button
							onClick={() =>
								setSelectedImage((prev) =>
									prev === 0 ? images.length - 1 : prev - 1
								)
							}
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
							aria-label="Previous image"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							onClick={() =>
								setSelectedImage((prev) =>
									prev === images.length - 1 ? 0 : prev + 1
								)
							}
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
							aria-label="Next image"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</>
				)}

				{/* Image Counter */}
				<div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 text-sm">
					{selectedImage + 1} / {images.length}
				</div>
			</div>

			{/* Thumbnail Strip */}
			{images.length > 1 && (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							className={`relative h-32 overflow-hidden transition-all ${
								selectedImage === index
									? 'ring-4 ring-blue-500 scale-105'
									: 'ring-2 ring-gray-200 hover:ring-gray-400'
							}`}
						>
							<img
								src={image}
								alt={`${title} thumbnail ${index + 1}`}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.currentTarget.src =
										'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400'
								}}
							/>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
