import { generateMocks } from "../utils.js";

export const productsFaker = async (req, res) =>{
    res.send(generateMocks());
}