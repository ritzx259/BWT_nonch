import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AdviceEngine from './pages/advice/AdviceEngine';
import TaxAgent from './pages/tax/TaxAgent';
import AdminDashboard from './pages/admin/AdminDashboard';
import Calculators from './pages/calculators/Calculators';
import FinancialBot from './pages/bot/FinancialBot';
import TaxDocuments from './pages/documents/TaxDocuments';
import FinancialTwin from './pages/financial-twin/FinancialTwin';
import Simulator from './pages/simulator/Simulator';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/calculators" element={<Calculators />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/advice" element={<AdviceEngine />} />
                <Route path="/tax-agent" element={<TaxAgent />} />
                <Route path="/bot" element={<FinancialBot />} />
                <Route path="/documents" element={<TaxDocuments />} />
                <Route path="/financial-twin" element={<FinancialTwin />} />
                <Route path="/simulator" element={<Simulator />} />
              </Route>

              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
