import CheckBoxUnchecked from "@/assets/check_box_unchecked.svg?react";
import CheckBoxChecked from "@/assets/check_box_checked.svg?react";
import { useState } from "react";

interface Props {
  step: string;
}

export const StrikeableStep = ({ step }: Props) => {
  const [isStricken, setIsStricken] = useState(false);

  return (
    <div
      className="flex cursor-pointer gap-2 pb-3"
      onClick={() => setIsStricken((current) => !current)}
    >
      <div>
        {isStricken ? (
          <CheckBoxChecked className="h-5 w-5 fill-current text-brown-300 hover:text-black" />
        ) : (
          <CheckBoxUnchecked className="h-5 w-5 fill-current text-brown-300 hover:text-black" />
        )}
      </div>

      <span className={isStricken ? "text-brown-300 line-through" : ""}>
        {step}
      </span>
    </div>
  );
};
