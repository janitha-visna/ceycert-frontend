import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface HeaderDialogProps {
  title: string;
  description: string;
}

export default function HeaderDialog({
  title,
  description,
}: HeaderDialogProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900 p-8 text-white">
      <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10">
        <DialogTitle className="text-2xl font-bold tracking-tight">
          {title}
        </DialogTitle>

        <DialogDescription className="mt-1 text-sm text-slate-400">
          {description}
        </DialogDescription>
      </div>
    </div>
  );
}
