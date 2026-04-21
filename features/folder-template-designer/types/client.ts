export type Template = {
  id: string;
  name: string;
};

export type Client = {
  id: string;
  name: string;
  templateId: string;
};

export type FolderItem = {
  id: string;
  clientId: string;
  clientName: string;
  folderName: string;
};
