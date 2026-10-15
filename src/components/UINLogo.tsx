import React from 'react';

interface UINLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UINLogo: React.FC<UINLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* UIN Syarif Hidayatullah Jakarta Vector Emblem */}
      <div
        className={`${iconSizes[size]} shrink-0 relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0F2942] to-[#1E3A8A] p-1.5 shadow-sm border border-amber-400/30`}
        title="UIN Syarif Hidayatullah Jakarta"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-amber-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle ring */}
          <circle cx="50" cy="50" r="44" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="40" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

          {/* Golden Dome Silhouette */}
          <path
            d="M50 16C50 16 34 26 34 42C34 50 40 54 50 54C60 54 66 50 66 42C66 26 50 16 50 16Z"
            fill="#F59E0B"
            opacity="0.9"
          />

          {/* Dome Spire / Finial */}
          <path d="M50 11V16M48 13H52" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />

          {/* Open Book / Al-Qur'an (Wisdom) at bottom */}
          <path
            d="M50 62L32 54C32 54 36 68 50 74C64 68 68 54 68 54L50 62Z"
            fill="#FDE68A"
          />
          <path
            d="M50 62V74"
            stroke="#0F2942"
            strokeWidth="1.5"
          />

          {/* Star at center dome */}
          <polygon
            points="50,30 52,36 58,36 53,40 55,46 50,42 45,46 47,40 42,36 48,36"
            fill="#0F2942"
          />

          {/* University Arc Text Marker */}
          <path
            d="M30 80C36 84 44 86 50 86C56 86 64 84 70 80"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 tracking-tight text-base md:text-lg">
              Kantin<span className="text-amber-600">Kampus</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-900 text-amber-300 tracking-wider">
              UINJKT
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium tracking-tight">
            UIN Syarif Hidayatullah Jakarta
          </span>
        </div>
      )}
    </div>
  );
};
