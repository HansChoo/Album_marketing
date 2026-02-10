import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-zinc-950 border-y border-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Force 3 columns on all screens, use horizontal dividers only */}
        <div className="grid grid-cols-3 gap-2 md:gap-8 divide-x divide-zinc-800/50">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-1 md:px-6 py-2 hover:bg-zinc-900/30 transition-colors rounded-2xl">
              {/* Icon Container: Compact on mobile */}
              <div className={`mb-3 md:mb-6 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-zinc-900 border border-zinc-800 ${feature.color} shadow-lg shadow-black/50`}>
                <feature.icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2} />
              </div>
              
              {/* Text: Reverted to smaller size for mobile, kept break-keep */}
              <h3 className="text-xs md:text-lg font-bold text-white mb-1.5 md:mb-3 break-keep leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-[10px] md:text-sm leading-tight md:leading-relaxed break-keep">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;