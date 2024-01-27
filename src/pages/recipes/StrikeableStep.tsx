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
      className="cursor-pointer pb-3 flex gap-2"
      onClick={() => setIsStricken((current) => !current)}
    >
      <div>
        {isStricken ? (
          <CheckBoxChecked className="w-5 h-5 fill-current hover:text-black text-darkGrey" />
        ) : (
          <CheckBoxUnchecked className="w-5 h-5 fill-current hover:text-black text-darkGrey" />
        )}
      </div>

      <span className={isStricken ? "line-through text-darkGrey" : ""}>
        {step}
      </span>
    </div>
  );
};
