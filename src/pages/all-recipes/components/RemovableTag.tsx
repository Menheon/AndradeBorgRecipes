import { ReactNode } from "react";
import CloseIcon from "@/assets/close.svg?react";

interface Props {
  isRemovable: boolean;
  onRemoved?: () => void;
  children: ReactNode | string;
}

export const RemovableTag = ({ children, onRemoved, isRemovable }: Props) => {
  return (
    <div className="bg-sage-100 text-sage-700 hover:bg-sage-200 inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors">
      <span className="text-sm font-medium tracking-wide">{children}</span>
      {isRemovable && onRemoved && (
        <button
          type="button"
          className="bg-sage-300 focus-visible:base-outline hover:bg-sage-400 flex h-4 w-4 items-center justify-center rounded-full transition-colors"
          onClick={() => onRemoved()}
        >
          <CloseIcon className="fill-sage-700 h-3 w-3" />
        </button>
      )}
    </div>
  );
};
