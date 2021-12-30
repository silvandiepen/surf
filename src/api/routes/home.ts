import { Request } from "express";

import { getPosts } from "../files";
import { ResponseData } from "../server.model";
import { PostFields } from "../post.model";

export const getHome = async (req: Request): Promise<ResponseData> => {
  const fields = [
    PostFields.ID,
    PostFields.NAME,
    PostFields.DATE,
    PostFields.IMAGE,
    PostFields.TITLE,
  ];
  const today = await getPosts({
    limit: 5,
    fields,
  });
  const archive = await getPosts({
    limit: 20,
    offset: 5,
    fields,
  });

  const home = {
    path: req.url,
    sections: {
      today: {
        name: "today",
        posts: today,
        total: today.length,
      },
      archive: {
        name: "archive",
        posts: archive,
        total: archive.length,
      },
    },
    cached: false,
  };

  return home;
};
