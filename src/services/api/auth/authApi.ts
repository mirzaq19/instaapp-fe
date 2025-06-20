import ApplicationError from "@/exceptions/ApplicationError";
import { translateApiError } from "@/lang/languageProvider";
import apiConfig from "@/services/api/apiConfig";
import type {
  ApiRegisterReponse,
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

export default {
  register,
};
