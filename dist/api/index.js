"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const routes_1 = require("./routes");
// Setup server
const app = (0, server_1.setupAPI)();
// Paths
(0, server_1.createRoute)(app, "/", routes_1.getHome);
(0, server_1.createRoute)(app, "/articles", routes_1.getArticles);
(0, server_1.createRoute)(app, "/news", routes_1.getNews);
(0, server_1.createRoute)(app, "/detail/:id", routes_1.getDetail);
(0, server_1.createRoute)(app, "/cache", routes_1.getCached);
(0, server_1.runAPI)(app);
//# sourceMappingURL=index.js.map