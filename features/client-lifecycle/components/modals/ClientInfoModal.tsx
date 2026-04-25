import React from "react";
import { Modal } from "../Modal";
import { ClientInfo } from "../../types";
import { Mail, Phone, MapPin, Building2, User } from "lucide-react";

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClientInfo;
}

export const ClientInfoModal: React.FC<ClientInfoModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Client Information"
      widthClassName="sm:w-[720px]"
    >
      <div className="flex max-h-[calc(90vh-73px)] flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            <div className="flex items-start space-x-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="rounded-full bg-white p-2 shadow-sm">
                <Building2 className="h-6 w-6 text-accent" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-500">
                  Company Name
                </h4>
                <p className="text-lg font-semibold text-slate-900">
                  {data.companyName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Contact Person</p>
                  <p className="text-sm font-medium text-slate-900">
                    {data.contactName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email Address</p>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Phone Number</p>
                  <p className="text-sm font-medium text-slate-900">
                    {data.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="text-sm font-medium text-slate-900">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t bg-white px-6 py-4">
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
