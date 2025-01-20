export type StringInputProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function StringInput({ label, value, setValue }: StringInputProps) {
  return (
    <>
      <div>{label}</div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        className="mx-auto w-96 rounded"
      />
    </>
  );
}

export type NumberInputProps = {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
};

export function NumberInput({
  label,
  value,
  setValue,
  min,
  max,
}: NumberInputProps) {
  return (
    <>
      <div>{label}</div>
      <input
        min={min}
        max={max}
        type="number"
        value={value}
        onChange={(event) => {
          setValue(Number(event.target.value)); // Casted Number() in to the mix to handle ints.
        }}
        className="mx-auto w-96 rounded"
      />
    </>
  );
}
