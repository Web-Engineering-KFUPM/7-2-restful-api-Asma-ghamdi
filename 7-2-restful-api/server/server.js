import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// import dotenv and load environment variables from .env
import dotenv from "dotenv";
dotenv.config();    

import { connectDB } from "./db.js";
import { Song } from "./models/song.model.js";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());              
app.use(express.json());

// api/songs (Read all songs)


// api/songs (Insert song)

// /api/songs/:id (Update song)


// /api/songs/:id (Delete song)

app.post("/api/songs", async (req, res) => {
    try {
        const { title = "", artist = "", year } = req.body || {};
        const created = await Song.create({
            title: title.trim(),
            artist: artist.trim(),
            year
        });
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ message: err.message || "Error creating song" });
    }
});

// connect to db and start server
connectDB(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[SERVER] Listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to DB:", err.message);
        process.exit(1);
    });