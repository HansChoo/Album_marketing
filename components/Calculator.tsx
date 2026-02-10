import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [budget, setBudget] = useState(50); // 500,000 KRW
  
  const displayBudget = budget * 10000;
  
  // Marketing Logic:
  // Fee is 15%. Net budget for reach calculation is 85%.
  const feePercentage = 0.15;
  const netBudget = displayBudget * (1 - feePercentage);
  
  // Assuming average Cost Per Reach (blended ads + viral) is around 20 KRW based on net budget.
  // Viral multiplier effect increases slightly with budget.
  const baseReach = netBudget / 20; 
  const viralMultiplier = 1 + (budget / 500); // Slight increase as budget grows
  
  const maxReach = Math.floor(baseReach * viralMultiplier * 1.5);
  // Removed minReach calculation/display as requested

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  // Dynamic Pro Tip based on budget range
  const getProTip = () => {
    if (budget < 50) {
        return "초기 리스너 확보가 중요합니다. SNS 타겟 광고와 플레이리스트 피칭에 집중하여 코어 팬층을 만드세요.";
    } else if (budget < 150) {
        return "콘텐츠 확장이 필요한 시기입니다. 숏폼 영상과 바이럴 마케팅을 병행하여 유입 경로를 다각화하세요.";
    } else {
        return "대중적인 인지도를 높일 때입니다. 인플루언서 협업과 대규모 배포를 통해 트래픽을 폭발시키세요.";
    }
  };

  const KAKAO_LINK = "http://pf.kakao.com/_PKavxd/chat";

  const handleConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const message = `[헤마스튜디오 견적 시뮬레이션 문의]\n\n💰 희망 예산: ${formatNumber(displayBudget)} KRW\n📈 예상 도달: 약 ${formatNumber(maxReach)}명\n\n이 예산으로 진행 가능한 마케팅 플랜을 상담받고 싶습니다.`;

    // Copy to clipboard logic
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            if (window.confirm("상담 신청 내용이 복사되었습니다.\n\n카카오톡 채팅창에 '붙여넣기' 하시면 편리하게 상담하실 수 있습니다.\n카카오톡으로 이동하시겠습니까?")) {
                window.open(KAKAO_LINK, '_blank');
            }
        }).catch(() => {
            // Fallback if clipboard fails
            window.open(KAKAO_LINK, '_blank');
        });
    } else {
        window.open(KAKAO_LINK, '_blank');
    }
  };

  return (
    <section id="calculator" className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-bold tracking-widest text-xs uppercase mb-2 block">Simulation</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            예산별 마케팅 효율 미리보기
          </h2>
          <p className="text-gray-400">패키지 외 추가예산으로 어느정도의 파급력을 만들 수 있는지 확인해보세요.</p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 via-purple-500 to-lime-400"></div>
          
          <div className="mb-14">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
                <div className="flex flex-col">
                    <span className="text-white font-bold text-2xl md:text-4xl mb-2">예산 설정</span>
                    <span className="text-xs md:text-sm text-gray-500">(광고 집행 수수료 15% 포함 비용)</span>
                </div>
                <span className="text-3xl font-black text-white text-right">
                    {formatNumber(displayBudget)}<span className="text-lg font-normal text-gray-500 ml-1">KRW</span>
                </span>
            </div>
            
            <div className="relative w-full h-6 flex items-center">
                <input 
                type="range" 
                min="0" 
                max="300" 
                step="5"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-3 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-lime-400 outline-none z-10 relative"
                />
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-lime-600 to-lime-400 rounded-full pointer-events-none"
                    style={{ width: `${(budget / 300) * 100}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-3 font-mono">
              <span>0 KRW</span>
              <span>3,000,000 KRW+</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-black/40 rounded-2xl p-8 border border-zinc-800/50">
                <h3 className="text-gray-400 text-sm mb-2 font-medium">예상 도달 인원 (최대)</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                    {formatNumber(maxReach)}
                    </span>
                    <span className="text-gray-500 font-bold">명</span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-purple-900/10 border border-purple-500/20">
                    <p className="text-purple-200 text-sm leading-relaxed">
                        <strong className="text-purple-400">💡 Pro Tip:</strong><br/>
                        {getProTip()}
                    </p>
                </div>
                <button 
                  onClick={handleConsultation}
                  className="w-full py-4 bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-xl transition-all shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40 transform hover:-translate-y-0.5 flex items-center justify-center text-center cursor-pointer"
                >
                    이 예산으로 상담 신청하기
                </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;