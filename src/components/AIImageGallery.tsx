interface AIImageGalleryProps {
  images: string[];
  onSelectImage: (imageUrl: string) => void;
  onClearImages: () => void;
  selectedImage?: string;
}

export function AIImageGallery({
  images,
  onSelectImage,
  onClearImages,
  selectedImage,
}: AIImageGalleryProps) {
  console.log("🖼️ AIImageGallery received images:", images.length);
  if (images.length > 0) {
    console.log(
      "📋 Gallery image URLs:",
      images.map((url, i) => `${i + 1}: ${url.substring(0, 60)}...`),
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-300">
          Choose Your Base Logo ({images.length})
        </h4>
        <button
          onClick={onClearImages}
          className="text-xs text-gray-400 transition-colors hover:text-white"
        >
          Clear All
        </button>
      </div>

      <div className="grid max-h-60 grid-cols-4 gap-2 overflow-y-auto">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              selectedImage === imageUrl
                ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                : "border-gray-600 hover:border-blue-400"
            }`}
          >
            <img
              src={imageUrl}
              alt={`Generated logo ${index + 1}`}
              className="h-16 w-full rounded bg-white object-contain"
              onClick={() => onSelectImage(imageUrl)}
              onError={(e) => {
                // Handle broken images gracefully with inline SVG
                const target = e.target as HTMLImageElement;
                const fallbackSvg = `data:image/svg+xml;base64,${btoa(`
                  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="200" fill="#374151"/>
                    <text x="100" y="100" text-anchor="middle" fill="#9CA3AF" font-family="Arial" font-size="14">Logo ${index + 1}</text>
                    <text x="100" y="120" text-anchor="middle" fill="#6B7280" font-family="Arial" font-size="10">Failed to Load</text>
                  </svg>
                `)}`;
                target.src = fallbackSvg;
              }}
            />

            {/* Overlay with selection indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-40">
              {selectedImage === imageUrl ? (
                <div className="rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                  ✓ Selected
                </div>
              ) : (
                <div className="rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-800 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Select This
                </div>
              )}
            </div>

            {/* Image number badge */}
            <div className="absolute left-1 top-1 rounded bg-black bg-opacity-60 px-1.5 py-0.5 text-xs text-white">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="rounded border border-blue-500 bg-blue-900 bg-opacity-30 p-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="text-xs text-blue-200">
              Base logo selected! Customize with colors, text, and effects
              above.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
