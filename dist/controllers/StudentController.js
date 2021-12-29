"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const students_1 = __importDefault(require("../data/students"));
const ResponseJson_1 = __importDefault(require("../utils/ResponseJson"));
const Validate_1 = __importDefault(require("../utils/Validate"));
class StudentController {
    static index(req, res) {
        return ResponseJson_1.default.success(res, {
            status: 200,
            message: 'Show all students',
            data: students_1.default,
        });
    }
    static store(req, res) {
        const { name } = req.body;
        if (Validate_1.default.string(name)) {
            students_1.default.push(name);
            return ResponseJson_1.default.success(res, {
                status: 201,
                message: `Success to add student: ${name}`,
                data: students_1.default,
            });
        }
        return ResponseJson_1.default.fail(res, {
            status: 400,
            message: 'Fail to add student, make sure the key must be name',
        });
    }
    static update(req, res) {
        const id = Number(req.params.id) - 1;
        const { name } = req.body;
        if (id < students_1.default.length) {
            students_1.default[id] = name;
            return ResponseJson_1.default.success(res, {
                status: 200,
                message: `Success to edit student: ${id}, name: ${name}`,
                data: students_1.default,
            });
        }
        if (id > students_1.default.length) {
            return ResponseJson_1.default.fail(res, {
                status: 404,
                message: 'Student cannot be found',
            });
        }
        return ResponseJson_1.default.fail(res, {
            status: 500,
            message: 'Student fail to update',
        });
    }
    static destroy(req, res) {
        const id = parseInt(req.params.id, 10) - 1;
        if (id < students_1.default.length) {
            students_1.default.splice(id, 1);
            return ResponseJson_1.default.success(res, {
                status: 200,
                message: `Success to delete student: ${id}`,
                data: students_1.default,
            });
        }
        if (id > students_1.default.length) {
            return ResponseJson_1.default.fail(res, {
                status: 404,
                message: `Student cannot be found: ${id}`,
            });
        }
        return ResponseJson_1.default.fail(res, {
            status: 500,
            message: 'Student fail to update',
        });
    }
}
exports.default = StudentController;
