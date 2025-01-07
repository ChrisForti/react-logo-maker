import { useState } from "react";
import { Header } from "./components/Header";

function App() {
  const [margin, setMargin] = useState(0);
  // const [number, setNumber] = useState(0);
  const [brand, setBrand] = useState(""); // create state

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
      />{" "}
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
      <input // use the state
        type="text"
        value={margin}
        onChange={(event) => {
          setMargin(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />{" "}
      <button
        className="rounded bg-slate-400 px-8 py-4 text-lg"
        onClick={handleSubmit}
      >
        submit
      </button>
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
    </div>
  );
}

export default App;

// Every piece of state, and input for all things needed in a logo maker in the App.tsx
// text color
// padding
// shape
// margin
//
