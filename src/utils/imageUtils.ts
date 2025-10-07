/**
 * Utility functions for handling image conversion and embedding
 */

/**
 * Converts an external image URL to a base64 data URL
 * This ensures images are embedded directly in SVGs rather than referenced externally
 */
export async function convertImageToDataUrl(imageUrl: string): Promise<string> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the image as a blob
    const blob = await response.blob();

    // Convert blob to base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to data URL"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image blob"));
      };

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to data URL:", error);
    throw error;
  }
}

/**
 * Converts multiple image URLs to data URLs in parallel
 */
export async function convertImagesToDataUrls(
  imageUrls: string[],
): Promise<{ [key: string]: string }> {
  const promises = imageUrls.map(async (url) => {
    try {
      const dataUrl = await convertImageToDataUrl(url);
      return { url, dataUrl };
    } catch (error) {
      console.error(`Failed to convert image ${url}:`, error);
      return { url, dataUrl: url }; // Fallback to original URL
    }
  });

  const results = await Promise.all(promises);

  return results.reduce(
    (acc, { url, dataUrl }) => {
      acc[url] = dataUrl;
      return acc;
    },
    {} as { [key: string]: string },
  );
}

/**
 * Checks if a URL is a data URL (already embedded)
 */
export function isDataUrl(url: string): boolean {
  return url.startsWith("data:");
}

/**
 * Checks if a URL appears to be an external/temporary image URL
 */
export function isExternalImageUrl(url: string): boolean {
  return (
    !isDataUrl(url) && (url.startsWith("http://") || url.startsWith("https://"))
  );
}
