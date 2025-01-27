import { useState } from "react";
import { Header } from "./components/Header";
import { StringInput, NumberInput } from "./components/Input";
import EditPane from "./components/EditPane";

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
  const [imageUpload, setImageUpload] = useState("");
  const [imageFilter, setImageFilter] = useState("");
  const [animation, setAnimation] = useState("");
  const [logoMargin, setLogoMargin] = useState(0);
  const [logoPaddingX, setLogoPaddingX] = useState(0);
  const [logoPaddingY, setLogoPaddingY] = useState(0);

  // Define the arrays
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
    console.log(data);
  }

  return (
    <div className="min-w96 flex min-h-screen flex-col gap-4 bg-slate-600 text-center">
      <Header />
      <EditPane
        colorInputs={colors}
        sizeInputs={sizes}
        paddingInputs={paddings}
      />
    </div>
  );
}

export default App;
// Picker window edit to wrap stuff in components
// containeriz all my state in app.tsx
