import { TextInputField } from "./TextInputField";

interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  value: string;
}

export const IntegerInputField = ({
  id,
  onChange,
  placeholder,
  value,
}: Props) => {
  const handleOnChange = (value: string) => {
    const newValue = value.replace(/\D+/g, "");
    onChange(newValue);
  };

  return (
    <TextInputField
      value={value}
      placeholder={placeholder}
      id={id}
      onChange={handleOnChange}
    />
  );
};
