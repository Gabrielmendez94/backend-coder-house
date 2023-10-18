import userModel from "../models/users.model.js";

export default class UserManager {
    constructor(){
        this.userModel = userModel;
    }

    async getAllUsers (){
        try{
            const users = await this.userModel.find({});
            return users;
        }catch(error){
            throw new Error (`Failed to get the users: ${error.message}`);
        }
    }

    async getUserByEmail(email){
        try{
            const userData = await this.userModel.findOne({email});
            return userData;
        }catch(error){
            throw new Error (`Failed to get the user: ${error.message}`);
        }
    }

    async getUserById(id){
        try{
            const userData = await this.userModel.findOne({_id: id});
            return userData
        }catch(error){
            throw new Error (`Failed to get the user: ${error.message}`);
        }
    }

    async toggleUserRole(user){
        try{
            const newRole = user.user_role === "premium" ? "user" : "premium";
            return await user.updateOne({user_role: newRole});
        }catch(error){
            throw new Error (`Failed to change the role: ${error.message}`);
        }
    }

    async setLastConnection(user){
        try{
            return await user.updateOne({last_connection: new Date()});
        }catch(error){
            throw new Error (`Failed to get the last connection: ${error.message}`);
        }
    }

}