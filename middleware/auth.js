


export const auth = (req, res, next) =>{
    const header = req.headers.authorization;
    console.log("Auth middleware hit");
    if(!header) {
        console.log("No token hit")
        return res.status(401).json({message:"No token"})
    }
    console.log("Token,header")
    next()
};