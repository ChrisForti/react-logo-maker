import { v4 as uuidV4 } from "uuid";

import {
  NumberInput,
  NumberInputProps,
  StringInput,
  StringInputProps,
} from "./Input";

type EditPaneProps = {
  colorInputs: StringInputProps[];
  sizeInputs: NumberInputProps[];
  paddingInputs: NumberInputProps[];
};

export default function EditPane({
  colorInputs,
  sizeInputs,
  paddingInputs,
}: EditPaneProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">Colors</h1>
      <div className="mx-auto flex gap-4">
        {colorInputs.map((inputProps) => {
          return (
            <StringInput
              key={uuidV4()}
              label={inputProps.label}
              value={inputProps.value}
              setValue={inputProps.setValue}
            />
          );
        })}
      </div>
      <h1 className="text-3xl">Size</h1>
      {sizeInputs.map((inputProps) => {
        return (
          <NumberInput
            label={inputProps.label}
            value={inputProps.value}
            setValue={inputProps.setValue}
          />
        );
      })}
      <h1 className="text-3xl">Padding</h1>
      {paddingInputs.map((inputProps) => {
        return (
          <NumberInput
            label={inputProps.label}
            value={inputProps.value}
            setValue={inputProps.setValue}
          />
        );
      })}
    </div>
  );
}

// iterate all setter functions
// color-picker import
// react-color
// validation to form
