import ApplicationError from "@/exceptions/ApplicationError";
import apiConfig from "@/services/api/apiConfig";
import auth from "@/services/localstorage/auth";

const apiFetch = async (
  url: string,
  options: RequestInit = {},
  optionalAuth: boolean = false
) => {
  const token = auth.getToken();

  if (!token && !optionalAuth) {
    throw new ApplicationError("Access token is missing");
  }

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token?.access_token ?? ""}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  // If the token is not present and optionalAuth is true, remove the Authorization header
  if (!token && optionalAuth) {
    const headers = requestOptions.headers as Record<string, string>;
    delete headers["Authorization"];
  }

  //check option body is form data or not, if it is form data, remove content-type
  if (requestOptions.body instanceof FormData) {
    const headers = requestOptions.headers as Record<string, string>;
    delete headers["Content-Type"];
  }

  try {
    const response = await fetch(`${apiConfig.v1}${url}`, requestOptions);
    return response;
  } catch (error) {
    const message =
      error instanceof ApplicationError
        ? error.message
        : "Failed to fetch data";
    throw new ApplicationError(message);
  }
};

export default apiFetch;
