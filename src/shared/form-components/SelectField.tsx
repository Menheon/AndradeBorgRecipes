interface Props<T> {
  options: T[];
  getValue: (input: T) => string;
  getDisplayValue: (input: T) => string;
  placeholder: string;
  onValueSelected: (value: string) => void;
  selectedOption?: T;
}

export const SelectField = <T,>({
  options,
  getValue,
  getDisplayValue,
  placeholder,
  onValueSelected,
  selectedOption,
}: Props<T>) => {
  const handleValueSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onValueSelected(event.target.value);
  };

  // TODO implement style for options list.
  return (
    <select
      value={selectedOption ? getValue(selectedOption) : ""}
      onChange={handleValueSelected}
      className="
        w-full
        cursor-pointer
        rounded-md
        border-2 
        border-brown-600 
        bg-whiteSmoke 
        px-2
        py-1
        outline-none
        focus-visible:ring
        focus-visible:ring-brown-100
      "
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, i) => (
        <option value={getValue(option)} key={i}>
          {getDisplayValue(option)}
        </option>
      ))}
    </select>
  );
};
