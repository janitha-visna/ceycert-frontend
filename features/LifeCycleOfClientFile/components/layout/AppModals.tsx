// components/AppModals.tsx


import { PaymentModal } from "../PaymentModal";
import { ClientInfoModal } from "../ClientInfoModal";
import { AuditDatesModal } from "../AuditDatesModal";
import { ReminderListModal } from "../ReminderListModal";
import { UserHistoryModal } from "../UserHistoryModal";
import { CreateFolderModal } from "../CreateFolderModal";


import {
  MOCK_PAYMENTS,
  MOCK_CLIENT,
  MOCK_AUDIT_DATES,
  MOCK_ASSIGNMENTS,
} from "../../constants";

import { Reminder } from "../../types";

import { Import } from "lucide-react";

interface AppModalsProps {
  modals: {
    payment: boolean;
    client: boolean;
    dates: boolean;
    reminderList: boolean;
    history: boolean;
    createFolder: boolean;
  };
  closeModal: (name: keyof AppModalsProps["modals"]) => void;
  reminders: Reminder[];
  onCreateFolder: (name: string) => void;
}

export function AppModals({
  modals,
  closeModal,
  reminders,
  onCreateFolder,
}: AppModalsProps) {
  return (
    <>
      <CreateFolderModal
        isOpen={modals.createFolder}
        onClose={() => closeModal("createFolder")}
        onCreate={onCreateFolder}
      />

      <PaymentModal
        isOpen={modals.payment}
        onClose={() => closeModal("payment")}
        payments={MOCK_PAYMENTS}
      />

      <ClientInfoModal
        isOpen={modals.client}
        onClose={() => closeModal("client")}
        data={MOCK_CLIENT}
      />

      <AuditDatesModal
        isOpen={modals.dates}
        onClose={() => closeModal("dates")}
        dates={MOCK_AUDIT_DATES}
      />

      <ReminderListModal
        isOpen={modals.reminderList}
        onClose={() => closeModal("reminderList")}
        reminders={reminders}
      />

      <UserHistoryModal
        isOpen={modals.history}
        onClose={() => closeModal("history")}
        assignments={MOCK_ASSIGNMENTS}
      />
    </>
  );
}
