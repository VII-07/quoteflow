import { MOCK_CLIENTS } from "@/features/clients/mocks";
import { type Client } from "@/features/clients/types";

export const getClients = async (): Promise<Client[]> => {
  const clients = structuredClone(MOCK_CLIENTS);
  return clients;
};

export const getClientById = async (id: string): Promise<Client | null> => {
  const clients = await getClients();

  return clients.find((c) => c.id === id) ?? null;
};
