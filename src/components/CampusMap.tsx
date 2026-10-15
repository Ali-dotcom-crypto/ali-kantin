import React from 'react';
import { CAMPUS_BUILDINGS } from '../data/mockData';
import { CampusBuilding } from '../types';

interface CampusMapProps {
  selectedBuildingId?: string;
  onSelectBuilding?: (building: CampusBuilding) => void;
  courierProgress?: number; // 0 to 1
  isDelivering?: boolean;
  className?: string;
}

export const CampusMap: React.FC<CampusMapProps> = ({
  selectedBuildingId = 'fst',
  onSelectBuilding,
  courierProgress = 0.5,
  isDelivering = false,
  className = '',
}) => {
  const selectedBuilding = CAMPUS_BUILDINGS.find((b) => b.id === selectedBuildingId) || CAMPUS_BUILDINGS[0];
  const canteen = CAMPUS_BUILDINGS.find((b) => b.id === 'sc') || CAMPUS_BUILDINGS[CAMPUS_BUILDINGS.length - 1];

  // Calculate courier position interpolated along a straight/slight bezier route
  const courierX = canteen.coordinates.x + (selectedBuilding.coordinates.x - canteen.coordinates.x) * courierProgress;
  const courierY = canteen.coordinates.y + (selectedBuilding.coordinates.y - canteen.coordinates.y) * courierProgress;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-inner ${className}`}>
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-white text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold tracking-wide">Peta Navigasi Kampus UIN Jakarta</span>
        </div>

        {isDelivering && (
          <div className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold tracking-tight shadow-md flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
            Kurir Bergerak Menuju {selectedBuilding.code}
          </div>
        )}
      </div>

      {/* SVG Canvas Map */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-auto max-h-[380px] object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.8" />
          </pattern>

          {/* Linear gradient for campus roads */}
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Pulse marker glow */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base campus terrain */}
        <rect width="1000" height="600" fill="#0B132B" />
        <rect width="1000" height="600" fill="url(#campus-grid)" />

        {/* Campus Green Park / Taman Tarbiyah */}
        <path
          d="M 320 220 C 370 200, 520 210, 560 270 C 600 330, 480 420, 390 400 C 310 380, 280 250, 320 220 Z"
          fill="#064E3B"
          opacity="0.35"
        />

        {/* Campus Main Walkways / Roads */}
        {/* Horizontal Spine: Jl. Kampus 1 */}
        <path d="M 60 300 Q 500 280 940 320" stroke="url(#roadGrad)" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 60 300 Q 500 280 940 320" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" fill="none" />

        {/* Branch Road to FST & FKIK */}
        <path d="M 500 290 Q 700 220 900 130" stroke="url(#roadGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />

        {/* Branch Road to FEB & FIDIKOM */}
        <path d="M 450 290 Q 550 400 850 480" stroke="url(#roadGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />

        {/* Active Courier Route Dashline if delivering */}
        <path
          d={`M ${canteen.coordinates.x * 10} ${canteen.coordinates.y * 6} Q ${(canteen.coordinates.x + selectedBuilding.coordinates.x) * 5} ${((canteen.coordinates.y + selectedBuilding.coordinates.y) * 3) - 20} ${selectedBuilding.coordinates.x * 10} ${selectedBuilding.coordinates.y * 6}`}
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
        />

        {/* Buildings Nodes */}
        {CAMPUS_BUILDINGS.map((b) => {
          const cx = b.coordinates.x * 10;
          const cy = b.coordinates.y * 6;
          const isSelected = b.id === selectedBuildingId;
          const isCanteen = b.id === 'sc';

          return (
            <g
              key={b.id}
              onClick={() => onSelectBuilding && onSelectBuilding(b)}
              className="cursor-pointer transition-all duration-200 group"
            >
              {/* Target Highlight Ring */}
              {isSelected && !isCanteen && (
                <circle cx={cx} cy={cy} r="32" fill="#F59E0B" opacity="0.2" className="animate-pulse" />
              )}

              {/* Building Footprint Block */}
              <rect
                x={cx - (isCanteen ? 34 : 26)}
                y={cy - (isCanteen ? 22 : 18)}
                width={isCanteen ? 68 : 52}
                height={isCanteen ? 44 : 36}
                rx="6"
                fill={isCanteen ? '#D97706' : isSelected ? '#3B82F6' : '#1E293B'}
                stroke={isSelected ? '#FDE047' : isCanteen ? '#F59E0B' : '#475569'}
                strokeWidth={isSelected ? 3 : 1.5}
                className="transition-colors group-hover:fill-slate-700"
              />

              {/* Building Code Text */}
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize={isCanteen ? "11" : "12"}
                fontWeight="bold"
                fill={isCanteen || isSelected ? '#FFFFFF' : '#CBD5E1'}
                className="font-sans pointer-events-none select-none"
              >
                {isCanteen ? 'KANTIN' : b.code}
              </text>

              {/* Small Tagline Label below building */}
              <text
                x={cx}
                y={cy + 30}
                textAnchor="middle"
                fontSize="9.5"
                fill={isSelected ? '#FDE047' : '#94A3B8'}
                fontWeight="500"
                className="font-sans pointer-events-none select-none"
              >
                {isCanteen ? 'Dapur Ali baput' : b.name.split(' ')[0] + ' ' + (b.name.split(' ')[1] || '')}
              </text>
            </g>
          );
        })}

        {/* Courier Runner Node */}
        {isDelivering && (
          <g transform={`translate(${courierX * 10}, ${courierY * 6})`}>
            <circle cx="0" cy="0" r="16" fill="#F59E0B" filter="url(#glow)" />
            <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
            {/* Courier Motor / Bag icon */}
            <path
              d="M-5 2 L0 -4 L5 2 L-1 2 L-1 5 L-5 5 Z"
              fill="#F59E0B"
            />
          </g>
        )}
      </svg>

      {/* Map Legend / Quick Info Bar */}
      <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-600 border border-amber-400"></span>
            <span>Kantin Tarbiyah (Stan Ali baput)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-600 border border-amber-300"></span>
            <span>Titik Antar: <strong className="text-white">{selectedBuilding.name}</strong></span>
          </div>
        </div>

        <div className="text-slate-400 text-[11px]">
          Estimasi jalan kurir: <strong className="text-amber-400">{selectedBuilding.walkingTimeMinutes} menit</strong>
        </div>
      </div>
    </div>
  );
};
