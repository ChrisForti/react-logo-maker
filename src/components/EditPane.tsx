import React from "react";
import { AIImageGallery } from "./AIImageGallery";

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
        text: textInput.value,
        color: colorInputs[0]?.value, // Logo color
        backgroundColor: colorInputs[2]?.value, // Background color
        style: styleInput.value,
        shape: shapeInput.value,
        size: sizeInputs[0]?.value, // Logo size
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

      // Accumulate images instead of replacing them
      setAiGeneratedImages((prevImages) => [...prevImages, ...generatedImages]);

      // Show success message if images were generated
      if (generatedImages.length > 0) {
        console.log(`✅ Generated ${generatedImages.length} AI logo options!`);
      }
    } catch (error) {
      console.error("Error generating AI logo:", error);
      alert("❌ Failed to generate AI logos. Please try again.");
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

      {/* AI Generation Section - Start Here! */}
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

            {/* Helpful instruction note */}
            <div className="rounded-md border border-blue-500 bg-blue-900 bg-opacity-40 p-3">
              <p className="text-sm text-blue-200">
                💡 <strong>New to AI logos?</strong> Generate some options here
                first, then use the other tools below to customize your
                favorite!
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
              {isGenerating ? "Generating..." : "Generate AI Logo"}
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

      {/* Brand Section */}
      <div className="rounded-lg bg-slate-600 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Brand</h3>
          <Toggle label="Brand" checked={showBrand} onChange={setShowBrand} />
        </div>
        {showBrand && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              {brandInput.label}
            </label>
            <input
              type="text"
              value={brandInput.value}
              onChange={(event) => brandInput.setValue(event.target.value)}
              className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Shape Section */}
      <div className="rounded-lg bg-slate-600 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Shape</h3>
          <Toggle label="Shape" checked={showShape} onChange={setShowShape} />
        </div>
        {showShape && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              {shapeInput.label}
            </label>
            <input
              type="text"
              value={shapeInput.value}
              onChange={(event) => shapeInput.setValue(event.target.value)}
              placeholder="circle, square, triangle"
              className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="rounded-lg bg-slate-600 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Text</h3>
          <Toggle label="Text" checked={showText} onChange={setShowText} />
        </div>
        {showText && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              {textInput.label}
            </label>
            <input
              type="text"
              value={textInput.value}
              onChange={(event) => textInput.setValue(event.target.value)}
              className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Style Section */}
      <div className="rounded-lg bg-slate-600 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Style</h3>
          <Toggle label="Style" checked={showStyle} onChange={setShowStyle} />
        </div>
        {showStyle && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              {styleInput.label}
            </label>
            <input
              type="text"
              value={styleInput.value}
              onChange={(event) => styleInput.setValue(event.target.value)}
              className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Position Section */}
      <div className="rounded-lg bg-slate-600 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Position</h3>
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
              onChange={(event) => positionInput.setValue(event.target.value)}
              className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Rotation Section */}
      <div className="rounded-lg bg-slate-600 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Rotation</h3>
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
          <h3 className="text-xl font-semibold text-white">Transparency</h3>
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
          <h3 className="text-xl font-semibold text-white">Effects</h3>
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
              onChange={(event) => effectsInput.setValue(event.target.value)}
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
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              {imgUploadInput.label}
            </label>
            <input
              type="text"
              value={imgUploadInput.value}
              onChange={(event) => imgUploadInput.setValue(event.target.value)}
              className="w-full rounded-md border border-gray-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              onChange={(event) => imgFilterinput.setValue(event.target.value)}
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
              onChange={(event) => animationInput.setValue(event.target.value)}
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
              Border size is available in the Size section below when enabled
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
                    onChange={(event) => setValue(Number(event.target.value))}
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
    </div>
  );
}
