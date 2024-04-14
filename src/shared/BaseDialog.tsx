import { PropsWithChildren, useEffect, useRef } from "react";
import { FilledButton } from "./FilledButton";

interface Props extends PropsWithChildren {
  onClose?: () => void;
  isOpen: boolean;
  primaryActionLabel: "create" | "delete" | "update";
  primaryAction: () => void;
  isPrimaryActionDisabled: boolean;
  title: string;
  description?: string;
}

export const BaseDialog = ({
  onClose,
  isOpen,
  children,
  primaryAction,
  primaryActionLabel,
  isPrimaryActionDisabled,
  title,
  description,
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

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const onDialogClicked = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (event.target === dialogRef.current && onClose) {
      onClose();
    }
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <dialog
      className="min-w-fit max-w-full w-2/3 my-8 rounded-xl bg-white shadow-3xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      ref={dialogRef}
      onClose={onClose}
      onClick={onDialogClicked}
    >
      <form method="dialog" className="p-6">
        <div className="mb-1">
          {/* TODO implement Typography component*/}
          <h1 className="text-2xl font-bold  font-[system-ui]">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="overflow-y-auto max-h-[calc(100dvh-200px)]">
          {children}
        </div>
        <div className="flex justify-end gap-5 pt-3">
          <FilledButton onClick={() => onClose?.()} type="secondary">
            Cancel
          </FilledButton>
          <FilledButton
            onClick={primaryAction}
            type="primary"
            disabled={isPrimaryActionDisabled}
          >
            {getPrimaryButtonLabel()}
          </FilledButton>
        </div>
      </form>
    </dialog>
  );
};
