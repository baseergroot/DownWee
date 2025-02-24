const express = require("express");
const cors = require("cors");
const { alldl } = require("rahad-all-downloader");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

// app.use(express.static('dist'))

app.get("/", (req, res) => {
   res.send("server is running...")
})

app.post("/download", async (req, res) => {
    console.log("req.check: ", req.body)
    const { url } = req.body; // Get URL from request body
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const data = await alldl(url); // Use alldl function
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch video", details: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
