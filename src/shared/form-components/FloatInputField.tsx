import { useState } from "react";
import { TextInputField } from "./TextInputField";

interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  value: string;
}

export const FloatInputField = ({
  id,
  onChange,
  placeholder,
  value,
}: Props) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleOnChange = (value: string) => {
    // Replace all commas with periods
    let newValue = value.replace(/,/g, ".");

    // Allow digits and a single decimal point
    newValue = newValue.replace(/[^0-9.]/g, "");

    // Ensure there is at most one decimal point
    const decimalCount = newValue.split(".").length - 1;
    if (decimalCount > 1) return;

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
