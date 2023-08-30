import MessageService from "../services/messages.service.js";

const messageService = new MessageService();

const getMessages = async (req, res, next) => {
    try {
        const messages = await messageService.getAllMessages();
        res.send({status: 1, messages: messages});
    } catch (error) {
        next(error)
    }
};

const addMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const newMessage = await messageService.addMessage(req.user.email, message  )
        res.send({status: 1, msg: 'Message added successfully', message: newMessage});
    } catch (error) {
        next(error)
    }
}

export default {getMessages, addMessage};