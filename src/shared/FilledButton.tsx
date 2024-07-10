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
          : "bg-gray-500 hover:bg-gray-600"
      } 
        rounded-md 
        px-4 
        py-2 
        tracking-wide 
        text-whiteSmoke 
        transition-colors 
        focus-visible:outline-none 
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-brown-100
        disabled:cursor-not-allowed
        disabled:bg-slate-400
        disabled:hover:bg-slate-400
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
