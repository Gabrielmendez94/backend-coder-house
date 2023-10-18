export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }

    async getAllUsers(){
        const users = await this.dao.getAllUsers();
        return users;
    }
    
    async getUserByEmail(email){
        const user = await this.dao.getUserByEmail(email);
        return user;
    }
    
    async toggleUserRole(user){
        const newRole = await this.dao.toggleUserRole(user);
        return newRole;
    }

    async setLastConnection(user){
        return await this.setLastConnection(user);
    }

}