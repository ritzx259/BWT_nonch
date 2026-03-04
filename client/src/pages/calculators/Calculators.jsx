import { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Briefcase, 
  Target,
  FileText,
  ArrowUpRight,
  ChevronRight,
  Info,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Calculators = () => {
  const [activeTab, setActiveTab] = useState('compound');

  // --- Compound Interest State ---
  const [compound, setCompound] = useState({ principal: 10000, rate: 7, time: 10, frequency: 12 });
  const [compoundResult, setCompoundResult] = useState(null);

  const calculateCompound = () => {
    const r = compound.rate / 100;
    const n = compound.frequency;
    const t = compound.time;
    const amount = compound.principal * Math.pow((1 + r/n), (n * t));
    setCompoundResult(amount.toFixed(2));
  };

  // --- Retirement Planner State ---
  const [retirement, setRetirement] = useState({ currentAge: 30, retirementAge: 65, currentSavings: 50000, monthlyContribution: 1000, expectedReturn: 8 });
  const [retirementResult, setRetirementResult] = useState(null);

  const calculateRetirement = () => {
    const r = retirement.expectedReturn / 100 / 12; // Monthly rate
    const n = (retirement.retirementAge - retirement.currentAge) * 12; // Total months
    
    // Future Value of Current Savings: PV * (1+r)^n
    const fvSavings = retirement.currentSavings * Math.pow(1 + r, n);
    
    // Future Value of Contributions: PMT * (((1+r)^n - 1) / r)
    const fvContributions = retirement.monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    
    const total = fvSavings + fvContributions;
    setRetirementResult(total.toFixed(2));
  };

  // --- Loan Payoff State ---
  const [loan, setLoan] = useState({ amount: 20000, rate: 5, monthlyPayment: 500 });
  const [loanResult, setLoanResult] = useState(null);

  const calculateLoan = () => {
    const r = loan.rate / 100 / 12; // Monthly rate
    const pv = loan.amount;
    const pmt = loan.monthlyPayment;

    // Check if payment covers interest
    if (pmt <= pv * r) {
      setLoanResult({ error: "Monthly payment is too low to cover interest." });
      return;
    }

    // N = -log(1 - (r * PV) / PMT) / log(1 + r)
    const n = -Math.log(1 - (r * pv) / pmt) / Math.log(1 + r);
    const totalInterest = (n * pmt) - pv;
    
    setLoanResult({ 
      months: Math.ceil(n), 
      totalInterest: totalInterest.toFixed(2) 
    });
  };

  // --- Goal Tracker State ---
  const [goal, setGoal] = useState({ targetAmount: 50000, currentSavings: 5000, months: 24 });
  const [goalResult, setGoalResult] = useState(null);

  const calculateGoal = () => {
    // Simple savings needed per month: (Target - Current) / Months
    // Ignoring interest for simplicity in this version, or could add a rate input
    const needed = (goal.targetAmount - goal.currentSavings) / goal.months;
    setGoalResult(needed > 0 ? needed.toFixed(2) : 0);
  };

  const tabs = [
    { id: 'compound', label: 'Compound Interest', icon: <ArrowUpRight size={18} /> },
    { id: 'retirement', label: 'Retirement Planner', icon: <Briefcase size={18} /> },
    { id: 'loan', label: 'Loan Payoff', icon: <FileText size={18} /> },
    { id: 'goal', label: 'Goal Tracker', icon: <Target size={18} /> }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 pt-8">
      
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Investment Calculators</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Plan your future with precision using our suite of financial forecasting tools.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-800 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold transition-all border ${
              activeTab === tab.id 
                ? 'bg-gray-900 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-black border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'compound' && (
              <motion.div
                key="compound"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <ArrowUpRight className="mr-3 text-blue-500" /> Compound Interest
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Initial Principal ($)" value={compound.principal} onChange={v => setCompound({...compound, principal: v})} />
                  <InputGroup label="Annual Rate (%)" value={compound.rate} onChange={v => setCompound({...compound, rate: v})} />
                  <InputGroup label="Time (Years)" value={compound.time} onChange={v => setCompound({...compound, time: v})} />
                  <InputGroup label="Compound Freq (Years)" value={compound.frequency} onChange={v => setCompound({...compound, frequency: v})} />
                </div>
                <CalculateButton onClick={calculateCompound} label="Calculate Growth" />
              </motion.div>
            )}

            {activeTab === 'retirement' && (
              <motion.div
                key="retirement"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Briefcase className="mr-3 text-green-500" /> Retirement Planner
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Current Age" value={retirement.currentAge} onChange={v => setRetirement({...retirement, currentAge: v})} />
                  <InputGroup label="Retirement Age" value={retirement.retirementAge} onChange={v => setRetirement({...retirement, retirementAge: v})} />
                  <InputGroup label="Current Savings ($)" value={retirement.currentSavings} onChange={v => setRetirement({...retirement, currentSavings: v})} />
                  <InputGroup label="Monthly Contribution ($)" value={retirement.monthlyContribution} onChange={v => setRetirement({...retirement, monthlyContribution: v})} />
                  <InputGroup label="Expected Return (%)" value={retirement.expectedReturn} onChange={v => setRetirement({...retirement, expectedReturn: v})} />
                </div>
                <CalculateButton onClick={calculateRetirement} label="Project Retirement Wealth" />
              </motion.div>
            )}

            {activeTab === 'loan' && (
              <motion.div
                key="loan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FileText className="mr-3 text-red-500" /> Loan Payoff
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Loan Amount ($)" value={loan.amount} onChange={v => setLoan({...loan, amount: v})} />
                  <InputGroup label="Interest Rate (%)" value={loan.rate} onChange={v => setLoan({...loan, rate: v})} />
                  <InputGroup label="Monthly Payment ($)" value={loan.monthlyPayment} onChange={v => setLoan({...loan, monthlyPayment: v})} />
                </div>
                <CalculateButton onClick={calculateLoan} label="Calculate Payoff Time" />
              </motion.div>
            )}

            {activeTab === 'goal' && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Target className="mr-3 text-purple-500" /> Goal Tracker
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Target Amount ($)" value={goal.targetAmount} onChange={v => setGoal({...goal, targetAmount: v})} />
                  <InputGroup label="Current Savings ($)" value={goal.currentSavings} onChange={v => setGoal({...goal, currentSavings: v})} />
                  <InputGroup label="Time to Goal (Months)" value={goal.months} onChange={v => setGoal({...goal, months: v})} />
                </div>
                <CalculateButton onClick={calculateGoal} label="Calculate Required Savings" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Section */}
        <div className="bg-gray-900 rounded-[2rem] p-8 border border-gray-800 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'compound' && compoundResult && (
              <ResultCard 
                key="compound-res"
                label="Future Value" 
                value={`$${Number(compoundResult).toLocaleString()}`} 
                subtext={`Total Growth: $${(Number(compoundResult) - compound.principal).toLocaleString()}`}
              />
            )}

            {activeTab === 'retirement' && retirementResult && (
              <ResultCard 
                key="retirement-res"
                label="Retirement Corpus" 
                value={`$${Number(retirementResult).toLocaleString()}`} 
                subtext={`At age ${retirement.retirementAge}`}
              />
            )}

            {activeTab === 'loan' && loanResult && (
              <motion.div
                key="loan-res"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {loanResult.error ? (
                  <p className="text-red-500 font-bold">{loanResult.error}</p>
                ) : (
                  <>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Time to Freedom</p>
                    <h3 className="text-5xl font-black text-white tracking-tight">{loanResult.months} Months</h3>
                    <p className="text-gray-400">Total Interest Paid: <span className="text-red-400 font-bold">${loanResult.totalInterest}</span></p>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'goal' && goalResult && (
              <ResultCard 
                key="goal-res"
                label="Save Monthly" 
                value={`$${Number(goalResult).toLocaleString()}`} 
                subtext={`To reach goal in ${goal.months} months`}
              />
            )}

            {!compoundResult && !retirementResult && !loanResult && !goalResult && (
              <div className="space-y-4 opacity-50">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto text-gray-600">
                  <Calculator size={32} />
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Enter details to calculate</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Components ---

const InputGroup = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-5 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium outline-none placeholder-gray-600"
    />
  </div>
);

const CalculateButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/20 uppercase tracking-widest flex items-center justify-center group"
  >
    <span>{label}</span>
    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
  </button>
);

const ResultCard = ({ label, value, subtext }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-4"
  >
    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{label}</p>
    <h3 className="text-5xl font-black text-white tracking-tight">{value}</h3>
    <div className="w-16 h-1 bg-gray-800 mx-auto rounded-full"></div>
    <p className="text-sm text-gray-400 font-medium">{subtext}</p>
  </motion.div>
);

export default Calculators;
