'use client';

export default function EinsteinLogo() {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Geometric Crown/Triangle abstraction */}
        <div className="absolute top-0 w-4 h-4 bg-einstein-blue clip-triangle rotate-180 transform transition-all group-hover:scale-110" 
             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-1 flex gap-1">
          <div className="w-3 h-6 bg-einstein-red rounded-sm" />
          <div className="w-3 h-8 bg-einstein-yellow rounded-sm -translate-y-1" />
          <div className="w-3 h-6 bg-einstein-blue rounded-sm" />
        </div>
      </div>
      <div className="text-center">
        <span className="block text-[10px] font-bold tracking-[0.3em] text-foreground uppercase leading-none">Einstein</span>
        <span className="block text-[8px] font-medium tracking-[0.2em] text-muted-foreground uppercase mt-1 italic font-display">2026</span>
      </div>
    </div>
  );
}
