import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/broadcast", async (req, res) => {
  try {
    const { chatIds, message, telegramToken } = req.body;
    if (!chatIds || !message || !telegramToken)
      return res.status(400).send("Missing parameters");

    for (const chatId of chatIds) {
      await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message })
        }
      );
    }
    res.status(200).send({ success: true, sent: chatIds.length });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
