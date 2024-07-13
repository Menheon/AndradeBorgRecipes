import { UploadedImage } from "@/pages/xr-sizer/types";
import { forwardRef } from "react";

type Props = {
  label: string;
  disabled?: boolean;
  value: string;
  onChange: (image: UploadedImage) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
};

export const FileInputField = forwardRef(
  (
    { label, disabled, value, onChange, onBlur }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="pt-2">
        <label htmlFor="image_upload" className="text-md font-semibold">
          {label}
        </label>
        <input
          ref={ref}
          className="
            w-full
            rounded-md
            border-2
            border-brown-600
            bg-whiteSmoke
            outline-none
            file:mr-5
            file:h-full
            file:rounded-none 
            file:rounded-r-md
            file:border-none
            file:bg-brown-500 
            file:px-3 
            file:py-1
            file:text-whiteSmoke
            file:outline-none
            file:ring-2
            file:ring-inset
            file:ring-brown-500
            hover:file:cursor-pointer
            hover:file:bg-brown-600
            hover:file:ring-brown-600
            file:focus-visible:outline-none 
            file:focus-visible:ring-2
            file:focus-visible:ring-inset
            file:focus-visible:ring-brown-300"
          id="image_upload"
          type="file"
          accept="image/png, image/jpeg"
          disabled={disabled}
          value={value}
          onBlur={onBlur}
          onChange={(event) =>
            onChange({
              value: event.target.value,
              file: event.target.files?.[0],
            })
          }
        />
      </div>
    );
  },
);
