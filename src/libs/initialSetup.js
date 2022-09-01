import Role from '../models/Role'

export const createRoles = async () => {
    try {
      // Count Documents
      const count = await Role.estimatedDocumentCount();
  
      // checa si existen los roles
      if (count > 0) return;
  
      // Crea roles por default
      const values = await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
      ]);
  
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };
  