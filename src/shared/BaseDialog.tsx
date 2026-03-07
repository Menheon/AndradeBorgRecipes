import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { FilledButton } from "./FilledButton";
import { IconButton } from "./form-components/IconButton";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();
  const generalTranslations = useMemo(
    () => translations[i18n.language as PlatformSupportedLanguages].general,
    [i18n.language],
  );

  return (
    <dialog
      className="w-full max-w-full min-w-fit self-center justify-self-center overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl backdrop:bg-neutral-900/50 backdrop:backdrop-blur-sm md:mx-10 md:w-2/3 dark:border-neutral-700 dark:bg-neutral-800"
      ref={dialogRef}
      onClose={onClose}
    >
      <form
        method="dialog"
        className="flex max-h-[calc(100vh-2rem)] flex-col gap-4 p-6"
      >
        <div className="border-b border-neutral-100 dark:border-neutral-700">
          <h1 className="font-caveat text-3xl font-bold tracking-wide text-neutral-800 dark:text-neutral-100">
            {title}
          </h1>
          <div className="absolute top-2 right-2">
            <IconButton icon="close" onClick={onClose} />
          </div>
          {description && (
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
        <div className="overflow-y-auto">{children}</div>
        <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-700">
          <FilledButton onClick={() => onClose?.()} type="secondary">
            {t(generalTranslations.actions.cancel)}
          </FilledButton>
          <FilledButton
            onClick={primaryAction}
            type="primary"
            disabled={isPrimaryActionDisabled}
          >
            {t(generalTranslations.actions[primaryActionLabel])}
          </FilledButton>
        </div>
      </form>
    </dialog>
  );
};
