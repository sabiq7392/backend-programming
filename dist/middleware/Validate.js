"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePut = exports.ValidatePost = void 0;
const express_validator_1 = require("express-validator");
exports.ValidatePost = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('should not be null')
        .isString().withMessage('should be string'),
    (0, express_validator_1.check)('phone')
        .notEmpty().withMessage('should not be null')
        .isLength({ min: 5 }).withMessage('min length is 5')
        .isString().withMessage('should be string'),
    (0, express_validator_1.check)('address')
        .notEmpty().withMessage('should not be null')
        .isString().withMessage('should be string'),
    (0, express_validator_1.check)('status')
        .notEmpty().withMessage('should not be null')
        .isString().withMessage('should be string')
        .isIn(['positive', 'recovered', 'dead']).withMessage('should positive, recovered, dead'),
    (0, express_validator_1.check)('in_date_at')
        .notEmpty().withMessage('should not be null')
        .isDate().withMessage('should be date, ex: 2021-11-02'),
    (0, express_validator_1.check)('out_date_at')
        .notEmpty().withMessage('should not be null')
        .isDate().withMessage('should be date, ex: 2021-11-03'),
];
exports.ValidatePut = [
    (0, express_validator_1.check)('name')
        .optional()
        .isString().withMessage('should be string'),
    (0, express_validator_1.check)('phone')
        .optional()
        .isLength({ min: 3 }).withMessage('min length is 5')
        .isString().withMessage('should be string'),
    (0, express_validator_1.check)('address')
        .optional()
        .isString().withMessage('should be string'),
    (0, express_validator_1.check)('status')
        .optional()
        .isString().withMessage('should be string')
        .isIn(['positive', 'recovered', 'dead']).withMessage('should positive, recovered, dead'),
    (0, express_validator_1.check)('in_date_at')
        .optional()
        .isDate().withMessage('should be date, ex: 2021-11-02'),
    (0, express_validator_1.check)('out_date_at')
        .optional()
        .isDate().withMessage('should be date, ex: 2021-11-03'),
];
