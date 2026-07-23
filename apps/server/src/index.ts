import express from "express";
import cors from "cors";
import { generateThemeWithGemini } from "./gemini";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, personality, sliderValues } = req.body;
    if (!prompt || !personality) {
      return res.status(400).json({ error: "Missing prompt or personality" });
    }

    const theme = await generateThemeWithGemini(prompt, personality, sliderValues);
    res.json(theme);
  } catch (error: any) {
    console.error("Error generating theme:", error);
    res.status(500).json({ error: "Failed to generate theme." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
