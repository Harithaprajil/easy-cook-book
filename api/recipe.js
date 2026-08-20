import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { timeSlot, foodCategory, basket } = req.body;
    const formattedBasket = Array.isArray(basket) ? basket.join(", ") : "";

    const prompt = `Act as a friendly chef. Using inputs foodCategory="${foodCategory}",
      ingredients=[${formattedBasket}], and timeSlot="${timeSlot}", RETURN ONLY valid JSON with a top-level "menus" array.
      For each menu require these keys: recipe_name (string), food_category (string), estimated_time (string), servings (int), difficulty (string), 
      ingredients (array of strings), video_url (string|null), nutrition (object), steps (NON-EMPTY array). 
      Each step must be an object with: step_number (int), description (string), image (string|null), estimated_time (string|null), accuracy_with_input (1-5), tips (array of strings).
      If no real steps apply, include one placeholder step explaining why. Provide up to 3 recipes and DO NOT output any extra text outside the JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text);
    return res.status(200).json({ recipe: parsed });
  } catch (error) {
    console.error("Gemini API Server Error:", error);
    return res.status(500).json({ message: "Chef is having trouble!" });
  }
}