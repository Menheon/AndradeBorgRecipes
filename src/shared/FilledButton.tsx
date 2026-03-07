import { cn } from "./helpers/cn";

interface Props {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  type: "primary" | "secondary";
}

export const FilledButton = ({ onClick, disabled, type, children }: Props) => {
  return (
    <button
      type="button"
      className={cn({
        "bg-primary-500 hover:bg-primary-600": type === "primary",
        "bg-neutral-500 hover:bg-neutral-600": type === "secondary",
        "focus-visible:ring-primary-300 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 disabled:hover:bg-neutral-200": true,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
