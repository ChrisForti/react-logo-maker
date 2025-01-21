import { NumberInputProps, StringInputProps } from "./Input";

type EditPaneProps = {
  stringInputs: StringInputProps[];
  numberInputs: NumberInputProps[];
};

export default function EditPane(
  { const [brand, setBrand] = useState(""); // create the state
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
  }: EditPaneProps,
) {
  return <form>
    const colors = []
  </form>;
}
// iterate all setter functions
// color-picker import
// react-color
// validation to form
