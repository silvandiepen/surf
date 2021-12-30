import { Post } from "./post.model";

export interface ResponseData {
  path: string;
  posts?: Post[];
  post?: Post;
  sections?: {
    [key: string]: {
      name: string;
      posts: Post[];
      total: number;
    };
  };
  data?: any;
}

export type ExpressResponse = any;
export type ExpressRequest = any;
export type ExpressOutput = void;
