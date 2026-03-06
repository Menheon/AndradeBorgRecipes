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
          <CheckBoxChecked className="fill-current hover:text-black h-5 w-5 text-brown-300" />
        ) : (
          <CheckBoxUnchecked className="fill-current hover:text-black h-5 w-5 text-brown-300" />
        )}
      </div>

      <span className={isStricken ? "text-brown-300 line-through" : ""}>
        {step}
      </span>
    </div>
  );
};
