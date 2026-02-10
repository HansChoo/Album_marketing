import React from 'react';
import { PLANS } from '../constants';
import { Check, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const KAKAO_LINK = "http://pf.kakao.com/_PKavxd/chat";

  const handleInquiry = (e: React.MouseEvent, planName: string) => {
    e.preventDefault();
    const message = `[헤마스튜디오 상품 문의]\n\n'${planName}' 상품에 대해 자세히 상담받고 싶습니다.`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            if (window.confirm(`'${planName}' 상담 내용이 복사되었습니다.\n\n카카오톡 채팅창에 '붙여넣기' 하시면 편리하게 상담하실 수 있습니다.\n카카오톡으로 이동하시겠습니까?`)) {
                window.open(KAKAO_LINK, '_blank');
            }
        }).catch(() => {
            window.open(KAKAO_LINK, '_blank');
        });
    } else {
        window.open(KAKAO_LINK, '_blank');
    }
  };

  const handleEnterpriseInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `[헤마스튜디오 엔터프라이즈 문의]\n\n대형 프로젝트(엔터프라이즈) 관련하여 맞춤 견적을 상담받고 싶습니다.`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            if (window.confirm("상담 신청 내용이 복사되었습니다.\n\n카카오톡 채팅창에 '붙여넣기' 해주세요.\n카카오톡으로 이동하시겠습니까?")) {
                window.open(KAKAO_LINK, '_blank');
            }
        }).catch(() => {
             window.open(KAKAO_LINK, '_blank');
        });
    } else {
        window.open(KAKAO_LINK, '_blank');
    }
  };

  return (
    <section className="py-24 bg-black relative" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-lime-400 font-bold tracking-widest text-xs uppercase mb-2 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            예산에 딱 맞는<br />
            최적의 홍보 플랜
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {PLANS.map((plan) => {
            const isPurple = plan.color === 'purple';
            const accentColor = isPurple ? 'text-purple-400' : 'text-lime-400';
            const borderColor = isPurple ? 'border-purple-500' : 'border-zinc-800';
            const buttonClass = isPurple 
              ? 'bg-purple-600 hover:bg-purple-500 text-white neon-purple-glow border-transparent' 
              : 'bg-transparent border border-zinc-700 text-white hover:border-lime-400 hover:text-lime-400';
            
            return (
              <div 
                key={plan.id}
                className={`relative bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border ${borderColor} transition-all duration-300 flex flex-col h-full ${isPurple ? 'transform scale-105 z-10 shadow-2xl shadow-purple-900/30' : 'hover:border-zinc-600'}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-1.5 px-4 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles size={12} fill="currentColor" />
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{plan.subtitle}</p>
                </div>

                <div className="mb-8 pb-8 border-b border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-zinc-600 line-through text-sm font-medium">{plan.originalPrice}</span>
                     <span className={`px-2 py-0.5 rounded bg-zinc-800 text-xs font-bold ${accentColor}`}>{plan.discount} OFF</span>
                  </div>
                  <div className="text-4xl font-black text-white">{plan.price}</div>
                  <p className="text-zinc-500 text-xs mt-2">VAT 별도</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <div className={`mt-0.5 mr-3 p-0.5 rounded-full ${isPurple ? 'bg-purple-900/50 text-purple-400' : 'bg-zinc-800 text-lime-400'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={(e) => handleInquiry(e, plan.name)}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center cursor-pointer ${buttonClass}`}
                >
                  {isPurple ? '지금 시작하기' : '선택하기'}
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">맞춤형 대형 프로젝트가 필요하신가요?</p>
            <button 
              onClick={handleEnterpriseInquiry}
              className="inline-block text-white border-b border-white pb-0.5 hover:text-lime-400 hover:border-lime-400 transition-colors cursor-pointer"
            >
                엔터프라이즈 문의하기 &rarr;
            </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;