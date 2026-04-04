import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import { logger } from "./middleware/logger.js";

const app = express();


app.use(express.json());
app.use(logger)
app.get('/',(req, res) =>{
    res.send("API is Running");
})


app.use('/users', userRoutes);




const PORT =3000;

app.listen(PORT, () =>{
    console.log(`Server is Running on port ${PORT}`)
})