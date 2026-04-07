import jwt from "jsonwebtoken";

export const generateToken = (user:any):string => {
    return jwt.sign(
        {id:user.id,gmail:user.gmail},
        "secretkey",
        { expiresIn: "1h"}
    );
};