"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class Model {
    static all() {
        return this._select(`SELECT * FROM ${this.table}`);
    }
    static find(data) {
        const key = Object.keys(data);
        const value = Object.values(data);
        return this._select(`SELECT * FROM ${this.table} WHERE ${key} = "${value}"`);
    }
    // public static _find(name: string) {
    //   return new Promise((resolve, reject) => {
    //     const sql: string = `SELECT * FROM ${this.table} WHERE name = '${name}'`;
    //     db.query(sql, (err, result: GetResult) => {
    //       if (err) reject(err);
    //       if (result) resolve(result);
    //     });
    //   });
    // }
    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ${this.table} SET ?`;
            database_1.default.query(sql, data, (err, result) => {
                if (err)
                    reject(err);
                if (result)
                    resolve(this.find({ data: result.insertId }));
            });
        });
    }
    static update(id, data) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${this.table} SET ? WHERE id = ?`;
            database_1.default.query(sql, [data, id], (err, result) => {
                if (err)
                    reject(err);
                if (result)
                    resolve(this.find({ id }));
            });
        });
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;
            database_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (result)
                    resolve(result);
            });
        });
    }
    static _select(sql) {
        return new Promise((resolve, reject) => {
            database_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (result.length === 0)
                    resolve(result.length);
                if (result)
                    resolve(result);
            });
        });
    }
}
exports.default = Model;
