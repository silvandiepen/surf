export enum Category {
  "NEWS" = "[CATEGORY] news",
  "ARTICLE" = "[CATEGORY] article",
  "VIDEO" = "[CATEGORY] video",
  "AUDIO" = "[CATEGORY] audio",
  "PHOTO" = "[CATEGORY] photo",
}
export type Tag = string;

export enum PostFields {
  ID = "id",
  NAME = "name",
  DATE = "date",
  TITLE = "title",
  CONTENT = "content",
  IMAGE = "image",
  AUTHOR = "author",
  CATEGORY = "category",
  TAGS = "tags",
}

export interface Post {
  id: string;
  name: string;
  date: Date;
  title: string;
  content: string;
  image?: string;
  author?: string;
  category?: Category[];
  tags?: Tag[];
}

export interface PostRequest {
  date: Date;
  name: string;
  req: string;
  result: any;
}
