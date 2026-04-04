
const users = [
    { id:1, name: "sadamani", age: 29, gmail:"sadamanism98@gmail.com", department: "developer" },
    { id:2, name: "mani", age: 28, gmail:"sadamanism98@gmail.com", department: "developer" },
    { id:3, name: "sada", age: 30, gmail:"sadamanism98@gmail.com", department: "developer" }
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
        if(age) user.age = age;
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
    

