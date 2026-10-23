export type TAuthPayload = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  role: "ADMIN" | "STUDENT";
  status: "ACTIVE" | "BLOCKED";
};
