import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const FinancialTwin = () => {
  // Dummy data for the radar chart
  const data = [
    { subject: 'Spending', A: 120, fullMark: 150 },
    { subject: 'Saving', A: 98, fullMark: 150 },
    { subject: 'Investing', A: 86, fullMark: 150 },
    { subject: 'Debt', A: 99, fullMark: 150 },
    { subject: 'Income', A: 85, fullMark: 150 },
    { subject: 'Planning', A: 65, fullMark: 150 },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your Financial Twin
          </h1>
          <p className="text-gray-400 mt-2">
            AI-generated persona based on your financial habits and goals.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Radar Chart */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Financial Personality Map</h2>
            <div className="h-[400px] w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#4B5563" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 14 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="My Stats"
                    dataKey="A"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fill="#8B5CF6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                Analysis Date: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Right Column: Persona Description & Insights */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  S
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">The Strategist</h2>
                  <p className="text-blue-400">Balanced & Forward-Thinking</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Your financial twin is "The Strategist." You demonstrate a strong balance between spending and saving, 
                with a clear focus on long-term stability. While you enjoy the present, you rarely lose sight of your future goals. 
                However, there is room to grow in aggressive investing to maximize your wealth potential.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium mb-1">Top Strength</h3>
                <p className="text-xl font-bold text-green-400">Debt Management</p>
                <p className="text-xs text-gray-500 mt-2">You keep liabilities low and manageable.</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium mb-1">Growth Area</h3>
                <p className="text-xl font-bold text-yellow-400">Investment Risk</p>
                <p className="text-xs text-gray-500 mt-2">Consider diversifying into higher-yield assets.</p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Increase monthly investment contributions by 5% to leverage compound interest.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Review subscription services; recurring costs in 'Spending' are slightly above average.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Set up an emergency fund bucket to improve the 'Saving' metric.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTwin;
