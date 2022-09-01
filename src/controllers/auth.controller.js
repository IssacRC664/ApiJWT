import User from '../models/User';
import jwt from 'jsonwebtoken';
import Role from "../models/Role";
import config from '../config';


export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

   const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
      
    })


       // checamos que exista los roles
       if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }
  
     //guardamos el rol en mongo
     
    const savedUser = await newUser.save();
    console.log(savedUser)



   const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn:86400 //24 horas para el token
    })

    res.status(200).json({token})
   
  }


export const signin = async (req, res) => {
  try {
    // Request el body email con el email de username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: " Password invalido",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET , {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};  