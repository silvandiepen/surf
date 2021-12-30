import { Request } from "express";

import { getPost } from "../files";
import { ResponseData } from "../server.model";

export const getDetail = async (req: Request): Promise<ResponseData> => {
  const data = await getPost({
    id: req.params.id,
  });

  return {
    path: req.url,
    post: data,
  };
};
