import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Simulator = () => {
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [rateOfReturn, setRateOfReturn] = useState(7);
  const [years, setYears] = useState(10);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    calculateGrowth();
  }, [monthlyContribution, rateOfReturn, years]);

  const calculateGrowth = () => {
    let balance = 0;
    const data = [];
    for (let i = 0; i <= years; i++) {
      data.push({
        year: i,
        balance: Math.round(balance),
      });
      // Add yearly contribution and apply interest
      balance = (balance + monthlyContribution * 12) * (1 + rateOfReturn / 100);
    }
    setChartData(data);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Wealth Simulator
          </h1>
          <p className="text-gray-400 mt-2">
            Project your financial future with the power of compound interest.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 space-y-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Adjust Parameters</h2>

            {/* Monthly Contribution Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Monthly Contribution
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-green-400">${monthlyContribution}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Rate of Return Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Annual Rate of Return
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-blue-400">{rateOfReturn}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={rateOfReturn}
                onChange={(e) => setRateOfReturn(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Years Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Time Period (Years)
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-purple-400">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-500 mb-1">Projected Total Wealth</p>
              <p className="text-4xl font-extrabold text-white">
                {chartData.length > 0 ? formatCurrency(chartData[chartData.length - 1].balance) : '$0'}
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-200 mb-6">Wealth Growth Projection</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    stroke="#9CA3AF" 
                    label={{ value: 'Years', position: 'insideBottomRight', offset: -5, fill: '#9CA3AF' }} 
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tickFormatter={(value) => `$${value / 1000}k`} 
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                    formatter={(value) => [formatCurrency(value), 'Total Balance']}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
