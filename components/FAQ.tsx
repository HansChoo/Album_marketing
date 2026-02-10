import React, { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">자주 묻는 질문</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                <button 
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <span className={`font-bold ${isOpen ? 'text-lime-400' : 'text-white'}`}>
                    <span className="mr-2 text-lime-400">Q.</span>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                </button>
                
                <div 
                  className={`px-6 text-gray-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 py-5 border-t border-zinc-800' : 'max-h-0'
                  }`}
                >
                   {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
