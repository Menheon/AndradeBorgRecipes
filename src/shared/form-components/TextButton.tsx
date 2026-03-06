import AddIcon from "@/assets/add.svg?react";
import { ReactNode } from "react";

interface Props {
  onClicked: () => void;
  children: ReactNode | string;
  iconNode?: ReactNode;
  size?: "sm" | "md";
}

export const TextButton = ({
  onClicked,
  children,
  iconNode,
  size = "md",
}: Props) => {
  return (
    <button
      type="button"
      className={`m-${size === "sm" ? 0 : 1} flex items-center gap-1.5 rounded-lg px-${size === "sm" ? 2 : 4} py-${size === "sm" ? 1 : 2} hover:text-primary-600 focus-visible:ring-primary-300 font-medium text-neutral-700 outline-hidden transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-inset`}
      onClick={onClicked}
    >
      {children && <span>{children}</span>}
      {iconNode ?? <AddIcon className="fill-primary-500 h-6 w-6" />}
    </button>
  );
};
