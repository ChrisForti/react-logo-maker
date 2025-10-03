import OpenAI from "openai";

// Logo settings interface for AI generation
interface LogoSettings {
  text?: string;
  color?: string;
  backgroundColor?: string;
  shape?: string;
  style?: string;
  size?: number;
}

// Color conversion utilities
function convertColorToHex(color: string): string {
  if (!color) return "";

  // If already hex, just remove # and return
  if (color.startsWith("#")) {
    return color.replace("#", "");
  }

  // If RGB format like "rgb(255, 0, 0)" or "rgba(255, 0, 0, 1)"
  const rgbMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/,
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // If just a color name or unknown format, return as is
  return color.replace("#", "");
}

// AI service for logo generationort OpenAI from "openai";

// AI service for logo generation
export class AILogoService {
  private openai: OpenAI | null = null;

  constructor() {
    // Only initialize OpenAI if API key is available
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log(
      "🔑 API Key check:",
      apiKey ? `Found key: ${apiKey.substring(0, 20)}...` : "No API key found",
    );
    console.log("🔢 API Key length:", apiKey ? apiKey.length : 0);
    console.log(
      "🔍 API Key starts with sk-:",
      apiKey ? apiKey.startsWith("sk-") : false,
    );

    if (apiKey && apiKey.length > 20) {
      // Ensure it's a real key, not just a placeholder
      console.log("✅ Initializing OpenAI client with real API key");
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // Note: In production, API calls should go through your backend
      });
    } else {
      console.log(
        "❌ OpenAI client not initialized - API key missing or invalid",
      );
    }
  }

  async generateLogos(
    prompt: string,
    logoSettings?: LogoSettings,
  ): Promise<string[]> {
    console.log("🎯 generateLogos called with prompt:", prompt);
    console.log("🤖 OpenAI client exists:", !!this.openai);
    console.log("🔧 isConfigured():", this.isConfigured());

    // If no OpenAI client, return mock data
    if (!this.openai) {
      console.warn(
        "🎨 OpenAI API key not configured - using professional mock designs",
      );
      return this.getMockLogos(prompt, logoSettings);
    }

    try {
      console.log("🤖 Generating AI logos with OpenAI DALL-E 3...");
      const enhancedPrompt = this.enhancePromptForLogo(prompt, logoSettings);

      console.log("📝 Enhanced prompt:", enhancedPrompt);
      console.log("🔄 Starting API calls to OpenAI..."); // Generate multiple variations with different styles
      const styles: Array<"vivid" | "natural"> = ["vivid", "natural"];
      const promises = Array.from({ length: 4 }, (_, index) =>
        this.generateSingleLogo(enhancedPrompt, styles[index % 2]),
      );

      const results = await Promise.allSettled(promises);

      const successfulResults = results
        .filter(
          (result): result is PromiseFulfilledResult<string> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);

      const failedResults = results.filter(
        (result) => result.status === "rejected",
      ) as PromiseRejectedResult[];
      const failedCount = failedResults.length;

      if (failedCount > 0) {
        console.warn(
          `⚠️ ${failedCount} logo generations failed, got ${successfulResults.length} successful results`,
        );
        failedResults.forEach((failed, index) => {
          console.error(`❌ API Call ${index + 1} failed:`, failed.reason);
        });
      }

      // If we got some results, return them. Otherwise fallback to mock.
      if (successfulResults.length > 0) {
        console.log(
          `✅ Generated ${successfulResults.length} AI logos successfully!`,
        );
        console.log(
          "🖼️ First result preview:",
          successfulResults[0].substring(0, 50) + "...",
        );
        return successfulResults;
      } else {
        console.log(
          "❌ All AI generation attempts failed, falling back to mocks",
        );
        throw new Error("All logo generation attempts failed");
      }
    } catch (error) {
      console.error("🚨 MAIN GENERATION ERROR:", error);
      return this.handleGenerationError(error, prompt, logoSettings);
    }
  }

  private async generateSingleLogo(
    prompt: string,
    style: "vivid" | "natural",
  ): Promise<string> {
    if (!this.openai) {
      throw new Error("OpenAI client not initialized");
    }

    console.log(`🎨 Calling DALL-E API with style: ${style}`);
    try {
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1, // DALL-E 3 only supports n=1
        size: "1024x1024",
        style: style,
        response_format: "url",
        quality: "standard", // or "hd" for higher quality (more expensive)
      });

      console.log(`✅ DALL-E API call successful for ${style} style`);
      console.log("📦 Response data:", response.data);

      const imageUrl = response.data?.[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL returned from OpenAI");
      }

      console.log(`🔗 Got image URL: ${imageUrl.substring(0, 50)}...`);
      return imageUrl;
    } catch (apiError) {
      console.error(`❌ DALL-E API call failed for ${style} style:`, apiError);
      throw apiError;
    }
  }

  private async handleGenerationError(
    error: any,
    prompt: string,
    logoSettings?: LogoSettings,
  ): Promise<string[]> {
    console.error("❌ OpenAI logo generation failed:", error);

    // Check for specific error types and provide helpful messages
    if (error.message?.includes("Billing hard limit has been reached")) {
      console.warn(
        "💳 Billing limit reached. Please check your OpenAI billing settings at https://platform.openai.com/settings/organization/billing",
      );
    } else if (error.message?.includes("insufficient_quota")) {
      console.warn(
        "� Insufficient quota. Please add credits to your OpenAI account.",
      );
    } else if (error.message?.includes("rate_limit")) {
      console.warn("⏱️ Rate limit exceeded. Please try again in a moment.");
    } else if (error.message?.includes("401")) {
      console.warn("� Authentication failed. Please check your API key.");
    }

    // Return fallback mock logos
    return this.getMockLogos(prompt, logoSettings);
  }

  private enhancePromptForLogo(
    userPrompt: string,
    logoSettings?: LogoSettings,
  ): string {
    // Build specific instructions from user settings
    const textInstruction = logoSettings?.text
      ? `Include the text "${logoSettings.text}" prominently in the logo design.`
      : "";

    const colorInstruction = logoSettings?.color
      ? `Use ${logoSettings.color} (hex: #${convertColorToHex(logoSettings.color)}) as the primary brand color.`
      : "";

    const styleInstruction = logoSettings?.style
      ? `Apply ${logoSettings.style} typography style.`
      : "";

    const shapeInstruction = logoSettings?.shape
      ? `Incorporate ${logoSettings.shape} geometric shapes or elements.`
      : "";

    const bgInstruction =
      logoSettings?.backgroundColor &&
      logoSettings.backgroundColor !== "#ffffff"
        ? `Place on a ${logoSettings.backgroundColor} (hex: #${convertColorToHex(logoSettings.backgroundColor)}) background.`
        : "Place on a clean white background.";

    // Enhanced prompt for better DALL-E 3 results
    return `Create a professional business logo for "${userPrompt}". ${textInstruction} ${colorInstruction} ${styleInstruction} ${shapeInstruction} ${bgInstruction}

Design requirements:
- Modern, clean, and minimalist aesthetic
- Vector-style with crisp edges and clean geometry
- Professional appearance suitable for corporate branding
- High contrast and excellent readability
- Scalable design that works from business cards to billboards
- Memorable and distinctive visual identity
- Appropriate negative space usage
- Balanced composition and visual hierarchy

Style guidelines:
- Avoid overly complex details or photorealistic elements
- Use flat design principles with subtle depth if needed
- Ensure the logo works in both color and monochrome versions
- Create a timeless design that won't quickly become dated
- Focus on symbolic representation rather than literal imagery`;
  }

  private getMockLogos(
    prompt: string,
    logoSettings?: LogoSettings,
  ): Promise<string[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate more varied mock images with different colors and styles
        const colors = [
          "3b82f6",
          "8b5cf6",
          "10b981",
          "f59e0b",
          "ef4444",
          "ec4899",
          "06b6d4",
          "84cc16",
        ];

        const mockImages = Array.from({ length: 4 }, (_, index) => {
          // Use user's color settings or fallback to defaults
          const userColor = logoSettings?.color
            ? convertColorToHex(logoSettings.color)
            : colors[index % colors.length];
          const color = userColor;
          const accentColor = logoSettings?.backgroundColor
            ? convertColorToHex(logoSettings.backgroundColor)
            : colors[(index + 2) % colors.length];

          // Use provided logo settings, or extract from prompt as fallback
          const brandName =
            logoSettings?.text ||
            prompt
              .toLowerCase()
              .split(" ")
              .filter((word) => word.length > 2)[0] ||
            "LOGO";
          const brandInitial = brandName.charAt(0).toUpperCase();

          // Create professional, modern logo variations
          const logoVariations = [
            // Modern circular badge with gradient effect
            `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#${accentColor};stop-opacity:1" />
                </radialGradient>
                <filter id="shadow1" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
                </filter>
              </defs>
              <rect width="300" height="300" fill="white"/>
              <circle cx="150" cy="130" r="55" fill="url(#grad1)" filter="url(#shadow1)"/>
              <circle cx="150" cy="130" r="45" fill="none" stroke="white" stroke-width="3" opacity="0.8"/>
              <text x="150" y="140" text-anchor="middle" fill="white" font-family="Arial Black, sans-serif" font-size="28" font-weight="900">${brandInitial}</text>
              <text x="150" y="220" text-anchor="middle" fill="#${color}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" letter-spacing="2px">${brandName.toUpperCase()}</text>
              <rect x="120" y="230" width="60" height="2" fill="#${accentColor}"/>
            </svg>`,

            // Geometric hexagon logo
            `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#${accentColor};stop-opacity:1" />
                </linearGradient>
                <filter id="shadow2" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.2"/>
                </filter>
              </defs>
              <rect width="300" height="300" fill="white"/>
              <polygon points="150,70 190,95 190,145 150,170 110,145 110,95" fill="url(#grad2)" filter="url(#shadow2)"/>
              <polygon points="150,85 175,100 175,130 150,145 125,130 125,100" fill="white" opacity="0.9"/>
              <text x="150" y="125" text-anchor="middle" fill="#${color}" font-family="Arial Black, sans-serif" font-size="16" font-weight="900">${brandInitial}</text>
              <text x="150" y="210" text-anchor="middle" fill="#${color}" font-family="Arial, sans-serif" font-size="20" font-weight="bold">${brandName.toUpperCase()}</text>
              <text x="150" y="230" text-anchor="middle" fill="#${accentColor}" font-family="Arial, sans-serif" font-size="10" font-weight="normal" opacity="0.8">INNOVATION</text>
            </svg>`,

            // Minimalist text with accent
            `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow3" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#000" flood-opacity="0.1"/>
                </filter>
              </defs>
              <rect width="300" height="300" fill="white"/>
              <text x="150" y="140" text-anchor="middle" fill="#${color}" font-family="Arial Black, sans-serif" font-size="32" font-weight="900" filter="url(#shadow3)">${brandName.toUpperCase()}</text>
              <rect x="100" y="155" width="100" height="4" fill="#${accentColor}"/>
              <circle cx="85" cy="157" r="6" fill="#${accentColor}"/>
              <circle cx="215" cy="157" r="6" fill="#${accentColor}"/>
              <text x="150" y="185" text-anchor="middle" fill="#666" font-family="Arial, sans-serif" font-size="11" font-weight="normal" letter-spacing="3px">PROFESSIONAL</text>
            </svg>`,

            // Modern shield/crest design
            `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#${accentColor};stop-opacity:1" />
                </linearGradient>
                <filter id="shadow4" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.25"/>
                </filter>
              </defs>
              <rect width="300" height="300" fill="white"/>
              <path d="M150 75 L110 95 L110 140 Q110 170 150 185 Q190 170 190 140 L190 95 Z" fill="url(#grad4)" filter="url(#shadow4)"/>
              <path d="M150 85 L125 100 L125 135 Q125 155 150 165 Q175 155 175 135 L175 100 Z" fill="white" opacity="0.15"/>
              <text x="150" y="135" text-anchor="middle" fill="white" font-family="Arial Black, sans-serif" font-size="24" font-weight="900">${brandInitial}</text>
              <text x="150" y="215" text-anchor="middle" fill="#${color}" font-family="Arial, sans-serif" font-size="18" font-weight="bold">${brandName.toUpperCase()}</text>
              <text x="150" y="235" text-anchor="middle" fill="#${accentColor}" font-family="Arial, sans-serif" font-size="9" font-weight="normal" opacity="0.8">EST. 2024</text>
            </svg>`,
          ];

          const svgContent = logoVariations[index % logoVariations.length];
          return `data:image/svg+xml;base64,${btoa(svgContent)}`;
        });

        resolve(mockImages);
      }, 1500);
    });
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }

  getStatus(): { configured: boolean; mode: string; message: string } {
    if (this.openai) {
      return {
        configured: true,
        mode: "AI",
        message: "✨ AI generation enabled with OpenAI DALL-E 3",
      };
    } else {
      return {
        configured: false,
        mode: "Mock",
        message:
          "🎨 Using professional mock designs (add API key for AI generation)",
      };
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.openai) {
      return false;
    }

    try {
      // Test with a simple, low-cost generation
      await this.openai.images.generate({
        model: "dall-e-3",
        prompt: "simple test image",
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });
      return true;
    } catch (error) {
      console.error("OpenAI connection test failed:", error);
      return false;
    }
  }
}

// Export singleton instance
export const aiLogoService = new AILogoService();
