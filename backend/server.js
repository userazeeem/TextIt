const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
    res.json({
        message: "TextTranslate Backend is running!"
    });
});


// TRANSLATE
app.post("/api/translate", async (req, res) => {

    try {

        const { text, source, target } = req.body;

        if (!text || !source || !target) {
            return res.status(400).json({
                error: "Text, source and target are required."
            });
        }

        // Same language
        if (source === target) {
            return res.json({
                translatedText: text
            });
        }

        const response = await fetch(
            "https://libretranslate.com/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    q: text,
                    source: source,
                    target: target,
                    format: "text",
                    api_key: process.env.LIBRETRANSLATE_API_KEY
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            console.log("LibreTranslate Error:", data);

            return res.status(response.status).json({
                error: data.error || "Translation failed."
            });
        }

        res.json({
            translatedText: data.translatedText
        });

    } catch (error) {

        console.error("Server Error:", error);

        res.status(500).json({
            error: "Server error. Please try again."
        });
    }
});


app.listen(PORT, () => {

    console.log(
        `TextTranslate Backend running at http://localhost:${5000}`
    );

});