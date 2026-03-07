import { UploadedImage } from "@/types/models";
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
      <div className="pt-3">
        <label
          htmlFor="image_upload"
          className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-100"
        >
          {label}
        </label>
        <div className="flex h-11 w-full items-center gap-2 rounded-lg border border-neutral-300 bg-white shadow-sm dark:border-neutral-600 dark:bg-neutral-700">
          <button
            onClick={onFakeUploadButtonClick}
            className="bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-300 h-full rounded-l-lg px-4 text-sm font-medium text-white transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset"
          >
            {buttonTitle}
          </button>
          <p className="truncate text-sm text-neutral-600">{fileName}</p>
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
