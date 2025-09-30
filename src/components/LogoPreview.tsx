interface LogoData {
  brand: string;
  logoSize: number;
  logoColor: string;
  logoShape: string;
  logoText: string;
  logoStyle: string;
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  logoPosition: string;
  rotation: number;
  transparency: number;
  effects: string;
  imageUpload: string;
  imageFilter: string;
  animation: string;
  logoMargin: number;
  logoPaddingX: number;
  logoPaddingY: number;
  selectedAiImage: string;
  // Toggle states
  showBrand: boolean;
  showShape: boolean;
  showText: boolean;
  showBorder: boolean;
  showBackground: boolean;
}

interface LogoPreviewProps {
  logoData: LogoData;
}

export function LogoPreview({ logoData }: LogoPreviewProps) {
  const {
    logoText,
    logoColor,
    backgroundColor,
    borderColor,
    borderSize,
    logoSize,
    rotation,
    transparency,
    logoMargin,
    logoPaddingX,
    logoPaddingY,
    selectedAiImage,
  } = logoData;

  // Export as SVG
  const downloadSVG = () => {
    const svgElement = document.getElementById("logo-svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${logoData.brand || "logo"}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  // Export as PNG
  const downloadPNG = () => {
    const svgElement = document.getElementById("logo-svg");
    if (!svgElement) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the actual rendered size of the SVG
    const rect = svgElement.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height, 600); // Max 600px for good quality

    canvas.width = size;
    canvas.height = size;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = backgroundColor || "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, size, size);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `${logoData.brand || "logo"}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      });
    };
    img.src = url;
  };

  // Simple shape rendering based on logoShape
  const renderShape = () => {
    const shape = logoData.logoShape.toLowerCase();
    const size = Math.max(logoSize || 40, 20); // Default size of 40, minimum of 20
    const color = logoColor || "#3b82f6"; // Default blue color
    const opacity = Math.max(1 - (transparency || 0) / 100, 0.1); // Minimum opacity

    if (shape.includes("circle")) {
      return (
        <circle cx="150" cy="150" r={size} fill={color} opacity={opacity} />
      );
    } else if (shape.includes("square") || shape.includes("rectangle")) {
      return (
        <rect
          x={150 - size}
          y={150 - size}
          width={size * 2}
          height={size * 2}
          fill={color}
          opacity={opacity}
        />
      );
    } else if (shape.includes("triangle")) {
      const points = `150,${150 - size} ${150 - size},${150 + size} ${150 + size},${150 + size}`;
      return <polygon points={points} fill={color} opacity={opacity} />;
    }
    return null;
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
      <h2 className="text-center text-xl font-bold text-white md:text-2xl">
        Logo Preview
      </h2>
      <div
        className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg border-2"
        style={{
          backgroundColor: "transparent", // Background is now handled in SVG
          borderColor: logoData.showBorder
            ? borderColor || "#000000"
            : "transparent",
          borderWidth: logoData.showBorder ? `${borderSize || 1}px` : "0px",
          margin: `${logoMargin}px`,
          padding: `${logoPaddingY}px ${logoPaddingX}px`,
        }}
      >
        <svg
          id="logo-svg"
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Always render background first - either solid color or transparent */}
          <rect
            x="0"
            y="0"
            width="300"
            height="300"
            fill={
              logoData.showBackground
                ? backgroundColor || "#ffffff"
                : "transparent"
            }
          />

          {/* Render AI generated image if selected, otherwise show traditional logo elements */}
          {selectedAiImage ? (
            <>
              {/* AI Image as main content */}
              <image
                href={selectedAiImage}
                x="0"
                y="0"
                width="300"
                height="300"
                preserveAspectRatio="xMidYMid meet"
                opacity={Math.max(1 - (transparency || 0) / 100, 0.1)}
              />

              {/* Optional text overlay on AI image */}
              {logoData.showText && logoText && (
                <text
                  x="150"
                  y="250"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={logoColor || "#1f2937"}
                  fontSize={Math.max(logoSize || 16, 12)}
                  fontFamily={logoData.logoStyle || "Arial, sans-serif"}
                  opacity={Math.max(1 - (transparency || 0) / 100, 0.8)}
                  fontWeight="bold"
                  stroke="white"
                  strokeWidth="1"
                >
                  {logoText}
                </text>
              )}
            </>
          ) : (
            <>
              {/* Traditional logo elements when no AI image is selected */}

              {/* Render shape if enabled and specified */}
              {logoData.showShape && logoData.logoShape && renderShape()}

              {/* Render text if enabled */}
              {logoData.showText && logoText && (
                <text
                  x="150"
                  y={logoData.showShape && logoData.logoShape ? "200" : "150"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={logoColor || "#1f2937"}
                  fontSize={Math.max(logoSize || 24, 12)}
                  fontFamily={logoData.logoStyle || "Arial, sans-serif"}
                  opacity={Math.max(1 - (transparency || 0) / 100, 0.1)}
                  fontWeight="bold"
                >
                  {logoText}
                </text>
              )}
            </>
          )}
        </svg>
      </div>

      {/* Simple brand name display - only show if enabled */}
      {logoData.showBrand && logoData.brand && (
        <p className="px-4 text-center text-base font-semibold text-white md:text-lg">
          {logoData.brand}
        </p>
      )}

      {/* Export buttons */}
      <div className="mt-4 flex w-full max-w-xs flex-col gap-3 sm:flex-row">
        <button
          onClick={downloadSVG}
          className="flex-1 rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600 md:text-base"
        >
          Download SVG
        </button>
        <button
          onClick={downloadPNG}
          className="flex-1 rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 md:text-base"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
