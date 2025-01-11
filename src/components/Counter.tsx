import { useState } from "react";

// type SetterProps = {
//   num: number;
// };

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <button
      className="mx-auto w-fit cursor-pointer rounded border-black bg-slate-400"
      onClick={() => {
        setNumber(number + 1);
      }}
    >
      Increase count
    </button>
  );
}
