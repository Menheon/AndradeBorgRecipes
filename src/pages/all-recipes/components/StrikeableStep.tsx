import CheckBoxUnchecked from "@/assets/check_box_unchecked.svg?react";
import CheckBoxChecked from "@/assets/check_box_checked.svg?react";
import { useState } from "react";
import { cn } from "@/shared";

interface Props {
  step: string;
}

export const StrikeableStep = ({ step }: Props) => {
  const [isStricken, setIsStricken] = useState(false);

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-neutral-50"
      onClick={() => setIsStricken((current) => !current)}
    >
      <div className="mt-0.5 shrink-0">
        {isStricken ? (
          <CheckBoxChecked className="fill-primary-500 h-5 w-5" />
        ) : (
          <CheckBoxUnchecked className="h-5 w-5 fill-neutral-400 hover:fill-neutral-600" />
        )}
      </div>

      <span
        className={cn("leading-relaxed text-neutral-700", {
          "text-neutral-400 line-through": isStricken,
        })}
      >
        {step}
      </span>
    </button>
  );
};
