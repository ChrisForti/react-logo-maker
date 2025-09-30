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
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // Note: In production, API calls should go through your backend
      });
    }
  }

  async generateLogos(
    prompt: string,
    logoSettings?: LogoSettings,
  ): Promise<string[]> {
    // If no OpenAI client, return mock data
    if (!this.openai) {
      console.warn("OpenAI API key not found, using mock data");
      return this.getMockLogos(prompt, logoSettings);
    }
    try {
      const enhancedPrompt = this.enhancePromptForLogo(prompt, logoSettings);

      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1, // DALL-E 3 only supports n=1
        size: "1024x1024",
        style: "vivid", // or "natural"
        response_format: "url",
      });

      // Generate multiple variations by calling the API multiple times
      const promises = Array.from({ length: 3 }, () =>
        this.openai!.images.generate({
          model: "dall-e-3",
          prompt: enhancedPrompt,
          n: 1,
          size: "1024x1024",
          style: Math.random() > 0.5 ? "vivid" : "natural",
          response_format: "url",
        }),
      );

      const results = await Promise.all([response, ...promises]);

      return results
        .map((result) => result.data?.[0]?.url)
        .filter((url): url is string => url !== undefined);
    } catch (error) {
      console.error("Error generating AI logos:", error);
      // Fallback to mock data on error
      return this.getMockLogos(prompt, logoSettings);
    }
  }

  private enhancePromptForLogo(
    userPrompt: string,
    logoSettings?: LogoSettings,
  ): string {
    const textInstruction = logoSettings?.text
      ? `The logo should incorporate the text "${logoSettings.text}" as the main brand name.`
      : "";

    const colorInstruction = logoSettings?.color
      ? `Use ${logoSettings.color} (hex: #${convertColorToHex(logoSettings.color)}) as the primary color.`
      : "";

    const styleInstruction = logoSettings?.style
      ? `Apply ${logoSettings.style} font family/style.`
      : "";

    const shapeInstruction = logoSettings?.shape
      ? `Incorporate ${logoSettings.shape} geometric elements.`
      : "";

    const bgInstruction = logoSettings?.backgroundColor
      ? `Use ${logoSettings.backgroundColor} (hex: #${convertColorToHex(logoSettings.backgroundColor)}) as the background color.`
      : "";

    return `Create a professional business logo ${userPrompt}. ${textInstruction} ${colorInstruction} ${styleInstruction} ${shapeInstruction} ${bgInstruction} The logo should be:
- Clean and minimalist design
- Suitable for use on business cards, websites, and merchandise  
- Vector-style with clean lines
- Professional and modern appearance
- High contrast and readable
- Appropriate for corporate branding
- Simple enough to work in both large and small sizes`;
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
}

// Export singleton instance
export const aiLogoService = new AILogoService();
