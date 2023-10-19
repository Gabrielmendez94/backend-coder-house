import UserManager from "../dao/mongo/usersManager.js";

// TO DO : Crear funciones independientes en lugar de métodos

export class UsersController{

    usersManager;

    constructor(){
        this.usersManager = new UserManager();
    }
    async sendEmail(email){
        try{
            const jwt = this.createJwt(email)
            transport.sendMail({
                from:`Coder <${config.mailing.auth.user}>`,
                to:email,
                subject: 'Recuperar Pass',
                html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                        <hr>
                        <a href="http://${BASE_URL}:${PORT}/api/sessions/restore-pass/${jwt}">CLICK AQUI</a>
                `,
            });
        } catch(e){
            res.json({error: e});
        }
    }

    async getUserByEmail(email){
        try{
            return await this.usersManager.getUserByEmail(email);
        }catch(e){
            res.json({error: e});
        }
    }

    createJwt(email){
        return token.sign({email}, PRIVATE_KEY, {expiresIn: '1h'})

    }
    async updateUserRole(id){
        try {
            const user = await this.usersManager.getUserById(id);

            if(user.user_role === 'user'){
                const requiredDocuments = ['id', 'address', 'account'];
                const userDocuments = user.documents || [];
    
                const hasAllDocuments = requiredDocuments.every(requiredDocument => {
                    return userDocuments.some(userDocument => userDocument.name.includes(requiredDocument))
                });
    
                if (!hasAllDocuments) throw new Error('User must have all documents');
            }

            return await this.usersManager.toggleUserRole(user);
        } catch (e) {
            throw new Error(e);
        }
    }
// TO DO : Mover toda la lógica relacionada al usuario al users.controller.js;
   async setLastConnection(email){
        try{
            const user = await this.usersManager.getUserByEmail(email);
            if (!user) throw new Error('User not found');
            await this.usersManager.setLastConnection(user);
        }catch(e){
            throw new Error(e);
        }
    }

    async updateUserDocuments(id, files){
        try{
            const user = await this.usersManager.getUserById(id);
            const documets = user.documents || [];

            const newDocuments = [
                ...documets,
                ...files.map(file => ({name: file.originalname, reference: file.path}))
            ];
            
            return await user.updateOne({documents: newDocuments});
        }catch(e){
            res.json({error: e});
        }
    }
}



/*export const changeUserRole = (req, res) =>{
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
}*/