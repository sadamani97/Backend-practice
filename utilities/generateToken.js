import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        {id:user.id,email:user.email},
        "secretkey",
        { expiresIn: "1h"}
    );
};