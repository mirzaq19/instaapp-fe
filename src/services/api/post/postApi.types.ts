import type { Post } from "@/entities/post.types";
import type { BaseApiResponse, BasePagination } from "@/services/api/api.types";

export type GetPostsPaginationRequest = {
  page?: number;
};

export type GetPostsPagination = {
  posts: BasePagination<Post>;
};

export type ApiGetPostsPaginationResponse = BaseApiResponse<GetPostsPagination>;

export type GetPost = {
  post: Post;
};

export type ApiGetPostResponse = BaseApiResponse<GetPost>;

export type AddPostRequest = {
  content: string;
  images: File[];
};

export type AddPost = {
  post_id: number;
};

export type ApiAddPostResponse = BaseApiResponse<AddPost>;
