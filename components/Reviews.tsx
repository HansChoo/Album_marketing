import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-zinc-900 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-lime-900/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">함께 성장한 아티스트</h2>
            <p className="text-gray-400">헤마스튜디오와 함께한 실제 아티스트들의 후기입니다.</p>
        </div>
      </div>

      {/* Rolling Marquee Container */}
      <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
          
          <div className="flex w-max animate-marquee gap-6 px-6">
            {/* Render items twice to create seamless loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((review, i) => (
                <div key={i} className="w-[350px] bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 hover:border-lime-500/30 transition-colors group flex-shrink-0">
                <Quote className="text-zinc-700 mb-6 w-8 h-8 group-hover:text-lime-400 transition-colors" />
                <p className="text-gray-300 text-sm leading-relaxed mb-8 h-20 line-clamp-3">
                    "{review.content}"
                </p>
                
                <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                        <img src={review.image} alt={review.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">{review.name}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{review.role}</p>
                    </div>
                    </div>
                    <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-lime-400 text-lime-400" />
                    ))}
                    </div>
                </div>
                </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Reviews;