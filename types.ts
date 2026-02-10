import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  images?: string[]; // 여기에 이미지 주소들을 담습니다.
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  recommended?: boolean;
  color: 'lime' | 'purple';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}