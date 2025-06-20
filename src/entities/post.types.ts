import type { PostImage } from "@/entities/postImage.types";
import type { User } from "@/entities/user.types";

export type Post = {
  id: number;
  content: string;
  user: Omit<User, "email" | "created_at" | "updated_at">;
  likes_count: number;
  is_liked: boolean | undefined;
  comments_count: number;
  images: PostImage[];
  created_at: string;
  updated_at: string;
};
