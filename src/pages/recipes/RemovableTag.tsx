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
        gap-2 
        text-whiteSmoke 
        bg-brown-300 
        px-2 
        py-1 
        rounded-md 
        items-center"
    >
      <span>{children}</span>
      {isRemovable && onRemoved && (
        <button
          type="button"
          className="
            rounded-full 
            p-0.5 
            h-5 
            w-5 
            bg-brown-600 
            flex 
            items-center
            focus-visible:outline-none
            focus-visible:ring-brown-100
            focus-visible:ring-2"
          onClick={() => onRemoved()}
        >
          <CloseIcon
            className="
              h-4
              w-4 
              fill-brown-100 
              transition-colors
              cursor-pointer 
              hover:fill-brown-300"
          />
        </button>
      )}
    </div>
  );
};
