import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Wallet, 
  CreditCard, 
  Briefcase, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Activity,
  Target,
  Zap,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState(user?.financialData || {});

  // Enhanced Stats from Image 2
  const stats = [
    { label: 'MONTHLY INCOME', value: '$8,500', change: '+12% vs last month', icon: <DollarSign size={20} />, color: 'green' },
    { label: 'MONTHLY SPENDING', value: '$3,240', change: '38% of income', icon: <CreditCard size={20} />, color: 'red' },
    { label: 'TOTAL SAVINGS', value: '$42,000', change: '+5% vs last month', icon: <Target size={20} />, color: 'blue' },
    { label: 'LOAN EMI', value: '$1,200', change: 'Auto-pay on 5th', icon: <TrendingUp size={20} />, color: 'purple' },
  ];

  const pieData = {
    labels: ['Rent', 'Food', 'Transport', 'Others'],
    datasets: [
      {
        data: [
          financialData?.monthlyExpenses?.rent || 0,
          financialData?.monthlyExpenses?.food || 0,
          financialData?.monthlyExpenses?.transport || 0,
          financialData?.monthlyExpenses?.others || 0,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Net Worth',
        data: [12000, 15000, 14500, 18000, 21000, 24500],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: 'bold', family: 'system-ui' },
          color: '#9ca3af' // gray-400
        }
      },
      tooltip: {
        backgroundColor: '#1f2937', // gray-800
        titleColor: '#f3f4f6', // gray-100
        bodyColor: '#d1d5db', // gray-300
        borderColor: '#374151', // gray-700
        borderWidth: 1
      }
    },
    scales: {
      y: {
        grid: {
          color: '#374151' // gray-700
        },
        ticks: {
          color: '#9ca3af' // gray-400
        }
      },
      x: {
        grid: {
          color: '#374151' // gray-700
        },
        ticks: {
          color: '#9ca3af' // gray-400
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Enhanced Header Section (Image 2) */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Good evening, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{user?.name || 'Guest'} 👋</span>
          </h1>
          <p className="text-gray-400 text-lg">Your financial health score is <span className="text-white font-bold">90</span> based on your data.</p>
        </div>
        
        {/* Financial Health Card (Image 2) */}
        <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 flex items-center space-x-6 min-w-[300px]">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="#1f2937" strokeWidth="8" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="#22c55e" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="25.12" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">90</span>
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Health</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Financial Health</p>
            <h3 className="text-2xl font-black text-white mb-1">Excellent</h3>
            <p className="text-xs text-gray-400">Based on savings & debt</p>
          </div>
        </div>
      </div>

      {/* Stats Grid (Image 2 Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 p-6 rounded-3xl shadow-lg border border-gray-800 group hover:border-gray-700 transition-all relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gray-800 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-700">
                {stat.change}
              </span>
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Budget & Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-lg border border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center">
                <PieChartIcon size={20} className="mr-2 text-blue-500" /> Projected Budget Breakdown
              </h3>
              <button className="text-green-500 text-xs font-bold uppercase tracking-widest hover:text-green-400 transition-colors">
                View Details →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[250px] relative">
                {Object.values(financialData?.monthlyExpenses || {}).some(v => v > 0) ? (
                  <Pie data={pieData} options={chartOptions} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <AlertCircle size={32} className="text-gray-600 mb-2" />
                    <p className="text-gray-500 text-xs">No data available</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {['Rent', 'Food', 'Transport', 'Others'].map((cat, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-xl border border-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${['blue', 'green', 'yellow', 'purple'][i]}-500`}></div>
                      <span className="text-sm font-bold text-gray-300">{cat}</span>
                    </div>
                    <span className="text-sm font-bold text-white">₹{pieData.datasets[0].data[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-lg border border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Growth Analysis</h3>
              <select className="bg-gray-950 border border-gray-700 text-xs font-bold text-gray-400 rounded-xl px-4 py-2 outline-none">
                <option>Last 6 Months</option>
              </select>
            </div>
            <div className="h-[250px]">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Right Column - Insights & Actions */}
        <div className="space-y-8">
          {/* Smart Insights (Image 2) */}
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-lg border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Zap size={20} className="mr-2 text-yellow-500" /> Smart Insights
            </h3>
            <div className="space-y-4">
              <div className="bg-green-500/10 p-5 rounded-2xl border border-green-500/20">
                <h4 className="text-green-400 font-bold text-sm mb-1">Excellent Health</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Your financial habits are top-notch! Keep maintaining your savings rate.</p>
              </div>
              <div className="bg-blue-500/10 p-5 rounded-2xl border border-blue-500/20">
                <h4 className="text-blue-400 font-bold text-sm mb-1">Investment Opportunity</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Consider diversifying into index funds to maximize long-term growth.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-lg border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/advice" className="flex items-center justify-between p-4 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                    <Briefcase size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-200">Optimize Portfolio</span>
                </div>
                <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
              </Link>
              <Link to="/tax-agent" className="flex items-center justify-between p-4 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 text-green-500 rounded-lg">
                    <Activity size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-200">Tax Health Check</span>
                </div>
                <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
