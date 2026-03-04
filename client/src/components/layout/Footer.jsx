import { Github, Twitter, Linkedin, Mail, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 border-b border-gray-800 pb-10">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4 tracking-tight">SentriFI</h3>
            <p className="text-sm leading-relaxed mb-6">
              Empowering your financial future with AI-driven insights and automated tax solutions. Secure, smart, and reliable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/advice" className="hover:text-blue-400 transition-colors">AI Financial Planning</a></li>
              <li><a href="/tax-agent" className="hover:text-blue-400 transition-colors">Automated Tax Filing</a></li>
              <li><a href="/calculators" className="hover:text-blue-400 transition-colors">Investment Calculators</a></li>
              <li><a href="/blog" className="hover:text-blue-400 transition-colors">Wealth Strategies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Compliance</h4>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <ShieldCheck size={18} />
                <span className="text-xs font-bold uppercase">Secure & Certified</span>
              </div>
              <p className="text-[10px] leading-relaxed uppercase tracking-tighter text-gray-500">
                SentriFI is for informational purposes only. Consult a certified financial advisor or tax professional before making major decisions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} SentriFI. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart size={12} className="text-red-500 fill-current" />
            <span>for better financial health.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
