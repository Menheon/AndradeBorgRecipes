interface Props {
  id?: string;
  onChange: (newValue: string) => void;
  rows: number;
  columns: number;
  placeholder: string;
  value: string;
}

export const TextAreaField = ({
  id,
  onChange,
  rows,
  columns,
  placeholder,
  value,
}: Props) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      id={id}
      rows={rows}
      cols={columns}
      className="
        w-full
        resize-none
        rounded-md
        border-2
        border-brown-600 
        bg-whiteSmoke 
        px-2 
        py-1 
        placeholder-brown-500 
        shadow-sm 
        outline-none
        focus-visible:ring
        focus-visible:ring-brown-100"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
