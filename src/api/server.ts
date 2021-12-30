// Import essentials
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

import { ExpressOutput, ExpressResponse, ExpressRequest } from "./server.model";

export const setupAPI = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  return app;
};

/*
    Running The Server 
*/
export const runAPI = (app: any): void => {
  const port = 3000;

  // Run Server
  app.listen(port, () =>
    console.log(`Running Surf on port http://localhost:${port}`)
  );
};

/*
   Create a route
*/

export const createRoute = (
  app: any,
  path: string,
  getData: Function
): void => {
  app.get(
    path,
    async (
      req: ExpressRequest,
      res: ExpressResponse
    ): Promise<ExpressOutput> => {
      const data = await getData(req);

      res.send(data);
    }
  );
};
