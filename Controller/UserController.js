import bcrypt from "bcryptjs";
import {generateToken} from "../utilities/generateToken.js"

const users = [
    { id:1, name: "sadamani", age: 29, gmail:"sadamanism97@gmail.com", department: "developer", password:"sada1234" },
    { id:2, name: "mani", age: 28, gmail:"sadamanism1997@gmail.com", department: "developer", password:"sadamani123" },
    { id:3, name: "sada", age: 30, gmail:"manisada98@gmail.com", department: "developer", password:"satish1234" }
];
export const getUsers = (req, res) => {
    res.status(200).json(users);
};

export const getUserById = (req,res) =>{
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id ===id);

    if(!user) {
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
};
export const createUser = (req, res) => {
    const {name, gmail, age, department} = req.body;
    if (!name || !gmail || !department || !age) {
        return res.status(400).json({message:"All fields are required and age must be a positive number"})
    }
    const newUser = {
        id:users.length +1,
        name,
        gmail,
        age,
        department
    };
    users.push(newUser);
    res.status(201).json(newUser);

};

export const updateUser = (req,res) => {
    const id = parseInt(req.params.id);
    const {name, gmail, department, age } = req.body;

    const user = users.find(u => u.id === id);
    if(!user) {
        return res.status(404).json({message:"user not found"});
    }
        if(name) user.name = name;
        if(gmail) user.gmail = gmail;
        if(age !== undefined) user.age = age;
        if(department) user.department = department;

        res.json(user);
    }

    // delete User
    export const deleteUser= (req,res) => {
        const id = parseInt(req.params.id);

        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            return res.status(404).json({message:"user not found"});

        }
        const deleted = users.splice(index,1);
        res.json({message:"Deleted", user: deleted[0]});
    }

    // register

    export const registerUser= async (req,res) => {
        try{
            console.log("BODY",req.body);
        const { name, gmail, age, password} = req.body;
        if (!name || !gmail || !password || age === undefined) {
            return res.status(400).json({ message: "user exists"})
        }
        const exists = users.find(u => u.gmail == gmail);
        if(exists) {
            return res.status(400).json({ message: "User exists"})
        }
        const hashed = await bcrypt.hash(password,10);

        const newUser = {
            id:users.length +1,
            name,
            gmail,
            password: hashed
        };
        users.push(newUser)
        const token = generateToken(newUser);

        res.status(201).json({user:newUser,token});
    } catch (error) {
        console.log("ERROR",error)
        res.status(500).json({message:error.message})
    }
        }


    // login

    export const loginUser = async (req,res) => {
        const {gmail, password}=req.body;

        const user = users.find(u => u.gmail == gmail)

        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        const match = bcrypt.compare(password,user.password);

        if(!match) {
            return res.status(404).json({message:"User not match"})
        }
        const token =generateToken(user);
        res.json({user,token})
    }
    

