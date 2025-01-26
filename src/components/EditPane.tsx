import { useState } from "react";
import {
  NumberInput,
  NumberInputProps,
  StringInput,
  StringInputProps,
} from "./Input";

type EditPaneProps = {
  stringInputs: StringInputProps[];
  numberInputs: NumberInputProps[];
};

export default function EditPane({
  stringInputs,
  numberInputs,
}: EditPaneProps) {
  {
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

    const colors = [
      { label: "Logo Color", value: logoColor, setValue: setLogoColor },
      { label: "Border Color", value: logoColor, setValue: setBorderColor },
      {
        label: "Background Color",
        value: logoColor,
        setValue: setBackgroundColor,
      },
    ];
    const sizes = [
      { label: "Log Size", value: logoSize, setValue: setLogoSize },
      { label: "border Size", value: borderSize, setValue: setBorderSize },
    ];
    const paddings = [
      {
        label: "Log Padding X",
        value: logoPaddingX,
        setValue: setLogoPaddingX,
      },
      {
        label: "Log Padding Y",
        value: logoPaddingY,
        setValue: setLogoPaddingY,
      },
    ];
    const images = [
      { label: "Image Upload", value: imageUpload, setValue: setImageUpload },
      { label: "Image Filter", value: imageFilter, setValue: setImageFilter },
    ];

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
    //   numberInputs,
    //   stringInputs,

    return (
      <form onSubmit={handleSubmit}>
        {stringInputs.map((inputProps, index) => (
          <StringInput key={index} {...inputProps} />
        ))}
        {numberInputs.map((inputProps, index) => (
          <NumberInput key={index} {...inputProps} />
        ))}
      </form>
    );
  }
}
// iterate all setter functions
// color-picker import
// react-color
// validation to form
