import ApplicationError from "@/exceptions/ApplicationError";
import { translateApiError } from "@/lang/languageProvider";
import apiConfig from "@/services/api/apiConfig";
import apiFetch from "@/services/api/apiFetch";
import type {
  ApiGetMeResponse,
  ApiLoginResponse,
  ApiRegisterReponse,
  LoginUserRequest,
  RegisterUserRequest,
} from "@/services/api/auth/authApi.types";

const register = async (requestData: RegisterUserRequest) => {
  let response: Response;
  try {
    response = await fetch(`${apiConfig.v1}/auth/register`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    });

    const responseJson = (await response.json()) as ApiRegisterReponse;

    if (!response.ok || !responseJson.success) {
      const message = translateApiError(responseJson) || "Failed to register";
      throw new ApplicationError(message);
    }

    const { data } = responseJson;
    return data;
  } catch (error) {
    const message =
      error instanceof ApplicationError ? error.message : "Failed to register";
    console.error(message);
    throw new ApplicationError(message);
  }
};

const login = async (requestData: LoginUserRequest) => {
  let response: Response;
  try {
    response = await fetch(`${apiConfig.v1}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    });

    const responseJson = (await response.json()) as ApiLoginResponse;

    if (!response.ok || !responseJson.success) {
      const message = translateApiError(responseJson) || "Failed to login";
      throw new ApplicationError(message);
    }

    const { data } = responseJson;
    return data;
  } catch (error) {
    const message =
      error instanceof ApplicationError ? error.message : "Failed to login";
    console.error(message);
    throw new ApplicationError(message);
  }
};

const getMe = async () => {
  const response = await apiFetch("/auth/me");
  const responseJson = (await response.json()) as ApiGetMeResponse;

  if (!response.ok || !responseJson.success) {
    let message = translateApiError(responseJson) || "Failed to get user data";

    if (response.status === 401)
      message = "Session expired, please login again";
    throw new ApplicationError(message);
  }

  const { data } = responseJson;
  return data;
};

export default {
  register,
  login,
  getMe,
};
