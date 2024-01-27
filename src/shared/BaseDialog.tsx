import { Fragment, PropsWithChildren } from "react";
import { FilledButton } from "@/shared/FilledButton";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  primaryActionLabel: "create" | "delete" | "update";
  primaryAction: () => void;
  isPrimaryActionDisabled: boolean;
  title: string;
}

export const BaseDialog = ({
  isOpen,
  onClose,
  children,
  primaryAction,
  primaryActionLabel,
  isPrimaryActionDisabled,
  title,
}: Props) => {
  const getPrimaryButtonLabel = () => {
    switch (primaryActionLabel) {
      case "create":
        return "Create";
      case "update":
        return "Update";
      case "delete":
        return "Delete";
      default:
        return "";
    }
  };

  return isOpen ? (
    <div
      className="z-20 fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center pt-4"
      onClick={onClose}
    >
      <div
        className=" bg-gray-50 rounded-md w-2/3 h-fit px-10 py-8 mb-10"
        onClick={(event) => event.stopPropagation()}
      >
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="h-96 overflow-y-auto">{children}</div>
        <div
          className="flex gap-3 justify-end mt-4
        "
        >
          <FilledButton label="Cancel" onClick={onClose} type="secondary" />

          <FilledButton
            label={getPrimaryButtonLabel()}
            onClick={primaryAction}
            type="primary"
            disabled={isPrimaryActionDisabled}
          />
        </div>
      </div>
    </div>
  ) : (
    <Fragment />
  );
};
