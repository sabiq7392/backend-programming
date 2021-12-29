"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import db from '../config/database';
const Model_1 = __importDefault(require("./Model"));
class Student extends Model_1.default {
}
exports.default = Student;
Student.table = 'students';
