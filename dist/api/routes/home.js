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
exports.getHome = void 0;
const files_1 = require("../files");
const post_model_1 = require("../post.model");
const getHome = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = [
        post_model_1.PostFields.ID,
        post_model_1.PostFields.NAME,
        post_model_1.PostFields.DATE,
        post_model_1.PostFields.IMAGE,
        post_model_1.PostFields.TITLE,
    ];
    const today = yield (0, files_1.getPosts)({
        limit: 5,
        fields,
    });
    const archive = yield (0, files_1.getPosts)({
        limit: 20,
        offset: 5,
        fields,
    });
    const home = {
        path: req.url,
        sections: {
            today: {
                name: "today",
                posts: today,
                total: today.length,
            },
            archive: {
                name: "archive",
                posts: archive,
                total: archive.length,
            },
        },
        cached: false,
    };
    return home;
});
exports.getHome = getHome;
//# sourceMappingURL=home.js.map