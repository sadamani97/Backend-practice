"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_js_1 = require("../utilities/generateToken.js");
const user_model_js_1 = require("../models/user.model.js");
"use strict";
// const users = [
//     { id:1, name: "sadamani", age: 29, gmail:"sadamanism97@gmail.com", department: "developer", password:  bcrypt.hash("sada1234",10) },
//     { id:2, name: "mani", age: 28, gmail:"sadamanism1997@gmail.com", department: "developer", password: bcrypt.hash("sadamani123",10) },
//     { id:3, name: "sada", age: 30, gmail:"manisada98@gmail.com", department: "developer", password: bcrypt.hash("satish1234",10) }
// ];
const getUsers = async (req, res) => {
    const user = await user_model_js_1.User.findAll();
    res.json(user);
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const user = await user_model_js_1.User.findByPk(Number(req.params.id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    const { name, gmail, age, department, password } = req.body;
    if (!name || !gmail || !password || !department || !age) {
        return res
            .status(400)
            .json({
            message: "All fields are required and age must be a positive number",
        });
    }
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const newUser = await user_model_js_1.User.create({
        // id:user.length +1,
        name,
        gmail,
        password: hashed,
        age,
        department,
    });
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const user = await user_model_js_1.User.findByPk(Number(req.params.id));
    // const {name, gmail, department,password, age } = req.body;
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    await user.update(req.body);
    // if(name) user.name = name;
    // if(gmail) user.gmail = gmail;
    // if(age) user.age = age;
    // if(password) user.password=password;
    // if(department) user.department = department;
    res.json(user);
};
exports.updateUser = updateUser;
// delete User
const deleteUser = async (req, res) => {
    const user = await user_model_js_1.User.findByPk(Number(req.params.id));
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    await user.destroy();
    res.json({ message: "Deleted" });
};
exports.deleteUser = deleteUser;
// register
const registerUser = async (req, res) => {
    try {
        console.log("BODY", req.body);
        const { name, gmail, age, password } = req.body;
        if (!name || !gmail || !password || age === undefined) {
            return res.status(400).json({ message: "user exists" });
        }
        const exists = await user_model_js_1.User.findOne({ where: { gmail } });
        if (exists) {
            return res.status(400).json({ message: "User exists" });
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await user_model_js_1.User.create({
            // id:users.length +1,
            name,
            gmail,
            password: hashed,
            age,
        });
        const token = (0, generateToken_js_1.generateToken)(user);
        res.status(201).json({ user: user, token });
    }
    catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
// login
const loginUser = async (req, res) => {
    const { gmail, password } = req.body;
    const user = await user_model_js_1.User.findOne({ where: { gmail } });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match) {
        return res.status(404).json({ message: "User not match" });
    }
    const token = (0, generateToken_js_1.generateToken)(user);
    res.json({ user, token });
};
exports.loginUser = loginUser;
