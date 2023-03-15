"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,PATCH,DELETE");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
    next();
});
app.use("/auth", auth_1.default);
app.use((err, _req, res, _next) => {
    res.status(err.statusCode).json(err.name);
});
mongoose_1.default
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bawdpwj.mongodb.net/`)
    .then((_result) => app.listen(process.env.PORT, () => { console.log(`Listning on port ${process.env.PORT}`); }))
    .catch((error) => {
    throw error;
});
