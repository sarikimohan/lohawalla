import { NameIdPair } from "@src/modules/backendTypes/change/NameIdPair";

export interface DescriptionData {
  key: string;
  value: string;
  position: number;
}

export interface FormData {
  name: string;
  code: number;
  description: string;
  unit: string;
  credit: Credit[];
  negotiation: number;
  descriptionLabels: DescriptionData[];
  by: NameIdPair;
  images: string[];
}