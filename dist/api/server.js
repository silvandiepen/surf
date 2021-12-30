"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoute = exports.runAPI = exports.setupAPI = void 0;
// Import essentials
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const setupAPI = () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    return app;
};
exports.setupAPI = setupAPI;
/*
    Running The Server
*/
const runAPI = (app) => {
    const port = 3000;
    // Run Server
    app.listen(port, () => console.log(`Running Surf on port http://localhost:${port}`));
};
exports.runAPI = runAPI;
/*
   Create a route
*/
const createRoute = (app, path, getData) => {
    app.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield getData(req);
        res.send(data);
    }));
};
exports.createRoute = createRoute;
//# sourceMappingURL=server.js.map