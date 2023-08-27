import ticketsModel from '../models/ticket.model.js';

class TicketManager {
    constructor() {
        this.ticketsModel = ticketsModel;
    }

    createTicket = async (newFields) => {
        try {
            const newTicket = await this.ticketsModel.create(newFields);
            return newTicket;
        } catch (error) {
            throw new Error(`Failed to add ticket: ${error.message}`);
        }
    }

    getTicketByCode = async (ticketCode) => {
        try {
            const ticket = await this.ticketsModel.findOne({ code: ticketCode });
            return ticket;
        } catch (error) {
            throw new Error(`Failed to retrieve ticket: ${error.message}`);
        }
    }

}

export default TicketManager;