import dotenv from 'dotenv';

dotenv.config();

export default{
    port: process.env.PORT,
    dbUser: process.env.MONGO_USER,
    dbPswd: process.env.MONGO_PSWD,
    dbHost: process.env.MONGO_HOST,
    mailing:{
        service: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth:{
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS,
        },
    },
    messaging:{
        twilio:{
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            number: process.env.TWILIO_NUMBER,
        },
    },
    githubAuth:{
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    jwtAuth:{
        privateKey: process.env.PRIVATE_KEY
    }
}