const express = require("express");
const cors = require("cors");
const { alldl } = require("rahad-all-downloader");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

app.get("/", (req, res) => {
   res.send("server is running...")
})

app.post("/download", async (req, res) => {
    const { url } = req.body; // Get URL from request body
   
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const data = await alldl(url); // Use alldl function
        
        res.json(data.data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch video", details: err.message });
    }
});

const port = process.env.PORT || 3000;

if (process.env.VERCEL !== "1") {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;