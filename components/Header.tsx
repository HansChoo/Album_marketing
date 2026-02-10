import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const KAKAO_LINK = "http://pf.kakao.com/_PKavxd/chat";

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer z-50">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-black font-black text-sm">H</div>
            <span className="font-gmarket font-bold text-lg tracking-tight">HEMA<span className="text-lime-400">STUDIO</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['서비스 소개', '가격 정책', '포트폴리오'].map((item) => (
              <a 
                key={item} 
                href={item === '가격 정책' ? '#pricing' : '#'} 
                className="text-sm text-gray-300 hover:text-lime-400 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a 
              href={KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300"
            >
              문의하기
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-black flex items-center justify-center md:hidden">
          <div className="flex flex-col items-center gap-8 text-2xl font-gmarket font-bold animate-fade-in-up">
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">서비스 소개</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">가격 정책</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">포트폴리오</a>
            <a 
              href={KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 mt-4 flex items-center gap-2"
            >
              문의하기 <ArrowUpRight />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;