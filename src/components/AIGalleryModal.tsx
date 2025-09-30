interface AIGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  onSelectImage: (imageUrl: string) => void;
  onClearImages: () => void;
  selectedImage?: string;
}

export function AIGalleryModal({
  isOpen,
  onClose,
  images,
  onSelectImage,
  onClearImages,
  selectedImage,
}: AIGalleryModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-slate-800 p-3 sm:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="mb-3 flex items-center justify-between sm:mb-0">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              AI Logos
            </h2>
            <button
              onClick={onClose}
              className="touch-manipulation rounded bg-gray-600 px-3 py-2 text-white transition-colors hover:bg-gray-700"
            >
              ✕ Close
            </button>
          </div>
          {/* Mobile: Clear button below title */}
          {images.length > 0 && (
            <button
              onClick={onClearImages}
              className="w-full touch-manipulation rounded bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700 sm:hidden"
            >
              Clear All {images.length} Logos
            </button>
          )}
          {/* Desktop: Clear button in header */}
          {images.length > 0 && (
            <div className="hidden justify-end sm:flex">
              <button
                onClick={onClearImages}
                className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Clear All ({images.length})
              </button>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((imageUrl, index) => (
              <div
                key={index}
                className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  selectedImage === imageUrl
                    ? "scale-105 border-blue-500 ring-4 ring-blue-500 ring-opacity-50"
                    : "border-gray-600 hover:scale-105 hover:border-blue-400"
                }`}
                onClick={() => onSelectImage(imageUrl)}
              >
                {/* Image */}
                <div className="aspect-square bg-white p-2 sm:p-4">
                  <img
                    src={imageUrl}
                    alt={`Generated logo ${index + 1}`}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallbackSvg = `data:image/svg+xml;base64,${btoa(`
                        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" fill="#374151"/>
                          <text x="100" y="100" text-anchor="middle" fill="#9CA3AF" font-family="Arial" font-size="16">Logo ${index + 1}</text>
                          <text x="100" y="120" text-anchor="middle" fill="#6B7280" font-family="Arial" font-size="12">Failed to Load</text>
                        </svg>
                      `)}`;
                      target.src = fallbackSvg;
                    }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-40">
                  {selectedImage === imageUrl ? (
                    <div className="rounded-md bg-blue-500 px-2 py-1 text-sm font-medium text-white shadow-lg sm:px-4 sm:py-2 sm:text-base">
                      ✓ Selected
                    </div>
                  ) : (
                    <div className="rounded-md bg-white px-2 py-1 text-sm font-medium text-gray-800 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:px-4 sm:py-2 sm:text-base">
                      Select Logo
                    </div>
                  )}
                </div>

                {/* Logo Number Badge */}
                <div className="absolute left-1 top-1 rounded bg-black bg-opacity-60 px-1.5 py-0.5 text-xs font-medium text-white sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-sm">
                  #{index + 1}
                </div>

                {/* Quick Actions - Hidden on mobile, hover on desktop */}
                <div className="absolute right-1 top-1 transition-opacity duration-200 sm:right-2 sm:top-2 sm:opacity-0 sm:group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Create download link for individual image
                      const link = document.createElement("a");
                      link.href = imageUrl;
                      link.download = `ai-logo-${index + 1}.svg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="touch-manipulation rounded bg-gray-800 bg-opacity-80 p-1.5 text-white transition-colors hover:bg-gray-700 sm:p-2"
                    title="Download this logo"
                  >
                    <span className="text-xs sm:text-sm">⬇️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-6xl text-gray-500">🎨</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-300">
              No AI Logos Generated Yet
            </h3>
            <p className="text-gray-400">
              Use the AI Logo Generation section to create logo options that
              will appear here.
            </p>
          </div>
        )}

        {/* Selected Logo Info */}
        {selectedImage && (
          <div className="mt-6 rounded-lg border border-blue-500 bg-blue-900 bg-opacity-30 p-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
              <span className="font-medium text-blue-200">
                🎯 Logo selected as base! Close this gallery to continue
                customizing with the tools on the left.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
