import React from "react";
import { Modal } from "../Modal";
import { PaymentRecord } from "../../types";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payments: PaymentRecord[];
}

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
      </span>
    );
  }
  if (status === "Pending") {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        <Clock className="w-3 h-3 mr-1" /> Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
      <AlertCircle className="w-3 h-3 mr-1" /> Overdue
    </span>
  );
};

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  payments,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment History"
      widthClassName="sm:w-[900px]"
    >
      <div className="flex max-h-[calc(90vh-73px)] flex-col">
        <div className="flex-1 overflow-auto px-6 py-5">
          <div className="min-w-[760px] overflow-hidden rounded-xl border">
            <table className="w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Coverage
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                      {payment.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {payment.coverage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {payment.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-mono text-gray-500">
                      {payment.currency} {payment.amount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      <StatusBadge status={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end border-t bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
