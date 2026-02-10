import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToCalculator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black font-gmarket">
      
      {/* 1. Spline 3D Background - Pointer events disabled to allow scrolling */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <iframe 
          src='https://my.spline.design/order-O1NUWYPGQugjFQZy4CfNbIOa/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          title="Spline 3D Scene"
        ></iframe>
      </div>

      {/* Spline Logo Cover - Full Width Bottom Bar */}
      {/* Acts as a letterbox at the bottom to hide the logo cleanly */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black z-10 pointer-events-none"></div>

      {/* 2. Content Layer */}
      {/* z-index increased to 20 to sit above the black bar if screen is small */}
      <div className="relative z-20 w-full px-4 flex flex-col items-center text-center pointer-events-none">
        
        {/* Main Typography */}
        <h1 className="flex flex-col items-center leading-tight tracking-tighter mb-10 select-none w-full">
          {/* Top Line: White - Adjusted for hierarchy */}
          <span className="block text-xl min-[375px]:text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg break-keep opacity-90">
            매일 쏟아지는 2,000곡 중
          </span>
          
          {/* Bottom Line: Lime for Emphasis - Forced break on mobile, larger size */}
          <span className="flex flex-col md:block items-center text-4xl min-[375px]:text-5xl md:text-7xl lg:text-8xl font-black text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)] leading-[1.1] md:leading-tight">
             <span className="block md:inline">당신의 노래는</span>
             <span className="block md:inline md:ml-3">어디에 있나요?</span>
          </span>
        </h1>

        {/* Subtext */}
        <div className="flex flex-col items-center gap-1.5 mb-12 select-none">
            <p className="text-gray-300 text-sm md:text-lg font-medium break-keep">
                홍보 없는 음원은 3일 만에 잊혀집니다.
            </p>
            <p className="text-gray-300 text-sm md:text-lg font-medium break-keep">
                당신의 음반 마케팅, <span className="text-lime-400 font-bold">헤마스튜디오</span>와 함께하세요.
            </p>
        </div>

        {/* Action Button - Lime Green */}
        {/* pointer-events-auto re-enables clicking for the button */}
        <div className="pointer-events-auto">
          <a 
            href="#calculator" 
            onClick={scrollToCalculator}
            className="cursor-pointer bg-lime-400 hover:bg-lime-300 text-black font-bold text-lg md:text-xl px-10 py-4 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] flex items-center gap-2"
          >
            내 노래 홍보효과 확인하기
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>

      </div>

    </section>
  );
};

export default Hero;