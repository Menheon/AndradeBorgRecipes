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
        flex
        gap-1
        font-semibold
        items-center
        hover:text-brown-500
        py-2 px-4
        rounded-md
        outline-none
        m-1
        focus-visible:ring-brown-600
        focus-visible:ring-inset
        focus-visible:ring-2
        transition
      "
      onClick={onClicked}
    >
      <span>{children}</span>
      <AddIcon className="fill-brown-600 w-7 h-7" />
    </button>
  );
};
