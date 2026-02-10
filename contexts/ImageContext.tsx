import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES } from '../constants';

interface ImageContextType {
  customImages: Record<string, string[]>;
  fullImageMode: Record<string, boolean>;
  fullImages: Record<string, string>;
  updateImage: (serviceId: string, index: number, url: string) => void;
  toggleFullImageMode: (serviceId: string, isEnabled: boolean) => void;
  updateFullImage: (serviceId: string, url: string) => void;
  resetImages: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// [기본 설정값 적용]
// 모든 서비스(1~10)에 대해 Full Image Mode 활성화
const DEFAULT_FULL_IMAGE_MODE: Record<string, boolean> = {
  "1": true,
  "2": true,
  "3": true,
  "4": true, // 추가됨
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
  "10": true
};

const DEFAULT_FULL_IMAGES: Record<string, string> = {
  "1": "https://i.postimg.cc/SNG4cYkP/프로모션카드.png",
  "2": "https://i.postimg.cc/tCby1NGQ/리릭비디오.jpg",
  "3": "https://i.postimg.cc/FsvmfV5W/공식_플레이리스트.png",
  "4": "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop", // 추가됨 (고해상도)
  "5": "https://i.postimg.cc/9F2V4YHh/뮤직비디오_제작.jpg",
  "6": "https://i.postimg.cc/wTzHtQ8r/숏폼3.png",
  "7": "https://i.postimg.cc/VLw1SWQ2/티저.png",
  "8": "https://i.postimg.cc/8PGDFmQM/공식블로그.png",
  "9": "https://i.postimg.cc/02vx60RC/기자단1.png",
  "10": "https://i.postimg.cc/DfLnyYDP/광고.png"
};

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<Record<string, string[]>>({});
  const [fullImageMode, setFullImageMode] = useState<Record<string, boolean>>(DEFAULT_FULL_IMAGE_MODE);
  const [fullImages, setFullImages] = useState<Record<string, string>>(DEFAULT_FULL_IMAGES);

  // 로컬 스토리지 키 버전 업데이트 (v3) -> 4번 항목 추가 반영을 위해 버전 올림
  const STORAGE_KEYS = {
      CUSTOM_IMAGES: 'hema_custom_images_v3',
      FULL_IMAGE_MODE: 'hema_full_image_mode_v3',
      FULL_IMAGES: 'hema_full_images_v3'
  };

  useEffect(() => {
    const savedImages = localStorage.getItem(STORAGE_KEYS.CUSTOM_IMAGES);
    const savedModes = localStorage.getItem(STORAGE_KEYS.FULL_IMAGE_MODE);
    const savedFullImages = localStorage.getItem(STORAGE_KEYS.FULL_IMAGES);

    if (savedImages) setCustomImages(JSON.parse(savedImages));
    if (savedModes) setFullImageMode(JSON.parse(savedModes));
    if (savedFullImages) setFullImages(JSON.parse(savedFullImages));
  }, []);

  const updateImage = (serviceId: string, index: number, url: string) => {
    setCustomImages(prev => {
      const serviceImages = prev[serviceId] ? [...prev[serviceId]] : [...(SERVICES.find(s => s.id === serviceId)?.images || [])];
      serviceImages[index] = url;
      
      const newImages = { ...prev, [serviceId]: serviceImages };
      localStorage.setItem(STORAGE_KEYS.CUSTOM_IMAGES, JSON.stringify(newImages));
      return newImages;
    });
  };

  const toggleFullImageMode = (serviceId: string, isEnabled: boolean) => {
    setFullImageMode(prev => {
        const newModes = { ...prev, [serviceId]: isEnabled };
        localStorage.setItem(STORAGE_KEYS.FULL_IMAGE_MODE, JSON.stringify(newModes));
        return newModes;
    });
  };

  const updateFullImage = (serviceId: string, url: string) => {
      setFullImages(prev => {
          const newImages = { ...prev, [serviceId]: url };
          localStorage.setItem(STORAGE_KEYS.FULL_IMAGES, JSON.stringify(newImages));
          return newImages;
      });
  };

  const resetImages = () => {
    setCustomImages({});
    setFullImageMode(DEFAULT_FULL_IMAGE_MODE); // 리셋 시에도 디폴트 값 유지
    setFullImages(DEFAULT_FULL_IMAGES);      // 리셋 시에도 디폴트 값 유지
    
    // 로컬 스토리지 삭제
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_IMAGES);
    localStorage.removeItem(STORAGE_KEYS.FULL_IMAGE_MODE);
    localStorage.removeItem(STORAGE_KEYS.FULL_IMAGES);
  };

  return (
    <ImageContext.Provider value={{ 
        customImages, 
        fullImageMode, 
        fullImages, 
        updateImage, 
        toggleFullImageMode, 
        updateFullImage, 
        resetImages 
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};