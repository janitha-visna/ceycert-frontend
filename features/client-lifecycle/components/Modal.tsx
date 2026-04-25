import React from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  widthClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  widthClassName = "sm:w-[800px]",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`
          w-[calc(100vw-2rem)]
          ${widthClassName}
          sm:max-w-none
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          border
          bg-white
          p-0
          shadow-2xl
          [&>button]:hidden
        `}
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-slate-900">
            {title}
          </DialogTitle>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
