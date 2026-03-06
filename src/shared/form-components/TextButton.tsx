import AddIcon from "@/assets/add.svg?react";
import { ReactNode } from "react";
import { cn } from "../helpers/cn";

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
      className={cn(
        "hover:text-primary-600 focus-visible:ring-primary-300 font-medium text-neutral-700 outline-hidden transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-inset",
        {
          "m-0 flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm":
            size === "sm",
          "m-1 flex items-center gap-1.5 rounded-lg px-4 py-2": size === "md",
        },
      )}
      onClick={onClicked}
    >
      {children && <span>{children}</span>}
      {iconNode ?? <AddIcon className="fill-primary-500 h-6 w-6" />}
    </button>
  );
};
