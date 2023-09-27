import nodemailer from 'nodemailer';
import config from '../config/config.js';

const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth:{
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass,
    },
}

const transport = nodemailer.createTransport(mailConfig);

export const sendingEmail = async (req, res)=>{
    const destination = req.query.destination;
    try{
        await transport.sendMail({
            from: `Gaby Test <${config.mailing.auth.user}>`,
            to: destination,
            subject: 'Mail de prueba Gabi',
            html: `<div>
                        <h1>Mailing</h1>
                        <img src="cid:bear-image"/>
                    </div>`,
            attachments:[{
                filename: 'image.jpg',
                path: 'https://www.jobskills.org/wp-content/uploads/2022/12/cute-panda-thegem-blog-default.jpg',
                cid: 'bear-image',
            }]
        });
        res.send('Mail Sent');
    } catch (e){
        res.json({error: e});
    };
}