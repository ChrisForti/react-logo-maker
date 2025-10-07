/**
 * Utility functions for handling file downloads across different browsers and devices
 */

/**
 * Detects if the user is on a mobile device
 */
export function isMobileDevice(): boolean {
  // Check for mobile user agents with fallback to empty string
  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    (window as Window & { opera?: string }).opera ||
    "";

  // More comprehensive mobile detection
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = mobileRegex.test(userAgent);

  // Also check for touch support and small screen
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;

  return isMobile || (hasTouch && isSmallScreen);
}

/**
 * Detects if the user is on iOS Safari
 */
export function isIOSSafari(): boolean {
  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    (window as Window & { opera?: string }).opera ||
    "";
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  return isIOS || (isIOS && isSafari);
}

/**
 * Downloads a file using the appropriate method for the current browser
 *
 * @param blob - The blob to download
 * @param filename - The filename to save as
 * @param fallbackDataUrl - Optional data URL to use as fallback
 */
export async function downloadFile(
  blob: Blob,
  filename: string,
  fallbackDataUrl?: string,
): Promise<void> {
  const isMobile = isMobileDevice();
  const isIOS = isIOSSafari();

  try {
    if (isMobile || isIOS) {
      // Mobile-specific download handling
      await downloadFileMobile(blob, filename, fallbackDataUrl);
    } else {
      // Desktop download
      await downloadFileDesktop(blob, filename);
    }
  } catch (error) {
    console.error("Download failed:", error);
    // Try fallback method
    if (fallbackDataUrl) {
      openInNewTab(fallbackDataUrl, filename);
    } else {
      throw error;
    }
  }
}

/**
 * Downloads a file on desktop browsers
 */
async function downloadFileDesktop(
  blob: Blob,
  filename: string,
): Promise<void> {
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Small delay before cleanup
    await new Promise((resolve) => setTimeout(resolve, 100));
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Downloads a file on mobile browsers with fallbacks
 */
async function downloadFileMobile(
  blob: Blob,
  filename: string,
  fallbackDataUrl?: string,
): Promise<void> {
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";

    // Add to DOM
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Keep link in DOM longer for mobile
    await new Promise((resolve) => setTimeout(resolve, 500));

    document.body.removeChild(link);

    // Longer delay before cleanup on mobile
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error("Mobile download failed, trying fallback:", error);

    // Fallback: Try opening in new tab with data URL
    if (fallbackDataUrl) {
      openInNewTab(fallbackDataUrl, filename);
    } else {
      // Convert blob to data URL and try again
      const dataUrl = await blobToDataURL(blob);
      openInNewTab(dataUrl, filename);
    }
  } finally {
    // Cleanup after longer delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 2000);
  }
}

/**
 * Opens a file in a new tab (fallback for mobile)
 */
function openInNewTab(dataUrl: string, filename: string): void {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { margin: 0; padding: 20px; background: #f0f0f0; font-family: sans-serif; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            img { max-width: 100%; height: auto; display: block; margin: 20px 0; }
            .download-btn { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .download-btn:hover { background: #2563eb; }
            .info { color: #666; font-size: 14px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Your Logo: ${filename}</h2>
            <p>Long-press the image below to save it to your device.</p>
            <img src="${dataUrl}" alt="${filename}" />
            <a href="${dataUrl}" download="${filename}" class="download-btn">Download ${filename}</a>
            <p class="info">If download doesn't work, long-press the image above and select "Save Image" or "Add to Photos".</p>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  } else {
    // If popup is blocked, alert user
    alert(
      'Please allow popups to download the file. Alternatively, right-click the logo and select "Save Image As..."',
    );
  }
}

/**
 * Converts a Blob to a data URL
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Converts canvas.toBlob to Promise-based API
 */
export function canvasToBlobAsync(
  canvas: HTMLCanvasElement,
  type?: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      },
      type,
      quality,
    );
  });
}

/**
 * Downloads an SVG element as SVG file
 */
export async function downloadSVG(
  svgElement: SVGElement,
  filename: string,
): Promise<void> {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });

  // Create data URL as fallback for mobile
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgData)}`;

  await downloadFile(svgBlob, filename, dataUrl);
}

/**
 * Downloads an SVG element as PNG file
 */
export async function downloadPNG(
  svgElement: SVGElement,
  filename: string,
  backgroundColor?: string,
): Promise<void> {
  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Get the actual rendered size of the SVG
  const rect = svgElement.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height, 600); // Max 600px for good quality

  canvas.width = size;
  canvas.height = size;

  // Serialize SVG and ensure it's properly encoded
  const svgData = new XMLSerializer().serializeToString(svgElement);

  // Create data URL directly instead of blob URL to avoid CORS issues
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;

  try {
    // Load SVG into image using data URL
    await new Promise<void>((resolve, reject) => {
      const img = new Image();

      // Set longer timeout for complex images
      const timeout = setTimeout(() => {
        reject(new Error("SVG image load timeout"));
      }, 10000);

      img.onload = () => {
        clearTimeout(timeout);
        try {
          // Draw background
          ctx.fillStyle = backgroundColor || "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw image
          ctx.drawImage(img, 0, 0, size, size);

          resolve();
        } catch (drawError) {
          reject(new Error(`Failed to draw image: ${drawError}`));
        }
      };

      img.onerror = (error) => {
        clearTimeout(timeout);
        console.error("Image load error:", error);
        reject(
          new Error(
            "Failed to load SVG image - may contain external references",
          ),
        );
      };

      // Use data URL to avoid CORS issues
      img.src = svgDataUrl;
    });

    // Convert canvas to blob
    const blob = await canvasToBlobAsync(canvas, "image/png", 1.0);

    // Create data URL as fallback for mobile
    const dataUrl = canvas.toDataURL("image/png", 1.0);

    // Download the file
    await downloadFile(blob, filename, dataUrl);
  } catch (error) {
    console.error("PNG conversion failed:", error);
    // Provide user-friendly error message
    throw new Error(
      "PNG conversion failed. The logo may contain external images that cannot be converted. Try downloading as SVG instead.",
    );
  }
}
