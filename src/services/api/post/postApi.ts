import ApplicationError from "@/exceptions/ApplicationError";
import { translateApiError } from "@/lang/languageProvider";
import url from "@/lib/url";
import apiFetch from "@/services/api/apiFetch";
import type {
  ApiGetPostResponse,
  ApiGetPostsPaginationResponse,
  GetPostsPaginationRequest,
} from "@/services/api/post/postApi.types";
import type { BaseApiResponse } from "../api.types";

const getPosts = async ({ page = 1 }: GetPostsPaginationRequest) => {
  const urlWithParams = url.addParams("/posts", {
    page,
  });
  const response = await apiFetch(urlWithParams, {}, true);
  const responseJson = (await response.json()) as ApiGetPostsPaginationResponse;

  if (!response.ok || !responseJson.success) {
    const message = translateApiError(responseJson) || "Failed to get posts";
    throw new ApplicationError(message);
  }

  const { data } = responseJson;
  return data;
};

const likePost = async (postId: number) => {
  const response = await apiFetch(`/posts/${postId}/like`, {
    method: "POST",
  });

  if (!response.ok) {
    const responseJson = (await response.json()) as BaseApiResponse;
    const message = translateApiError(responseJson) || "Failed to like post";
    throw new ApplicationError(message);
  }

  return true;
};

const getPost = async (postId: number) => {
  const response = await apiFetch(`/posts/${postId}`, {}, true);
  const responseJson = (await response.json()) as ApiGetPostResponse;

  if (!response.ok || !responseJson.success) {
    const message = translateApiError(responseJson) || "Failed to get post";
    throw new ApplicationError(message);
  }

  return responseJson.data;
};

export default {
  getPosts,
  getPost,
  likePost,
};
