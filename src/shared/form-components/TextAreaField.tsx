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
        outline-none 
        px-2 
        py-1 
        bg-whiteSmoke 
        border-2 
        rounded-md 
        border-darkSlateGrey 
        placeholder-lightSlateGrey
        focus-visible:ring
        focus-visible:ring-lightGrey"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
