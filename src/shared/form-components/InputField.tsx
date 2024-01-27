import { Input } from "@/components/ui/input";

interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  size: "small" | "medium" | "large";
  placeholder: string;
  value: string;
}

export const InputField = ({
  id,
  onChange,
  size,
  placeholder,
  value,
}: Props) => {
  const getWidth = () => {
    let width = "";
    switch (size) {
      case "small":
        width = "w-14";
        break;
      case "medium":
        width = "w-36";
        break;
      case "large":
        width = "w-80";
        break;

      default:
        break;
    }
    return width;
  };
  return (
    <Input
      value={value}
      placeholder={placeholder}
      id={id}
      onChange={(event) => onChange(event.target.value)}
      className={`outline-none px-2 py-1 bg-whiteSmoke border-2 rounded-md border-darkSlateGrey placeholder-lightSlateGrey ${getWidth()}`}
    />
  );
};
