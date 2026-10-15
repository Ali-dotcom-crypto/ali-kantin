import React, { useState } from 'react';
import { Utensils, Coffee, MapPin, Sparkles, Clock, ShieldCheck, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MenuCard } from './MenuCard';
import { OrderTrackingView } from './OrderTrackingView';
import { CampusMap } from './CampusMap';
import { OFFICIAL_MERCHANT } from '../data/mockData';

export const MahasiswaView: React.FC = () => {
  const {
    menuItems,
    deliveryLocation,
    setIsLocationModalOpen,
    activeOrder,
    setIsSupportModalOpen,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'makanan' | 'minuman'>('all');
  const [showOrderTracker, setShowOrderTracker] = useState(true);

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-8">
      {/* 1. Hero Campaign Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2942] via-[#1E3A8A] to-[#0A1A2F] text-white p-6 sm:p-10 shadow-lg border border-amber-400/20">
        {/* Subtle decorative circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
              Stan Resmi UIN Jakarta
            </span>
            <span className="text-xs text-amber-200/90 font-medium">
              Kantin Student Center Lt. 1 · Buka 07.30 - 17.00 WIB
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-display">
            Pesan Kuliner Kampus <span className="text-amber-400">Tanpa Antre</span>, Diantar Langsung ke Ruang Kuliah.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
            Solusi praktis istirahat kuliah sempit di UIN Jakarta. Nikmati renyahnya ayam goreng bawang putih dan aneka sambal khas <strong className="text-amber-300 font-bold">Ali baput</strong> dengan pembayaran QRIS / transfer BSI kilat.
          </p>

          {/* Location Drop-off Callout Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-amber-200 uppercase font-bold tracking-wider block">
                  Lokasi Pengantaran Anda di Kampus
                </span>
                <span className="text-xs sm:text-sm font-black text-white truncate block">
                  {deliveryLocation.buildingName} · Lt. {deliveryLocation.floor} ({deliveryLocation.room})
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer text-center"
            >
              Ubah Titik Antar
            </button>
          </div>
        </div>
      </section>

      {/* 2. Live Order Tracking Widget (if active) */}
      {activeOrder && activeOrder.status !== 'SELESAI' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Status Pesanan Sedang Berlangsung</span>
            </h2>
            <button
              onClick={() => setShowOrderTracker(!showOrderTracker)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>{showOrderTracker ? 'Sembunyikan' : 'Buka Pelacakan'}</span>
              {showOrderTracker ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showOrderTracker && <OrderTrackingView />}
        </section>
      )}

      {/* 3. Filter Kategori Menu */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Daftar Menu Stan {OFFICIAL_MERCHANT.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Harga hemat ramah kantong mahasiswa UIN (Rp 4.000 - Rp 17.000)
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-blue-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({menuItems.length})
            </button>
            <button
              onClick={() => setActiveCategory('makanan')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'makanan'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Makanan ({menuItems.filter((i) => i.category === 'makanan').length})</span>
            </button>
            <button
              onClick={() => setActiveCategory('minuman')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'minuman'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Minuman ({menuItems.filter((i) => i.category === 'minuman').length})</span>
            </button>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 4. Campus Map Explorer Section */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>Area Pengantaran Kampus UIN Syarif Hidayatullah Jakarta</span>
            </h3>
            <p className="text-xs text-slate-500">
              Kurir mahasiswa kami melayani seluruh gedung fakultas Kampus 1 & Kampus 2
            </p>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 underline text-left sm:text-right"
          >
            Pilih Gedung Anda di Peta
          </button>
        </div>

        <CampusMap
          selectedBuildingId={deliveryLocation.buildingId}
          onSelectBuilding={(b) => {
            setIsLocationModalOpen(true);
          }}
        />
      </section>

      {/* 5. Jaminan Layanan & Kontak WhatsApp */}
      <section className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 text-slate-950 rounded-2xl shadow-xs shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-white">
              Pusat Pengaduan & Layanan Pesanan Kantin
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Hubungi WhatsApp kami di <strong>{OFFICIAL_MERCHANT.whatsappNumber}</strong> bila ada kendala order, perubahan ruangan, atau saran menu.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSupportModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
        >
          Hubungi Bantuan WA
        </button>
      </section>
    </div>
  );
};
