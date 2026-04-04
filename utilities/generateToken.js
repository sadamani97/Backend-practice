import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        {id:user.id,gmail:user.gmail},
        "secretkey",
        { expiresIn: "1h"}
    );
};