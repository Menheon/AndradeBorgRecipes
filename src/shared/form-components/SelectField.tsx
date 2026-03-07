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
      className="focus:border-primary-400 focus:ring-primary-100 dark:focus:border-primary-500 dark:focus:ring-primary-800 w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-700 outline-hidden transition-colors focus:ring-2 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
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
