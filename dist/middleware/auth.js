"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const header = req.headers.authorization;
    try {
        if (!header || !header.startsWith("Bearer")) {
            console.log("No token hit");
            return res.status(401).json({ message: "No token" });
        }
        const token = header.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, "secretkey");
        req.user = decode;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
exports.auth = auth;
// export const auth = (req, res, next) =>{
//     const header = req.headers.authorization;
//     console.log("Auth middleware hit");
//     if(!header) {
//         console.log("No token hit")
//         return res.status(401).json({message:"No token"})
//     }
//     console.log("Token,header")
//     next()
// };
