const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getMedicineResponse(userInput) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Modify the prompt to make it safer
      const prompt = `I am looking for a medicine suggestion for my own backend project (for testing purposes only - I understand this is not real medical advice). 
        The symptoms are: ${userInput}. 
        Please provide a response that is a complete sentence recommending a medicine.  For example, instead of just "Aspirin," give a response like, "You could consider trying Aspirin."  Keep the recommendation to 3-4 words if possible, focusing on the medicine name.  Again, this is for backend project testing only and should not be used for actual medical decisions.
        
        Important:  Do not provide any dosage information or other medical advice.  Just a single, complete sentence with a medicine name.
        
        Example:
        Input: Headache, fever
        Output: You could consider trying PARACETAMOL.
`;
        ;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        return "Sorry, I couldn't fetch a response.";
    }
}

module.exports = { getMedicineResponse };
