import { type Client } from "@/features/clients/types";

// Mock data until the backend exists. Only data.ts should import this file.
// IDs are fixed (not generated) so URLs stay stable across server restarts.
export const MOCK_CLIENTS: Client[] = [
  {
    id: "c0000000-0000-4000-8000-000000000001",
    name: "Harbourside Developments Ltd",
    email: "projects@harbourside.co.uk",
    phone: "+44 20 7946 0123",
    address: "14 Wharf Road, London N1 7GR",
    createdAt: "2026-01-12T09:30:00Z",
  },
  {
    id: "c0000000-0000-4000-8000-000000000002",
    name: "Smith & Sons Building Contractors",
    email: "office@smithandsons.co.uk",
    phone: "+44 161 496 0456",
    address: "3 Mill Lane, Manchester M4 5JD",
    createdAt: "2026-03-04T14:05:00Z",
  },
  {
    // Edge case: very long name, to check that layouts don't break.
    id: "c0000000-0000-4000-8000-000000000003",
    name: "The Greater Manchester Regional Housing Association Refurbishment and Maintenance Partnership Ltd",
    email: "procurement@gmrha-refurbishment-partnership.org.uk",
    address: "Unit 27, Trafford Park Industrial Estate, Manchester M17 1AA",
    createdAt: "2026-05-20T08:00:00Z",
  },
  {
    // Edge case: a private individual with no optional fields.
    id: "c0000000-0000-4000-8000-000000000004",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    createdAt: "2026-08-02T17:45:00Z",
  },
];
