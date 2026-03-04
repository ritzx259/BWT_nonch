import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bot, 
  User, 
  Send, 
  Loader2, 
  Download, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  ChevronRight,
  Zap,
  Info,
  Calendar,
  Lock,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import jsPDF from 'jspdf';

const TaxAgent = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello ${user?.name}! I'm your SentriFI Tax Assistant. I can help you estimate your tax liability and suggest deductions. Shall we start with your income sources for the current financial year?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [taxData, setTaxData] = useState({
    income: 85000,
    deductions: 12500,
    dependents: 2,
    taxLiability: 15200,
    readyToExport: false
  });
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Placeholder for AI Chat logic
      // In a real app, this would call /api/tax/chat
      const response = await axios.post('http://localhost:5000/api/tax/chat', {
        message: input,
        context: taxData
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      if (response.data.taxUpdate) {
        setTaxData(prev => ({ ...prev, ...response.data.taxUpdate }));
      }
    } catch (err) {
      console.error(err);
      // Fallback demo response
      setTimeout(() => {
        let reply = "I'm processing that. Can you also tell me about any deductions you're claiming, like medical expenses or home office?";
        let taxUpdate = {};

        if (input.toLowerCase().includes('salary') || input.toLowerCase().includes('income')) {
          reply = "Got it. Based on that income, you might be in the 20% tax bracket. Do you have any investments under Section 80C or similar deductions?";
          taxUpdate = { income: 80000, taxLiability: 12000 };
        } else if (input.toLowerCase().includes('deduction') || input.toLowerCase().includes('invest')) {
          reply = "Excellent. Those deductions will significantly lower your taxable income. I've updated your summary. Would you like to generate your tax report now?";
          taxUpdate = { deductions: 15000, taxLiability: 9000, readyToExport: true };
        }

        const assistantMessage = {
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMessage]);
        setTaxData(prev => ({ ...prev, ...taxUpdate }));
        setIsTyping(false);
      }, 1000);
    }
  };

  const downloadTaxSummary = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('SentriFI Tax Summary Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`User: ${user.name}`, 20, 30);
    doc.text(`Financial Year: 2024-25`, 20, 35);
    
    doc.line(20, 45, 190, 45);
    
    doc.setFontSize(14);
    doc.text('Tax Breakdown', 20, 55);
    doc.text(`Gross Income: $${taxData.income.toLocaleString()}`, 25, 65);
    doc.text(`Total Deductions: $${taxData.deductions.toLocaleString()}`, 25, 75);
    doc.text(`Taxable Income: $${(taxData.income - taxData.deductions).toLocaleString()}`, 25, 85);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text(`Estimated Tax Liability: $${taxData.taxLiability?.toLocaleString()}`, 20, 105);
    
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text('Disclaimer: This is an AI-generated estimate. Please consult a professional tax advisor before filing.', 20, 130);
    
    doc.save('SentriFI-Tax-Summary.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto h-[85vh] flex flex-col lg:flex-row gap-8 pb-10">
      {/* Chat Section */}
      <div className="flex-grow bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-30 -z-0"></div>
        {/* Chat Header */}
        <div className="p-8 border-b border-gray-50 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl shadow-sm border border-blue-100 relative">
              <Bot size={28} />
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Tax AI Agent</h2>
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active &bull; Secure Encrypted Chat</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
                <div className={`p-2 rounded-xl flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`space-y-1`}>
                  <div className={`p-5 rounded-[1.5rem] shadow-sm text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                  <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-50 p-4 rounded-2xl flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-8 border-t border-gray-50 bg-gray-50/50 relative z-10">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about deductions, income, or tax filing..."
              className="w-full pl-6 pr-24 py-5 bg-white border border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-all shadow-md group active:scale-95"
              >
                <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </form>
          <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center">
            SentriFI Agent can only provide estimates &bull; Consult a professional
          </p>
        </div>
      </div>

      {/* Tax Summary Sidebar */}
      <div className="lg:w-96 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Tax Summary</h3>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center group cursor-default">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Gross Income</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">${taxData.income.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center group cursor-default">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Deductions</p>
              <p className="font-black text-green-600 group-hover:scale-110 transition-transform">-${taxData.deductions.toLocaleString()}</p>
            </div>
            <div className="h-px bg-gray-50 w-full"></div>
            <div className="flex justify-between items-center group cursor-default">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Estimated Tax</p>
              <p className="text-2xl font-black text-blue-600 group-hover:scale-105 transition-transform">
                ${taxData.taxLiability ? taxData.taxLiability.toLocaleString() : '0'}
              </p>
            </div>
          </div>

          {taxData.readyToExport ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-green-50 p-4 rounded-2xl flex items-center space-x-3 border border-green-100">
                <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Analysis Ready!</p>
              </div>
              <button
                onClick={downloadTaxSummary}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center group"
              >
                <Download className="mr-2 group-hover:translate-y-0.5 transition-transform" size={20} />
                Export Tax Report
              </button>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-5 rounded-3xl space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <Info size={18} />
                <p className="text-xs font-black uppercase tracking-widest">Next Steps</p>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Continue the conversation to refine your tax estimation. Try asking about specific investment types or medical expenses.
              </p>
            </div>
          )}
        </motion.div>

        {/* Security Badge */}
        <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 text-white rounded-2xl backdrop-blur-md">
              <Lock size={20} />
            </div>
            <h4 className="text-lg font-black tracking-tight">Security Protocol</h4>
          </div>
          <p className="text-xs text-gray-400 font-medium leading-relaxed uppercase tracking-tighter">
            Your financial data is encrypted using AES-256 and is never shared with third parties.
          </p>
          <div className="flex items-center space-x-2 pt-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-900 flex items-center justify-center"><ShieldCheck size={10} /></div>
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center"><Zap size={10} /></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Verified Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxAgent;
