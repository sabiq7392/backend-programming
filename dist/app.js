"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
require('dotenv').config();
const { BASE_URL, APP_PORT } = process.env;
const app = (0, express_1.default)();
app.listen(APP_PORT || 3000, () => console.log(`Server running in ${BASE_URL}:${APP_PORT}`));
app.use(express_1.default.json());
app.use(api_1.default);
