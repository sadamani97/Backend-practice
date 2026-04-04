import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();


app.use(express.json());

app.use(logger)
app.get('/',(req, res) =>{
    res.send("API is Running");
})


app.use('/users', userRoutes);



// ErrorHandler Middlewere
app.use(errorHandler)


const PORT =3000;

app.listen(PORT, () =>{
    console.log(`Server is Running on port ${PORT}`)
})