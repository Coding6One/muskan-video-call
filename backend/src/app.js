import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js"
import { connect } from "node:http2";

const app = express(); // ✅ define first
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", process.env.PORT || 8006); // ✅ now use it
app.use(cors());

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true }));
app.use("/api/v1/users", userRoutes);






const start = async () => {
    const connectionDb =await mongoose.connect("mongodb+srv://apnacall:apnacall100@cluster0.puytehu.mongodb.net/")
    console.log(`Mongo  Connected Db Host:${connectionDb.connection.host }`)

    

    server.listen(app.get("port"), () => {
        console.log("listening on port", app.get("port"));
    });
};

start();
