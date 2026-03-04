import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Analyze financial data and generate advice
// @route   POST /api/advice/analyze
// @access  Private
export const analyzeFinancialData = async (req, res, next) => {
  const { financialData } = req.body;

  try {
    const prompt = `
      Analyze the following financial data for a ${financialData.age}-year-old user:
      Annual Income: $${financialData.annualIncome}
      Monthly Expenses: ${JSON.stringify(financialData.monthlyExpenses)}
      Risk Tolerance: ${financialData.riskTolerance}
      Financial Goals: ${financialData.financialGoals.join(', ')}

      Provide:
      1. A budget breakdown in percentages for categories: Rent, Food, Transport, Savings, Others.
      2. 3 actionable financial recommendations.
      3. A risk assessment and portfolio optimization strategy.
      4. A 3-item monthly action plan with specific tasks, dollar amounts, and durations.

      Format the output as a JSON object with keys: budgetBreakdown (with labels and data arrays), recommendations (array of strings), riskAssessment (string), and actionPlan (array of objects with task, amount, duration).
    `;

    // Mock response for now if OpenAI key is missing or for speed
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      const mockResult = {
        budgetBreakdown: {
          labels: ['Rent', 'Food', 'Transport', 'Savings', 'Others'],
          data: [35, 15, 10, 20, 20]
        },
        recommendations: [
          'Based on your income, increase your emergency fund to 6 months of expenses.',
          'Allocate 15% of your annual income into low-cost index funds.',
          'Review your monthly subscriptions to reduce "Others" category spending.'
        ],
        riskAssessment: `Since your risk tolerance is ${financialData.riskTolerance}, we recommend a portfolio of 60% equities and 40% fixed-income assets.`,
        actionPlan: [
          { task: 'Emergency Fund', amount: '$500/mo', duration: '12 months' },
          { task: 'Index Fund SIP', amount: '$800/mo', duration: 'Ongoing' },
          { task: 'Debt Repayment', amount: '$300/mo', duration: '6 months' }
        ]
      };
      return res.json(mockResult);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "You are a professional financial advisor." },
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
