"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToCache = exports.getCached = void 0;
const state_1 = require("./state");
const getCached = (qry) => {
    return (0, state_1.getRequest)((0, state_1.queryId)(qry));
};
exports.getCached = getCached;
const saveToCache = (qry, data) => {
    (0, state_1.setRequest)((0, state_1.queryId)(qry), data);
};
exports.saveToCache = saveToCache;
//# sourceMappingURL=cache.js.map