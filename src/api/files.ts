import { join } from "path";
const { readdir, readFile } = require("fs").promises;

import { Post, PostFields } from "./post.model";
import { Order, QueryArguments } from "./files.model";
import { getCached, saveToCache } from "./cache";
import {
  getTitle,
  removeTitle,
  getId,
  getName,
  getDateFromFilename,
  asyncForEach,
} from "./helpers";

export const getPostData = async (filename: string): Promise<string> => {
  const file = await readFile(join(__dirname, "../../content/", filename)).then(
    (res: Response) => {
      return res.toString();
    }
  );
  return file;
};

export const getPost = async (args: QueryArguments): Promise<Post | null> => {
  const config = {
    fields: [
      PostFields.ID,
      PostFields.DATE,
      PostFields.NAME,
      PostFields.TITLE,
      PostFields.CONTENT,
    ],
    ...args,
  };
  if (!config.id) return null;

  const data: Post[] = getCached(config);
  if (data) return data[0];

  const filename = config.id;
  const post = await getFields(config.fields, filename + ".md");

  saveToCache(config, [post as Post]);

  return post as Post;
};

export const getPosts = async (args: QueryArguments): Promise<Post[]> => {
  const config = {
    limit: -1,
    offset: 0,
    order: Order.ASC,
    fields: [PostFields.ID, PostFields.NAME],
    ...args,
  };

  const data: Post[] = getCached(config);
  if (data) return data;

  const contentPath = join(__dirname, "../../content");

  let postFiles = await readdir(contentPath);

  const posts: Post[] = [];

  if (config.limit)
    postFiles = postFiles.splice(
      0 + config.offset,
      config.limit + config.offset
    );

  await asyncForEach(postFiles, async (filename: string) => {
    const post: Partial<Post> = await getFields(config.fields, filename);

    posts.push(post as Post);
  });

  saveToCache(config, posts);

  return posts;
};

export const getFields = async (fields: PostFields[], filename: string) => {
  const post: Partial<Post> = {};
  let fileContent: string;
  /* 
        Actual content only has to be loaded when Title or Content are needed.
    **/
  const fieldWhichRequireContent = [PostFields.TITLE, PostFields.CONTENT];

  if (fields.some((field) => fieldWhichRequireContent.includes(field))) {
    fileContent = await getPostData(filename);
  }

  fields.forEach((field: PostFields) => {
    let value: any;

    switch (field) {
      case PostFields.ID:
        value = getId(filename);
        break;
      case PostFields.NAME:
        value = getName(filename);
        break;
      case PostFields.DATE:
        value = getDateFromFilename(filename);
        break;
      case PostFields.TITLE:
        value = getTitle(fileContent);
        break;
      case PostFields.CONTENT:
        value = removeTitle(fileContent).trim();
    }

    post[field] = value;
  });

  return post;
};
