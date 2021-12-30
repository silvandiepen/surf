"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanRequests = exports.setRequest = exports.getRequest = exports.queryId = exports.state = void 0;
const helpers_1 = require("./helpers");
exports.state = {
    queries: {},
};
const queryId = (qry) => {
    return (0, helpers_1.hashCode)(JSON.stringify(qry));
};
exports.queryId = queryId;
const getRequest = (qryId) => {
    let data = null;
    if (exports.state.queries[qryId]) {
        data = JSON.parse(exports.state.queries[qryId]);
    }
    return data;
};
exports.getRequest = getRequest;
const setRequest = (qryId, data) => {
    exports.state.queries[qryId] = JSON.stringify(data);
};
exports.setRequest = setRequest;
const cleanRequests = () => {
    exports.state.queries = {};
};
exports.cleanRequests = cleanRequests;
//# sourceMappingURL=state.js.map