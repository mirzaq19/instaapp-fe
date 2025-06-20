import type { Comment } from "@/entities/comment.types";
import type { BaseApiResponse } from "@/services/api/api.types";

export type GetPostComments = {
  comments: Comment[];
};

export type ApiGetPostCommentsResponse = BaseApiResponse<GetPostComments>;

export type AddPostComment = {
  comment_id: number;
};

export type ApiAddPostCommentResponse = BaseApiResponse<AddPostComment>;
