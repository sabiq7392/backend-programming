"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class Model {
    static all() {
        return this._selectData(`SELECT * FROM ${this.table}`);
    }
    static find(id) {
        return this._selectData(`SELECT * FROM ${this.table} WHERE id = ${id}`);
    }
    static create(data) {
        return new Promise((resolve, reject) => {
            database_1.default.query({
                sql: `INSERT INTO ${this.table} SET ?`,
                values: data,
            }, (err, result) => {
                console.log(`Last inserted ID: ${result.insertId}`);
                return err ? reject(err) : resolve(result);
            });
        });
    }
    static update(id, data) {
        return new Promise((resolve, reject) => {
            const dataInfo = Object.entries(data);
            for (const [key, value] of dataInfo) {
                database_1.default.query({
                    sql: `UPDATE ${this.table} SET ${key} = ? WHERE id = ?`,
                    values: [value, id],
                }, (err, result) => (err ? reject(err) : resolve(result.affectedRows)));
            }
        });
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            database_1.default.query({
                sql: `DELETE FROM ${this.table} WHERE id = ?`,
                values: id,
            }, (err, result) => (err ? reject(err) : resolve(result.affectedRows)));
        });
    }
    static _selectData(sql) {
        return new Promise((resolve, reject) => {
            database_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (result.length === 0) {
                    resolve(result.length);
                }
                resolve(result);
            });
        });
    }
}
exports.default = Model;
