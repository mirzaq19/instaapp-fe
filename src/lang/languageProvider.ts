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

  const { code_messages, validation } = langProvider;
  const { error } = errorResponse;

  if (error.name === "ValidationException") {
    const keys = Object.keys(error.messages);
    const firstError = keys[0];
    const firstErrorMessage = error.messages[firstError][0];
    if (!validation[firstError]) return null; // check if the validation key is exist

    const message = validation[firstError][firstErrorMessage];
    if (!message) return null; // check if the validation message is exist
    return message;
  }

  const message = code_messages[error.code];
  if (message) return message;

  if (errorResponse.message) return errorResponse.message;
  return null;
};
