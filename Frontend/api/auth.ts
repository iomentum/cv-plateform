import axiosClient from "@/utils/axios";
import { LoginFormSchemaValues, RegisterFormSchemaValues } from "@/utils/schema/form";

export type LoginResponse = {
  accessToken: string;
  userId: number;
};

export type RegisterResponse = {
  accessToken: string;
  userId: number;
  message: string;
};

export const login = (data: LoginFormSchemaValues) =>
  axiosClient().post<LoginResponse>("/login", data);

export const register = (data: RegisterFormSchemaValues) =>
  axiosClient().post<RegisterResponse>("/Register", data);
