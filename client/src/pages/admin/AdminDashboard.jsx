import { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  Users, 
  Lock, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Play,
  History,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [searchTerm, setSearchTerm] = useState('');

  const securityAlerts = [
    { id: 1, type: 'Failed Login', user: 'sarah.j@example.com', ip: '192.168.1.45', time: '2 mins ago', severity: 'high' },
    { id: 2, type: 'Suspicious Activity', user: 'michael.r@example.com', ip: '10.0.0.12', time: '15 mins ago', severity: 'medium' },
    { id: 3, type: 'Data Export', user: 'admin@finai.com', ip: '127.0.0.1', time: '1 hour ago', severity: 'low' },
    { id: 4, type: 'Brute Force Attempt', user: 'unknown', ip: '45.12.34.89', time: '3 hours ago', severity: 'high' }
  ];

  const activityLogs = [
    { id: 101, action: 'Updated Profile', user: 'sarah.j@example.com', status: 'success', time: '5 mins ago' },
    { id: 102, action: 'Generated Tax Report', user: 'michael.r@example.com', status: 'success', time: '20 mins ago' },
    { id: 103, action: 'Password Change', user: 'john.d@example.com', status: 'failed', time: '45 mins ago' },
    { id: 104, action: 'New User Registration', user: 'emily.s@example.com', status: 'success', time: '2 hours ago' }
  ];

  const stats = [
    { label: 'Active Sessions', value: '1,245', change: '+12%', icon: <Users size={20} />, color: 'blue' },
    { label: 'Security Score', value: '98/100', change: '+2%', icon: <ShieldCheck size={20} />, color: 'green' },
    { label: 'Alerts Today', value: '14', change: '-5%', icon: <ShieldAlert size={20} />, color: 'red' },
    { label: 'API Latency', value: '120ms', change: '-8%', icon: <Zap size={20} />, color: 'purple' }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <Lock size={32} className="mr-3 text-red-600" /> Vigilance Dashboard
          </h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Security & Monitoring &bull; Enterprise Admin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-red-50 text-red-600 border border-red-100 px-6 py-3 rounded-2xl text-sm font-black hover:bg-red-100 transition-all flex items-center shadow-sm">
            <Play size={18} className="mr-2 fill-current" /> Breach Simulator
          </button>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-black transition-all flex items-center shadow-lg">
            <Download size={18} className="mr-2" /> Export Logs
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-${stat.color}-50 rounded-bl-full opacity-50 -z-0`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 relative z-10">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-50 flex flex-col md:flex-row items-center justify-between p-8 gap-6">
          <div className="flex space-x-2 p-1 bg-gray-50 rounded-2xl">
            {['security', 'activity', 'playbook'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search logs, users, IPs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8 px-2">
                  <h3 className="text-lg font-black text-gray-900 flex items-center uppercase tracking-widest text-xs">
                    <ShieldAlert size={18} className="mr-2 text-red-600" /> Critical Security Alerts
                  </h3>
                  <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">Mark All Resolved</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-red-100 hover:bg-red-50/10 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md">
                      <div className="flex items-center space-x-6">
                        <div className={`p-4 rounded-2xl ${alert.severity === 'high' ? 'bg-red-100 text-red-600' : alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'} group-hover:scale-110 transition-transform`}>
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-lg">{alert.type}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <p className="text-sm font-bold text-gray-500">{alert.user}</p>
                            <span className="text-gray-300">&bull;</span>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{alert.ip}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{alert.time}</p>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${alert.severity === 'high' ? 'bg-red-600 text-white' : alert.severity === 'medium' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'}`}>
                            {alert.severity} Priority
                          </span>
                        </div>
                        <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="overflow-x-auto"
              >
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-50">
                      <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px] px-4">Action</th>
                      <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px] px-4">User</th>
                      <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px] px-4">Status</th>
                      <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px] px-4">Time</th>
                      <th className="pb-6 font-black text-gray-400 uppercase tracking-widest text-[10px] px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activityLogs.map((log) => (
                      <tr key={log.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="py-6 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                              <History size={16} />
                            </div>
                            <span className="font-bold text-gray-900 text-sm">{log.action}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4 text-sm font-medium text-gray-500">{log.user}</td>
                        <td className="py-6 px-4">
                          <div className="flex items-center space-x-2">
                            {log.status === 'success' ? (
                              <CheckCircle2 size={14} className="text-green-500" />
                            ) : (
                              <XCircle size={14} className="text-red-500" />
                            )}
                            <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                              {log.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{log.time}</td>
                        <td className="py-6 px-4">
                          <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'playbook' && (
              <motion.div
                key="playbook"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-bl-full opacity-20 group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black mb-4 tracking-tight">Response Playbook</h4>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 uppercase tracking-wide">Standard operating procedures for critical data breaches and security incidents.</p>
                    <div className="space-y-4">
                      {[
                        'Isolate affected server instances',
                        'Initiate data backup verification',
                        'Notify regulatory compliance officers',
                        'Broadcast incident to security team'
                      ].map((step, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-xs">{i+1}</div>
                          <span className="text-sm font-bold text-gray-200">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8 p-4">
                  <h4 className="text-xl font-black text-gray-900 uppercase tracking-widest text-xs border-b border-gray-100 pb-4 flex items-center">
                    <FileText size={18} className="mr-2 text-blue-600" /> Compliance Docs
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { title: 'ISO 27001 Certification', date: 'Exp: 2026', type: 'PDF' },
                      { title: 'SOC2 Type II Report', date: 'Exp: 2025', type: 'PDF' },
                      { title: 'GDPR Data Processing', date: 'Active', type: 'DOC' },
                      { title: 'Tax Engine Compliance', date: 'Active', type: 'PDF' }
                    ].map((doc, i) => (
                      <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{doc.title}</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{doc.date}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">{doc.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
