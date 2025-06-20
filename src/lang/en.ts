import type { LangProvider } from "@/lang/lang.types";

const en: LangProvider = {
  validation: {
    name: {
      required: "Name is required",
    },
    description: {
      "The description field is required.": "Description is required",
    },
  },
  code_messages: {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Data Not found",
    422: "Validation error",
    500: "Internal server error",
  },
};

export default en;
