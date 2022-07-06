const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
import { Request, Response } from "express";


const app = express();
app.use(express.json());
app.use(express.static(__dirname + "./dist/"));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);


app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});