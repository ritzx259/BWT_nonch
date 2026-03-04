import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Handle conversational tax chat
// @route   POST /api/tax/chat
// @access  Private
export const handleTaxChat = async (req, res, next) => {
  const { message, context } = req.body;

  try {
    const prompt = `
      You are a SentriFI Tax Assistant.
      User's message: "${message}"
      Current context: ${JSON.stringify(context)}

      Provide a helpful, conversational reply to help the user with their taxes.
      If the user provides income, deductions, or other tax info, update the taxUpdate object with keys: income, deductions, taxLiability.
      Include a "readyToExport: true" flag if the user has provided enough info for a summary.
      Always include a short conversational reply.

      Format the output as a JSON object with keys: reply (string), taxUpdate (object with keys income, deductions, taxLiability, readyToExport).
    `;

    // Mock response for now if OpenAI key is missing or for speed
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      const mockResult = {
        reply: "Got it! Based on that income, you might be in the 20% tax bracket. Do you have any investments or deductions like Section 80C to lower your taxable income?",
        taxUpdate: { income: 80000, deductions: 15000, taxLiability: 9500, readyToExport: true }
      };
      return res.json(mockResult);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "You are a professional tax advisor assistant." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
