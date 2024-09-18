import axiosClient from "@/utils/axios";
import { LoginFormSchemaValues } from "@/utils/schema/form";

export type LoginResponse = {
  accessToken: string;
};

export const login = (data: LoginFormSchemaValues) =>
  axiosClient().post<LoginResponse>("/login", data);
