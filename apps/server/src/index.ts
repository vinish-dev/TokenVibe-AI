import express from "express";
import cors from "cors";
import { generateThemeWithGemini } from "./gemini";
import { db } from "./db";

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

app.post("/api/themes", async (req, res) => {
  try {
    const { userId, name, schemaJson } = req.body;
    if (!userId || !name || !schemaJson) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    // Ensure user exists (Mocked Auth)
    let user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await db.user.create({ data: { id: userId, name: "Demo User" } });
    }

    const theme = await db.theme.create({
      data: {
        userId,
        name,
        schemaJson: JSON.stringify(schemaJson)
      }
    });

    res.json(theme);
  } catch (error: any) {
    console.error("Error saving theme:", error);
    res.status(500).json({ error: "Failed to save theme." });
  }
});

app.get("/api/themes/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const themes = await db.theme.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    res.json(themes);
  } catch (error: any) {
    console.error("Error fetching themes:", error);
    res.status(500).json({ error: "Failed to fetch themes." });
  }
});

app.delete("/api/themes/:themeId", async (req, res) => {
  try {
    const { themeId } = req.params;
    await db.theme.delete({
      where: { id: themeId }
    });
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting theme:", error);
    res.status(500).json({ error: "Failed to delete theme." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
