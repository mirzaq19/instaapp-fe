export type BaseApiResponse<T = undefined> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      error:
        | {
            name:
              | "ClientExeption"
              | "ServerException"
              | "AuthorizationException"
              | "NotFoundException"
              | "InvariantException";
            code: number;
          }
        | {
            name: "ValidationException";
            code: 422;
            messages: Record<string, string[]>;
          };
    };

export type BasePagination<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};
