import AddIcon from "@/assets/add.svg?react";
import { ReactNode } from "react";

interface Props {
  onClicked: () => void;
  children: ReactNode | string;
}

export const TextButton = ({ onClicked, children }: Props) => {
  return (
    <button
      type="button"
      className="
        m-1
        flex
        items-center
        gap-1
        rounded-md
        px-4 py-2
        font-semibold
        outline-none
        transition
        hover:text-brown-500
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-brown-600
      "
      onClick={onClicked}
    >
      <span>{children}</span>
      <AddIcon className="h-7 w-7 fill-brown-600" />
    </button>
  );
};
