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
      className="border-brown-600 bg-grey-150 placeholder-brown-500 focus-visible:ring-brown-100 w-full resize-none rounded-md border-2 px-2 py-1 shadow-xs outline-hidden focus-visible:ring-3"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
