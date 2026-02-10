import { 
  Music, 
  Mic2, 
  ListMusic, 
  Radio, 
  Video, 
  Smartphone, 
  Share2, 
  BookOpen, 
  Users, 
  TrendingUp,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { ServiceItem, PricingPlan, FaqItem, Testimonial } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: '프로모션 카드 제작',
    description: 'SNS 홍보에 최적화된 고퀄리티 이미지 카드 제작',
    icon: Music,
    // [1번 카드] 앨범 커버 이미지 주소
    images: ['https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop']
  },
  {
    id: '2',
    title: '리릭비디오 제작',
    description: '가사의 감동을 전달하는 타이포그래피 영상',
    icon: Mic2,
    // [2번 카드] 첫번째: 배경 이미지, 두번째: 작은 앨범아트
    images: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=100&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    title: '공식 채널 플레이리스트',
    description: '구독자 보유 자체 채널에 음원 수록',
    icon: ListMusic,
    // [3번 카드] 리스트 썸네일 3개
    images: [
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=150&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=150&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=150&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    title: '대형 인플루언서 플레이리스트',
    description: '유명 음악 큐레이션 채널에 내 노래 소개',
    icon: Radio,
    // [4번 카드] 플레이리스트 배경 이미지
    images: ['https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop']
  },
  {
    id: '5',
    title: '커버타입 뮤직비디오 제작',
    description: '스튜디오에서 가수가 직접 가창하는 고퀄리티 라이브 클립',
    icon: Video,
    // [5번 카드] 가수 가창 장면 이미지
    images: ['https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1200&auto=format&fit=crop']
  },
  {
    id: '6',
    title: '숏폼 광고영상 제작',
    description: '릴스/틱톡/쇼츠 맞춤형 숏폼 콘텐츠 (AI/영화 등)',
    icon: Smartphone,
    // [6번 카드] 숏폼 화면 3개 (왼쪽, 중앙, 오른쪽)
    images: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611605698389-136a32ed10b3?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1592837265436-c0529d33b526?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    id: '7',
    title: '티저/발매알림 업로드',
    description: '인스타그램, 스레드 등 SNS 발매 소식 전파',
    icon: Share2,
    // [7번 카드] 인스타그램 프로필 사진
    images: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=100&auto=format&fit=crop']
  },
  {
    id: '8',
    title: '공식 블로그',
    description: '공식 블로그를 통한 아티스트 심층 소개',
    icon: BookOpen,
    // [8번 카드] 블로그 썸네일 사진
    images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=100&auto=format&fit=crop']
  },
  {
    id: '9',
    title: '인스타그램 & 블로그 기자단',
    description: '다수 인플루언서가 동시에 리뷰 콘텐츠 발행',
    icon: Users,
    // [9번 카드] 첫번째: 리뷰어1 사진, 두번째: 리뷰어2 사진
    images: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=50&auto=format&fit=crop'
    ]
  },
  {
    id: '10',
    title: 'SNS 광고 집행',
    description: '인스타그램/유튜브 타겟 광고 (예산 포함)',
    icon: TrendingUp,
    // [10번 카드] 광고 배경 이미지
    images: ['https://images.unsplash.com/photo-1557838402-282436423848?q=80&w=300&auto=format&fit=crop']
  },
];

export const PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'A. 기본 홍보 패키지',
    subtitle: 'SOFT LAUNCH PACKAGE',
    price: '₩360,000',
    originalPrice: '₩600,000',
    discount: '-40%',
    features: [
      '프로모션 카드 제작',
      '리릭비디오 제작',
      '공식 채널 플레이리스트',
      '대형 플레이리스트 (인플루언서)',
      'SNS 타겟 광고 (8만원 상당)'
    ],
    color: 'lime'
  },
  {
    id: 'content',
    name: 'B. 콘텐츠 확장 패키지',
    subtitle: 'CONTENT EXPANSION',
    price: '₩700,000',
    originalPrice: '₩1,200,000',
    discount: '-42%',
    features: [
      '패키지 A 전체 포함',
      '공식 블로그 포스팅',
      '뮤직비디오 (커버) 제작',
      '인스타/블로그 기자단 (10인)',
      'SNS 타겟 광고 (20만원 상당)'
    ],
    color: 'lime'
  },
  {
    id: 'viral',
    name: 'C. 얼티밋 프로모션',
    subtitle: 'TOTAL VIRAL SOLUTION',
    price: '₩1,300,000',
    originalPrice: '₩2,500,000',
    discount: '-48%',
    features: [
      '패키지 B 전체 포함',
      '티저영상 + 발매알림',
      '숏폼 광고영상 제작',
      '대형 플레이리스트 추가 배포',
      '인스타/블로그 기자단 (30만원)',
      'SNS 타겟 광고 (30만원 상당)'
    ],
    recommended: true,
    color: 'purple'
  },
];

export const FEATURES = [
  {
    title: '합리적인 비용',
    desc: '불필요한 대행 수수료 없이, 합리적인 비용으로 제공합니다.',
    icon: CheckCircle2,
    color: 'text-lime-400'
  },
  {
    title: '바이럴 최적화',
    desc: '밈 활용, AI 기술 등 사람들에게 전파되는 콘텐츠.',
    icon: Zap,
    color: 'text-purple-400'
  },
  {
    title: '검증된 노하우',
    desc: '전인권, 박화요비, TOXIC 등 대형 아티스트 마케팅 경험 보유.',
    icon: ShieldCheck,
    color: 'text-lime-400'
  }
];

// Generating 20 realistic reviews
export const TESTIMONIALS: Testimonial[] = [
  { name: 'K***', role: 'Singer-Songwriter', content: "패키지 B로 진행했는데, 발매 첫 주에 멜론 최신음악 차트인 성공했어요!", rating: 5, image: 'https://picsum.photos/100/100?random=1' },
  { name: '임**', role: 'Rapper', content: "혼자 홍보할 땐 힘들었는데, 마케팅 후 유튜브 조회수 5만 돌파했습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=2' },
  { name: 'J***', role: 'Vocalist', content: "숏폼 영상이 대박 나서 틱톡에서 유입이 엄청 늘었어요. C패키지 강추!", rating: 5, image: 'https://picsum.photos/100/100?random=3' },
  { name: '박**', role: 'Indie Band', content: "리릭 비디오 퀄리티가 기대 이상이었습니다. 팬들 반응도 너무 좋네요.", rating: 5, image: 'https://picsum.photos/100/100?random=4' },
  { name: 'L***', role: 'Producer', content: "예산이 적어서 걱정했는데, 효율적으로 집행해주셔서 감사합니다.", rating: 4, image: 'https://picsum.photos/100/100?random=5' },
  { name: '최**', role: 'Ballad', content: "상담부터 결과 리포트까지 너무 친절하고 전문적이었습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=6' },
  { name: 'A***', role: 'R&B Artist', content: "플레이리스트 효과가 진짜 크네요. 스포티파이 월별 청취자 수가 3배 늘었어요.", rating: 5, image: 'https://picsum.photos/100/100?random=7' },
  { name: '윤**', role: 'Rock Band', content: "저희 음악 색깔에 딱 맞는 인플루언서를 매칭해주셔서 좋았습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=8' },
  { name: 'S***', role: 'Singer', content: "발매일에 맞춰서 딱 터트려주니 초반 화력이 확실히 다르네요.", rating: 5, image: 'https://picsum.photos/100/100?random=9' },
  { name: '김**', role: 'Jazz', content: "재즈 장르라 걱정했는데 타겟팅을 너무 잘 잡아주셨어요.", rating: 5, image: 'https://picsum.photos/100/100?random=10' },
  { name: 'M***', role: 'Hiphop', content: "가성비 최고입니다. 다른 대행사보다 훨씬 꼼꼼해요.", rating: 5, image: 'https://picsum.photos/100/100?random=11' },
  { name: '오**', role: 'Composer', content: "커버 영상 퀄리티가 가수분이랑 너무 잘 어울려서 놀랐습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=12' },
  { name: 'H***', role: 'Pop', content: "다음 앨범도 무조건 헤마스튜디오랑 할 겁니다.", rating: 5, image: 'https://picsum.photos/100/100?random=13' },
  { name: '정**', role: 'Acoustic', content: "블로그 글이 상단 노출되어서 검색 유입이 많아졌어요.", rating: 4, image: 'https://picsum.photos/100/100?random=14' },
  { name: 'T***', role: 'DJ', content: "클럽 씬 홍보도 잘하시네요. 믹스셋 홍보 잘 되었습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=15' },
  { name: '서**', role: 'Indie', content: "처음이라 아무것도 몰랐는데 하나부터 열까지 다 알려주셨어요.", rating: 5, image: 'https://picsum.photos/100/100?random=16' },
  { name: 'D***', role: 'Rap', content: "쇼츠 조회수 10만 찍었습니다. 진짜 감사합니다.", rating: 5, image: 'https://picsum.photos/100/100?random=17' },
  { name: '강**', role: 'Vocal', content: "목소리 톤이랑 잘 맞는 홍보 전략이었습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=18' },
  { name: 'P***', role: 'Band', content: "공연 티켓 판매량까지 덩달아 올랐어요.", rating: 5, image: 'https://picsum.photos/100/100?random=19' },
  { name: '이**', role: 'Folk', content: "진정성 있는 마케팅이라는 느낌을 받았습니다.", rating: 5, image: 'https://picsum.photos/100/100?random=20' },
];

export const FAQS: FaqItem[] = [
  {
    question: "비용은 어떻게 책정되나요?",
    answer: "헤마스튜디오는 불필요한 대행 수수료를 없애고, 내부 인하우스 제작 시스템을 통해 가장 합리적인 가격으로 마케팅 솔루션을 제공합니다."
  },
  {
    question: "환불 규정은 어떻게 되나요?",
    answer: "작업 착수 전에는 100% 환불 가능합니다. 기획 및 디자인 작업이 시작된 후에는 공정률에 따라 금액이 차감되며, 제작 완료 및 광고 집행 후에는 환불이 불가능합니다."
  },
  {
    question: "광고 도달 수치는 보장되나요?",
    answer: "제시된 수치는 평균적인 예상치이며, 콘텐츠의 반응도에 따라 달라질 수 있습니다. 하지만 전문 마케터가 최적의 효율을 낼 수 있도록 지속적으로 모니터링하며 집행합니다."
  },
  {
    question: "작업 기간은 얼마나 걸리나요?",
    answer: "자료 전달 완료일로부터 패키지 A는 3~5일, 패키지 B/C는 1~2주 소요됩니다. 발매일에 맞춰 미리 신청해주시는 것이 좋습니다."
  },
  {
    question: "플레이리스트는 어디에 올라가나요?",
    answer: "헤마스튜디오 자체 채널 및 제휴된 인플루언서 유튜브/스포티파이 플레이리스트에 등재됩니다. 곡의 장르와 분위기에 맞는 채널을 선정합니다."
  },
  {
    question: "기자단은 어떤 방식으로 진행되나요?",
    answer: "음악 전문 블로거 및 인스타그램 인플루언서들이 곡을 듣고 리뷰를 작성하여 배포합니다. 자연스러운 바이럴 효과를 기대할 수 있습니다."
  },
  {
    question: "숏폼 영상은 어떻게 제작되나요?",
    answer: "저작권 문제가 없는 영화 장면이나 AI 생성 영상을 활용하여 곡의 분위기에 맞는 세로형 숏폼 영상을 제작해드립니다."
  },
  {
    question: "상담은 무료인가요?",
    answer: "네, 카카오톡 채널을 통해 1:1 무료 상담이 가능합니다. 내 노래에 맞는 맞춤형 전략을 제안받아보세요."
  },
  {
    question: "결제는 어떻게 하나요?",
    answer: "계좌이체 및 카드 결제 모두 가능합니다. 상담 시 안내해 드립니다."
  }
];