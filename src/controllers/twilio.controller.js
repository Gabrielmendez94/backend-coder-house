import twilio from 'twilio';
import config from '../config/config.js';


const client = twilio(
    config.messaging.twilio.accountSid,
    config.messaging.twilio.authToken
);

export const sendingMessageFromTwilio = async (req, res)=>{
    await client.messages.create({
        from: config.messaging.twilio.number,
        to: '+541132027556',
        body: 'Hello from Twilio!'
    });
    res.send('Message sent!');
}