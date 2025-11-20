require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateResponse(ChatHistory) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: ChatHistory
    });

    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Error generating response.";
  }
}

module.exports = generateResponse;
