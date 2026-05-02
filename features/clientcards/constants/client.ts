import { Scheme, ClientStatus } from "../types/client";

export const SCHEMES: Scheme[] = [
  "FSMS",
  "QMS",
  "EMS",
  "OH&SMS",
  "ENMS",
  "EOMS",
  "ISMS",
  "BCMS",
  "PIMS",
  "ITSMS",
  "ESMS",
];

export const STATUSES: ClientStatus[] = ["Active", "Inactive"];

export const SCHEME_COLORS: Record<Scheme, string> = {
  FSMS: "bg-emerald-100 text-emerald-700 border-emerald-200",
  QMS: "bg-blue-100 text-blue-700 border-blue-200",
  EMS: "bg-green-100 text-green-700 border-green-200",
  "OH&SMS": "bg-orange-100 text-orange-700 border-orange-200",
  ENMS: "bg-yellow-100 text-yellow-700 border-yellow-200",
  EOMS: "bg-indigo-100 text-indigo-700 border-indigo-200",
  ISMS: "bg-purple-100 text-purple-700 border-purple-200",
  BCMS: "bg-rose-100 text-rose-700 border-rose-200",
  PIMS: "bg-cyan-100 text-cyan-700 border-cyan-200",
  ITSMS: "bg-slate-100 text-slate-700 border-slate-200",
  ESMS: "bg-teal-100 text-teal-700 border-teal-200",
};
