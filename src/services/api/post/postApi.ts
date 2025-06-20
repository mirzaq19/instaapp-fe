import ApplicationError from "@/exceptions/ApplicationError";
import { translateApiError } from "@/lang/languageProvider";
import url from "@/lib/url";
import apiFetch from "@/services/api/apiFetch";
import type {
  ApiGetPostsPaginationResponse,
  GetPostsPaginationRequest,
} from "@/services/api/post/postApi.types";

const getPosts = async ({ page = 1 }: GetPostsPaginationRequest) => {
  const urlWithParams = url.addParams("/posts", {
    page,
  });
  const response = await apiFetch(urlWithParams);
  const responseJson = (await response.json()) as ApiGetPostsPaginationResponse;

  if (!response.ok || !responseJson.success) {
    const message = translateApiError(responseJson) || "Failed to get posts";
    throw new ApplicationError(message);
  }

  const { data } = responseJson;
  return data;
};

export default {
  getPosts,
};
