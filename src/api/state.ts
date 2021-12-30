import { State } from "./state.model";
import { hashCode } from "./helpers";
import { QueryArguments } from "./files.model";
import { Post } from "./post.model";

export const state: State = {
  queries: {},
};

export const queryId = (qry: QueryArguments): number => {
  return hashCode(JSON.stringify(qry));
};

export const getRequest = (qryId: number): Post[] | null => {
  let data = null;

  if (state.queries[qryId]) {
    data = JSON.parse(state.queries[qryId]) as Post[];
  }
  return data;
};

export const setRequest = (qryId: number, data: Post[]) => {
  state.queries[qryId] = JSON.stringify(data);
};

export const cleanRequests = () => {
  state.queries = {};
};
