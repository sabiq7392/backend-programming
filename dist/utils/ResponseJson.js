"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseJson {
    static success(res, dataJson) {
        const { status, message, data } = dataJson;
        res
            .status(status)
            .json({ status, message, data });
    }
    static fail(res, dataJson) {
        const { status, message, data } = dataJson;
        res
            .status(status)
            .json({ status, message, data });
    }
}
exports.default = ResponseJson;
