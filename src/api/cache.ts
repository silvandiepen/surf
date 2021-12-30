import { getRequest, queryId, setRequest } from "./state";
import { QueryArguments } from "./files.model";
import { Post } from "./post.model";

export const getCached = (qry: QueryArguments): Post[] => {
  return getRequest(queryId(qry));
};

export const saveToCache = (qry: QueryArguments, data: Post[]): void => {
  setRequest(queryId(qry), data);
};
