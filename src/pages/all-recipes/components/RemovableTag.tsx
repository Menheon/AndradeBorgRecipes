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
        text-grey-150
        flex 
        items-center 
        gap-2 
        rounded-md 
        bg-brown-300 
        px-2
        py-1
        shadow-md"
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
            focus-visible:base-outline"
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
