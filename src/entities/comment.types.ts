import type { User } from "@/entities/user.types";

export type Comment = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: Omit<User, "email" | "created_at" | "updated_at">;
};
