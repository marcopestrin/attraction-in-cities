import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import initializeRouter from "./routers/index.js";
import config from "./settings.js";

const app = express();
const router = express.Router();

initializeRouter(router);
app.use(router);

app.listen(config.serverPort, () => {
    console.log(`App running at http://localhost:${config.serverPort}`)
})