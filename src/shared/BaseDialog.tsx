import { PropsWithChildren, useEffect, useRef } from "react";
import { FilledButton } from "./FilledButton";
import { IconButton } from "./form-components/IconButton";

interface Props extends PropsWithChildren {
  onClose: () => void;
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
      document.body.style.overflow = "hidden";
      dialogRef.current?.showModal();
    } else {
      document.body.style.overflow = "unset";
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <dialog
      className="shadow-3xl my-8 w-2/3 min-w-fit max-w-full rounded-xl bg-white backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      ref={dialogRef}
      onClose={onClose}
    >
      <form method="dialog" className="p-6">
        <div className="mb-1">
          {/* TODO implement Typography component*/}
          <h1 className="font-[system-ui] text-2xl  font-bold">{title}</h1>
          <div className="absolute right-1 top-1">
            <IconButton icon="close" onClick={onClose} />
          </div>
          <p>{description}</p>
        </div>
        <div className="max-h-[calc(100dvh-200px)] overflow-y-auto">
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
