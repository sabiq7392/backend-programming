"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFailed = exports.responseSuccessfully = void 0;
/**
 * !important
 *
 * this response specially for controllers method to get the result
 * where is failed or successfully
 *
 * @param res first thing to do is to declare this so your response is Running
 * @param dataJson what result you can get, you set the result in utils/Interfaces.ts
 *
 * @returns the return is your important data should send
 *  dont forget to return to in conttrollers method
 */
const responseSuccessfully = (res, dataJson) => {
    const { status } = dataJson;
    return res
        .status(status)
        .json(dataJson);
};
exports.responseSuccessfully = responseSuccessfully;
const responseFailed = (res, dataJson) => {
    const { status } = dataJson;
    return res
        .status(status)
        .json(dataJson);
};
exports.responseFailed = responseFailed;
