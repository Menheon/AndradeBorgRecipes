import { UploadedImage } from "@/pages/xr-sizer/types";
import { forwardRef, useEffect, useState } from "react";

type Props = {
  label: string;
  buttonTitle: string;
  disabled?: boolean;
  noFileChosenLabel: string;
  value: string;
  onChange: (image: UploadedImage) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
};

const fileInputFieldId = "image_upload";

export const FileInputField = forwardRef(
  (
    {
      label,
      disabled,
      value,
      onChange,
      onBlur,
      buttonTitle,
      noFileChosenLabel,
    }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const onFakeUploadButtonClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      event.preventDefault();
      const actualInputField = document.getElementById(fileInputFieldId);
      if (!actualInputField) return;
      actualInputField.click();
    };

    const [fileName, setFileName] = useState(noFileChosenLabel);

    useEffect(() => {
      if (value) return;
      setFileName(noFileChosenLabel);
    }, [noFileChosenLabel, value]);

    const onChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFileName(file?.name ?? "");
      onChange({
        value: event.target.value,
        file,
      });
    };

    return (
      <div className="pt-2">
        <label htmlFor="image_upload" className="text-md font-semibold">
          {label}
        </label>
        <div
          className="flex
            h-9
            w-full
            items-center
            gap-2
            rounded-md
            border-2
            border-brown-600
            bg-whiteSmoke
            outline-none"
        >
          <button
            onClick={onFakeUploadButtonClick}
            className="
            h-full
            w-fit
            rounded-l-sm
            rounded-r-md
            border-2
            border-none
            border-brown-600 
            bg-brown-500
            px-3 
            py-1 
            text-whiteSmoke
            outline-none
            ring-2
            ring-inset
            ring-brown-500
            hover:cursor-pointer
            hover:bg-brown-600
            hover:ring-brown-600
            focus-visible:outline-none 
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-brown-300"
          >
            {buttonTitle}
          </button>
          <p>{fileName}</p>
        </div>

        <input
          ref={ref}
          className="hidden"
          id={fileInputFieldId}
          type="file"
          accept="image/png, image/jpeg"
          disabled={disabled}
          value={value}
          onBlur={onBlur}
          onChange={onChangeInternal}
        />
      </div>
    );
  },
);
