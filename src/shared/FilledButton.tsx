interface Props {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  type: "primary" | "secondary";
}

export const FilledButton = ({ onClick, disabled, type, children }: Props) => {
  return (
    <button
      type="button"
      className={`${
        type === "primary"
          ? "bg-brown-600 hover:bg-brown-500"
          : "bg-grey-600 hover:bg-grey-700"
      } 
        text-grey-150 
        rounded-md 
        px-4 
        py-2 
        tracking-wide 
        transition-colors 
        focus-visible:outline-none 
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-brown-100
        disabled:cursor-not-allowed
        disabled:bg-grey-200
        disabled:hover:bg-grey-200
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
