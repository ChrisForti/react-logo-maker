type StringInputProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function StringInput({ label, value, setValue }: StringInputProps) {
  return (
    <div className="mx-auto w-fit">
      <div>{label}</div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        className="mx-auto w-96 rounded"
      />
    </div>
  );
}

type NumberInputProps = {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export function NumberInput({ label, value, setValue }: NumberInputProps) {
  return (
    <>
      <div>{label}</div>
      <input
        min={0}
        type="number"
        value={value}
        onChange={(event) => {
          setValue(Number(event.target.value));
        }}
        className="mx-auto w-96 rounded"
      />
    </>
  );
}
