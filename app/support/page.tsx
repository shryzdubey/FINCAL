'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ComplianceFooter from '@/components/ComplianceFooter';
import { 
  ChevronDown, 
  Send, 
  CheckCircle2, 
  UserPlus, 
  Wallet, 
  Settings, 
  PlayCircle,
  HelpCircle,
  Mail,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-[#224c87] group-hover:text-[#da3832] transition-colors font-montserrat pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#919090] shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#64748b] leading-relaxed text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const steps = [
    { 
      title: 'Personal Profile', 
      desc: 'Start by entering your current age and the age you plan to retire. This defines your investment horizon.',
      icon: <UserPlus size={24} />
    },
    { 
      title: 'Lifestyle Needs', 
      desc: 'Estimate your annual expenses in retirement. Use our lifestyle presets for a quick start.',
      icon: <Wallet size={24} />
    },
    { 
      title: 'Growth Settings', 
      desc: 'Set your expected returns and inflation rate. These are critical for long-term compounding.',
      icon: <Settings size={24} />
    },
    { 
      title: 'Analyze Results', 
      desc: 'Review your personalized roadmap, corpus requirement, and the monthly SIP needed to reach your goal.',
      icon: <PlayCircle size={24} />
    }
  ];

  const faqs = [
    {
      question: "How accurate are the results?",
      answer: "The calculator provides illustrative estimates based on user inputs and assumed financial parameters. Actual results may vary depending on market performance, taxation, and individual circumstances. It is intended as a planning tool, not a guarantee."
    },
    {
      question: "Why does inflation matter in retirement planning?",
      answer: "Inflation erodes the purchasing power of money. A corpus that seems sufficient today might not be enough 20 years from now as the cost of living increases. We account for this by inflating your current expenses to their future value."
    },
    {
      question: "What is the 'Retirement Readiness Score'?",
      answer: "This is a proprietary metric that compares your projected savings at retirement against your required corpus. A score of 100 means you are fully on track to meet your goals based on your current inputs."
    },
    {
      question: "How should I choose my expected return rate?",
      answer: "Expected returns should be based on your asset allocation. Equity-heavy portfolios might target 12-14%, while debt-heavy or post-retirement portfolios might target 6-8%. Always consult a financial advisor for personalized advice."
    },
    {
      question: "Is my data stored on your servers?",
      answer: "No. This calculator runs entirely in your browser. We do not store any personal financial information on our servers, ensuring your privacy and data security."
    }
  ];

  return (
    <main className="main-content bg-white">
      <Header />

      <div className="container py-24 max-w-6xl">
        {/* HERO SECTION */}
        <header className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100"
          >
            <HelpCircle size={14} className="text-[#224c87]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#224c87]">
              Help Center & Resources
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#224c87] mb-8 font-montserrat tracking-tight"
          >
            Plan with <span className="text-[#da3832]">Confidence.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#64748b] max-w-3xl mx-auto leading-relaxed"
          >
            Our comprehensive guide and support resources are designed to help you navigate the complexities of retirement planning with ease and clarity.
          </motion.p>
        </header>

        {/* GETTING STARTED STEPS */}
        <section className="mb-48">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-[#224c87] rounded-full"></div>
            <h2 className="text-3xl font-bold text-[#224c87] font-montserrat">Getting Started</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-200 group-hover:bg-[#224c87] group-hover:text-white transition-colors duration-500">
                  {index + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#224c87] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#224c87] mb-4">{step.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-48">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <h2 className="text-3xl font-bold text-[#224c87] mb-6 font-montserrat">Common Questions</h2>
                <p className="text-[#64748b] leading-relaxed mb-8">
                  Find quick answers to common questions about retirement planning, inflation, and our calculation methodology.
                </p>
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-sm font-bold text-[#224c87] mb-2">Still have questions?</p>
                  <p className="text-xs text-[#64748b] mb-4">Our financial experts are just a message away.</p>
                  <button className="text-xs font-bold text-[#224c87] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    Contact Support <Send size={12} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl border border-gray-100 px-8">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="mb-24">
          <div className="rounded-[40px] bg-[#224c87] p-8 md:p-20 text-white overflow-hidden relative shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-20">
              <div className="lg:w-5/12 space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight">Connect with Experts</h2>
                  <p className="text-blue-100/80 text-lg leading-relaxed">
                    Have a specific question or want to share feedback? Our team is here to help you navigate your retirement journey.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#224c87] transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Email Us</p>
                      <p className="font-bold">support@fincal.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#224c87] transition-all">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Live Chat</p>
                      <p className="font-bold">Available 9AM - 6PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-7/12">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-12 rounded-[32px] text-center h-full flex flex-col justify-center"
                  >
                    <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Message Received</h3>
                    <p className="text-blue-100/80 max-w-sm mx-auto">Thank you for reaching out. Our team will review your message and get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-blue-300 ml-1">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:bg-white focus:text-[#224c87] focus:ring-4 focus:ring-blue-400/20 outline-none transition-all placeholder:text-blue-300/30"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-blue-300 ml-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:bg-white focus:text-[#224c87] focus:ring-4 focus:ring-blue-400/20 outline-none transition-all placeholder:text-blue-300/30"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-blue-300 ml-1">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:bg-white focus:text-[#224c87] focus:ring-4 focus:ring-blue-400/20 outline-none transition-all resize-none placeholder:text-blue-300/30"
                        placeholder="How can we help you plan your future?"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-white text-[#224c87] font-bold py-5 rounded-2xl hover:bg-blue-50 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      Send Inquiry
                      <Send size={18} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <ComplianceFooter />
    </main>
  );
}
