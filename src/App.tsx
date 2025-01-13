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
  const [borderColor, setBorderColor] = useState(0);
  const [borderSize, setBorderSize] = useState(0);
  const [logoPosition, setLogoposition] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [transparency, setTransparency] = useState(0);
  const [effects, setEffects] = useState(0);
  const [imageUpload, setImageUpload] = useState(0);
  const [imageFilter, setImageFilter] = useState(0);
  const [animation, setAnimation] = useState(0);
  const [logoMargin, setLogoMargin] = useState(0);
  const [logoPadding, setLogoPadding] = useState(0);

  function handleSubmit() {
    const data = {
      brand,
      logoSize,
      logoColor,
    };
    console.log(data);
  }

  return (
    <div className="min-w96 flex min-h-screen flex-col gap-4 bg-slate-600 text-center">
      <Header />
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
      <input
        type="text"
        value={borderColor}
        onChange={(event) => {
          setBorderColor(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={borderSize}
        onChange={(event) => {
          setBorderSize(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={logoPosition}
        onChange={(event) => {
          setLogoposition(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />{" "}
      <input
        type="text"
        value={rotation}
        onChange={(event) => {
          setRotation(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />{" "}
      <input
        type="text"
        value={transparency}
        onChange={(event) => {
          setTransparency(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={effects}
        onChange={(event) => {
          setEffects(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />{" "}
      <input
        type="text"
        value={imageUpload}
        onChange={(event) => {
          setImageUpload(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={imageFilter}
        onChange={(event) => {
          setImageFilter(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={animation}
        onChange={(event) => {
          setAnimation(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={logoMargin}
        onChange={(event) => {
          setLogoMargin(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <input
        type="text"
        value={logoPadding}
        onChange={(event) => {
          setLogoPadding(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
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
