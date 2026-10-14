import { type IsoTimestamp } from "@/types/common";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: IsoTimestamp;
};
