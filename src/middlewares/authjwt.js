import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/User.js';
import Role from '../models/Role.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
   
    if (!token) return res.status(403).json({ message: "No existe el token" });

    try {
      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded.id;
  
      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "Ningun usuario encontrado " });
  
      next();
    } catch (error) {
      return res.status(401).json({ message: "No autorizado!" });
    }
  };
  
  export const isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Requiere el rol de moderador!" });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Requiere el rol de administrador!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  };
  