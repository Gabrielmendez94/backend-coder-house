import { messagesRepository } from "../repositories/index.js";

export default class MessageService{
    constructor(){
        this.messagesRepository = messagesRepository;
    }
    getMessages = async () =>{
        try{
            const messages = await this.messagesRepository.getMessages();
            return messages;
        }catch(error){
            throw error;
        }
    }

    addMessage = async () =>{
        try{
            const addNewMessage = await this.messagesRepository.addMessage(user, message);
        }catch(error){
            throw error
        }
    }
}
