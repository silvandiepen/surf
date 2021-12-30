import { Request } from "express";

import { getPosts } from "../files";
import { ResponseData } from "../server.model";

export const getArticles = async (req: Request): Promise<ResponseData> => {
  const data = await getPosts({});

  return {
    path: req.url,
    posts: data,
  };
};
