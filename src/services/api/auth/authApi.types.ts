import type { User } from "@/entities/user.types";
import type { BaseApiResponse } from "@/services/api/api.types";

export type RegisterUserRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

type RegisterUser = {
  user: User;
};

export type ApiRegisterReponse = BaseApiResponse<RegisterUser>;
