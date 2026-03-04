import { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaxDocuments = () => {
  const [activeCategory, setActiveCategory] = useState('identity');
  const [files, setFiles] = useState({});
  const [uploading, setUpload] = useState(false);

  const categories = [
    { id: 'identity', label: 'Identity Proofs', icon: <Shield size={18} /> },
    { id: 'income', label: 'Salary & Income', icon: <FileText size={18} /> },
    { id: 'deductions', label: 'Deductions (80C, etc)', icon: <CheckCircle2 size={18} /> },
    { id: 'other', label: 'Other Docs', icon: <AlertCircle size={18} /> },
  ];

  const docRequirements = {
    identity: [
      { id: 'pan', label: 'PAN Card', required: true, desc: 'Linked with Aadhaar' },
      { id: 'aadhaar', label: 'Aadhaar Card', required: true, desc: 'Front and Back' },
    ],
    income: [
      { id: 'form16', label: 'Form 16', required: true, desc: 'Part A & B from Employer' },
      { id: 'salary_slips', label: 'Salary Slips', required: false, desc: 'Last 3 months' },
      { id: 'ais', label: 'AIS / TIS', required: true, desc: 'Annual Information Statement' },
      { id: 'bank_stmt', label: 'Bank Statements', required: true, desc: 'All savings accounts' },
    ],
    deductions: [
      { id: 'lic', label: 'Life Insurance', required: false, desc: 'Premium Receipts' },
      { id: 'ppf', label: 'PPF / EPF', required: false, desc: 'Passbook or Statement' },
      { id: 'med', label: 'Medical Insurance', required: false, desc: '80D Proofs' },
      { id: 'rent', label: 'Rent Receipts', required: false, desc: 'For HRA Claims' },
    ],
    other: [
      { id: 'capital_gains', label: 'Capital Gains', required: false, desc: 'Broker Statements' },
      { id: 'home_loan', label: 'Home Loan Cert', required: false, desc: 'Interest Certificate' },
    ]
  };

  const handleFileChange = (categoryId, docId, e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [`${categoryId}_${docId}`]: {
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          type: file.type,
          status: 'uploaded'
        }
      }));
    }
  };

  const removeFile = (categoryId, docId) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[`${categoryId}_${docId}`];
      return newFiles;
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
            <UploadCloud size={32} className="mr-3 text-blue-500" /> Tax Document Vault
          </h1>
          <p className="text-gray-400 text-sm font-medium mt-2">
            Securely upload and organize your ITR documents. All files are encrypted.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20">
          <Shield size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">AES-256 Encrypted Storage</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <div className="flex items-center space-x-3">
                {cat.icon}
                <span>{cat.label}</span>
              </div>
              {/* Progress Indicator */}
              <div className="text-xs opacity-70">
                {docRequirements[cat.id].filter(d => files[`${cat.id}_${d.id}`]).length}/{docRequirements[cat.id].length}
              </div>
            </button>
          ))}
        </div>

        {/* Upload Area */}
        <div className="lg:col-span-3 bg-gray-900 p-8 rounded-[2.5rem] border border-gray-800 shadow-xl min-h-[500px]">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
            {categories.find(c => c.id === activeCategory)?.label}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docRequirements[activeCategory].map((doc) => {
              const fileKey = `${activeCategory}_${doc.id}`;
              const file = files[fileKey];

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative p-6 rounded-3xl border-2 border-dashed transition-all ${file ? 'border-green-500/30 bg-green-500/5' : 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/50'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{doc.label}</h3>
                      <p className="text-gray-500 text-xs mt-1">{doc.desc}</p>
                    </div>
                    {doc.required && (
                      <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Required</span>
                    )}
                  </div>

                  {file ? (
                    <div className="bg-gray-950 p-4 rounded-2xl flex items-center justify-between border border-gray-800">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="truncate">
                          <p className="text-white text-sm font-bold truncate">{file.name}</p>
                          <p className="text-gray-500 text-xs">{file.size}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(activeCategory, doc.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-950 rounded-2xl border border-gray-800 cursor-pointer hover:bg-gray-900 transition-all group">
                        <div className="p-3 bg-gray-900 rounded-full group-hover:scale-110 transition-transform mb-2">
                          <UploadCloud size={24} className="text-blue-500" />
                        </div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest group-hover:text-white">Click to Upload</p>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(activeCategory, doc.id, e)}
                        />
                      </label>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxDocuments;
