import { forwardRef } from "react";

interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  value: string;
}

export const TextInputField = forwardRef(
  (
    { id, onChange, placeholder, value }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        ref={ref}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border-2 border-brown-600 bg-whiteSmoke px-2 py-1 placeholder-brown-500 outline-none
      focus-visible:ring
        focus-visible:ring-brown-100
      "
      />
    );
  },
);
