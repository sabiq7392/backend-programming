"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentController_1 = __importDefault(require("../controllers/StudentController"));
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => res.send('Students API - Author Sabiq'));
router.route('/students')
    .get(StudentController_1.default.index)
    .post(StudentController_1.default.store);
router.route('/students/:id')
    .put(StudentController_1.default.update)
    .delete(StudentController_1.default.destroy);
exports.default = router;
