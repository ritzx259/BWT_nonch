import { Link } from 'react-router-dom';
import { ArrowRight, PieChart, TrendingUp, Shield, Bot, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: <PieChart className="text-blue-500" size={32} />,
      title: 'Personalized Budgeting',
      description: 'Get AI-driven budget breakdowns and spending insights tailored to your unique financial situation.'
    },
    {
      icon: <TrendingUp className="text-green-500" size={32} />,
      title: 'Investment Optimization',
      description: 'Optimize your portfolio with risk assessment and goal-based investment strategies.'
    },
    {
      icon: <Bot className="text-purple-500" size={32} />,
      title: 'AI Tax Filing Agent',
      description: 'A conversational AI that guides you through tax filing, calculates liability, and suggests deductions.'
    },
    {
      icon: <Shield className="text-red-500" size={32} />,
      title: 'Secure & Compliant',
      description: 'Your financial data is encrypted and protected with enterprise-grade security protocols.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Freelance Designer',
      text: 'SentriFI simplified my taxes completely. The AI agent asked the right questions and saved me hours.',
      avatar: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional+headshot+of+a+woman+designer+in+her+30s+modern+dark+lighting&image_size=square'
    },
    {
      name: 'Michael R.',
      role: 'Tech Lead',
      text: 'The financial advice engine gave me a clear roadmap for my retirement goals. The reports are incredibly detailed.',
      avatar: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional+headshot+of+a+man+tech+lead+in+his+40s+modern+dark+lighting&image_size=square'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-500/20">
              <Star size={16} className="fill-current" />
              <span>New: India ITR-1/4 Support</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Smart Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Advice</span> Powered by AI
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Take control of your financial future with personalized AI insights, automated tax filing, and secure wealth management strategies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center group w-full sm:w-auto justify-center"
              >
                <span>Get Started Free</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/login"
                className="bg-transparent text-white px-8 py-4 rounded-xl font-bold border border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all flex items-center w-full sm:w-auto justify-center"
              >
                View Demo
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 mt-16 lg:mt-0 relative"
          >
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
            <img
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=futuristic+financial+dashboard+dark+mode+neon+blue+accents+high+tech+interface&image_size=landscape_16_9"
              alt="Dashboard Preview"
              className="rounded-2xl shadow-2xl border border-gray-800 relative z-10 hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-gray-900/50 py-24 rounded-3xl mx-4 lg:mx-8 border border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">Core Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Everything you need to manage your money and taxes in one intelligent platform.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-950 p-8 rounded-2xl shadow-lg border border-gray-800 hover:border-gray-700 transition-colors group cursor-default"
              >
                <div className="mb-6 bg-gray-900 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-gray-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">Trusted by 10,000+ Smart Investors</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 border border-blue-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-wide">Enterprise Security</h4>
                  <p className="text-gray-400 text-sm">We use 256-bit encryption and ISO-certified data centers to keep your information safe.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-500/10 p-2 rounded-lg text-green-500 border border-green-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-wide">AI Compliance</h4>
                  <p className="text-gray-400 text-sm">Our tax engine is updated regularly to comply with the latest tax laws and regulations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-500 border border-purple-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-wide">Real-time Updates</h4>
                  <p className="text-gray-400 text-sm">Monitor your wealth in real-time with automated sync and AI-driven alerts.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-1 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6"
              >
                <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full border-4 border-gray-800" />
                <div>
                  <div className="flex mb-2 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-300 italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-400 font-medium uppercase tracking-wider text-[10px]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 rounded-[3rem] mx-4 lg:mx-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid-pattern)" />
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">Ready to Master Your Finances?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of users who are already using SentriFI to grow their wealth and simplify their taxes.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-2xl flex items-center mx-auto w-fit group"
          >
            <span>Create Your Free Account</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
          </Link>
          <p className="mt-8 text-blue-200 text-sm font-medium uppercase tracking-widest opacity-80">
            No credit card required &bull; 14-day free trial &bull; Secure setup
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
