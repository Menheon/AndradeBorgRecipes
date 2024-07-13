import { useState } from "react";
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
  const [internalValue, setInternalValue] = useState(value);

  const handleOnChange = (value: string) => {
    const newValue = value.replace(/\D+/g, "");
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <TextInputField
      value={internalValue}
      placeholder={placeholder}
      id={id}
      onChange={handleOnChange}
    />
  );
};
