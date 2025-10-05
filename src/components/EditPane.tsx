import React from "react";
import { AIImageGallery } from "./AIImageGallery";
import InfoTooltip from "./InfoTooltip";

type StringInputProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type NumberInputProps = {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
};

type EditPaneProps = {
  shapeInput: StringInputProps;
  textInput: StringInputProps;
  styleInput: StringInputProps;
  positionInput: StringInputProps;
  rotationInput: NumberInputProps;
  transparencyInput: NumberInputProps;
  effectsInput: StringInputProps;
  imgUploadInput: StringInputProps;
  imgFilterinput: StringInputProps;
  animationInput: StringInputProps;
  marginInput: NumberInputProps;
  brandInput: StringInputProps;
  colorInputs: StringInputProps[];
  sizeInputs: NumberInputProps[];
  paddingInputs: NumberInputProps[];
  // Toggle props
  showBrand: boolean;
  setShowBrand: React.Dispatch<React.SetStateAction<boolean>>;
  showShape: boolean;
  setShowShape: React.Dispatch<React.SetStateAction<boolean>>;
  showText: boolean;
  setShowText: React.Dispatch<React.SetStateAction<boolean>>;
  showBorder: boolean;
  setShowBorder: React.Dispatch<React.SetStateAction<boolean>>;
  showBackground: boolean;
  setShowBackground: React.Dispatch<React.SetStateAction<boolean>>;
  showStyle: boolean;
  setShowStyle: React.Dispatch<React.SetStateAction<boolean>>;
  showPosition: boolean;
  setShowPosition: React.Dispatch<React.SetStateAction<boolean>>;
  showRotation: boolean;
  setShowRotation: React.Dispatch<React.SetStateAction<boolean>>;
  showTransparency: boolean;
  setShowTransparency: React.Dispatch<React.SetStateAction<boolean>>;
  showEffects: boolean;
  setShowEffects: React.Dispatch<React.SetStateAction<boolean>>;
  showImageUpload: boolean;
  setShowImageUpload: React.Dispatch<React.SetStateAction<boolean>>;
  showImageFilter: boolean;
  setShowImageFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showAnimation: boolean;
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  showMargin: boolean;
  setShowMargin: React.Dispatch<React.SetStateAction<boolean>>;
  showPadding: boolean;
  setShowPadding: React.Dispatch<React.SetStateAction<boolean>>;
  showSize: boolean;
  setShowSize: React.Dispatch<React.SetStateAction<boolean>>;
  // AI Generation props
  aiInput: StringInputProps;
  aiGeneratedImages: string[];
  setAiGeneratedImages: React.Dispatch<React.SetStateAction<string[]>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  showAiGeneration: boolean;
  setShowAiGeneration: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAiImage: React.Dispatch<React.SetStateAction<string>>;
  selectedAiImage: string;
  onOpenGalleryModal: () => void;
};

export default function EditPane({
  brandInput,
  shapeInput,
  textInput,
  styleInput,
  positionInput,
  rotationInput,
  transparencyInput,
  effectsInput,
  imgUploadInput,
  imgFilterinput,
  animationInput,
  marginInput,
  colorInputs,
  sizeInputs,
  paddingInputs,
  showBrand,
  setShowBrand,
  showShape,
  setShowShape,
  showText,
  setShowText,
  showBorder,
  setShowBorder,
  showBackground,
  setShowBackground,
  showStyle,
  setShowStyle,
  showPosition,
  setShowPosition,
  showRotation,
  setShowRotation,
  showTransparency,
  setShowTransparency,
  showEffects,
  setShowEffects,
  showImageUpload,
  setShowImageUpload,
  showImageFilter,
  setShowImageFilter,
  showAnimation,
  setShowAnimation,
  showMargin,
  setShowMargin,
  showPadding,
  setShowPadding,
  showSize,
  setShowSize,
  aiInput,
  aiGeneratedImages,
  setAiGeneratedImages,
  isGenerating,
  setIsGenerating,
  showAiGeneration,
  setShowAiGeneration,
  setSelectedAiImage,
  selectedAiImage,
  onOpenGalleryModal,
}: EditPaneProps) {
  // Path selection state
  type LogoPath = "traditional" | "ai-enhanced";
  const [selectedPath, setSelectedPath] = React.useState<LogoPath | null>(null);

  // Image upload state
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = React.useState<File | null>(
    null,
  );

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPG, PNG, GIF, etc.)");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file is too large. Please select an image under 5MB.");
        return;
      }

      setUploadedImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setUploadedImageFile(null);
  };

  // AI service status
  const [aiStatus, setAiStatus] = React.useState({
    configured: false,
    mode: "Mock",
    message: "Loading...",
  });

  // Check AI service status on component mount
  React.useEffect(() => {
    async function checkAIStatus() {
      try {
        const { aiLogoService } = await import("../services/aiLogoService");
        const status = aiLogoService.getStatus();
        setAiStatus(status);
      } catch (error) {
        console.error("Error checking AI service status:", error);
        setAiStatus({
          configured: false,
          mode: "Error",
          message: "❌ Error loading AI service",
        });
      }
    }

    checkAIStatus();
  }, []);

  // AI generation handlers
  async function handleGenerateAI() {
    setIsGenerating(true);
    try {
      const { aiLogoService } = await import("../services/aiLogoService");

      // Create logo settings object from all inputs
      const logoSettings = {
        logoColor: colorInputs[0]?.value, // Logo color
        backgroundColor: colorInputs[2]?.value, // Background color
        typography: styleInput.value,
        shape: shapeInput.value,
      };

      console.log("AI Generation with settings:", logoSettings);
      console.log("Raw color values:", {
        logoColor: colorInputs[0]?.value,
        backgroundColor: colorInputs[2]?.value,
      });

      const generatedImages = await aiLogoService.generateLogos(
        aiInput.value,
        logoSettings,
      );

      console.log("Generated images:", generatedImages.length, "images");
      console.log(
        "First image preview:",
        generatedImages[0]?.substring(0, 100) + "...",
      );

      // Replace existing images with new ones (don't accumulate)
      console.log(
        "🔄 Setting new images in state. Count:",
        generatedImages.length,
      );
      console.log(
        "📋 New image URLs:",
        generatedImages.map((url, i) => `${i + 1}: ${url.substring(0, 60)}...`),
      );
      setAiGeneratedImages(generatedImages);

      // Show success message if images were generated
      if (generatedImages.length > 0) {
        console.log(`✅ Generated ${generatedImages.length} AI logo options!`);
        console.log("🔄 Updated UI with new AI images");
      }
    } catch (error) {
      console.error("Error generating AI logo:", error);

      // Check for specific OpenAI billing errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("Billing hard limit has been reached")) {
        alert(
          "💳 OpenAI billing limit reached!\n\nPlease visit https://platform.openai.com/settings/organization/billing to increase your limit.\n\nFor now, you'll see mock logos as examples.",
        );
      } else if (errorMessage.includes("insufficient_quota")) {
        alert(
          "💰 OpenAI quota exhausted!\n\nPlease add credits to your OpenAI account.\n\nFor now, you'll see mock logos as examples.",
        );
      } else {
        alert(
          "❌ Failed to generate AI logos. Please try again.\n\nFor now, you'll see mock logos as examples.",
        );
      }
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSelectAILogo(imageUrl: string) {
    // Set the selected AI image to be used as the logo background/base
    setSelectedAiImage(imageUrl);

    // Provide user feedback
    console.log("Selected AI logo as base image");

    // Optionally scroll to top so user can see the main preview
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleClearAIImages() {
    setAiGeneratedImages([]);
    setSelectedAiImage("");
  }

  const Toggle = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-300">Show {label}</span>
    </label>
  );

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-slate-700 p-6 pl-2 text-left">
      <h1 className="mb-4 text-2xl font-bold text-white">Logo Settings</h1>

      {/* STEP 1: FOUNDATION */}
      <div className="rounded-lg bg-slate-700 p-4">
        <h2 className="mb-3 text-xl font-bold text-blue-300">
          📋 Step 1: Logo Foundation
        </h2>
        <p className="mb-4 text-sm text-gray-300">
          Configure core settings that will influence both traditional and
          AI-generated designs.
        </p>

        {/* Core Foundation Settings */}
        <div className="grid grid-cols-1 gap-4">
          {/* Brand Name & Core Colors Row */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* Brand Name */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <label className="text-sm font-medium text-white">
                    Brand Name
                  </label>
                  <InfoTooltip content="The name or text that will appear on your logo. This is the main text element of your brand identity." />
                </div>
                <Toggle
                  label="Show"
                  checked={showBrand}
                  onChange={setShowBrand}
                />
              </div>
              {showBrand && (
                <input
                  type="text"
                  value={brandInput.value}
                  onChange={(e) => brandInput.setValue(e.target.value)}
                  className="w-full rounded bg-gray-800 p-2 text-sm text-white placeholder-gray-400"
                  placeholder="Your business name"
                />
              )}
            </div>

            {/* Primary Color */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Primary Color
                </label>
                <InfoTooltip content="The main color that will be used throughout your logo design. This sets the primary brand color theme." />
              </div>
              <input
                type="color"
                value={colorInputs[0]?.value || "#3b82f6"}
                onChange={(e) => colorInputs[0]?.setValue(e.target.value)}
                className="h-8 w-full rounded"
              />
            </div>

            {/* Background Color */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Background
                </label>
                <InfoTooltip content="The background color of your logo. This sets the backdrop and influences the overall color scheme of AI-generated designs." />
              </div>
              <input
                type="color"
                value={colorInputs[2]?.value || "#ffffff"}
                onChange={(e) => colorInputs[2]?.setValue(e.target.value)}
                className="h-8 w-full rounded"
              />
            </div>
          </div>

          {/* Style & Shape Row */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Typography Style */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <label className="text-sm font-medium text-white">
                    Typography Style
                  </label>
                  <InfoTooltip content="The style and feel of text elements in your logo. This affects font choices and overall aesthetic." />
                </div>
                <Toggle
                  label="Style"
                  checked={showStyle}
                  onChange={setShowStyle}
                />
              </div>
              {showStyle && (
                <input
                  type="text"
                  value={styleInput.value}
                  onChange={(e) => styleInput.setValue(e.target.value)}
                  placeholder="e.g., modern, elegant, bold, playful"
                  className="w-full rounded bg-gray-800 p-2 text-sm text-white placeholder-gray-400"
                />
              )}
            </div>

            {/* Logo Shape */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <label className="text-sm font-medium text-white">
                    Logo Shape
                  </label>
                  <InfoTooltip content="The overall shape or structure of your logo. This influences the layout and composition." />
                </div>
                <Toggle
                  label="Shape"
                  checked={showShape}
                  onChange={setShowShape}
                />
              </div>
              {showShape && (
                <input
                  type="text"
                  value={shapeInput.value}
                  onChange={(e) => shapeInput.setValue(e.target.value)}
                  placeholder="e.g., circle, square, horizontal, badge"
                  className="w-full rounded bg-gray-800 p-2 text-sm text-white placeholder-gray-400"
                />
              )}
            </div>
          </div>

          {/* Text Overlay */}
          <div className="rounded bg-slate-600 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <label className="text-sm font-medium text-white">
                  Text Overlay
                </label>
                <InfoTooltip content="Additional text to include in your logo, such as taglines, descriptions, or secondary branding elements." />
              </div>
              <Toggle label="Text" checked={showText} onChange={setShowText} />
            </div>
            {showText && (
              <input
                type="text"
                value={textInput.value}
                onChange={(e) => textInput.setValue(e.target.value)}
                placeholder="e.g., tagline, description, or subtitle"
                className="w-full rounded bg-gray-800 p-2 text-sm text-white placeholder-gray-400"
              />
            )}
          </div>

          {/* Advanced Foundation Settings Row */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Text Color */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Text Color
                </label>
                <InfoTooltip content="The color for text elements in your logo. If different from primary color, this will be baked into AI designs." />
              </div>
              <input
                type="color"
                value={colorInputs[1]?.value || "#ffffff"}
                onChange={(e) => colorInputs[1]?.setValue(e.target.value)}
                className="h-8 w-full rounded"
              />
            </div>

            {/* Industry/Category */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Industry
                </label>
                <InfoTooltip content="Your business category helps AI understand context and generate appropriate design elements." />
              </div>
              <input
                type="text"
                value={imgUploadInput.value}
                onChange={(e) => imgUploadInput.setValue(e.target.value)}
                placeholder="e.g., restaurant, tech, medical, finance, retail"
                className="w-full rounded bg-gray-800 p-2 text-sm text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Design Preferences Row */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* Logo Orientation */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Orientation
                </label>
                <InfoTooltip content="Preferred logo proportions and layout orientation for optimal visual balance." />
              </div>
              <select
                value={shapeInput.value || "square"}
                onChange={(e) => shapeInput.setValue(e.target.value)}
                className="w-full rounded bg-gray-800 p-2 text-sm text-white"
              >
                <option value="horizontal">Horizontal</option>
                <option value="square">Square</option>
                <option value="vertical">Vertical</option>
                <option value="circular">Circular</option>
              </select>
            </div>

            {/* Complexity Level */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Complexity
                </label>
                <InfoTooltip content="Design complexity level affects detail amount and visual richness of AI-generated logos." />
              </div>
              <select
                value={effectsInput.value || "balanced"}
                onChange={(e) => effectsInput.setValue(e.target.value)}
                className="w-full rounded bg-gray-800 p-2 text-sm text-white"
              >
                <option value="minimal">Minimal/Clean</option>
                <option value="balanced">Balanced</option>
                <option value="detailed">Detailed/Rich</option>
              </select>
            </div>

            {/* Visual Effects */}
            <div className="rounded bg-slate-600 p-3">
              <div className="mb-2 flex items-center">
                <label className="text-sm font-medium text-white">
                  Baked Effects
                </label>
                <InfoTooltip content="Visual effects to be integrated into the AI-generated design (not applied afterwards)." />
              </div>
              <select
                value={effectsInput.value || "none"}
                onChange={(e) => effectsInput.setValue(e.target.value)}
                className="w-full rounded bg-gray-800 p-2 text-sm text-white"
              >
                <option value="none">Clean/No Effects</option>
                <option value="shadow">Subtle Shadow</option>
                <option value="glow">Soft Glow</option>
                <option value="gradient">Gradient Fill</option>
                <option value="3d">3D/Depth</option>
                <option value="vintage">Vintage Style</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded bg-blue-900/30 p-3 text-xs text-blue-200">
          💡 <strong>Foundation Complete:</strong> All these settings will be
          baked into AI generation for cohesive, contextual designs. Traditional
          path uses these as starting guidelines!
        </div>
      </div>

      {/* PATH SELECTION */}
      <div className="rounded-lg bg-slate-700 p-4">
        <h3 className="mb-3 text-lg font-semibold text-white">
          🛤️ Choose Your Design Path
        </h3>
        <p className="mb-4 text-sm text-gray-300">
          How would you like to create your logo?
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Traditional Path */}
          <div
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-blue-400 ${
              selectedPath === "traditional"
                ? "border-blue-500 bg-blue-900/20"
                : "border-slate-600 bg-slate-600"
            }`}
            onClick={() => setSelectedPath("traditional")}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <h4 className="font-semibold text-white">Traditional Design</h4>
              {selectedPath === "traditional" && (
                <span className="text-blue-400">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-300">
              Build your logo manually with complete control over shapes, text,
              and styling.
            </p>
            <div className="mt-2 text-xs text-blue-400">
              ✓ Full creative control • ✓ Works offline • ✓ Step-by-step
              customization
            </div>
          </div>

          {/* AI Enhanced Path */}
          <div
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-green-400 ${
              selectedPath === "ai-enhanced"
                ? "border-green-500 bg-green-900/20"
                : "border-slate-600 bg-slate-600"
            }`}
            onClick={() => setSelectedPath("ai-enhanced")}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <h4 className="font-semibold text-white">AI Enhanced</h4>
              {selectedPath === "ai-enhanced" && (
                <span className="text-green-400">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-300">
              Generate unique designs with AI using your foundation settings,
              then customize.
            </p>
            <div className="mt-2 text-xs text-green-400">
              ✓ Creative inspiration • ✓ Quick results • ✓ Unlimited variations
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Section - Shown for AI Enhanced Path */}
      {selectedPath === "ai-enhanced" && (
        <div className="rounded-lg bg-slate-600 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">
              ✨ AI Logo Generation
              <span className="ml-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                Start Here
              </span>
            </h3>
            <Toggle
              label="AI"
              checked={showAiGeneration}
              onChange={setShowAiGeneration}
            />
          </div>
          {showAiGeneration && (
            <div className="mt-4 space-y-4">
              {/* AI Status Indicator */}
              <div
                className={`rounded-md border p-3 ${
                  aiStatus.configured
                    ? "border-green-500 bg-green-900 bg-opacity-30"
                    : "border-yellow-500 bg-yellow-900 bg-opacity-30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      aiStatus.configured ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  ></div>
                  <p
                    className={`text-sm ${
                      aiStatus.configured ? "text-green-200" : "text-yellow-200"
                    }`}
                  >
                    <strong>AI Status:</strong> {aiStatus.message}
                  </p>
                </div>
              </div>

              {/* Helpful workflow note */}
              <div className="rounded-md border border-blue-500 bg-blue-900 bg-opacity-40 p-3">
                <p className="text-sm text-blue-200">
                  💡 <strong>Optimal Workflow:</strong> The AI will bake in all
                  your foundation settings from Step 1. For best results:
                  complete your foundation setup above, then generate to bake
                  those preferences into unique logo designs!
                </p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {aiInput.label}
                </label>
                <textarea
                  value={aiInput.value}
                  onChange={(event) => aiInput.setValue(event.target.value)}
                  placeholder="Describe the logo you want to generate (e.g., 'modern tech company logo with blue and green colors')"
                  rows={3}
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating || !aiInput.value.trim()}
                className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                {isGenerating ? "Baking in..." : "Generate AI Logo"}
              </button>

              {/* Gallery View Button */}
              {aiGeneratedImages.length > 0 && (
                <button
                  onClick={onOpenGalleryModal}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  🖼️ View All {aiGeneratedImages.length} AI Logos in Gallery
                </button>
              )}

              <AIImageGallery
                images={aiGeneratedImages}
                onSelectImage={handleSelectAILogo}
                onClearImages={handleClearAIImages}
                selectedImage={selectedAiImage}
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 2: DESIGN TOOLS */}
      {selectedPath === "traditional" && (
        <div className="rounded-lg bg-slate-700 p-4">
          <h2 className="mb-3 text-xl font-bold text-blue-300">
            🎨 Step 2: Traditional Design Tools
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Build your logo manually using shapes, text, and styling controls.
          </p>
          {/* Traditional tools section coming next... */}
        </div>
      )}

      {/* STEP 3: POST-CREATION REFINEMENTS (Available after path selection) */}
      {selectedPath && (
        <>
          <div className="mb-4 rounded-lg bg-slate-700 p-4">
            <h2 className="mb-3 text-xl font-bold text-green-300">
              🎨 Step 3: Final Refinements
            </h2>
            <p className="mb-2 text-sm text-gray-300">
              Fine-tune the positioning, rotation, and effects of your{" "}
              {selectedPath === "ai-enhanced" ? "AI-generated" : "traditional"}{" "}
              logo.
            </p>
            <div className="rounded bg-green-900/30 p-2 text-xs text-green-200">
              💡 These adjustments are applied after creation and don't affect
              the core design
            </div>
          </div>

          {/* Position Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-white">Position</h3>
                <InfoTooltip content="Controls where your logo elements appear within the container. Use values like 'center', 'top-left', 'bottom-right', or specific coordinates." />
              </div>
              <Toggle
                label="Position"
                checked={showPosition}
                onChange={setShowPosition}
              />
            </div>
            {showPosition && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {positionInput.label}
                </label>
                <input
                  type="text"
                  value={positionInput.value}
                  onChange={(event) =>
                    positionInput.setValue(event.target.value)
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Rotation Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-white">Rotation</h3>
                <InfoTooltip content="Rotate your logo elements by degrees. Use positive values for clockwise rotation, negative for counterclockwise. Example: 45, -90, 180." />
              </div>
              <Toggle
                label="Rotation"
                checked={showRotation}
                onChange={setShowRotation}
              />
            </div>
            {showRotation && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {rotationInput.label}
                </label>
                <input
                  type="number"
                  value={rotationInput.value}
                  onChange={(event) =>
                    rotationInput.setValue(Number(event.target.value))
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Transparency Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-white">
                  Transparency
                </h3>
                <InfoTooltip content="Control the opacity of your logo elements. Values from 0-100, where 100 is fully opaque and 0 is fully transparent." />
              </div>
              <Toggle
                label="Transparency"
                checked={showTransparency}
                onChange={setShowTransparency}
              />
            </div>
            {showTransparency && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {transparencyInput.label}
                </label>
                <input
                  type="number"
                  value={transparencyInput.value}
                  onChange={(event) =>
                    transparencyInput.setValue(Number(event.target.value))
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Effects Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-white">Effects</h3>
                <InfoTooltip content="Add visual effects to your logo like shadows, glows, gradients, or filters. Use CSS filter properties for advanced styling." />
              </div>
              <Toggle
                label="Effects"
                checked={showEffects}
                onChange={setShowEffects}
              />
            </div>
            {showEffects && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {effectsInput.label}
                </label>
                <input
                  type="text"
                  value={effectsInput.value}
                  onChange={(event) =>
                    effectsInput.setValue(event.target.value)
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Image Upload</h3>
              <Toggle
                label="Image Upload"
                checked={showImageUpload}
                onChange={setShowImageUpload}
              />
            </div>
            {showImageUpload && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Upload Image
                  </label>
                  <InfoTooltip content="Upload your own image to incorporate into your logo design. Supported formats: JPG, PNG, GIF (max 5MB)" />
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-1 file:text-sm file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {uploadedImage && (
                  <div className="rounded border border-gray-600 bg-slate-700 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">
                        Preview:
                      </span>
                      <button
                        onClick={clearUploadedImage}
                        className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="max-h-32 w-full rounded object-contain"
                    />
                    {uploadedImageFile && (
                      <div className="mt-2 text-xs text-gray-400">
                        {uploadedImageFile.name} (
                        {(uploadedImageFile.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Image Filter Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Image Filter</h3>
              <Toggle
                label="Image Filter"
                checked={showImageFilter}
                onChange={setShowImageFilter}
              />
            </div>
            {showImageFilter && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {imgFilterinput.label}
                </label>
                <input
                  type="text"
                  value={imgFilterinput.value}
                  onChange={(event) =>
                    imgFilterinput.setValue(event.target.value)
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Animation Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Animation</h3>
              <Toggle
                label="Animation"
                checked={showAnimation}
                onChange={setShowAnimation}
              />
            </div>
            {showAnimation && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {animationInput.label}
                </label>
                <input
                  type="text"
                  value={animationInput.value}
                  onChange={(event) =>
                    animationInput.setValue(event.target.value)
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Margin Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Margin</h3>
              <Toggle
                label="Margin"
                checked={showMargin}
                onChange={setShowMargin}
              />
            </div>
            {showMargin && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  {marginInput.label}
                </label>
                <input
                  type="number"
                  value={marginInput.value}
                  onChange={(event) =>
                    marginInput.setValue(Number(event.target.value))
                  }
                  className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Colors Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Colors</h3>
              <Toggle label="Colors" checked={true} onChange={() => {}} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {colorInputs.map(({ label, value, setValue }) => {
                // Show all colors by default, but filter based on toggles
                let shouldShow = true;

                if (label.toLowerCase().includes("background")) {
                  shouldShow = showBackground;
                } else if (label.toLowerCase().includes("border")) {
                  shouldShow = showBorder;
                }
                // Logo color always shows

                return shouldShow ? (
                  <div key={label}>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      {label} Color
                    </label>
                    <input
                      type="color"
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      className="h-12 w-full cursor-pointer rounded-md border border-gray-600 bg-slate-800"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Background Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Background</h3>
              <Toggle
                label="Background"
                checked={showBackground}
                onChange={setShowBackground}
              />
            </div>
            {showBackground && (
              <div>
                <p className="mb-2 text-sm text-gray-300">
                  Background color is controlled in the Colors section above
                </p>
                <div className="text-xs text-gray-400">
                  Enable this to show background color in the preview
                </div>
              </div>
            )}
          </div>

          {/* Border Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Border</h3>
              <Toggle
                label="Border"
                checked={showBorder}
                onChange={setShowBorder}
              />
            </div>
            {showBorder && (
              <div>
                <p className="mb-2 text-sm text-gray-300">
                  Border color is controlled in the Colors section above
                </p>
                <div className="text-xs text-gray-400">
                  Border size is available in the Size section below when
                  enabled
                </div>
              </div>
            )}
          </div>

          {/* Size Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Size</h3>
              <Toggle label="Size" checked={showSize} onChange={setShowSize} />
            </div>
            {showSize && (
              <div className="grid grid-cols-2 gap-3">
                {sizeInputs.map(({ label, value, setValue, min, max }) => {
                  // Show logo size always, border size only if border is enabled
                  let shouldShow = true;

                  if (label.toLowerCase().includes("border")) {
                    shouldShow = showBorder;
                  }

                  return shouldShow ? (
                    <div key={label}>
                      <label className="mb-1 block text-sm font-medium text-gray-300">
                        {label} Size
                      </label>
                      <input
                        type="number"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(event) =>
                          setValue(Number(event.target.value))
                        }
                        className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Padding Section */}
          <div className="rounded-lg bg-slate-600 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Padding</h3>
              <Toggle
                label="Padding"
                checked={showPadding}
                onChange={setShowPadding}
              />
            </div>
            {showPadding && (
              <div className="grid grid-cols-2 gap-3">
                {paddingInputs.map(({ label, value, setValue, min, max }) => (
                  <div key={label}>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      {label}
                    </label>
                    <input
                      type="number"
                      min={min}
                      max={max}
                      value={value}
                      onChange={(event) => setValue(Number(event.target.value))}
                      className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
