import express from "express";

import path from "path";
import {fileURLToPath} from 'url';
import connectDB from "./config.js";
import router from './routes/transactionRoutes.js';
import bodyParser from "body-parser";
import cors from "cors";
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectDB();
app.use('/api/transactions',router);
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });
const PORT=8080;
app.listen(PORT,()=>{
    console.log("App is Working");

})