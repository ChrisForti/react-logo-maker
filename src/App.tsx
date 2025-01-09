import { useState } from "react";
import { Header } from "./components/Header";

function App() {
  const [brand, setBrand] = useState(""); // create state
  const [logoSize, setLogoSize] = useState(0);
  const [logoColor, setLogoColor] = useState(0);
  const [logoShape, setLogoShape] = useState(0);
  const [logoText, setLogoText] = useState(0);
  const [logoStyle, setLogoStyle] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(0);
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
  const [] = useState(0);

  // const [number, setNumber] = useState(0);

  function handleSubmit() {
    // const data = {
    //   brand,
    //   subBrand,
    // };
    console.log("Clicked!");
  }

  return (
    <div className="min-w96 flex min-h-screen flex-col gap-4 bg-slate-600 text-center">
      <Header num={30000} />
      <input // use the state
        type="text"
        value={brand}
        onChange={(event) => {
          setBrand(event.target.value);
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoSize}
        onChange={(event) => {
          setLogoSize(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoColor}
        onChange={(event) => {
          setLogoColor(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoShape}
        onChange={(event) => {
          setLogoShape(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoText}
        onChange={(event) => {
          setLogoText(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoSize}
        onChange={(event) => {
          setLogoSize(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoStyle}
        onChange={(event) => {
          setLogoStyle(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={backgroundColor}
        onChange={(event) => {
          setBackgroundColor(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>{" "}
      <input // use the state
        type="text"
        value={borderColor}
        onChange={(event) => {
          setBorderColor(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={borderSize}
        onChange={(event) => {
          setBorderSize(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoPosition}
        onChange={(event) => {
          setLogoposition(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>{" "}
      <input // use the state
        type="text"
        value={rotation}
        onChange={(event) => {
          setRotation(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>{" "}
      <input // use the state
        type="text"
        value={transparency}
        onChange={(event) => {
          setTransparency(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={effects}
        onChange={(event) => {
          setEffects(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>{" "}
      <input // use the state
        type="text"
        value={imageUpload}
        onChange={(event) => {
          setImageUpload(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={imageFilter}
        onChange={(event) => {
          setImageFilter(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={animation}
        onChange={(event) => {
          setAnimation(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoMargin}
        onChange={(event) => {
          setLogoMargin(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={logoPadding}
        onChange={(event) => {
          setLogoPadding(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
    </div>
  );
}

export default App;

// Every piece of state, and input for all things needed in a logo maker in the App.tsx
// text color
// padding
// shape
// margin
/*

1. Logo Size
2. Logo Color
3. Logo Shape
4. Logo Text
5. Text Color
6. Text Size
7. Font Style
8. Background Color
9. Border Color
10. Border Size
11. Shadow Color
12. Shadow Size
13. Logo Position
14. Rotation
15. Transparency
16. Effects (e.g., gradient, pattern)
17. Image Upload
18. Image Filter
19. Animation
20. Logo Margin
21. Logo Padding
 */
