"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validate {
    static string(isValidate) {
        return isValidate && typeof isValidate === 'string';
    }
    static number(isValidate) {
        return isValidate && typeof isValidate === 'number';
    }
}
exports.default = Validate;
