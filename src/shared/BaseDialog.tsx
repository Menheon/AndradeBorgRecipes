import { PropsWithChildren, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props extends PropsWithChildren {
  onClose: () => void;
  primaryActionLabel: "create" | "delete" | "update";
  primaryAction: () => void;
  isPrimaryActionDisabled: boolean;
  title: string;
  description?: string;
  triggerElement: ReactElement;
}

export const BaseDialog = ({
  onClose,
  children,
  primaryAction,
  primaryActionLabel,
  isPrimaryActionDisabled,
  title,
  description,
  triggerElement,
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

  return (
    <Dialog>
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent className="min-w-fit max-w-full w-2/3">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={primaryAction}
            variant="default"
            disabled={isPrimaryActionDisabled}
          >
            {getPrimaryButtonLabel()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
