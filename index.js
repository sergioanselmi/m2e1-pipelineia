// Crea un servidor Express básico que escuche en el puerto 3000
// y cargue las variables de entorno desde un archivo .env
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Crea un endpoint GET en /status que devuelva un JSON con {"status": "ok", timestamp: new Date()}
app.get('/status', (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});

// Crea un endpoint POST en /chat que reciba en el body un JSON con una propiedad "pregunta"
// La pregunta no debe estar vacía.
// Usa el cliente OpenAI para obtener la respuesta del modelo "gpt-3.5-turbo"
// Devuelve la respuesta en un JSON. Maneja correctamente los errores.
const { OpenAIApi } = require('openai');

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
    const { pregunta } = req.body;

    if (!pregunta) {
        return res.status(400).json({ error: "La pregunta no puede estar vacía." });
    }

    try {
        const respuesta = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: pregunta }],
            max_tokens: 100,
        });
        const answer = respuesta.choices[0].message.content;
        res.json({ respuesta: answer });
    } catch (error) {
        console.error("Error al comunicarse con OpenAI:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});
