import { PostFields } from "./post.model";
import { Post } from "./post.model";

export enum Order {
  "ASC" = "[Order] Ascending",
  "DESC" = "[Order] Descending",
}

export interface QueryArguments {
  id?: string;
  offset?: number;
  limit?: number;
  order?: Order;
  fields?: PostFields[];
}
