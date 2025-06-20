import type { Post } from "@/entities/post.types";
import type { BaseApiResponse, BasePagination } from "@/services/api/api.types";

export type GetPostsPaginationRequest = {
  page?: number;
};

export type GetPostsPagination = {
  posts: BasePagination<Post>;
};

export type ApiGetPostsPaginationResponse = BaseApiResponse<GetPostsPagination>;
