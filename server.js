const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req,res)=>res.send("Anonymous Naija Alerts Backend is running!"));

// Telegram broadcast endpoint
app.post('/broadcast', async (req,res)=>{
  const { chatIds, message, telegramToken } = req.body;
  try {
    for(const chatId of chatIds){
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: chatId, text: message })
      });
    }
    res.send({success:true});
  } catch(e){
    res.send({success:false, error:e.toString()});
  }
});

const listener = app.listen(process.env.PORT || 3000, ()=>console.log("Server running"));
