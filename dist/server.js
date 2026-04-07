"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_js_1 = __importDefault(require("./Routes/userRoutes.js"));
const logger_js_1 = require("./middleware/logger.js");
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const db_js_1 = require("./config/db.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_js_1.logger);
app.get('/', (req, res) => {
    res.send("API is Running");
});
app.use('/users', userRoutes_js_1.default);
// ErrorHandler Middlewere
app.use(errorHandler_js_1.errorHandler);
db_js_1.sequelize.sync().then(() => {
    console.log("DB connected");
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is Running on port ${PORT}`);
    });
});
