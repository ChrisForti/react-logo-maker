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
    <div className="flex flex-col gap-2 text-left">
      <h1 className="text-3xl">Brand</h1>
      <div>
        <div>{brandInput.label}</div>
        <input
          name={brandInput.label}
          type="text"
          value={brandInput.value}
          onChange={(event) => brandInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Shape</h1>
      <div>
        <div>{shapeInput.label}</div>
        <input
          name={shapeInput.label}
          type="text"
          value={shapeInput.value}
          onChange={(event) => shapeInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Text</h1>
      <div>
        <div>{textInput.label}</div>
        <input
          name={textInput.label}
          type="text"
          value={textInput.value}
          onChange={(event) => textInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Style</h1>
      <div>
        <div>{styleInput.label}</div>
        <input
          name={styleInput.label}
          type="text"
          value={styleInput.value}
          onChange={(event) => styleInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Position</h1>
      <div>
        <div>{positionInput.label}</div>
        <input
          name={positionInput.label}
          type="text"
          value={positionInput.value}
          onChange={(event) => positionInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Rotation</h1>
      <div>
        <div>{rotationInput.label}</div>
        <input
          name={rotationInput.label}
          type="text"
          value={rotationInput.value}
          onChange={(event) => rotationInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Transparency</h1>
      <div>
        <div>{transparencyInput.label}</div>
        <input
          name={transparencyInput.label}
          type="text"
          value={transparencyInput.value}
          onChange={(event) =>
            transparencyInput.setValue(Number(event.target.value))
          }
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Effects</h1>
      <div>
        <div>{effectsInput.label}</div>
        <input
          name={effectsInput.label}
          type="text"
          value={effectsInput.value}
          onChange={(event) => effectsInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Image Upload</h1>
      <div>
        <div>{imgUploadInput.label}</div>
        <input
          name={imgUploadInput.label}
          type="text"
          value={imgUploadInput.value}
          onChange={(event) => imgUploadInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Image Filter</h1>
      <div>
        <div>{imgFilterinput.label}</div>
        <input
          name={imgFilterinput.label}
          type="text"
          value={imgFilterinput.value}
          onChange={(event) => imgFilterinput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">Animation</h1>
      <div>
        <div>{animationInput.label}</div>
        <input
          name={animationInput.label}
          type="text"
          value={animationInput.value}
          onChange={(event) => animationInput.setValue(event.target.value)}
          className="w-30 mx-auto rounded"
        />
      </div>
      <h1 className="text-3xl">margin</h1>
      <div>
        <div>{marginInput.label}</div>
        <input
          name={marginInput.label}
          type="text"
          value={marginInput.value}
          onChange={(event) => marginInput.setValue(Number(event.target.value))}
          className="w-30 mx-auto rounded"
        />
      </div>
      <div>
        <h1 className="text-left text-3xl">Colors</h1>
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
        <div className="mx-auto flex gap-4">
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
                  className="mx-auto w-20 rounded"
                />
              </div>
            );
          })}
        </div>
        <h1 className="text-3xl">Padding</h1>
        <div className="mx-auto flex gap-4">
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
                  className="mx-auto w-20 rounded"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// iterate all setter functions
// color-picker import
// react-color
// validation to form
