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
exports.getFields = exports.getPosts = exports.getPost = exports.getPostData = void 0;
const path_1 = require("path");
const { readdir, readFile } = require("fs").promises;
const post_model_1 = require("./post.model");
const files_model_1 = require("./files.model");
const cache_1 = require("./cache");
const helpers_1 = require("./helpers");
const getPostData = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield readFile((0, path_1.join)(__dirname, "../../content/", filename)).then((res) => {
        return res.toString();
    });
    return file;
});
exports.getPostData = getPostData;
const getPost = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const config = Object.assign({ fields: [
            post_model_1.PostFields.ID,
            post_model_1.PostFields.DATE,
            post_model_1.PostFields.NAME,
            post_model_1.PostFields.TITLE,
            post_model_1.PostFields.CONTENT,
        ] }, args);
    if (!config.id)
        return null;
    const data = (0, cache_1.getCached)(config);
    if (data)
        return data[0];
    const filename = config.id;
    const post = yield (0, exports.getFields)(config.fields, filename + ".md");
    (0, cache_1.saveToCache)(config, [post]);
    return post;
});
exports.getPost = getPost;
const getPosts = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const config = Object.assign({ limit: -1, offset: 0, order: files_model_1.Order.ASC, fields: [post_model_1.PostFields.ID, post_model_1.PostFields.NAME] }, args);
    const data = (0, cache_1.getCached)(config);
    if (data)
        return data;
    const contentPath = (0, path_1.join)(__dirname, "../../content");
    let postFiles = yield readdir(contentPath);
    const posts = [];
    if (config.limit)
        postFiles = postFiles.splice(0 + config.offset, config.limit + config.offset);
    yield (0, helpers_1.asyncForEach)(postFiles, (filename) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield (0, exports.getFields)(config.fields, filename);
        posts.push(post);
    }));
    (0, cache_1.saveToCache)(config, posts);
    return posts;
});
exports.getPosts = getPosts;
const getFields = (fields, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const post = {};
    let fileContent;
    /*
          Actual content only has to be loaded when Title or Content are needed.
      **/
    const fieldWhichRequireContent = [post_model_1.PostFields.TITLE, post_model_1.PostFields.CONTENT];
    if (fields.some((field) => fieldWhichRequireContent.includes(field))) {
        fileContent = yield (0, exports.getPostData)(filename);
    }
    fields.forEach((field) => {
        let value;
        switch (field) {
            case post_model_1.PostFields.ID:
                value = (0, helpers_1.getId)(filename);
                break;
            case post_model_1.PostFields.NAME:
                value = (0, helpers_1.getName)(filename);
                break;
            case post_model_1.PostFields.DATE:
                value = (0, helpers_1.getDateFromFilename)(filename);
                break;
            case post_model_1.PostFields.TITLE:
                value = (0, helpers_1.getTitle)(fileContent);
                break;
            case post_model_1.PostFields.CONTENT:
                value = (0, helpers_1.removeTitle)(fileContent).trim();
        }
        post[field] = value;
    });
    return post;
});
exports.getFields = getFields;
//# sourceMappingURL=files.js.map