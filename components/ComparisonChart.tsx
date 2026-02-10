import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { name: '개인 업로드', reach: 2400 },
  { name: '해마스튜디오', reach: 100000 },
];

const ComparisonChart: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                    홍보 유무에 따른<br/>
                    <span className="text-lime-400">도달률 차이</span>
                </h2>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>개인 업로드 (홍보 X)</span>
                            <span>Avg. 100회 미만</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full">
                            <div className="w-[5%] h-full bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm text-white font-bold mb-2">
                            <span>해마스튜디오 솔루션 (Package C)</span>
                            <span className="text-lime-400">1,000,000+ 회 노출</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-4 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-green-600 w-full rounded-full shadow-[0_0_15px_rgba(163,230,53,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 h-80 relative overflow-hidden">
                <div className="absolute top-4 left-4 text-xs font-mono text-gray-500">LAST 7 DAYS</div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                     <div className="text-center">
                        <div className="text-5xl font-black text-white drop-shadow-lg mb-1">1,000,000</div>
                        <div className="text-lime-400 font-bold text-sm tracking-widest">Estimated Reach</div>
                     </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <Bar dataKey="reach" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 1 ? '#a3e635' : '#3f3f46'} fillOpacity={index === 1 ? 0.8 : 0.3} />
                        ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                {/* Background Grid Simulation */}
                <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1, pointerEvents: 'none' }}></div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default ComparisonChart;
