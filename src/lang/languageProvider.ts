import en from "@/lang/en";
import type { LangProvider } from "@/lang/lang.types";
import type { BaseApiResponse } from "@/services/api/api.types";

export const currentLang = import.meta.env.VITE_LANG || "en";

export const lang = {
  en,
};

export const getLangProvider = (langCode: string) => {
  switch (langCode) {
    case "en":
      return lang.en;
    default:
      return lang.en;
  }
};

export const getCurrentLangProvider = () => {
  return getLangProvider(currentLang);
};

export const translateApiError = (
  errorResponse: BaseApiResponse<unknown>,
  langProvider: LangProvider = getCurrentLangProvider()
) => {
  if (errorResponse.success) return null;
  if (!errorResponse.error) return null;

  const { validation } = langProvider;
  const { error } = errorResponse;

  if (error.name === "ValidationException") {
    const keys = Object.keys(error.messages);
    const firstError = keys[0];
    const firstErrorMessage = error.messages[firstError][0];

    let message = firstErrorMessage;
    if (validation[firstError] && validation[firstError][firstErrorMessage]) {
      message = validation[firstError][firstErrorMessage];
    }
    return message;
  }

  if (errorResponse.message) return errorResponse.message;
  return null;
};
