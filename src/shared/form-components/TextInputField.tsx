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
        className="focus:border-primary-400 focus:ring-primary-100 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-700 placeholder-neutral-400 shadow-sm outline-hidden transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500"
      />
    );
  },
);
