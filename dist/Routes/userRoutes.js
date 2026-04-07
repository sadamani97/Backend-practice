"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_js_1 = require("../Controller/UserController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = express_1.default.Router();
router.post('/register', UserController_js_1.registerUser);
router.post('/login', UserController_js_1.loginUser);
router.post('/', UserController_js_1.createUser);
router.get('/', auth_js_1.auth, UserController_js_1.getUsers);
router.get('/:id', auth_js_1.auth, UserController_js_1.getUserById);
router.put('/:id', auth_js_1.auth, UserController_js_1.updateUser);
router.delete('/:id', auth_js_1.auth, UserController_js_1.deleteUser);
exports.default = router;
