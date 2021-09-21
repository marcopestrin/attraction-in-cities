import express from "express";
import initializeRouter from "./routers/index.js";
import { serverPort } from "./settings.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const router = express.Router();

initializeRouter(router);
app.use(router);

app.listen(serverPort, () => {
    console.log(`App running at http://localhost:${serverPort}`)
})