export type LangProvider = {
  validation: Record<string, Record<string, string>>;
  code_messages: Record<number, string>;
};
