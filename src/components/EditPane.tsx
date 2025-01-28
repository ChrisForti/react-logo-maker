type StringInputProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type NumberInputProps = {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
};

type EditPaneProps = {
  shapeInput: StringInputProps;
  textInput: StringInputProps;
  styleInput: StringInputProps;
  positionInput: StringInputProps;
  rotationInput: StringInputProps;
  transparencyInput: NumberInputProps;
  effectsInput: StringInputProps;
  imgUploadInput: StringInputProps;
  imgFilterinput: StringInputProps;
  animationInput: StringInputProps;
  marginInput: NumberInputProps;
  brandInput: StringInputProps;
  colorInputs: StringInputProps[];
  sizeInputs: NumberInputProps[];
  paddingInputs: NumberInputProps[];
};

export default function EditPane({
  brandInput,
  shapeInput,
  textInput,
  styleInput,
  positionInput,
  rotationInput,
  transparencyInput,
  effectsInput,
  imgUploadInput,
  imgFilterinput,
  animationInput,
  marginInput,
  colorInputs,
  sizeInputs,
  paddingInputs,
}: EditPaneProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* <h1 className="text-3xl">Brand</h1>
      {brandInput.map(({label, value, setValue}) => {
        
<div>
            <div>{brandInput.label}</div>
          <input name={brandInput.label}
           type="text" 
           value={brandInput.value} 
           onChange={(event) => brandInput.setValue{event.target.value}} 
           />
           </div>
        
      })} */}

      <h1 className="text-3xl">Colors</h1>
      <div className="mx-auto flex gap-4">
        {colorInputs.map(({ label, value, setValue }) => {
          return (
            <div>
              <div>{label}</div>
              <input
                name={label}
                type="text"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                className="mx-auto w-20 rounded px-2"
              />
            </div>
          );
        })}
      </div>
      <h1 className="text-3xl">Size</h1>
      {sizeInputs.map(({ label, value, setValue, min, max }) => {
        return (
          <div>
            <div>{label}</div>
            <input
              name={label}
              min={min}
              max={max}
              type="number"
              value={value}
              onChange={(event) => {
                setValue(Number(event.target.value));
              }}
              className="mx-auto w-96 rounded"
            />
          </div>
        );
      })}
      <h1 className="text-3xl">Padding</h1>
      {paddingInputs.map(({ label, value, setValue, min, max }) => {
        return (
          <div>
            <div>{label}</div>
            <input
              name={label}
              min={min}
              max={max}
              type="number"
              value={value}
              onChange={(event) => {
                setValue(Number(event.target.value));
              }}
              className="mx-auto w-96 rounded"
            />
          </div>
        );
      })}
    </div>
  );
}

// iterate all setter functions
// color-picker import
// react-color
// validation to form
