import express from "express";
import path from "path";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Lazy-initialized Gemini AI client
  const getGeminiAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Gala Premios AI Voice Assistant" });
  });

  // AI Call Assistant Endpoint
  app.post("/api/call/speak", async (req, res) => {
    try {
      const { userText, history = [], categoriesData } = req.body;

      const ai = getGeminiAI();
      if (!ai) {
        return res.status(500).json({
          error: "API Key no configurada",
          replyText: "Lo siento, la clave del servicio de IA no está disponible en este momento. Por favor verifica los parámetros del servidor.",
        });
      }

      const systemInstruction = `Eres 'Yoguis', la Asistente Virtual Oficial de la Gala Anual de los Premios Yoguis.
Tu rol es responder llamadas telefónicas en vivo de espectadores, nominados y cinéfilos.
Debes responder SIEMPRE en ESPAÑOL con un tono sumamente elegante, cálido, profesional y entusiasta (como una anfitriona estelar de alfombra roja).
Tus respuestas deben ser breves, claras y fluidas (máximo 2 a 3 frases) porque estás hablando por teléfono.

Contexto del Evento:
- Nombre: Gala Anual de Premios de Cine & Artes 2026 (28ª Edición Anual)
- Lugar: Gran Teatro de la Gala - Auditorio Principal
- Transmisión: En vivo en alta definición con 14 categorías oficiales.
- Categorías:
1. Mejor Película (Nominados: El Silencio de la Luna, Horizonte Dorado, Ecos del Tiempo, La Última Frontera, Luces sobre la Ciudad)
2. Mejor Dirección (Alejandro Íñiguez, Valeria Benítez, Gabriel Torres, Marina Silva)
3. Mejor Actor Principal (Ricardo Darín Jr., Diego Luna, Andrés Parra, Javier Bardem)
4. Mejor Actriz Principal (Penélope Cruz, Paulina García, Ana de Armas, Norma Aleandro)
5. Mejor Actor de Reparto (Oscar Martínez, Gael García Bernal, Tenoch Huerta, Rodrigo Santoro)
6. Mejor Actriz de Reparto (Sonia Braga, Maribel Verdú, Cecilia Roth, Aitana Sánchez-Gijón)
7. Mejor Guion Original
8. Mejor Guion Adaptado
9. Mejor Banda Sonora / Música Original
10. Mejor Fotografía
11. Mejor Diseño de Producción
12. Mejores Efectos Visuales
13. Mejor Montaje / Edición
14. Mejor Sonido / Diseño Sonoro

Si la persona te pregunta qué películas o personas recomendar o sobre los nominados, responde con naturalidad. Si te saludan o preguntan cómo estás, saluda con protocolo de gala.
Recuerda: Sé conversacional, cordial y concisa.`;

      // Build contents array for Gemini chat / generateContent
      const contentsParts = [];

      if (Array.isArray(history) && history.length > 0) {
        history.forEach((h: { role: string; text: string }) => {
          contentsParts.push(`${h.role === 'user' ? 'Llamante' : 'Aura'}: ${h.text}`);
        });
      }

      contentsParts.push(`Llamante: ${userText || "Hola, ¿quién habla?"}`);

      const promptString = contentsParts.join("\n");

      // Generate text answer with Gemini 3.1 Flash Live Preview
      const textResponse = await ai.models.generateContent({
        model: "gemini-3.1-flash-live-preview",
        contents: promptString,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = textResponse.text || "¡Bienvenido a la Gala de Premios 2026! ¿En qué categoría o nominado te gustaría profundizar hoy?";

      // Try generating audio via Gemini TTS (gemini-3.1-flash-tts-preview)
      let audioBase64: string | null = null;

      try {
        const ttsResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: `En español, di amablemente: ${replyText}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Kore" },
              },
            },
          },
        });

        audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
      } catch (ttsErr) {
        console.warn("TTS generation failed or not supported, falling back to client-side speech synthesis:", ttsErr);
      }

      return res.json({
        replyText,
        audioBase64,
      });
    } catch (error: any) {
      console.error("Error in AI Call Endpoint:", error);
      return res.status(500).json({
        error: "Error interno procesando la llamada",
        replyText: "Disculpa las molestias, la señal telefónica de la gala tuvo una breve interferencia. ¿Podrías repetirme tu consulta?",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
