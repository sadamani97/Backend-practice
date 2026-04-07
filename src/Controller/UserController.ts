import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/generateToken.js";
import { User } from "../models/user.model.js";
"use strict";

export const getUsers = async (req: Request, res: Response) => {
  const user = await User.findAll();
  res.json(user);
};

export const getUserById = async (req: Request,res:Response) => {
  const user = await User.findByPk(Number(req.params.id))
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};
export const createUser = async (req: Request, res: Response) => {
  const { name, gmail, age, department, password } = req.body;
  if (!name || !gmail || !password || !department || !age) {
    return res
      .status(400)
      .json({
        message: "All fields are required and age must be a positive number",
      });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    // id:user.length +1,
    name,
    gmail,
    password: hashed,
    age,
    department,
  });

  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(Number(req.params.id));
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

// delete User
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  await user.destroy();
  res.json({ message: "Deleted" });
};

// register

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("BODY", req.body);
    const { name, gmail, age, password, department } = req.body;
    if (!name || !gmail || !password || !department || !age === undefined) {
      return res.status(400).json({ message: "user exists" });
    }
    const exists = await User.findOne({ where: { gmail } });
    if (exists) {
      return res.status(400).json({ message: "User exists" });
    }
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      // id:users.length +1,
      name,
      gmail,
      department,
      password: hashed,
      age,
    });
    const token = generateToken(user);

    res.status(201).json({ user: user,token });
  } catch (error:any) {
    console.log("ERROR", error);
    res.status(500).json({ message: error.message });
  }
};

// login

export const loginUser = async (req: Request, res: Response) => {
  const { gmail, password } = req.body;

  const user = await User.findOne({where :{gmail}});

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(404).json({ message: "User not match" });
  }
  const token = generateToken(user);
  res.json({ user, token });
};
