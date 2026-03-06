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
      className="focus:border-primary-400 focus:ring-primary-100 w-full resize-none rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-700 placeholder-neutral-400 shadow-sm outline-hidden transition-colors focus:ring-2"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
