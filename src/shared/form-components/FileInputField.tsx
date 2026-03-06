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
        <div className="border-brown-600 bg-grey-150 flex h-9 w-full items-center gap-2 rounded-md border-2 shadow-xs outline-hidden">
          <button
            onClick={onFakeUploadButtonClick}
            className="border-brown-600 bg-brown-500 text-grey-150 ring-brown-500 hover:bg-brown-600 hover:ring-brown-600 focus-visible:ring-brown-300 h-full w-fit rounded-l-sm rounded-r-md border-2 border-none px-3 py-1 ring-2 outline-hidden ring-inset hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset"
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
