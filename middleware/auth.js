import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    const header = req.headers.authorization;
    try {
        if (!header || !header.startsWith("Bearer")) {
            console.log("No token hit")
            return res.status(401).json({ message: "No token" })
        }
        const token = header.split(" ")[1];
        const decode = jwt.verify(token, "secretkey");
        req.user = decode;
        next()
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
};













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