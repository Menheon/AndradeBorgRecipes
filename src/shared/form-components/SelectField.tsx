import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props<T> {
  options: T[];
  getValue: (input: T) => string;
  getDisplayValue: (input: T) => string;
  placeholder: string;
  onValueSelected: (value: string) => void;
}

export const SelectField = <T,>({
  options,
  getValue,
  getDisplayValue,
  placeholder,
  onValueSelected,
}: Props<T>) => {
  return (
    <Select onValueChange={onValueSelected}>
      <SelectTrigger className="w-36 focus:outline-none outline-none px-2 py-1 bg-whiteSmoke border-2 rounded-md border-darkSlateGrey placeholder-lightSlateGrey">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, i) => (
          <SelectItem value={getValue(option)} key={i}>
            {getDisplayValue(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
