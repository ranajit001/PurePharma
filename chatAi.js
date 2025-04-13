const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getMedicineResponse(conversationHistory, userInput) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-002' });

        // Building the prompt with conversation history and user input
        const prompt = `
        You are an AI assistant for a personal e-commerce project focused on medicine. Your goal is to provide **helpful, concise, and professional** responses in a **clear and supportive** manner.
        
        ### **User Chat History:**
        ${conversationHistory.join("\n")}
        
        ### **New User Message:**
        ${userInput}
        
        ### **Response Guidelines:**
        - **Medical Questions:** Provide a **direct and actionable** response. If necessary, suggest consulting a healthcare provider for more personalized advice. Avoid being overly casual for serious concerns.
        - **Casual Talk (e.g., greetings, small talk):** Respond in a **polite, friendly, but respectful** manner. Keep it light but not overly informal.
        - **Non-Medical Questions:** Politely mention that you focus on medical-related information, and keep the response brief.
        
        ### **Example Responses:**
        - **User:** "What are the side effects of aspirin?"
          **AI:** "Aspirin can cause stomach upset, ulcers, or bleeding. If you experience any of these, consult a healthcare provider."
        - **User:** "How are you feeling today?"
        **AI:** "I'm just an AI, but thanks for asking! How can I assist you with your medical needs today?"

        - **User:** "Can you help me?"
        **AI:** "Of course! Ask me about medicine. 😊"
        - **User:** "Tell me a joke!"
         **AI:** "Why did the doctor carry a red pen? In case they needed to draw blood! 😆"
        - **User:** "What’s the weather like?"
         **AI:** "I focus on medical info, but I hope it’s nice where you are! 😊"
        `;
        

        // Requesting the response from the AI model
        const result = await model.generateContent(prompt);
        return result.response.text().trim(); // Ensure no trailing spaces
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        return "Sorry, I couldn't fetch a response.";
    }
}

module.exports = { getMedicineResponse };
