interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type: "primary" | "secondary";
}

export const FilledButton = ({ label, onClick, disabled, type }: Props) => {
  return (
    <button
      className={`${
        type === "primary"
          ? "bg-darkSlateGrey hover:bg-lightSlateGrey"
          : "bg-gray-500 hover:bg-gray-600"
      } text-whiteSmoke py-2 px-4 rounded-md tracking-wide disabled:hover:bg-slate-400 disabled:bg-slate-400 disabled:cursor-not-allowed`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
