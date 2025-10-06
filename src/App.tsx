import { useState } from "react";
import { Header } from "./components/Header";
import EditPane from "./components/EditPane";
import { LogoPreview } from "./components/LogoPreview";
import { AIGalleryModal } from "./components/AIGalleryModal";
import { useMultipleToggles } from "./hooks/useToggle";
import { downloadSVG } from "./utils/downloadUtils";

function App() {
  const [brand, setBrand] = useState("My Brand"); // create the state with demo values
  const [logoSize, setLogoSize] = useState(50);
  const [logoColor, setLogoColor] = useState("#3b82f6");
  const [logoShape, setLogoShape] = useState("circle");
  const [logoText, setLogoText] = useState("LOGO");
  const [logoStyle, setLogoStyle] = useState("Arial");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#1f2937");
  const [borderSize, setBorderSize] = useState(2);
  const [logoPosition, setLogoposition] = useState("");
  const [rotation, setRotation] = useState(0);
  const [transparency, setTransparency] = useState(0);
  const [effects, setEffects] = useState("");
  const [imageUpload, setImageUpload] = useState(""); // probably need to be boolean
  const [imageFilter, setImageFilter] = useState(""); // probably need to be boolean
  const [animation, setAnimation] = useState("");
  const [logoMargin, setLogoMargin] = useState(0);
  const [logoPaddingX, setLogoPaddingX] = useState(0);
  const [logoPaddingY, setLogoPaddingY] = useState(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGeneratedImages, setAiGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAiImage, setSelectedAiImage] = useState("");
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Toggle states using custom hook
  const { toggles, setToggle } = useMultipleToggles({
    brand: true,
    shape: true,
    text: true,
    border: true,
    background: true,
    style: false,
    position: false,
    rotation: false,
    transparency: false,
    effects: false,
    imageUpload: false,
    imageFilter: false,
    animation: false,
    margin: false,
    padding: false,
    size: true,
    aiGeneration: true,
  });

  // Define the arrays
  const brandInput = { label: "brand", value: brand, setValue: setBrand };
  const shapeInput = {
    label: "Logo Shape",
    value: logoShape,
    setValue: setLogoShape,
  };
  const textInput = {
    label: "Logo Text",
    value: logoText,
    setValue: setLogoText,
  };
  const styleInput = {
    label: "Logo Style",
    value: logoStyle,
    setValue: setLogoStyle,
  };
  const positionInput = {
    label: "Logo position",
    value: logoPosition,
    setValue: setLogoposition,
  };
  const rotationInput = {
    label: "Rotation",
    value: rotation,
    setValue: setRotation,
  };
  const transparencyInput = {
    label: "Transparency",
    value: transparency,
    setValue: setTransparency,
  };
  const effectsInput = {
    label: "Effects",
    value: effects,
    setValue: setEffects,
  };
  const imgUploadInput = {
    label: "Image Upload",
    value: imageUpload,
    setValue: setImageUpload,
  };
  const imgFilterInput = {
    label: "Image Filter",
    value: imageFilter,
    setValue: setImageFilter,
  };
  const animationInput = {
    label: "Animation",
    value: animation,
    setValue: setAnimation,
  };
  const marginInput = {
    label: "Logo Margin",
    value: logoMargin,
    setValue: setLogoMargin,
  };
  const colors = [
    { label: "Logo", value: logoColor, setValue: setLogoColor },
    { label: "Border", value: borderColor, setValue: setBorderColor },
    {
      label: "Background",
      value: backgroundColor,
      setValue: setBackgroundColor,
    },
  ];
  const sizes = [
    { label: "Logo", value: logoSize, setValue: setLogoSize },
    { label: "Border", value: borderSize, setValue: setBorderSize },
  ];
  const paddings = [
    {
      label: "Logo X",
      value: logoPaddingX,
      setValue: setLogoPaddingX,
    },
    {
      label: "Logo Y",
      value: logoPaddingY,
      setValue: setLogoPaddingY,
    },
  ];

  const aiInput = {
    label: "AI Prompt",
    value: aiPrompt,
    setValue: setAiPrompt,
  };

  async function handleSubmit() {
    try {
      // Trigger the logo export from LogoPreview component
      const logoPreviewElement = document.querySelector("#logo-svg") as SVGElement | null;
      if (logoPreviewElement) {
        // Trigger SVG download using utility function
        const filename = `${brand.replace(/\s+/g, "-").toLowerCase()}-logo.svg`;
        await downloadSVG(logoPreviewElement, filename);

        // Show success message
        console.log("✅ Logo downloaded successfully as SVG!");
      } else {
        console.error("❌ Logo preview element not found");
        alert(
          "Error: Could not find logo preview. Please make sure the logo is visible.",
        );
      }
    } catch (error) {
      console.error("❌ Error downloading logo:", error);
      alert("Error downloading logo. Please try again or use a different browser.");
    }
  }

  const logoData = {
    brand,
    logoSize,
    logoColor,
    logoShape,
    logoText,
    logoStyle,
    backgroundColor,
    borderColor,
    borderSize,
    logoPosition,
    rotation,
    transparency,
    effects,
    imageUpload,
    imageFilter,
    animation,
    logoMargin,
    logoPaddingX,
    logoPaddingY,
    selectedAiImage,
    // Toggle states using hook
    showBrand: toggles.brand,
    showShape: toggles.shape,
    showText: toggles.text,
    showBorder: toggles.border,
    showBackground: toggles.background,
    showStyle: toggles.style,
    showPosition: toggles.position,
    showRotation: toggles.rotation,
    showTransparency: toggles.transparency,
    showEffects: toggles.effects,
    showImageUpload: toggles.imageUpload,
    showImageFilter: toggles.imageFilter,
    showAnimation: toggles.animation,
    showMargin: toggles.margin,
    showPadding: toggles.padding,
    showSize: toggles.size,
  };

  return (
    <div className="min-h-screen bg-slate-600">
      <Header />
      <div className="flex flex-col gap-6 p-4 lg:flex-row lg:p-6">
        {/* Controls Panel */}
        <div className="w-full lg:max-w-lg lg:flex-1">
          <EditPane
            brandInput={brandInput}
            shapeInput={shapeInput}
            textInput={textInput}
            styleInput={styleInput}
            positionInput={positionInput}
            rotationInput={rotationInput}
            transparencyInput={transparencyInput}
            effectsInput={effectsInput}
            imgUploadInput={imgUploadInput}
            imgFilterinput={imgFilterInput}
            animationInput={animationInput}
            marginInput={marginInput}
            colorInputs={colors}
            sizeInputs={sizes}
            paddingInputs={paddings}
            showBrand={toggles.brand}
            setShowBrand={(value) => setToggle("brand", value)}
            showShape={toggles.shape}
            setShowShape={(value) => setToggle("shape", value)}
            showText={toggles.text}
            setShowText={(value) => setToggle("text", value)}
            showBorder={toggles.border}
            setShowBorder={(value) => setToggle("border", value)}
            showBackground={toggles.background}
            setShowBackground={(value) => setToggle("background", value)}
            showStyle={toggles.style}
            setShowStyle={(value) => setToggle("style", value)}
            showPosition={toggles.position}
            setShowPosition={(value) => setToggle("position", value)}
            showRotation={toggles.rotation}
            setShowRotation={(value) => setToggle("rotation", value)}
            showTransparency={toggles.transparency}
            setShowTransparency={(value) => setToggle("transparency", value)}
            showEffects={toggles.effects}
            setShowEffects={(value) => setToggle("effects", value)}
            showImageUpload={toggles.imageUpload}
            setShowImageUpload={(value) => setToggle("imageUpload", value)}
            showImageFilter={toggles.imageFilter}
            setShowImageFilter={(value) => setToggle("imageFilter", value)}
            showAnimation={toggles.animation}
            setShowAnimation={(value) => setToggle("animation", value)}
            showMargin={toggles.margin}
            setShowMargin={(value) => setToggle("margin", value)}
            showPadding={toggles.padding}
            setShowPadding={(value) => setToggle("padding", value)}
            showSize={toggles.size}
            setShowSize={(value) => setToggle("size", value)}
            aiInput={aiInput}
            aiGeneratedImages={aiGeneratedImages}
            setAiGeneratedImages={setAiGeneratedImages}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            showAiGeneration={toggles.aiGeneration}
            setShowAiGeneration={(value) => setToggle("aiGeneration", value)}
            setSelectedAiImage={setSelectedAiImage}
            selectedAiImage={selectedAiImage}
            onOpenGalleryModal={() => setIsGalleryModalOpen(true)}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={handleSubmit}
          >
            ⚡ Quick Download SVG
          </button>
        </div>

        {/* Preview Panel - Responsive sticky behavior */}
        <div className="w-full lg:flex-1">
          {/* Mobile: Static preview at top for better UX */}
          <div className="mb-6 block lg:hidden">
            {selectedAiImage && (
              <div className="mb-4 rounded-lg border border-purple-500 bg-purple-900 bg-opacity-30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-purple-200">
                    ✨ AI Base Logo Active
                  </span>
                </div>
              </div>
            )}
            <div className="rounded-xl bg-slate-700 p-6 shadow-xl">
              <LogoPreview logoData={logoData} />
            </div>
          </div>

          {/* Desktop: Sticky preview that follows scroll */}
          <div className="hidden lg:block">
            <div className="sticky top-16 flex flex-col items-center space-y-6 py-8">
              {selectedAiImage && (
                <div className="w-full max-w-md rounded-lg border border-purple-500 bg-purple-900 bg-opacity-30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium text-purple-200">
                      ✨ AI Base Logo Active - Customize with tools on the left
                    </span>
                  </div>
                </div>
              )}
              <div className="w-full max-w-md rounded-xl bg-slate-700 p-8 shadow-xl">
                <LogoPreview logoData={logoData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Gallery Modal */}
      <AIGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        images={aiGeneratedImages}
        onSelectImage={(imageUrl) => {
          setSelectedAiImage(imageUrl);
          setIsGalleryModalOpen(false); // Close modal after selection
        }}
        onClearImages={() => {
          setAiGeneratedImages([]);
          setSelectedAiImage("");
          setIsGalleryModalOpen(false);
        }}
        selectedImage={selectedAiImage}
      />
    </div>
  );
}

export default App;
// Picker window edit to wrap stuff in components
// containeriz all my state in app.tsx
