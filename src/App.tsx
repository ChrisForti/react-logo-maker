import { useState } from "react";
import { Header } from "./components/Header";
import EditPane from "./components/EditPane";
import { LogoPreview } from "./components/LogoPreview";
import { useMultipleToggles } from "./hooks/useToggle";

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

  // Toggle states using custom hook
  const { toggles, toggle, setToggle } = useMultipleToggles({
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

  function handleSubmit() {
    const data = {
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
    };
    console.log("Logo Data: ", data);
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
          />
          <button
            type="submit"
            className="mt-6 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Generate Logo
          </button>
        </div>

        {/* Preview Panel */}
        <div className="flex w-full items-start justify-center lg:flex-1">
          <LogoPreview logoData={logoData} />
        </div>
      </div>
    </div>
  );
}

export default App;
// Picker window edit to wrap stuff in components
// containeriz all my state in app.tsx
