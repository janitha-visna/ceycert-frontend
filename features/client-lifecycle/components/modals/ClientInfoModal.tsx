import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { ClientInfo } from "../../types";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  BriefcaseBusiness,
  CheckCircle2,
  Pencil,
  Navigation,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

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
  const [formData, setFormData] = useState<ClientInfo>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateClientField = (
    field: keyof Omit<ClientInfo, "contacts">,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateContact = (
    index: number,
    field: keyof ClientInfo["contacts"][number],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      ),
    }));
  };

  const openGoogleMaps = () => {
    if (formData.latitude && formData.longitude) {
      window.open(
        `https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`,
        "_blank"
      );
      return;
    }

    if (formData.address) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          formData.address
        )}`,
        "_blank"
      );
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Client Information"
      widthClassName="sm:w-[900px]"
    >
      <div className="flex max-h-[calc(90vh-73px)] flex-col">
        {saved && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Client details saved successfully.
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            <Card className="bg-slate-50">
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    <Label className="text-sm font-medium text-slate-500">
                      Company Details
                    </Label>
                  </div>

                  {!isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={openGoogleMaps}
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Open in Maps
                    </Button>
                  )}
                </div>

                <EditableItem
                  icon={<Building2 className="h-5 w-5 text-slate-400" />}
                  label="Company Name"
                  value={formData.companyName}
                  editing={isEditing}
                  onChange={(value) => updateClientField("companyName", value)}
                />

                <EditableItem
                  icon={<MapPin className="h-5 w-5 text-slate-400" />}
                  label="Company Address"
                  value={formData.address}
                  editing={isEditing}
                  onChange={(value) => updateClientField("address", value)}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <EditableItem
                    icon={<MapPin className="h-5 w-5 text-slate-400" />}
                    label="Latitude"
                    value={formData.latitude || ""}
                    editing={isEditing}
                    onChange={(value) => updateClientField("latitude", value)}
                  />

                  <EditableItem
                    icon={<MapPin className="h-5 w-5 text-slate-400" />}
                    label="Longitude"
                    value={formData.longitude || ""}
                    editing={isEditing}
                    onChange={(value) => updateClientField("longitude", value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-700">
                Contact Persons
              </h4>

              <div className="space-y-4">
                {formData.contacts.map((contact, index) => (
                  <Card key={contact.id}>
                    <CardContent className="p-4">
                      <div className="mb-4 border-b pb-3">
                        <p className="text-sm font-semibold text-slate-900">
                          Contact Person {index + 1}
                        </p>
                        <p className="text-xs text-slate-500">
                          {contact.designation || "No designation added"}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <EditableItem
                          icon={<User className="h-5 w-5 text-slate-400" />}
                          label="Name"
                          value={contact.name}
                          editing={isEditing}
                          onChange={(value) =>
                            updateContact(index, "name", value)
                          }
                        />

                        <EditableItem
                          icon={
                            <BriefcaseBusiness className="h-5 w-5 text-slate-400" />
                          }
                          label="Designation"
                          value={contact.designation}
                          editing={isEditing}
                          onChange={(value) =>
                            updateContact(index, "designation", value)
                          }
                        />

                        <EditableItem
                          icon={<Mail className="h-5 w-5 text-slate-400" />}
                          label="Email Address"
                          value={contact.email}
                          editing={isEditing}
                          onChange={(value) =>
                            updateContact(index, "email", value)
                          }
                        />

                        <EditableItem
                          icon={<Phone className="h-5 w-5 text-slate-400" />}
                          label="Phone Number"
                          value={contact.phone}
                          editing={isEditing}
                          onChange={(value) =>
                            updateContact(index, "phone", value)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>

          {isEditing ? (
            <Button onClick={handleSave}>Save Changes</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

interface EditableItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}

const EditableItem: React.FC<EditableItemProps> = ({
  icon,
  label,
  value,
  editing,
  onChange,
}) => {
  return (
    <div className="flex items-start gap-3">
      {icon}

      <div className="w-full space-y-1">
        <Label className="text-xs text-slate-500">{label}</Label>

        {editing ? (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <p className="text-sm font-medium text-slate-900">
            {value || "Not added"}
          </p>
        )}
      </div>
    </div>
  );
};
