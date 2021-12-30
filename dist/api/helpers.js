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
exports.hashCode = exports.asyncForEach = exports.getDateFromFilename = exports.getName = exports.getId = exports.removeTitle = exports.getTitle = void 0;
const getTitle = (str) => {
    return str
        .split("\n")
        .find((line) => line.startsWith("# "))
        .replace("# ", "");
};
exports.getTitle = getTitle;
const removeTitle = (str) => str.replace(str.split("\n").find((line) => line.startsWith("# ")), "");
exports.removeTitle = removeTitle;
const getId = (str) => str.replace(".md", "");
exports.getId = getId;
const getName = (str) => str.replace(".md", "").split("-").slice(1).join("-");
exports.getName = getName;
const getDateFromFilename = (str) => {
    const dateString = str.split("-")[0];
    const date = new Date(parseInt(dateString.substring(0, 4)), parseInt(dateString.substring(4, 6)), parseInt(dateString.substring(6, 8)), parseInt(dateString.substring(8, 10)), parseInt(dateString.substring(10, 12)), parseInt(isNaN(parseInt(dateString.substring(12, 14)))
        ? "00"
        : dateString.substring(12, 14)));
    return date;
};
exports.getDateFromFilename = getDateFromFilename;
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
exports.asyncForEach = asyncForEach;
const hashCode = (str) => {
    if (typeof str == "object")
        str = str.join("-");
    var hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
exports.hashCode = hashCode;
//# sourceMappingURL=helpers.js.map