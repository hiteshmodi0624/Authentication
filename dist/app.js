"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", auth_1.default);
app.use((err, req, res, next) => {
    res.status(err.statusCode).json(err.name);
});
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
