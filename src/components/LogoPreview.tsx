import {
  downloadSVG as downloadSVGUtil,
  downloadPNG as downloadPNGUtil,
} from "../utils/downloadUtils";
import { convertImageToDataUrl, isExternalImageUrl } from "../utils/imageUtils";
import { useState, useEffect } from "react";

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

  // State for converted AI image data URL
  const [aiImageDataUrl, setAiImageDataUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  // Convert external AI image URL to data URL when selectedAiImage changes
  useEffect(() => {
    if (selectedAiImage && isExternalImageUrl(selectedAiImage)) {
      console.log(
        "🔄 Attempting to convert external AI image to embedded format:",
        selectedAiImage,
      );
      setIsConverting(true);

      // Try to convert, but handle CORS gracefully
      convertImageToDataUrl(selectedAiImage)
        .then((dataUrl) => {
          setAiImageDataUrl(dataUrl);
          console.log(
            "✅ AI image successfully converted to embedded data URL",
          );
        })
        .catch((error) => {
          console.warn("⚠️ CORS prevented image conversion:", error.message);

          // Fallback: Use original URL for display but warn about download limitations
          setAiImageDataUrl(selectedAiImage);

          // Show one-time warning about download limitations
          console.log(
            "ℹ️ Note: PNG downloads may fail due to external image URLs. SVG downloads will work but may have temporary image references.",
          );
        })
        .finally(() => {
          setIsConverting(false);
        });
    } else {
      // If it's already a data URL or empty, use it directly
      setAiImageDataUrl(selectedAiImage || "");
      console.log(
        "📋 Using image directly (no conversion needed):",
        selectedAiImage ? selectedAiImage.substring(0, 50) + "..." : "empty",
      );
    }
  }, [selectedAiImage]);

  // Use the converted data URL for rendering
  const imageToRender = aiImageDataUrl || selectedAiImage;

  // Export as SVG
  const downloadSVG = async () => {
    const svgElement = document.getElementById("logo-svg") as SVGElement | null;
    if (!svgElement) {
      alert("Error: Logo preview not found. Please try again.");
      return;
    }

    try {
      const filename = `${logoData.brand || "logo"}.svg`;
      await downloadSVGUtil(svgElement, filename);
      console.log("✅ SVG downloaded successfully!");
    } catch (error) {
      console.error("❌ Error downloading SVG:", error);
      alert(
        "Error downloading SVG. Please try again or use a different browser.",
      );
    }
  };

  // Export as PNG
  const downloadPNG = async () => {
    const svgElement = document.getElementById("logo-svg") as SVGElement | null;
    if (!svgElement) {
      alert("Error: Logo preview not found. Please try again.");
      return;
    }

    // Show loading state for AI images
    if (selectedAiImage && isConverting) {
      alert(
        "Please wait for the AI image to finish converting, then try again.",
      );
      return;
    }

    // Debug: Check what image URL is being used
    console.log("🔍 Debug info:");
    console.log("selectedAiImage:", selectedAiImage);
    console.log("aiImageDataUrl:", aiImageDataUrl);
    console.log("imageToRender:", imageToRender);
    console.log("isConverting:", isConverting);

    // Check if we're using an external URL that couldn't be converted
    if (
      selectedAiImage &&
      isExternalImageUrl(selectedAiImage) &&
      aiImageDataUrl === selectedAiImage
    ) {
      // This means CORS conversion failed and we're still using the external URL
      const userChoice = confirm(
        "⚠️ PNG Download Not Available\n\n" +
          "Your logo contains an AI-generated image with an external URL that cannot be converted to PNG due to browser security restrictions.\n\n" +
          "Would you like to download as SVG instead?\n\n" +
          "• SVG files work everywhere and maintain full quality\n" +
          "• SVG is the recommended format for logos",
      );

      if (userChoice) {
        // User chose to download SVG instead
        downloadSVG();
      }
      return;
    }

    // If we have a data URL, we can proceed with PNG conversion
    if (
      selectedAiImage &&
      !aiImageDataUrl.startsWith("data:") &&
      aiImageDataUrl !== selectedAiImage
    ) {
      alert(
        "AI image is still being converted. Please wait a moment and try again.",
      );
      return;
    }

    try {
      const filename = `${logoData.brand || "logo"}.png`;
      await downloadPNGUtil(svgElement, filename, backgroundColor);
      console.log("✅ PNG downloaded successfully!");
    } catch (error) {
      console.error("❌ Error downloading PNG:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (errorMessage.includes("external")) {
        const tryAgain = confirm(
          "PNG conversion failed due to external image references.\n\n" +
            "This usually happens with AI-generated images that use external URLs.\n\n" +
            "Would you like to download as SVG instead?\n" +
            "(SVG format is recommended for logos and works everywhere)",
        );

        if (tryAgain) {
          downloadSVG();
        }
      } else {
        alert(
          `PNG download failed: ${errorMessage}\n\nTry downloading as SVG instead, or use a different browser.`,
        );
      }
    }
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
          {imageToRender ? (
            <>
              {/* AI Image as main content - now using embedded data URL */}
              <image
                href={imageToRender}
                x="0"
                y="0"
                width="300"
                height="300"
                preserveAspectRatio="xMidYMid meet"
                opacity={Math.max(1 - (transparency || 0) / 100, 0.1)}
              />

              {/* Show loading indicator while converting external image */}
              {isConverting && (
                <text
                  x="150"
                  y="20"
                  textAnchor="middle"
                  fill="#666"
                  fontSize="12"
                  fontFamily="Arial, sans-serif"
                >
                  Converting image...
                </text>
              )}

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

      {/* Download format info for AI images */}
      {selectedAiImage && isExternalImageUrl(selectedAiImage) && (
        <div className="mt-2 rounded-lg border border-yellow-500/30 bg-yellow-900/30 px-3 py-2 text-xs text-yellow-200">
          <p className="font-medium">💡 AI Image Download Info:</p>
          <p className="mt-1">
            • <strong>SVG:</strong> ⭐ Recommended - works everywhere, scalable
            <br />• <strong>PNG:</strong>{" "}
            {aiImageDataUrl.startsWith("data:")
              ? "Available"
              : "Limited due to external URLs"}
          </p>
        </div>
      )}

      {/* Export buttons */}
      <div className="mt-4 flex w-full max-w-xs flex-col gap-3 sm:flex-row">
        <button
          onClick={downloadSVG}
          className="flex-1 rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600 md:text-base"
        >
          Download SVG
          {selectedAiImage && isExternalImageUrl(selectedAiImage) && (
            <span className="ml-1 text-xs opacity-75">⭐</span>
          )}
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
