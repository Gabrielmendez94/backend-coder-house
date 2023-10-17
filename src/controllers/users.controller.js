import userModel from "../dao/models/users.model.js";

export const changeUserRole = (req, res) =>{
    try{
        const userId = req.params.uid;
        const updateRole = req.body.role;

        if(["user", "premium"].includes(updateRole)){
            const updateUser = userModel.findByIdAndUpdate(
                userId,
                {userRole: updateRole},
                {new: true}
            );

            if(updateUser){
                res.status(200).json(updateUser);
            }else{
                res.status(404).send("User not found");
            }
        }else{
            res.status(400).send("Rol not was accepted. Choose through the following options: user or premium");
        }
    }catch(error){
        console.log(error.message)
    }
}