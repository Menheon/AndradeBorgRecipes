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
        className="outline-none px-2 py-1 bg-whiteSmoke border-2 rounded-md border-darkSlateGrey placeholder-lightSlateGrey w-full
      focus-visible:ring
        focus-visible:ring-lightGrey
      "
      />
    );
  },
);
