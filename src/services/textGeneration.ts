import { LogoSettings } from './aiLogoService';

/**
 * Text Generation Service
 * Handles AI prompt construction with modular components
 * Priority-based system ensures critical elements (spelling) are never dropped
 */

export interface PromptComponent {
  name: string;
  priority: number;
  content: string;
  length: number;
}

export class TextGenerationService {
  private readonly MAX_LENGTH = 950; // Leave buffer under 1000 char API limit

  /**
   * Main entry point - builds optimized prompt from components
   */
  public buildPrompt(basePrompt: string, settings?: LogoSettings): string {
    if (!settings) return basePrompt;

    const components = this.buildAllComponents(basePrompt, settings);
    const optimizedPrompt = this.assembleOptimizedPrompt(components);
    
    this.logPromptDebugInfo(optimizedPrompt, components);
    return optimizedPrompt;
  }

  /**
   * Builds all available prompt components
   */
  private buildAllComponents(basePrompt: string, settings: LogoSettings): PromptComponent[] {
    const components: PromptComponent[] = [];

    // Add base prompt as foundation
    components.push({
      name: 'base',
      priority: 0,
      content: basePrompt,
      length: basePrompt.length
    });

    // Priority 1: Text replacement and branding (CRITICAL)
    const textComponent = this.buildTextReplacementComponent(settings);
    if (textComponent) components.push(textComponent);

    // Priority 2: Spelling accuracy (CRITICAL)  
    const spellingComponent = this.buildSpellingComponent(settings);
    if (spellingComponent) components.push(spellingComponent);

    // Priority 3: Style and visual design (IMPORTANT)
    const styleComponent = this.buildStyleComponent(settings);
    if (styleComponent) components.push(styleComponent);

    // Priority 4: Colors (NICE TO HAVE)
    const colorComponent = this.buildColorComponent(settings);
    if (colorComponent) components.push(colorComponent);

    // Priority 5: Effects and transforms (OPTIONAL)
    const effectComponent = this.buildEffectComponent(settings);
    if (effectComponent) components.push(effectComponent);

    // Priority 6: Anti-gibberish cleanup (CLEANUP)
    const cleanupComponent = this.buildCleanupComponent(settings);
    if (cleanupComponent) components.push(cleanupComponent);

    return components.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Assembles components in priority order until length limit reached
   */
  private assembleOptimizedPrompt(components: PromptComponent[]): string {
    let assembledPrompt = '';
    let totalLength = 0;
    const includedComponents: string[] = [];

    for (const component of components) {
      const newLength = totalLength + component.length;
      
      if (newLength <= this.MAX_LENGTH) {
        if (component.priority === 0) {
          // Base prompt - apply text replacements if we have them
          const textReplacement = components.find(c => c.name === 'textReplacement');
          if (textReplacement) {
            assembledPrompt = this.applyTextReplacements(component.content, textReplacement);
          } else {
            assembledPrompt = component.content;
          }
        } else {
          assembledPrompt += component.content;
        }
        
        totalLength = assembledPrompt.length; // Recalculate after replacements
        includedComponents.push(component.name);
      } else {
        console.warn(`⚠️ Skipping component '${component.name}' - would exceed length limit`);
      }
    }

    // Ensure it's clearly a logo
    if (!assembledPrompt.toLowerCase().includes('logo')) {
      if (totalLength + 5 <= this.MAX_LENGTH) {
        assembledPrompt += ' logo';
      }
    }

    return assembledPrompt;
  }

  /**
   * Component Builders - Each handles specific aspect of prompt construction
   */

  private buildTextReplacementComponent(settings: LogoSettings): PromptComponent | null {
    if (!settings.textOverlay?.trim()) return null;

    const text = settings.textOverlay;
    const prefix = `${text}: `;
    
    return {
      name: 'textReplacement',
      priority: 1,
      content: prefix,
      length: prefix.length
    };
  }

  private buildSpellingComponent(settings: LogoSettings): PromptComponent | null {
    if (!settings.textOverlay?.trim()) return null;

    const text = settings.textOverlay;
    const content = `. Show "${text}" ONLY, no other text anywhere. No small print, no border text, no gibberish.`;
    
    return {
      name: 'spelling',
      priority: 2,
      content,
      length: content.length
    };
  }

  private buildStyleComponent(settings: LogoSettings): PromptComponent | null {
    const styles: string[] = [];
    
    if (settings.typography && settings.typography !== 'modern') {
      styles.push(settings.typography);
    }
    if (settings.shape && settings.shape !== 'circle') {
      styles.push(settings.shape);
    }
    
    if (styles.length === 0) return null;
    
    const content = `, ${styles.join(' ')} style`;
    return {
      name: 'style',
      priority: 3,
      content,
      length: content.length
    };
  }

  private buildColorComponent(settings: LogoSettings): PromptComponent | null {
    const colors: string[] = [];
    
    if (settings.logoColor && settings.logoColor !== '#3b82f6') {
      colors.push(`color ${settings.logoColor}`);
    }
    if (settings.textColor) {
      colors.push(`text ${settings.textColor}`);
    }
    
    if (colors.length === 0) return null;
    
    const content = `, ${colors.join(', ')}`;
    return {
      name: 'color',
      priority: 4,
      content,
      length: content.length
    };
  }

  private buildEffectComponent(settings: LogoSettings): PromptComponent | null {
    const effects: string[] = [];
    
    if (settings.effects?.trim()) {
      effects.push(settings.effects);
    }
    if (settings.rotation && settings.rotation !== 0) {
      effects.push(`${settings.rotation}° rotated`);
    }
    
    if (effects.length === 0) return null;
    
    const content = `, ${effects.join(', ')}`;
    return {
      name: 'effects',
      priority: 5,
      content,
      length: content.length
    };
  }

  private buildCleanupComponent(_settings: LogoSettings): PromptComponent | null {
    const content = '. Clean design, no small text, no decorative words, no border text.';
    return {
      name: 'cleanup',
      priority: 6,
      content,
      length: content.length
    };
  }

  /**
   * Helper Methods
   */

  private applyTextReplacements(basePrompt: string, textComponent: PromptComponent): string {
    const settings = textComponent.content.replace(': ', '').trim();
    // Replace any instance of "logo" in the base prompt with our specific text
    let modifiedPrompt = basePrompt.replace(/\blogos?\b/gi, `"${settings}"`);
    return textComponent.content + modifiedPrompt;
  }

  private logPromptDebugInfo(prompt: string, components: PromptComponent[]): void {
    console.log(`📏 Final prompt length: ${prompt.length}/1000 characters`);
    console.log(`🔍 Final prompt preview:`, prompt.substring(0, 200) + '...');
    console.log(`🧩 Included components:`, components.map(c => c.name).join(', '));
  }

  /**
   * Utility Methods for Advanced Use Cases
   */

  public getPromptLengthEstimate(basePrompt: string, settings?: LogoSettings): number {
    if (!settings) return basePrompt.length;
    const components = this.buildAllComponents(basePrompt, settings);
    return components.reduce((total, comp) => total + comp.length, 0);
  }

  public getAvailableComponents(settings: LogoSettings): string[] {
    const components = this.buildAllComponents('', settings);
    return components.filter(c => c.name !== 'base').map(c => c.name);
  }
}

// Export singleton instance
export const textGenerationService = new TextGenerationService();