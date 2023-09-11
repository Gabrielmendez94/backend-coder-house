import { Router } from "express";
import config from "../config/config.js";

const router = Router();
const NODE_ENV = config.enviroment;
router.get('/loggerTest', (req, res)=>{
    req.logger.debug(`Debug on ${NODE_ENV} enviroment`);
    req.logger.http(`HTTP on ${NODE_ENV} enviroment`);
    req.logger.info(`Info on ${NODE_ENV} enviroment`);
    req.logger.warning(`Warning on ${NODE_ENV} enviroment`);
    req.logger.error(`Error on ${NODE_ENV} enviroment`);
    res.send({message: 'Prueba de logger'});
})

export default router;