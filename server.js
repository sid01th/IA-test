const express = require('express');
const cors = require('cors');
const path = require('path'); // Importa o módulo 'path'
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyClCcUpDopb8hDLsZjkDr6b80XVQLnqIz0"; // Substitua pela sua chave API
const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
app.use(cors());
app.use(express.json()); // Permite que o servidor entenda JSON no corpo da requisição

// Servindo o arquivo HTML estático
app.use(express.static(path.join(__dirname, 'public')));

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.post('/send-message', async (req, res) => {
  try {
    const { input } = req.body;

    // Inicia uma sessão de chat
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Envia a mensagem do usuário e obtém a resposta
    const result = await chatSession.sendMessage(input);
    res.json({ response: result.response.text() });
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).send("Erro ao processar a mensagem");
  }
});

const PORT = 3000; // Defina a porta que você deseja usar
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
