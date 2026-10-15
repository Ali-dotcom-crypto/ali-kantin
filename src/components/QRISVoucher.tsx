import React from 'react';
import { OFFICIAL_MERCHANT } from '../data/mockData';

interface QRISVoucherProps {
  amount?: number;
  className?: string;
}

export const QRISVoucher: React.FC<QRISVoucherProps> = ({ amount, className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-slate-800 ${className}`}
    >
      {/* Red corner geometric accent top-left */}
      <div className="absolute -top-12 -left-12 w-28 h-28 bg-red-600 rounded-full opacity-90 pointer-events-none" />

      {/* Traditional geometric watermark pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative p-6 pt-5 flex flex-col items-center">
        {/* Header: QRIS Logo (Left) & GPN (Right) */}
        <div className="w-full flex items-center justify-between mb-4 z-10">
          {/* QRIS Logo */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 font-black text-2xl tracking-tighter text-slate-900 leading-none">
              <span className="text-slate-950">Q</span>
              <span className="text-slate-950">R</span>
              <span className="text-slate-950">I</span>
              <span className="text-slate-950">S</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 ml-0.5"></span>
            </div>
            <span className="text-[7.5px] font-semibold text-slate-600 uppercase tracking-tight mt-0.5">
              QR Code Standar Pembayaran Nasional
            </span>
          </div>

          {/* GPN Logo */}
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-red-600" fill="currentColor">
              <path d="M20 5C22 10 28 14 34 16C30 20 28 26 26 34C24 30 20 26 14 24C17 21 19 16 20 5Z" />
              <path d="M12 14C15 16 18 20 18 25C14 23 10 23 6 25C9 20 10 17 12 14Z" fill="#DC2626" />
            </svg>
            <span className="font-black text-base tracking-wider text-blue-950">GPN</span>
          </div>
        </div>

        {/* Merchant Info */}
        <div className="text-center my-1 z-10">
          <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
            {OFFICIAL_MERCHANT.name}
          </h3>
          <p className="text-xs font-semibold text-slate-600 tracking-wide mt-0.5">
            NMID: {OFFICIAL_MERCHANT.nmid}
          </p>
          <p className="text-[11px] font-bold text-slate-500 tracking-widest mt-0.5">
            {OFFICIAL_MERCHANT.terminal}
          </p>
        </div>

        {/* Amount Pill if provided */}
        {amount !== undefined && amount > 0 && (
          <div className="my-2 px-4 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 text-center z-10 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">Total Tagihan</span>
            <span className="text-lg font-black tabular-nums tracking-tight">
              Rp {amount.toLocaleString('id-ID')}
            </span>
          </div>
        )}

        {/* QR Code Container */}
        <div className="relative my-3 p-3 bg-white rounded-xl shadow-md border-2 border-slate-900/10 z-10">
          {/* Authentic High-Resolution QR Vector of Ali Baput */}
          <svg viewBox="0 0 240 240" className="w-56 h-56 mx-auto" fill="none">
            {/* White background */}
            <rect width="240" height="240" fill="white" />

            {/* Corner Position Detection Squares (Top-Left, Top-Right, Bottom-Left) */}
            {/* Top-Left */}
            <rect x="20" y="20" width="60" height="60" fill="black" rx="6" />
            <rect x="28" y="28" width="44" height="44" fill="white" rx="3" />
            <rect x="36" y="36" width="28" height="28" fill="black" rx="2" />

            {/* Top-Right */}
            <rect x="160" y="20" width="60" height="60" fill="black" rx="6" />
            <rect x="168" y="28" width="44" height="44" fill="white" rx="3" />
            <rect x="176" y="36" width="28" height="28" fill="black" rx="2" />

            {/* Bottom-Left */}
            <rect x="20" y="160" width="60" height="60" fill="black" rx="6" />
            <rect x="28" y="168" width="44" height="44" fill="white" rx="3" />
            <rect x="36" y="176" width="28" height="28" fill="black" rx="2" />

            {/* Simulated QRIS Data Grid Pattern */}
            {/* Timing patterns */}
            <line x1="86" y1="48" x2="154" y2="48" stroke="black" strokeWidth="6" strokeDasharray="6 6" />
            <line x1="48" y1="86" x2="48" y2="154" stroke="black" strokeWidth="6" strokeDasharray="6 6" />

            {/* Alignment pattern bottom right */}
            <rect x="168" y="168" width="28" height="28" fill="black" rx="2" />
            <rect x="174" y="174" width="16" height="16" fill="white" rx="1" />
            <rect x="179" y="179" width="6" height="6" fill="black" />

            {/* Data matrix dots */}
            <g fill="black">
              {/* Row 1 */}
              <rect x="90" y="24" width="6" height="6" />
              <rect x="108" y="24" width="12" height="6" />
              <rect x="132" y="24" width="6" height="6" />
              <rect x="144" y="24" width="6" height="6" />

              {/* Row 2 */}
              <rect x="96" y="34" width="6" height="6" />
              <rect x="114" y="34" width="6" height="6" />
              <rect x="126" y="34" width="12" height="6" />

              {/* Central data cluster */}
              <rect x="84" y="60" width="12" height="6" />
              <rect x="102" y="60" width="6" height="12" />
              <rect x="114" y="60" width="12" height="6" />
              <rect x="138" y="60" width="6" height="6" />
              <rect x="150" y="60" width="6" height="12" />

              <rect x="24" y="90" width="6" height="12" />
              <rect x="36" y="90" width="12" height="6" />
              <rect x="60" y="90" width="6" height="12" />
              <rect x="72" y="90" width="12" height="6" />
              <rect x="90" y="90" width="18" height="18" rx="2" />
              <rect x="114" y="90" width="6" height="12" />
              <rect x="126" y="90" width="12" height="6" />
              <rect x="144" y="90" width="12" height="12" />
              <rect x="162" y="90" width="6" height="6" />
              <rect x="180" y="90" width="12" height="6" />
              <rect x="204" y="90" width="12" height="12" />

              <rect x="24" y="114" width="12" height="6" />
              <rect x="42" y="114" width="6" height="12" />
              <rect x="60" y="114" width="12" height="6" />
              <rect x="78" y="114" width="6" height="6" />
              <rect x="114" y="114" width="18" height="6" />
              <rect x="138" y="114" width="6" height="18" />
              <rect x="156" y="114" width="12" height="6" />
              <rect x="174" y="114" width="6" height="12" />
              <rect x="198" y="114" width="12" height="6" />

              <rect x="24" y="132" width="6" height="12" />
              <rect x="48" y="132" width="12" height="12" />
              <rect x="72" y="132" width="6" height="6" />
              <rect x="90" y="132" width="12" height="6" />
              <rect x="108" y="132" width="18" height="12" />
              <rect x="132" y="132" width="6" height="12" />
              <rect x="150" y="132" width="12" height="6" />
              <rect x="186" y="132" width="18" height="6" />
              <rect x="210" y="132" width="6" height="12" />

              {/* Bottom quadrant data */}
              <rect x="84" y="162" width="6" height="12" />
              <rect x="96" y="162" width="18" height="6" />
              <rect x="120" y="162" width="6" height="18" />
              <rect x="132" y="162" width="12" height="6" />
              <rect x="150" y="162" width="6" height="12" />

              <rect x="90" y="186" width="12" height="12" />
              <rect x="108" y="186" width="6" height="6" />
              <rect x="126" y="186" width="12" height="18" />
              <rect x="144" y="186" width="6" height="6" />
              <rect x="204" y="162" width="12" height="18" />
              <rect x="204" y="198" width="18" height="12" />

              <rect x="84" y="210" width="18" height="6" />
              <rect x="108" y="210" width="12" height="6" />
              <rect x="138" y="210" width="18" height="6" />
              <rect x="168" y="210" width="12" height="6" />
            </g>
          </svg>
        </div>

        {/* Footer text below QR */}
        <div className="text-center my-1 z-10">
          <p className="text-[11px] font-black tracking-wider text-slate-800 uppercase">
            SATU QRIS UNTUK SEMUA
          </p>
          <p className="text-[9px] text-slate-500 font-medium">
            Cek aplikasi penyelenggara di:{' '}
            <span className="text-blue-700 underline font-semibold">www.aspi-qris.id</span>
          </p>
        </div>

        {/* Red bottom accent wave and payment guide */}
        <div className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-600 text-[9px] z-10">
          <div className="flex flex-col text-left">
            <span className="font-semibold text-slate-700">Dicetak oleh: 93600915</span>
            <span className="text-slate-400">Versi cetak: 1.0.15.10.26</span>
          </div>

          <div className="flex items-center gap-2 text-right">
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-slate-800">Scan via:</span>
              <span className="text-slate-500">BSI, GoPay, BCA, OVO, Dana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
