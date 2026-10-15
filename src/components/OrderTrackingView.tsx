import React from 'react';
import {
  Clock,
  MapPin,
  CheckCircle2,
  ChefHat,
  Bike,
  PackageCheck,
  MessageCircle,
  KeyRound,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusMap } from './CampusMap';
import { OFFICIAL_MERCHANT } from '../data/mockData';
import { OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { activeOrder, updateOrderStatus, setIsSupportModalOpen } = useApp();

  if (!activeOrder) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-xs">
        <p className="text-slate-500 text-sm">Belum ada pesanan aktif yang sedang dilacak.</p>
      </div>
    );
  }

  const steps: { status: OrderStatus; label: string; desc: string; icon: React.ElementType }[] = [
    {
      status: 'DITERIMA',
      label: 'Pesanan Masuk',
      desc: 'Pesanan terkonfirmasi dan diteruskan ke stan',
      icon: CheckCircle2,
    },
    {
      status: 'DIMASAK',
      label: 'Sedang Dimasak Stan Ali',
      desc: 'Dapur stan Ali baput sedang menggoreng renyah ayam pesanan Anda',
      icon: ChefHat,
    },
    {
      status: 'DIANTAR',
      label: 'Dalam Pengantaran Kurir',
      desc: 'Kurir mahasiswa sedang menuju gedung fakultas Anda',
      icon: Bike,
    },
    {
      status: 'SELESAI',
      label: 'Pesanan Tiba & Selesai',
      desc: 'Makanan telah diserahterimakan di ruangan Anda',
      icon: PackageCheck,
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'MENUNGGU_BAYAR':
        return 0;
      case 'DITERIMA':
        return 0;
      case 'DIMASAK':
        return 1;
      case 'DIANTAR':
        return 2;
      case 'SELESAI':
        return 3;
    }
  };

  const currentStepIdx = getStepIndex(activeOrder.status);

  // WhatsApp hotline url
  const waHelpUrl = `https://wa.me/6281385433514?text=${encodeURIComponent(
    `${OFFICIAL_MERCHANT.whatsappMessageTemplate} [Lacak Order #${activeOrder.orderNumber} - ${activeOrder.deliveryLocation.buildingName}]`
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Banner Status */}
      <div className="p-6 bg-gradient-to-r from-[#0F2942] to-[#1E3A8A] text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Pelacakan Pesanan Waktu Nyata</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight mt-1">
              Order #{activeOrder.orderNumber}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Stan Ali baput · Estimasi tiba{' '}
              <strong className="text-amber-400 font-extrabold">{activeOrder.estimatedDeliveryMinutes} menit</strong>
            </p>
          </div>

          {/* Secure Pickup PIN Box */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center gap-3 shrink-0">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">
                PIN Serah Terima
              </span>
              <span className="text-xl font-black font-mono tracking-widest text-amber-300">
                {activeOrder.pickupPin}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Step Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((st, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            const Icon = st.icon;

            return (
              <div
                key={st.status}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-50/90 border-amber-400 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-300'
                    : 'bg-white border-slate-100 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950'
                        : isCompleted
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Tahap {idx + 1}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-amber-950' : 'text-slate-800'
                    }`}
                  >
                    {st.label}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Campus Map View */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              Posisi Kurir & Rute Gedung Fakultas
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              Tujuan:{' '}
              <strong className="text-slate-900">{activeOrder.deliveryLocation.buildingName}</strong>
            </span>
          </div>

          <CampusMap
            selectedBuildingId={activeOrder.deliveryLocation.buildingId}
            isDelivering={activeOrder.status === 'DIANTAR'}
            courierProgress={activeOrder.status === 'DIANTAR' ? 0.65 : 0.1}
          />
        </div>

        {/* Location & Contact Hotline Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Titik Drop-off Detail */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Rincian Titik Pengantaran</span>
            </div>
            <div className="pl-6 space-y-1 text-slate-600">
              <p>
                <strong>Gedung:</strong> {activeOrder.deliveryLocation.buildingName}
              </p>
              <p>
                <strong>Lantai:</strong> Lantai {activeOrder.deliveryLocation.floor} ·{' '}
                <strong>Ruangan:</strong> {activeOrder.deliveryLocation.room}
              </p>
              <p>
                <strong>Penerima:</strong> {activeOrder.deliveryLocation.recipientName} (
                {activeOrder.deliveryLocation.recipientPhone})
              </p>
              {activeOrder.deliveryLocation.notes && (
                <p className="italic text-slate-500">
                  <strong>Catatan:</strong> "{activeOrder.deliveryLocation.notes}"
                </p>
              )}
            </div>
          </div>

          {/* Hotline Bantuan WhatsApp */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-900 font-bold mb-1">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Bantuan Cepat Stan Ali ({OFFICIAL_MERCHANT.whatsappNumber})</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Ada kendala atau perubahan ruang kelas? Langsung hubungi kami via WhatsApp resmi untuk respon cepat.
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={waHelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat WA Stan Ali</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="px-3 py-2 rounded-xl border border-emerald-300 text-emerald-900 font-bold text-xs hover:bg-emerald-100"
              >
                Detail
              </button>
            </div>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
            Menu Dipesan ({activeOrder.items.length} Macam)
          </h4>
          <div className="divide-y divide-slate-100 text-xs">
            {activeOrder.items.map((it) => (
              <div key={it.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">
                    {it.quantity}x {it.menuItem.name}
                  </span>
                  <div className="text-[11px] text-slate-500 flex gap-2 mt-0.5">
                    {it.spicyLevel && <span>Level {it.spicyLevel}</span>}
                    {it.temperature && <span>{it.temperature}</span>}
                    {it.sugar && <span>{it.sugar}</span>}
                    {it.notes && <span className="italic">"{it.notes}"</span>}
                  </div>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  Rp {it.subtotal.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
            <span>Total Terbayar ({activeOrder.paymentMethod === 'qris' ? 'QRIS Ali baput' : 'Transfer BSI'})</span>
            <span className="text-blue-950 tabular-nums">
              Rp {activeOrder.total.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Demo Fast-Forward Stepper Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span className="text-[11px] font-semibold text-slate-400">
            Simulasi Progres Pesanan (Pengujian Cepat):
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => updateOrderStatus(activeOrder.id, 'DIMASAK')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                activeOrder.status === 'DIMASAK' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              Dimasak
            </button>
            <button
              onClick={() => updateOrderStatus(activeOrder.id, 'DIANTAR')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                activeOrder.status === 'DIANTAR' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              Diantar Kurir
            </button>
            <button
              onClick={() => updateOrderStatus(activeOrder.id, 'SELESAI')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                activeOrder.status === 'SELESAI' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
