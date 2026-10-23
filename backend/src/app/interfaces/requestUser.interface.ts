export type TAuthPayload = {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "STUDENT";
  status: "ACTIVE" | "BLOCKED";
};
