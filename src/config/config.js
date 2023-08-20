import dotenv from 'dotenv';

dotenv.config();

export default{
    port: process.env.PORT,
    mongoPswd: process.env.MONGO_PSWD
}