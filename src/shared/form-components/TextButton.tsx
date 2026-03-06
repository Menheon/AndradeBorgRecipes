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
      className={` m-${size === "sm" ? 0 : 1} flex items-center gap-1 rounded-md px-${size === "sm" ? 2 : 4} py-${size === "sm" ? 0.5 : 2} hover:text-brown-500 focus-visible:ring-brown-600 font-semibold outline-hidden transition focus-visible:ring-2 focus-visible:ring-inset`}
      onClick={onClicked}
    >
      {children && <span>{children}</span>}
      {iconNode ?? <AddIcon className="fill-brown-600 h-7 w-7" />}
    </button>
  );
};
