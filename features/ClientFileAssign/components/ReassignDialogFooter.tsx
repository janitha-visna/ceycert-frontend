import { Button } from "@/components/ui/button";

interface ReassignDialogFooterProps {
  saveLabel: string;
  disabled?: boolean;
  hideCancel?: boolean;
  onCancel?: () => void;
  onSave: () => void;
}

export function ReassignDialogFooter({
  saveLabel,
  disabled,
  hideCancel = false,
  onCancel,
  onSave,
}: ReassignDialogFooterProps) {
  return (
    <div className="flex justify-center gap-3 border-t px-6 py-5">
      {!hideCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="min-w-[120px] rounded-full"
        >
          Cancel
        </Button>
      )}

      <Button
        type="button"
        disabled={disabled}
        onClick={onSave}
        className="min-w-[160px] rounded-full"
      >
        {saveLabel}
      </Button>
    </div>
  );
}
