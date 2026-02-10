import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SERVICES } from '../constants';
import { ServiceItem } from '../types';
import { Play, Clapperboard, Settings, Maximize2, X, ChevronRight, Sparkles, Trophy, MousePointer2, ExternalLink } from 'lucide-react';
import { useImages } from '../contexts/ImageContext';

// [스마트 프레임 컴포넌트]
const SmartImage = ({ src, alt = "", className = "", imgClass = "" }: { src: string, alt?: string, className?: string, imgClass?: string }) => (
  <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
     <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 blur-xl scale-125"
        style={{ backgroundImage: `url(${src})` }}
     ></div>
     <img 
        src={src} 
        alt={alt} 
        className={`absolute inset-0 w-full h-full object-contain z-10 ${imgClass}`} 
     />
  </div>
);

// 각 서비스별 고유 컬러 정의 (이전 디자인 스타일로 복구: 투명도 포함)
const SERVICE_COLORS = [
  { border: 'border-lime-500/30', text: 'text-lime-400', bg: 'bg-lime-500/5', hoverBg: 'group-hover:bg-lime-500/10', glow: 'group-hover:shadow-lime-400/40', hoverBorder: 'group-hover:border-lime-400' }, 
  { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/5', hoverBg: 'group-hover:bg-teal-500/10', glow: 'group-hover:shadow-teal-400/40', hoverBorder: 'group-hover:border-teal-400' },
  { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/5', hoverBg: 'group-hover:bg-cyan-500/10', glow: 'group-hover:shadow-cyan-400/40', hoverBorder: 'group-hover:border-cyan-400' },
  { border: 'border-sky-500/30', text: 'text-sky-400', bg: 'bg-sky-500/5', hoverBg: 'group-hover:bg-sky-500/10', glow: 'group-hover:shadow-sky-400/40', hoverBorder: 'group-hover:border-sky-400' },
  { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/5', hoverBg: 'group-hover:bg-blue-500/10', glow: 'group-hover:shadow-blue-400/40', hoverBorder: 'group-hover:border-blue-400' },
  { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/5', hoverBg: 'group-hover:bg-indigo-500/10', glow: 'group-hover:shadow-indigo-400/40', hoverBorder: 'group-hover:border-indigo-400' },
  { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/5', hoverBg: 'group-hover:bg-violet-500/10', glow: 'group-hover:shadow-violet-400/40', hoverBorder: 'group-hover:border-violet-400' },
  { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/5', hoverBg: 'group-hover:bg-purple-500/10', glow: 'group-hover:shadow-purple-400/40', hoverBorder: 'group-hover:border-purple-400' },
  { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/5', hoverBg: 'group-hover:bg-fuchsia-500/10', glow: 'group-hover:shadow-fuchsia-400/40', hoverBorder: 'group-hover:border-fuchsia-400' },
  { border: 'border-pink-500/30', text: 'text-pink-400', bg: 'bg-pink-500/5', hoverBg: 'group-hover:bg-pink-500/10', glow: 'group-hover:shadow-pink-400/40', hoverBorder: 'group-hover:border-pink-400' },
];

const ServiceLineup: React.FC = () => {
  const { customImages, fullImageMode, fullImages } = useImages();
  
  // State
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Mobile Check State
  const requestRef = useRef<number>(0);
  
  // 반응형 체크
  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // 초기 실행
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D Sphere Math Constants (Responsive)
  // [모바일/PC 최적화 유지] Y축 반경을 줄여서 위아래 섹션 침범 방지
  // PC: 50, Mobile: 40
  const RADIUS_X = isMobile ? 160 : 450; 
  const RADIUS_Y = isMobile ? 40 : 50; 
  const RADIUS_Z = isMobile ? 120 : 200; 
  const ITEM_COUNT = SERVICES.length;

  const initialPositions = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return SERVICES.map((_, i) => {
        // [수정] 0과 1 (양극단)을 피하기 위해 오프셋을 주어 계산
        // 기존: 1 - (i / (ITEM_COUNT - 1)) * 2; -> 맨 처음과 맨 끝이 정확히 극점에 위치하여 X,Z 회전이 안됨
        // 변경: 1 - ((i + 0.5) / ITEM_COUNT) * 2; -> 극점을 피해 모든 아이콘이 궤도를 돔
        const y = 1 - ((i + 0.5) / ITEM_COUNT) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY * RADIUS_X;
        const yPos = y * RADIUS_Y;
        const z = Math.sin(theta) * radiusAtY * RADIUS_Z;

        return { x, y: yPos, z };
    });
  }, [ITEM_COUNT, RADIUS_X, RADIUS_Y, RADIUS_Z]);

  // Animation Loop
  const animate = useCallback(() => {
    if (!isPaused && selectedIndex === null) {
      setRotation(prev => ({
        x: (prev.x + 0.001) % (Math.PI * 2),
        y: (prev.y + 0.002) % (Math.PI * 2)
      }));
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isPaused, selectedIndex]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // 3D Rotation Helper
  const getProjectedPosition = (x: number, y: number, z: number, rotX: number, rotY: number) => {
    let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
    let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
    let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);

    const scale = 1000 / (1000 - z2);
    const alpha = (z2 + RADIUS_Z) / (2 * RADIUS_Z); 

    return {
        x: x1,
        y: y1,
        z: z2,
        scale: scale,
        opacity: Math.max(0.2, Math.min(1, alpha + 0.3)),
        zIndex: Math.floor(z2)
    };
  };

  const getImg = (serviceId: string, index: number) => {
    const service = SERVICES.find(s => s.id === serviceId);
    return customImages[serviceId]?.[index] || service?.images?.[index] || '';
  };

  // [Detail View Renderer]
  const renderDetailContent = (service: ServiceItem) => {
    const { id } = service;
    const isFullMode = fullImageMode[id];
    const fullImgUrl = fullImages[id];
    const isBottomLayout = ['1', '3', '6', '7', '8', '9'].includes(id);

    const renderInnerVisual = () => {
        switch(service.id) {
            case '1':
                return (
                <div className="w-full h-full relative flex items-center justify-center pt-2 md:pt-6 pb-2">
                    <div className="relative w-28 aspect-[4/5] bg-zinc-100 rounded shadow-2xl overflow-hidden transform rotate-[-3deg] border border-white/20">
                        <SmartImage src={getImg(service.id, 0)} className="absolute inset-0 w-full h-full" />
                        <div className="absolute inset-0 bg-black/30 z-20"></div>
                        <div className="absolute inset-0 p-3 flex flex-col justify-between z-30">
                            <div className="flex justify-between items-start">
                                <div className="bg-lime-400 text-black text-[6px] font-black px-1 py-0.5 rounded-sm uppercase">New</div>
                                <div className="text-white font-mono text-[6px] tracking-widest opacity-80">OCT 24</div>
                            </div>
                            <div className="text-center">
                                <div className="text-white text-[8px] font-light tracking-[0.2em] uppercase mb-0.5">Single</div>
                                <div className="text-white text-xl font-black leading-none tracking-tighter uppercase drop-shadow-md">Night<br/>Drive</div>
                            </div>
                        </div>
                    </div>
                </div>
                );
            case '2':
                return (
                <div className="w-full h-full bg-zinc-950 rounded-lg flex flex-col items-center justify-center relative overflow-hidden border border-zinc-800">
                    <div className="absolute inset-0 bg-cover opacity-20 blur-sm" style={{ backgroundImage: `url(${getImg(service.id, 0)})` }}></div>
                    <div className="z-10 w-full px-4 flex flex-col items-center">
                        <div className="w-14 h-14 bg-zinc-800 rounded shadow-2xl mb-3 border border-zinc-700/50 relative overflow-hidden">
                            <SmartImage src={getImg(service.id, 1)} className="w-full h-full" />
                        </div>
                        <div className="space-y-1 text-center w-full">
                            <p className="text-white font-bold text-sm drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse break-keep">우리 추억마저 흐릿해져</p>
                        </div>
                    </div>
                </div>
                );
            case '3':
                return (
                <div className="w-full h-full bg-white rounded-lg flex flex-col overflow-hidden border border-zinc-200 relative">
                    <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="px-3 pt-3 pb-2 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 shadow-inner">
                            <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center text-black font-black text-[9px]">H</div>
                        </div>
                        <div className="min-w-0">
                            <div className="text-[11px] font-bold text-zinc-900 truncate">Official HEMA</div>
                        </div>
                    </div>
                    <div className="flex-1 px-2 space-y-1">
                        {[0, 1].map((i) => (
                            <div key={i} className="flex items-center gap-2 p-1.5 rounded bg-zinc-50">
                                <div className="relative w-12 aspect-video rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-zinc-100">
                                    <SmartImage src={getImg(service.id, i)} className="w-full h-full" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[9px] font-bold text-zinc-800 truncate">Video Title {i+1}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                );
            case '6':
                return (
                <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-zinc-800">
                    <SmartImage src={getImg(service.id, 0)} className="absolute inset-0 w-full h-full opacity-50" />
                    <div className="z-10 text-white text-center">
                        <Clapperboard size={24} className="mx-auto mb-2" />
                        <span className="text-xs font-bold">Shorts</span>
                    </div>
                </div>
                );
            case '4':
            case '5':
                 return (
                    <div className="w-full h-full relative overflow-hidden rounded-lg bg-zinc-900 group">
                        <SmartImage src={getImg(service.id, 0)} className="absolute inset-0 w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>
                        <div className="absolute inset-0 flex items-center justify-center z-30">
                            <Play className="fill-white text-white w-8 h-8 opacity-80" />
                        </div>
                    </div>
                 );
            default:
                return (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded-lg border border-zinc-700">
                        <service.icon className="text-zinc-500 w-12 h-12" />
                    </div>
                );
        }
    };

    if (isFullMode && fullImgUrl) {
        return (
            <div className="w-full h-full bg-zinc-950 relative overflow-hidden rounded-3xl border border-zinc-700 shadow-2xl animate-fade-in">
                 <div className="absolute inset-0 z-0 bg-cover bg-center blur-2xl opacity-40" style={{ backgroundImage: `url(${fullImgUrl})` }}></div>
                 <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                    <img src={fullImgUrl} alt={service.title} className="w-full h-full object-contain drop-shadow-2xl" />
                 </div>
                 {(id === '4' || id === '5') && (
                     <div className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none">
                         <div className="absolute inset-0 flex items-center justify-center pb-8"> 
                            <div className="w-16 h-11 bg-[#FF0000] rounded-[20%] flex items-center justify-center shadow-lg">
                                <Play className="fill-white text-white w-5 h-5 ml-0.5" />
                            </div>
                         </div>
                         <div className="bg-gradient-to-t from-black/90 via-black/80 to-transparent pt-12 pb-5 px-5">
                            <div className="w-full h-[3px] bg-white/30 relative mb-3">
                                <div className="absolute h-full w-[35%] bg-[#FF0000]"></div>
                            </div>
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-3">
                                   <Play size={12} className="fill-white" />
                                   <div className="text-[10px] font-sans opacity-80">2:14 / 4:10</div>
                                </div>
                                <div className="flex items-center gap-3 opacity-90">
                                    <Settings size={14} />
                                    <Maximize2 size={14} />
                                </div>
                            </div>
                         </div>
                     </div>
                 )}
                 <div className={`absolute inset-0 z-30 pointer-events-none flex flex-col p-6 ${isBottomLayout ? 'justify-end' : 'justify-start'}`}>
                        <div className={`absolute inset-0 z-[-1] transition-opacity duration-300 ${isBottomLayout ? 'bg-gradient-to-t from-black/95 via-black/60 to-transparent h-2/3 top-auto bottom-0' : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent h-2/3'}`}></div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <service.icon strokeWidth={2} className="w-5 h-5 text-lime-400" />
                            </div>
                            <h3 className="text-2xl font-black uppercase leading-none tracking-tight text-white drop-shadow-xl shadow-black break-keep">{service.title}</h3>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-zinc-300 line-clamp-3 drop-shadow-md shadow-black break-keep pl-1">{service.description}</p>
                 </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl p-6 flex flex-col animate-fade-in relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-20"><service.icon size={100} className="text-white" /></div>
             <div className="flex justify-between items-start mb-4 relative z-10"><service.icon strokeWidth={1.5} className="w-8 h-8 text-lime-400" /></div>
             <div className="flex-1 mb-4 relative z-10 flex flex-col justify-center min-h-0 bg-black/50 rounded-xl overflow-hidden border border-zinc-800">{renderInnerVisual()}</div>
             <div className="relative z-10">
                <h3 className="text-xl font-bold uppercase leading-tight tracking-tight mb-2 text-white">{service.title}</h3>
                <p className="text-sm font-medium text-zinc-400 break-keep">{service.description}</p>
             </div>
        </div>
    );
  };

  return (
    <section className="min-h-[900px] md:h-[1000px] bg-black relative overflow-hidden flex flex-col items-center justify-start font-sans perspective-container pt-16 md:pt-20">
      {/* 1. Background Ambience (Deep Space) */}
      <div className="absolute inset-0 bg-black pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black"></div>
          {/* Subtle Grid - very faint */}
          <div className="absolute inset-0 opacity-10" 
             style={{ 
                 backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                 backgroundSize: '80px 80px' 
             }}>
          </div>
      </div>
      
      {/* 2. Text Content (Fixed Top Position) */}
      <div className={`relative w-full text-center z-20 transition-all duration-700 px-4 mb-8 ${selectedIndex !== null ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <Sparkles size={12} className="text-lime-400" />
            <span className="text-[10px] md:text-xs font-medium text-zinc-300 tracking-widest uppercase">Premium Marketing Solutions</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none">
             SERVICE<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">Line UP</span>
        </h2>
        
        {/* NEW Highlighted Copy */}
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-zinc-500"></div>
                <div className="flex items-center gap-1.5 border border-lime-400/30 bg-lime-400/10 rounded-full px-3 py-0.5">
                    <Trophy size={10} className="text-lime-400" />
                    <span className="text-[10px] md:text-xs font-bold text-lime-400 uppercase tracking-widest">10 Ways to Success</span>
                </div>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-zinc-500"></div>
            </div>
            {/* Removed the Korean promo text here */}
        </div>

        {/* [NEW] Explicit Click Instruction */}
        <div className="mt-6 flex items-center justify-center gap-2 animate-bounce">
           <MousePointer2 size={16} className="text-lime-400 fill-lime-400/20" />
           <span className="text-sm text-lime-400 font-bold underline decoration-wavy underline-offset-4 cursor-pointer">
             아이콘을 클릭하여 상세 포트폴리오를 확인하세요
           </span>
        </div>
      </div>

      {/* 3. Service Legend Box (Colorful Module Grid) - Clickable & Always Visible */}
      <div className={`relative z-20 max-w-6xl mx-auto px-4 w-full mb-8 md:mb-16 transition-all duration-500 ${selectedIndex !== null ? 'opacity-0 pointer-events-none translate-y-[-20px]' : 'opacity-100'}`}>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-3 md:p-6 shadow-xl relative z-30">
             <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {SERVICES.map((service, idx) => {
                    const isHovered = hoveredServiceId === service.id;
                    const colorSet = SERVICE_COLORS[idx % SERVICE_COLORS.length];

                    return (
                        <div 
                            key={service.id}
                            onClick={() => setSelectedIndex(idx)} // Add Click Handler
                            className={`group relative flex flex-row items-center gap-2 md:gap-3 p-2 md:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden 
                                ${colorSet.border} ${colorSet.bg} 
                                ${isHovered ? `scale-[1.02] ${colorSet.hoverBorder} ${colorSet.hoverBg}` : ''}`}
                            onMouseEnter={() => setHoveredServiceId(service.id)}
                            onMouseLeave={() => setHoveredServiceId(null)}
                        >
                            {/* Icon Container - Always Colorful */}
                            <div className={`relative z-10 p-1.5 md:p-2 rounded-lg bg-black/60 border border-zinc-800 transition-colors duration-300 ${isHovered ? `border-${colorSet.text.split('-')[1]}-500` : ''}`}>
                                <service.icon size={16} strokeWidth={2} className={`transition-colors duration-300 ${colorSet.text}`} />
                            </div>

                            {/* Text Content */}
                            <div className="relative z-10 flex flex-col items-start min-w-0 flex-1">
                                <span className={`text-[9px] md:text-[10px] font-mono mb-0.5 transition-colors duration-300 ${colorSet.text} opacity-80`}>
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className={`text-[11px] md:text-sm font-bold whitespace-nowrap truncate w-full transition-colors duration-300 text-zinc-200 group-hover:text-white tracking-tighter md:tracking-normal`}>
                                    {service.title}
                                </span>
                            </div>

                            {/* Hover "View" Text */}
                            <div className={`absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                <ExternalLink size={12} className={colorSet.text} />
                            </div>

                            {/* Active Glow Effect on Box (Hover only for intensity) */}
                            <div className={`absolute inset-0 rounded-xl transition-shadow duration-300 pointer-events-none ${isHovered ? `shadow-lg ${colorSet.glow}` : ''}`}></div>
                        </div>
                    );
                })}
             </div>
          </div>
      </div>

      {/* 4. 3D Floating Sphere Container with Holographic Stage */}
      {/* UPDATED: Added pb-32 for mobile spacing to prevent overlap with next section */}
      <div className={`relative w-full max-w-full flex-1 flex flex-col items-center justify-center transition-all duration-700 pt-8 pb-32 md:py-8 ${selectedIndex !== null ? 'scale-150 blur-lg opacity-20 pointer-events-none' : 'scale-100 opacity-100'}`}>
         
         {/* Holographic Orbit Stage Background */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 flex items-center justify-center">
             {/* Radial Floor Glow */}
             <div className="absolute w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(50,70,90,0.15)_0%,transparent_70%)] blur-3xl transform rotate-12"></div>
             
             {/* Outer Ring (Slow Rotate) */}
             <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-white/5 opacity-50 animate-spin-slow-reverse"
                  style={{ transform: 'rotateX(70deg)' }}></div>
             
             {/* Inner Ring (Dashed, Faster Rotate) */}
             <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-white/10 opacity-70 animate-spin-slow"
                  style={{ transform: 'rotateX(70deg)' }}></div>

            {/* Central Axis Glow */}
            <div className="absolute w-1 h-[200px] bg-gradient-to-b from-transparent via-white/10 to-transparent blur-sm"></div>
         </div>

         {/* Floating Icons */}
         {SERVICES.map((service, index) => {
            const pos = initialPositions[index];
            const projected = getProjectedPosition(pos.x, pos.y, pos.z, rotation.x, rotation.y);
            const isHovered = hoveredServiceId === service.id;
            const colorSet = SERVICE_COLORS[index % SERVICE_COLORS.length];
            
            const scaleMultiplier = isHovered ? 1.5 : 1;
            const zIndexModifier = isHovered ? 100 : 0;
            
            // Active Styles
            const activeBorder = isHovered ? `border-${colorSet.text.split('-')[1]}-400` : 'border-white/10';
            const activeBg = isHovered ? 'bg-zinc-800/90' : 'bg-zinc-900/40';
            const activeShadow = isHovered ? `shadow-[0_0_40px_rgba(var(--${colorSet.text.split('-')[1]}-400),0.5)]` : 'shadow-[0_0_15px_rgba(0,0,0,0.5)]';
            
            // [수정] 호버 시 아이콘 색상을 흰색으로 변경 (색상 주입 X)
            const iconColor = isHovered ? 'text-white' : 'text-zinc-400';

            return (
                <div
                    key={service.id}
                    className="absolute group cursor-pointer transition-transform duration-300 ease-out will-change-transform z-10"
                    style={{
                        transform: `translate3d(${projected.x}px, ${projected.y}px, 0) scale(${projected.scale * scaleMultiplier})`,
                        zIndex: projected.zIndex + zIndexModifier,
                        opacity: projected.opacity
                    }}
                    onClick={() => setSelectedIndex(index)}
                    onMouseEnter={() => {
                        setIsPaused(true);
                        setHoveredServiceId(service.id);
                    }}
                    onMouseLeave={() => {
                        setIsPaused(false);
                        setHoveredServiceId(null);
                    }}
                >
                    {/* The Orb */}
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${activeBorder} ${activeBg} ${activeShadow}`}>
                        {/* Inner Gradient */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                        
                        {/* Icon */}
                        <service.icon 
                            className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${iconColor}`} 
                            strokeWidth={1.5}
                        />

                        {/* Orbiting Dot (Decoration) */}
                        <div className={`absolute inset-[-4px] rounded-full border border-transparent transition-all duration-500 animate-spin-slow ${isHovered ? `border-${colorSet.text.split('-')[1]}-400/30` : ''}`}></div>
                    </div>

                    {/* Tooltip on Hover - UPDATED with "Click to View" */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 transition-opacity duration-300 pointer-events-none whitespace-nowrap flex flex-col items-center gap-1 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <span className={`text-[10px] font-bold text-black px-2 py-1 rounded backdrop-blur-sm tracking-wider ${isHovered ? `bg-${colorSet.text.split('-')[1]}-400` : 'bg-white'}`}>
                            {service.title}
                        </span>
                        <span className="text-[8px] text-zinc-400 font-medium tracking-wide bg-black/50 px-1.5 py-0.5 rounded-full border border-white/10">Click to View</span>
                    </div>
                </div>
            );
         })}
      </div>

      {/* 5. Detail Modal Overlay */}
      {selectedIndex !== null && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                onClick={() => setSelectedIndex(null)}
              ></div>
              <div className="relative w-full max-w-md aspect-[4/5] md:max-w-xl md:aspect-square md:h-[600px] shadow-2xl z-50">
                  <button 
                    onClick={() => setSelectedIndex(null)}
                    className="absolute -top-12 right-0 md:-right-12 text-zinc-500 hover:text-white transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm border border-white/10"
                  >
                      <X size={24} />
                  </button>
                  
                  {renderDetailContent(SERVICES[selectedIndex])}

                  <button 
                     onClick={(e) => {
                         e.stopPropagation();
                         setSelectedIndex((prev) => (prev! + 1) % ITEM_COUNT);
                     }}
                     className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 p-3 bg-zinc-900/50 rounded-full hover:bg-lime-400 hover:text-black text-white transition-all hidden md:block border border-zinc-700 hover:border-lime-400 backdrop-blur-sm"
                  >
                      <ChevronRight size={24} />
                  </button>
              </div>
          </div>
      )}
    </section>
  );
};

export default ServiceLineup;