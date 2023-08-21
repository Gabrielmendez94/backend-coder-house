import MessagesManager from '../dao/mongo/messagesManager.js';

const MessageManager = new MessagesManager();

export const getAllMessages = async (req, res) => {
    try {
        const messages = await MessageManager.getMessages();
        res.send({status: 1, messages: messages});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
}

export const createNewMessage = async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await MessageManager.addMessage(user, message);
        res.send({status: 1, msg: 'Message added successfully', message: newMessage});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
}