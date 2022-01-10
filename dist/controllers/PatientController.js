"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = exports.patientController = void 0;
const express_validator_1 = require("express-validator");
const Patient_1 = __importDefault(require("../model/Patient"));
const ResponseJson_1 = require("../utils/ResponseJson");
class PatientController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield Patient_1.default.all();
            if (patients.length <= 0) {
                return (0, ResponseJson_1.responseFailed)(res, {
                    status: 404,
                    message: 'Patient is empty',
                });
            }
            return (0, ResponseJson_1.responseSuccessfully)(res, {
                status: 200,
                message: 'Show All Patients',
                data: patients,
            });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const patient = yield Patient_1.default.find({ id });
            if (!patient) {
                return (0, ResponseJson_1.responseFailed)(res, {
                    status: 404,
                    message: `Patient not found: ID: ${id}`,
                });
            }
            return (0, ResponseJson_1.responseSuccessfully)(res, {
                status: 200,
                message: `Get detail patient. ID: ${id}`,
                data: patient,
            });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, ResponseJson_1.responseFailed)(res, {
                    status: 400,
                    errors: errors.array(),
                });
            }
            const patient = yield Patient_1.default.create(req.body);
            return (0, ResponseJson_1.responseSuccessfully)(res, {
                status: 201,
                message: 'Patient is added successfully',
                data: patient,
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const findPatient = yield Patient_1.default.find({ id });
            if (!findPatient) {
                return (0, ResponseJson_1.responseFailed)(res, {
                    status: 404,
                    message: `Patient not found: ID: ${id}`,
                });
            }
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, ResponseJson_1.responseFailed)(res, {
                    status: 400,
                    errors: errors.array(),
                });
            }
            const patient = yield Patient_1.default.update(id, req.body);
            return (0, ResponseJson_1.responseSuccessfully)(res, {
                status: 200,
                message: `Patients is update successfully. id: ${id}`,
                data: patient,
            });
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const findPatient = yield Patient_1.default.find({ id });
            if (!findPatient) {
                return (0, ResponseJson_1.responseFailed)(res, {
                    status: 404,
                    message: `Patient not found: ID: ${id}`,
                });
            }
            const patient = yield Patient_1.default.delete(id);
            return (0, ResponseJson_1.responseSuccessfully)(res, {
                status: 200,
                message: `Patiens is delete successfully: ID: ${id}`,
                data: patient,
            });
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.searchBy(res, req.params.name);
            // const { name } = req.params;
            // const patient = await Patient.find({ name });
            // if (!patient) {
            //   return responseFailed(res, {
            //     status: 404,
            //     message: `Patient is not found: NAME: ${name}`,
            //   });
            // }
            // return responseSuccessfully(res, {
            //   status: 200,
            //   message: `Patient name ${name} founded`,
            //   data: patient,
            // });
        });
    }
    positive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    recovered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    dead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static searchBy(res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(param);
        });
    }
}
exports.PatientController = PatientController;
const patientController = new PatientController();
exports.patientController = patientController;
