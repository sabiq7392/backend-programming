import { check, ValidationChain } from 'express-validator';

const ValidatePost: ValidationChain[] = [
  check('name')
    .notEmpty().withMessage('should not be null')
    .isString().withMessage('should be string'),

  check('phone')
    .notEmpty().withMessage('should not be null')
    .isLength({ min: 5 }).withMessage('min length is 5')
    .isString().withMessage('should be string'),

  check('address')
    .notEmpty().withMessage('should not be null')
    .isString().withMessage('should be string'),

  check('status')
    .notEmpty().withMessage('should not be null')
    .isString().withMessage('should be string')
    .isIn(['positive', 'negative', 'dead']).withMessage('should positive, negative, dead'),

  check('in_date_at')
    .notEmpty().withMessage('should not be null')
    .isDate().withMessage('should be date, ex: 2021-11-02'),

  check('out_date_at')
    .notEmpty().withMessage('should not be null')
    .isDate().withMessage('should be date, ex: 2021-11-03'),
];

export default ValidatePost;
