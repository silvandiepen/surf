import { Request } from "express";

import { ResponseData } from "../server.model";
import { state } from "../state";

export const getCached = async (req: Request): Promise<ResponseData> => {
  return {
    path: req.url,
    data: state,
  };
};
