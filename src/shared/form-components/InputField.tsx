interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  size: "small" | "medium" | "large";
  placeholder: string;
  value: string;
}

export const InputField = ({ id, onChange, placeholder, value }: Props) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      id={id}
      onChange={(event) => onChange(event.target.value)}
      className="outline-none px-2 py-1 bg-whiteSmoke border-2 rounded-md border-darkSlateGrey placeholder-lightSlateGrey w-full"
    />
  );
};
