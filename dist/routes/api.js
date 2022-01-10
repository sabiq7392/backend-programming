"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PatientController_1 = require("../controllers/PatientController");
const Validate_1 = require("../middleware/Validate");
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => res.send('Covid Patients API - Author Sabiq'));
router.route('/patients')
    .get(PatientController_1.patientController.index)
    .post(Validate_1.ValidatePost, PatientController_1.patientController.store);
router.route('/patients/:id')
    .get(PatientController_1.patientController.show)
    .put(Validate_1.ValidatePut, PatientController_1.patientController.update)
    .delete(PatientController_1.patientController.destroy);
router.route('/patients/search/:name')
    .get(PatientController_1.PatientController.search);
router.route('/patients/status/:status')
    .get(PatientController_1.patientController.positive);
// router.route('/patients/status/recovered')
//   .get(patientController.recovered);
// router.route('/patients/status/dead')
//   .get(patientController.dead);
exports.default = router;
