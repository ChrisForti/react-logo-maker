import { useState } from "react";
import { Header } from "./components/Header";
import EditPane from "./components/EditPane";
import { StringInputProps } from "./components/Input";

function App() {
  const [brand, setBrand] = useState(""); // create the state
  const [logoSize, setLogoSize] = useState(0);
  const [logoColor, setLogoColor] = useState("");
  const [logoShape, setLogoShape] = useState("");
  const [logoText, setLogoText] = useState("");
  const [logoStyle, setLogoStyle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [borderSize, setBorderSize] = useState(0);
  const [logoPosition, setLogoposition] = useState("");
  const [rotation, setRotation] = useState("");
  const [transparency, setTransparency] = useState(0);
  const [effects, setEffects] = useState("");
  const [imageUpload, setImageUpload] = useState(""); // probably need to be boolean
  const [imageFilter, setImageFilter] = useState(""); // probably need to be boolean
  const [animation, setAnimation] = useState("");
  const [logoMargin, setLogoMargin] = useState(0);
  const [logoPaddingX, setLogoPaddingX] = useState(0);
  const [logoPaddingY, setLogoPaddingY] = useState(0);

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

  return (
    <div className="min-w96 flex min-h-screen flex-col gap-4 bg-slate-600 text-center">
      <Header />
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
      />
      <button
        type="submit"
        className="mx-auto mt-4 rounded bg-blue-500 px-4 py-2 text-black hover:bg-red-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
// Picker window edit to wrap stuff in components
// containeriz all my state in app.tsx
