import { forwardRef } from "react";

interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder: string;
  value: string;
  disabled?: boolean;
}

export const TextInputField = forwardRef(
  (
    {
      id,
      onChange,
      placeholder,
      value,
      disabled = false,
      onFocus,
      onBlur,
    }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        disabled={disabled}
        ref={ref}
        value={value}
        placeholder={placeholder}
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        className="border-brown-600 bg-grey-150 placeholder-brown-500 focus-visible:ring-brown-100 w-full rounded-md border-2 px-2 py-1 shadow-xs outline-hidden focus-visible:ring-3"
      />
    );
  },
);
