import { setupAPI, runAPI, createRoute } from "./server";

import { getHome, getNews, getDetail, getArticles, getCached } from "./routes";

// Setup server
const app = setupAPI();

// Paths

createRoute(app, "/", getHome);

createRoute(app, "/articles", getArticles);

createRoute(app, "/news", getNews);

createRoute(app, "/detail/:id", getDetail);

createRoute(app, "/cache", getCached);

runAPI(app);
