import { ReactNode } from "react";
import CloseIcon from "@/assets/close.svg?react";

interface Props {
  isRemovable: boolean;
  onRemoved?: () => void;
  children: ReactNode | string;
}

export const RemovableTag = ({ children, onRemoved, isRemovable }: Props) => {
  return (
    <div
      className="
        flex
        items-center 
        gap-2 
        rounded-md 
        bg-brown-300 
        px-2 
        py-1 
        text-whiteSmoke"
    >
      <span>{children}</span>
      {isRemovable && onRemoved && (
        <button
          type="button"
          className="
            flex 
            h-5 
            w-5 
            items-center 
            rounded-full 
            bg-brown-600 
            p-0.5
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brown-100"
          onClick={() => onRemoved()}
        >
          <CloseIcon
            className="
              h-4
              w-4 
              cursor-pointer 
              fill-brown-100
              transition-colors 
              hover:fill-brown-300"
          />
        </button>
      )}
    </div>
  );
};
