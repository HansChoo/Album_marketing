import React, { useState } from 'react';
import { Settings, X, RotateCcw, ImageIcon, Copy, Check, ToggleRight, ToggleLeft } from 'lucide-react';
import { useImages } from '../contexts/ImageContext';
import { SERVICES } from '../constants';

const ImageConfigurator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { 
    customImages, 
    updateImage, 
    resetImages, 
    fullImageMode, 
    fullImages, 
    toggleFullImageMode, 
    updateFullImage 
  } = useImages();

  // 서비스별로 필요한 이미지 개수 정의
  const getImageCount = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    return service?.images?.length || 0;
  };

  const handleExport = () => {
    // 모든 설정 상태를 내보냅니다.
    const exportData = JSON.stringify({
        customImages,
        fullImageMode,
        fullImages
    }, null, 2);
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(exportData).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            alert("모든 설정값이 복사되었습니다!\n\n채팅창에 붙여넣기(Ctrl+V)해서 알려주시면,\n이 설정대로 웹사이트를 고정하고 톱니바퀴 버튼을 없애드리겠습니다.");
        });
    } else {
        alert("아래 내용을 복사해서 알려주세요:\n\n" + exportData);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-lime-400 text-black p-3 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:scale-110 transition-transform cursor-pointer"
        title="이미지 변경하기"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <div className="flex items-center gap-2">
            <ImageIcon className="text-lime-400" size={20} />
            <h3 className="font-bold text-white text-lg">이미지 커스텀 설정</h3>
          </div>
          <div className="flex gap-2">
             <button 
              onClick={() => {
                if(window.confirm('모든 이미지를 초기 상태로 되돌리시겠습니까?')) {
                    resetImages();
                }
              }}
              className="text-xs bg-zinc-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
            >
              <RotateCcw size={12} /> 초기화
            </button>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar bg-zinc-950">
          
          <div className="bg-lime-900/20 border border-lime-500/20 p-4 rounded-xl flex flex-col gap-3">
             <div className="flex items-start gap-3">
                <div className="bg-lime-500/10 p-2 rounded-lg">
                    <Settings className="text-lime-400" size={20} />
                </div>
                <div>
                    <h4 className="text-lime-400 font-bold text-sm mb-1">안내사항</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                        각 카드마다 <strong>[전체 이미지 사용]</strong> 스위치를 켜면 이미지가 <strong>카드 전체를 가득 채우며(Cover)</strong> 적용되고, 텍스트 정보가 그 위에 표시됩니다.<br/>
                        설정이 끝나면 맨 아래 <strong>[설정값 복사하기]</strong>를 눌러 저에게 전달해주세요.
                    </p>
                </div>
             </div>
          </div>

          {SERVICES.map((service) => {
            const count = getImageCount(service.id);
            const isFullMode = fullImageMode[service.id] || false;
            const fullImg = fullImages[service.id] || '';

            return (
              <div key={service.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <service.icon size={16} className="text-lime-400" />
                        <h4 className="font-bold text-gray-200 text-sm">{service.title}</h4>
                    </div>
                </div>

                <div className={`p-3 rounded-lg border transition-all ${isFullMode ? 'bg-lime-900/10 border-lime-500/30' : 'bg-black/30 border-transparent'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold ${isFullMode ? 'text-lime-400' : 'text-zinc-500'}`}>
                            {isFullMode ? '● 전체 이미지 모드 (배경 적용)' : '○ 부분 이미지 모드 (기존 디자인)'}
                        </span>
                        <button 
                            onClick={() => toggleFullImageMode(service.id, !isFullMode)}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            {isFullMode ? 
                                <ToggleRight size={28} className="text-lime-400" /> : 
                                <ToggleLeft size={28} className="text-zinc-600" />
                            }
                        </button>
                    </div>

                    {isFullMode ? (
                        <div className="animate-fade-in space-y-3">
                             <div className="flex gap-3 items-start">
                                <div className="w-12 h-12 bg-black rounded-md overflow-hidden shrink-0 border border-zinc-700">
                                    {fullImg && <img src={fullImg} alt="Full" className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1">
                                    <label className="text-[10px] text-lime-400 uppercase font-bold mb-1 block">
                                        FULL CARD IMAGE URL
                                    </label>
                                    <input 
                                        type="text" 
                                        value={fullImg}
                                        onChange={(e) => updateFullImage(service.id, e.target.value)}
                                        placeholder="https://... (배경으로 깔릴 이미지 주소)"
                                        className="w-full bg-black border border-lime-500/30 rounded px-3 py-2 text-xs text-white focus:border-lime-400 focus:outline-none transition-colors font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 animate-fade-in">
                            {count > 0 ? Array.from({ length: count }).map((_, idx) => {
                                const currentVal = customImages[service.id]?.[idx] || service.images?.[idx] || '';
                                return (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <div className="w-12 h-12 bg-black rounded-md overflow-hidden shrink-0 border border-zinc-700">
                                            <img src={currentVal} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">
                                                Image {idx + 1} URL
                                            </label>
                                            <input 
                                                type="text" 
                                                value={currentVal}
                                                onChange={(e) => updateImage(service.id, idx, e.target.value)}
                                                placeholder="https://..."
                                                className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-xs text-white focus:border-lime-400 focus:outline-none transition-colors font-mono"
                                            />
                                        </div>
                                    </div>
                                );
                            }) : (
                                <p className="text-xs text-zinc-500 italic p-2">이 모드에서는 변경할 수 있는 이미지가 없습니다.</p>
                            )}
                        </div>
                    )}
                </div>
              </div>
            );
          })}

          {/* Export Button Section */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button 
                onClick={handleExport}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    copied 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                    : 'bg-lime-400 hover:bg-lime-300 text-black shadow-lg shadow-lime-400/20'
                }`}
              >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? '복사 완료!' : '설정값 복사하기'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConfigurator;