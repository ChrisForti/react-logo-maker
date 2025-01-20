import { useState } from "react";
import { Header } from "./components/Header";
import { StringInput, NumberInput } from "./components/Input";

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
      {/* <form // optional handle submit override
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      /> */}
      <StringInput label="Brand" value={brand} setValue={setBrand} />
      <NumberInput label="Logo Size" value={logoSize} setValue={setLogoSize} />
      <StringInput
        label="Logo Color"
        value={logoColor}
        setValue={setLogoColor}
      />
      <StringInput
        label="logo Shape"
        value={logoShape}
        setValue={setLogoShape}
      />
      <StringInput label="logo text" value={logoText} setValue={setLogoText} />
      <StringInput
        label="Logo Style"
        value={logoStyle}
        setValue={setLogoStyle}
      />
      <StringInput
        label="background Color"
        value={backgroundColor}
        setValue={setBackgroundColor}
      />
      <StringInput
        label="Border color"
        value={borderColor}
        setValue={setBorderColor}
      />
      <NumberInput
        label="Border Size"
        value={borderSize}
        setValue={setBorderSize}
      />
      <StringInput
        label="Logo position"
        value={logoPosition}
        setValue={setLogoposition}
      />
      <StringInput label="Rotation" value={rotation} setValue={setRotation} />
      <NumberInput
        label="Transparency"
        value={transparency}
        setValue={setTransparency}
      />
      <StringInput label="Effects" value={effects} setValue={setEffects} />
      <StringInput
        label="Image uploade"
        value={imageUpload}
        setValue={setImageUpload}
      />
      <StringInput
        label="Image filter"
        value={imageFilter}
        setValue={setImageFilter}
      />
      <StringInput
        label="Animation"
        value={animation}
        setValue={setAnimation}
      />
      <NumberInput
        label="Logo Margin"
        value={logoMargin}
        setValue={setLogoMargin}
      />
      <NumberInput
        label="logo Padding"
        value={logoPaddingX}
        setValue={setLogoPaddingX}
      />

      <NumberInput
        label="logo Padding"
        value={logoPaddingY}
        setValue={setLogoPaddingY}
      />
      <button // Allow the app access to the state
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
    </div>
  );
}

export default App;
// Picker window edit to wrap stuff in components
// containeriz all my state in app.tsx
