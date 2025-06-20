import ApplicationError from "@/exceptions/ApplicationError";
import { translateApiError } from "@/lang/languageProvider";
import apiFetch from "@/services/api/apiFetch";
import type {
  ApiAddPostCommentResponse,
  ApiGetPostCommentsResponse,
} from "@/services/api/comment/commentApi.types";

const getPostComments = async (postId: number) => {
  const response = await apiFetch(`/posts/${postId}/comments`, {}, true);
  const responseJson = (await response.json()) as ApiGetPostCommentsResponse;

  if (!response.ok || !responseJson.success) {
    const message =
      translateApiError(responseJson) || "Failed to get post comments";
    throw new ApplicationError(message);
  }

  return responseJson.data;
};

const addComment = async (postId: number, comment: string) => {
  const response = await apiFetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content: comment }),
  });
  const responseJson = (await response.json()) as ApiAddPostCommentResponse;

  if (!response.ok || !responseJson.success) {
    const message = translateApiError(responseJson) || "Failed to add comment";
    throw new ApplicationError(message);
  }

  return responseJson.data;
};

export default {
  getPostComments,
  addComment,
};
