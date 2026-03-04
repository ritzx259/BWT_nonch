import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  PieChart as PieChartIcon, 
  Download, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Zap,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const AdviceEngine = () => {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: user?.financialData?.age || '',
    annualIncome: user?.financialData?.annualIncome || '',
    monthlyExpenses: {
      rent: user?.financialData?.monthlyExpenses?.rent || 0,
      food: user?.financialData?.monthlyExpenses?.food || 0,
      transport: user?.financialData?.monthlyExpenses?.transport || 0,
      others: user?.financialData?.monthlyExpenses?.others || 0,
    },
    savingsRate: user?.financialData?.savingsRate || '',
    debts: {
      loans: user?.financialData?.debts?.loans || 0,
      creditCards: user?.financialData?.debts?.creditCards || 0,
    },
    riskTolerance: user?.financialData?.riskTolerance || 'medium',
    financialGoals: user?.financialData?.financialGoals || [],
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: Number(value) },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGoalToggle = (goal) => {
    const goals = [...formData.financialGoals];
    if (goals.includes(goal)) {
      setFormData({ ...formData, financialGoals: goals.filter(g => g !== goal) });
    } else {
      setFormData({ ...formData, financialGoals: [...goals, goal] });
    }
  };

  const submitFinancialData = async () => {
    setIsAnalyzing(true);
    setError('');
    try {
      // 1. Update user profile with latest data
      await updateProfile({ financialData: formData });

      // 2. Get AI Analysis (Placeholder for backend call)
      // In a real app, this would call /api/advice/analyze
      const response = await axios.post('http://localhost:5000/api/advice/analyze', {
        financialData: formData
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      setAnalysisResult(response.data);
      setStep(3);
    } catch (err) {
      console.error(err);
      // Fallback for demo if backend is not fully ready
      const mockResult = {
        budgetBreakdown: {
          labels: ['Rent', 'Food', 'Transport', 'Savings', 'Others'],
          data: [30, 15, 10, 20, 25]
        },
        recommendations: [
          'Increase emergency fund to cover 6 months of expenses ($15,000 target).',
          'Consider diversified index funds for long-term growth.',
          'Pay off high-interest credit card debt immediately.'
        ],
        riskAssessment: 'Based on your "Medium" tolerance, we recommend a 60/40 Equity-Bond split.',
        actionPlan: [
          { task: 'Emergency Fund', amount: '$500/mo', duration: '12 months' },
          { task: 'Index Fund SIP', amount: '$1,000/mo', duration: 'Ongoing' },
          { task: 'Debt Repayment', amount: '$200/mo', duration: '6 months' }
        ]
      };
      setAnalysisResult(mockResult);
      setStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('SentriFI Financial Analysis Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated for: ${user.name}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);

    doc.setFontSize(16);
    doc.text('Summary & Recommendations', 20, 50);
    
    let yPos = 60;
    analysisResult.recommendations.forEach((rec, i) => {
      doc.text(`${i+1}. ${rec}`, 25, yPos);
      yPos += 10;
    });

    doc.text('Action Plan', 20, yPos + 10);
    doc.autoTable({
      startY: yPos + 15,
      head: [['Task', 'Amount', 'Duration']],
      body: analysisResult.actionPlan.map(plan => [plan.task, plan.amount, plan.duration]),
    });

    doc.save('SentriFI-Report.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
          <Zap size={14} className="fill-current" />
          <span>AI Advice Engine v2.0</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Smart Financial Planning</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
          Our AI analyzes your data to provide a personalized roadmap for your wealth. Secure, encrypted, and intelligent.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all shadow-sm ${step >= s ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
            {s < 3 && <div className={`w-12 h-1 h-1 rounded-full mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8"
          >
            <div className="flex items-center space-x-3 text-gray-900 mb-2">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase text-sm tracking-widest text-gray-400">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 ml-1">Current Age</label>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    placeholder="e.g. 25"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 ml-1">Annual Income ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <DollarSign size={18} />
                  </div>
                  <input
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    placeholder="e.g. 80000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Monthly Expenses Breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(formData.monthlyExpenses).map((expense) => (
                  <div key={expense} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{expense}</label>
                    <input
                      type="number"
                      name={`monthlyExpenses.${expense}`}
                      value={formData.monthlyExpenses[expense]}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center group"
              >
                <span>Continue to Goals</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10"
          >
            <div className="flex items-center space-x-3 text-gray-900">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase text-sm tracking-widest text-gray-400">Goals & Risk</h2>
            </div>

            <div className="space-y-6">
              <label className="text-sm font-bold text-gray-700 ml-1">Risk Tolerance</label>
              <div className="grid grid-cols-3 gap-4">
                {['low', 'medium', 'high'].map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setFormData({ ...formData, riskTolerance: risk })}
                    className={`py-6 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all border-2 ${formData.riskTolerance === risk ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'}`}
                  >
                    {risk}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed px-2">
                <HelpCircle size={10} className="inline mr-1" />
                Low: Capital preservation focus. Medium: Balanced growth. High: Maximizing long-term returns.
              </p>
            </div>

            <div className="space-y-6">
              <label className="text-sm font-bold text-gray-700 ml-1">Financial Goals</label>
              <div className="flex flex-wrap gap-3">
                {['Emergency Fund', 'Buy a House', 'Retirement', 'Education', 'Investment Growth', 'Debt Repayment', 'Travel'].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`px-6 py-3 rounded-full text-xs font-bold transition-all border ${formData.financialGoals.includes(goal) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <button
                onClick={() => setStep(1)}
                className="text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center"
              >
                Back
              </button>
              <button
                onClick={submitFinancialData}
                disabled={isAnalyzing}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl flex items-center disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin mr-3" size={20} />
                    <span>Analyzing Data...</span>
                  </>
                ) : (
                  <>
                    <span>Generate AI Analysis</span>
                    <Zap className="ml-2 fill-current" size={20} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && analysisResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -z-0"></div>
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 relative z-10">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="p-4 bg-green-50 text-green-600 rounded-3xl shadow-sm border border-green-100">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Financial Analysis</h2>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">AI-Generated &bull; Secure & Private</p>
                  </div>
                </div>
                <button
                  onClick={downloadReport}
                  className="bg-white border-2 border-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 hover:border-blue-100 transition-all flex items-center shadow-sm group"
                >
                  <Download className="mr-2 text-blue-600 group-hover:scale-110 transition-transform" size={20} />
                  Download PDF Report
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h3 className="text-lg font-black text-gray-900 flex items-center uppercase tracking-widest text-xs border-b border-gray-50 pb-4">
                    <PieChartIcon size={18} className="mr-2 text-purple-600" /> Spending Breakdown
                  </h3>
                  <div className="h-[300px] w-full max-w-[300px] mx-auto">
                    <Pie 
                      data={{
                        labels: analysisResult.budgetBreakdown.labels,
                        datasets: [{
                          data: analysisResult.budgetBreakdown.data,
                          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'],
                          borderWidth: 0,
                        }]
                      }} 
                      options={{
                        plugins: {
                          legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { weight: 'bold', size: 10 } } }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-lg font-black text-gray-900 flex items-center uppercase tracking-widest text-xs border-b border-gray-50 pb-4">
                    <Zap size={18} className="mr-2 text-blue-600" /> Key Recommendations
                  </h3>
                  <div className="space-y-4">
                    {analysisResult.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start space-x-4 p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                        <div className="mt-1 p-1 bg-blue-100 text-blue-600 rounded-lg">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-gray-700 text-sm font-medium leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-gray-50">
                <h3 className="text-lg font-black text-gray-900 flex items-center uppercase tracking-widest text-xs mb-8">
                  <Briefcase size={18} className="mr-2 text-green-600" /> Strategic Action Plan
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-100">
                        <th className="pb-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Task</th>
                        <th className="pb-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Recommended Amount</th>
                        <th className="pb-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Duration</th>
                        <th className="pb-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {analysisResult.actionPlan.map((item, i) => (
                        <tr key={i} className="group hover:bg-gray-50 transition-colors">
                          <td className="py-5 font-bold text-gray-900 text-sm">{item.task}</td>
                          <td className="py-5 text-blue-600 font-black text-sm">{item.amount}</td>
                          <td className="py-5 text-gray-500 font-medium text-sm">{item.duration}</td>
                          <td className="py-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${i === 0 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                              {i === 0 ? 'Immediate' : 'Scheduled'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
              </div>
              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-2xl font-black mb-2 tracking-tight">Ready to implement this plan?</h4>
                <p className="text-blue-100 font-medium">Connect your accounts for automated tracking and real-time alerts.</p>
              </div>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-lg flex items-center group relative z-10 whitespace-nowrap">
                Start Implementation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 font-bold text-xs hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center"
              >
                <AlertCircle size={14} className="mr-2" />
                Recalculate with new data
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdviceEngine;
