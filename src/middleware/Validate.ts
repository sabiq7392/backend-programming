import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ResponseFailed } from '../utils/ResponseJson';

/** to run errors */
const errorsHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const hasError = !errors.isEmpty();
  if (hasError) {
    return res
      .status(422)
      .json(<ResponseFailed>{
        isSuccess: false,
        errors: errors.array(),
      });
  }

  return next();
};

/** message in validate */
const message = {
  isDate: 'should be date, ex: 2021-11-02',
  isIn: 'should positive, recovered, dead',
  isLength: (len: number) => `min length is ${len}`,
  isNumeric: 'should be numeric, ex: 08888',
  isString: 'should be string',
  notEmpty: 'should not be null',
};

const { isString, isDate, isIn, isLength, isNumeric, notEmpty } = message;

/**
 * @POST
 */
export const validatePost = [
  check('name')
    .notEmpty().withMessage(notEmpty)
    .isString().withMessage(isString),

  check('phone')
    .notEmpty().withMessage(notEmpty)
    .isLength({ min: 5 }).withMessage(isLength(5))
    .isString().withMessage(isString)
    .isNumeric().withMessage(isNumeric),

  check('address')
    .notEmpty().withMessage(notEmpty)
    .isString().withMessage(isString),

  check('status')
    .notEmpty().withMessage(notEmpty)
    .isString().withMessage(isString)
    .isIn(['positive', 'recovered', 'dead']).withMessage(isIn),

  check('in_date_at')
    .notEmpty().withMessage(notEmpty)
    .isDate().withMessage(isDate),

  check('out_date_at')
    .notEmpty().withMessage(notEmpty)
    .isDate().withMessage(isDate),
  errorsHandler,
];

/**
 * @PUT
 */
export const validatePut = [
  check('name')
    .optional()
    .isString().withMessage(isString),

  check('phone')
    .optional()
    .isLength({ min: 3 }).withMessage(isLength(3))
    .isString().withMessage(isString)
    .isNumeric().withMessage(isNumeric),

  check('address')
    .optional()
    .isString().withMessage(isString),

  check('status')
    .optional()
    .isString().withMessage(isString)
    .isIn(['positive', 'recovered', 'dead']).withMessage(isIn),

  check('in_date_at')
    .optional()
    .isDate().withMessage(isDate),

  check('out_date_at')
    .optional()
    .isDate().withMessage(isDate),
  errorsHandler,
];

/**
 * @AUTH
 */
export const validateAuth = [
  check('username')
    .notEmpty().withMessage(notEmpty)
    .isString().withMessage(isString),
  check('password')
    .notEmpty().withMessage(notEmpty)
    .isString().withMessage(isString),
  errorsHandler,
];
