// Comprehensive logo settings interface for AI generation
export interface LogoSettings {
  // Foundation settings
  brandName?: string;
  logoColor: string;
  backgroundColor: string;

  // Style settings
  typography: string;
  shape: string;

  // Text and overlays
  textOverlay?: string;
  textColor?: string;
  textSize?: number;

  // Visual effects
  effects?: string;
  transparency?: number;
  rotation?: number;

  // Layout
  position?: string;
  padding?: {
    x: number;
    y: number;
  };
}

// AI service for logo generation using secure backend API
export class AILogoService {
  private apiBaseUrl: string;

  constructor() {
    // Use environment variable for API URL, with fallback for development
    this.apiBaseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

    console.log("🔗 API Base URL:", this.apiBaseUrl);
    console.log("🌍 Environment:", import.meta.env.MODE);
  }

  isConfigured(): boolean {
    // Always return true since we're using backend API
    return true;
  }

  async generateLogos(
    prompt: string,
    logoSettings?: LogoSettings,
  ): Promise<string[]> {
    console.log("🎯 generateLogos called with prompt:", prompt);
    console.log("🔧 Logo settings:", logoSettings);

    // Enhance the prompt with detailed settings for better AI generation
    const enhancedPrompt = this.enhancePromptWithSettings(prompt, logoSettings);
    console.log("🚀 Enhanced prompt:", enhancedPrompt);

    try {
      console.log("🤖 Generating AI logos via secure backend API...");

      const response = await fetch(`${this.apiBaseUrl}/api/generate-logo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          logoSettings: logoSettings,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.success && data.images && data.images.length > 0) {
        console.log(
          `✅ Generated ${data.images.length} AI logos successfully via backend!`,
        );
        console.log(
          "🖼️ First result preview:",
          data.images[0].substring(0, 50) + "...",
        );

        if (data.failedCount > 0) {
          console.warn(
            `⚠️ ${data.failedCount} logo generations failed on backend`,
          );
        }

        return data.images;
      } else {
        console.log("❌ Backend returned no images, falling back to mocks");
        throw new Error("No images returned from backend");
      }
    } catch (error) {
      console.error("🚨 BACKEND API ERROR:", error);
      return this.handleGenerationError(error, prompt, logoSettings);
    }
  }

  private async handleGenerationError(
    error: any,
    prompt: string,
    logoSettings?: LogoSettings,
  ): Promise<string[]> {
    console.error("❌ Backend logo generation failed:", error);

    // Check for specific error types and provide helpful messages
    const errorMessage = error.message || String(error);

    if (errorMessage.includes("Too many requests")) {
      console.warn(
        "⏱️ Rate limit exceeded on backend. Please try again in a moment.",
      );
    } else if (errorMessage.includes("billing")) {
      console.warn(
        "💳 Billing issue detected on backend. Please contact administrator.",
      );
    } else if (
      errorMessage.includes("Failed to fetch") ||
      errorMessage.includes("NetworkError")
    ) {
      console.warn(
        "🌐 Network error - backend may be unavailable. Using mock logos.",
      );
    } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
      console.warn("🔑 Authentication failed on backend.");
    } else {
      console.warn("⚠️ Backend API error:", errorMessage);
    }

    // Return fallback mock logos
    return this.getMockLogos(prompt, logoSettings);
  }

  private getMockLogos(prompt: string, logoSettings?: LogoSettings): string[] {
    console.log("🎭 Generating mock logos as fallback");

    // Enhanced mock logic that uses the actual settings if provided
    const settings = {
      color: logoSettings?.logoColor || "#3b82f6",
      backgroundColor: logoSettings?.backgroundColor || "#ffffff",
      typography: logoSettings?.typography || "Arial",
      shape: logoSettings?.shape || "circle",
    };

    // Generate 4 mock SVG logos with variety
    return Array.from({ length: 4 }, (_, index) => {
      // Use user's color settings or fallback to defaults
      const primaryColor = settings.color;
      const bgColor = settings.backgroundColor;
      const shapeType = settings.shape;

      // Create different variations
      const isCircle = shapeType === "circle";
      const variations = ["solid", "outline", "gradient", "minimal"];
      const variation = variations[index % variations.length];

      // Use provided logo settings, or extract from prompt as fallback
      const logoText =
        prompt.split(" ").slice(0, 2).join(" ").toUpperCase().substring(0, 8) ||
        "LOGO";

      let svgContent;

      if (isCircle) {
        // Circle-based designs
        if (variation === "gradient") {
          svgContent = `
            <defs>
              <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${primaryColor}CC;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="url(#grad${index})" stroke="${primaryColor}" stroke-width="3"/>
            <text x="200" y="215" font-family="${settings.typography}, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="${bgColor}">${logoText}</text>
          `;
        } else if (variation === "outline") {
          svgContent = `
            <circle cx="200" cy="200" r="180" fill="none" stroke="${primaryColor}" stroke-width="6"/>
            <circle cx="200" cy="200" r="140" fill="none" stroke="${primaryColor}" stroke-width="2"/>
            <text x="200" y="215" font-family="${settings.typography}, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="${primaryColor}">${logoText}</text>
          `;
        } else {
          svgContent = `
            <circle cx="200" cy="200" r="180" fill="${primaryColor}" stroke="${primaryColor}" stroke-width="2"/>
            <text x="200" y="215" font-family="${settings.typography}, sans-serif" font-size="26" font-weight="bold" text-anchor="middle" fill="${bgColor}">${logoText}</text>
          `;
        }
      } else {
        // Square/rectangle-based designs
        if (variation === "gradient") {
          svgContent = `
            <defs>
              <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${primaryColor}AA;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect x="40" y="40" width="320" height="320" rx="20" fill="url(#grad${index})" stroke="${primaryColor}" stroke-width="3"/>
            <text x="200" y="215" font-family="${settings.typography}, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="${bgColor}">${logoText}</text>
          `;
        } else if (variation === "outline") {
          svgContent = `
            <rect x="40" y="40" width="320" height="320" rx="20" fill="none" stroke="${primaryColor}" stroke-width="6"/>
            <rect x="70" y="70" width="260" height="260" rx="15" fill="none" stroke="${primaryColor}" stroke-width="2"/>
            <text x="200" y="215" font-family="${settings.typography}, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="${primaryColor}">${logoText}</text>
          `;
        } else {
          svgContent = `
            <rect x="40" y="40" width="320" height="320" rx="20" fill="${primaryColor}" stroke="${primaryColor}" stroke-width="2"/>
            <text x="200" y="215" font-family="${settings.typography}, sans-serif" font-size="26" font-weight="bold" text-anchor="middle" fill="${bgColor}">${logoText}</text>
          `;
        }
      }

      const svg = `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="${bgColor}"/>
          ${svgContent}
        </svg>
      `;

      return `data:image/svg+xml;base64,${btoa(svg)}`;
    });
  }

  private enhancePromptWithSettings(
    prompt: string,
    settings?: LogoSettings,
  ): string {
    if (!settings) return prompt;

    let enhancedPrompt = prompt;

    // Add brand name to prompt
    if (settings.brandName && settings.brandName.trim()) {
      enhancedPrompt = `${settings.brandName} logo: ${enhancedPrompt}`;
    }

    // Add color specifications
    const colorDetails: string[] = [];
    if (settings.logoColor && settings.logoColor !== "#3b82f6") {
      colorDetails.push(`primary color ${settings.logoColor}`);
    }
    if (settings.backgroundColor && settings.backgroundColor !== "#ffffff") {
      colorDetails.push(`background ${settings.backgroundColor}`);
    }
    if (settings.textColor) {
      colorDetails.push(`text color ${settings.textColor}`);
    }

    // Add style specifications
    const styleDetails: string[] = [];
    if (settings.typography && settings.typography !== "modern") {
      styleDetails.push(`${settings.typography} typography`);
    }
    if (settings.shape && settings.shape !== "circle") {
      styleDetails.push(`${settings.shape} shape`);
    }

    // Add visual effects
    const effectDetails: string[] = [];
    if (settings.effects && settings.effects.trim()) {
      effectDetails.push(`with ${settings.effects} effects`);
    }
    if (settings.rotation && settings.rotation !== 0) {
      effectDetails.push(`rotated ${settings.rotation} degrees`);
    }
    if (settings.transparency && settings.transparency !== 100) {
      effectDetails.push(`${settings.transparency}% opacity`);
    }

    // Add text overlay
    if (settings.textOverlay && settings.textOverlay.trim()) {
      enhancedPrompt += `, including text "${settings.textOverlay}"`;
    }

    // Combine all enhancements
    const allDetails = [...colorDetails, ...styleDetails, ...effectDetails];
    if (allDetails.length > 0) {
      enhancedPrompt += `, ${allDetails.join(", ")}`;
    }

    // Add positioning hints
    if (settings.position && settings.position !== "center") {
      enhancedPrompt += `, positioned ${settings.position}`;
    }

    // Ensure it's clearly a logo
    if (!enhancedPrompt.toLowerCase().includes("logo")) {
      enhancedPrompt += " logo design";
    }

    return enhancedPrompt;
  }

  getStatus(): { configured: boolean; mode: string; message: string } {
    return {
      configured: true,
      mode: "Backend API",
      message: "✨ AI generation enabled via secure backend",
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/health`);
      return response.ok;
    } catch (error) {
      console.error("Backend connection test failed:", error);
      return false;
    }
  }
}

// Export singleton instance
export const aiLogoService = new AILogoService();
