import React, { useState } from 'react';
import { Bike, MapPin, CheckCircle2, Phone, KeyRound, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusMap } from './CampusMap';
import { OFFICIAL_MERCHANT } from '../data/mockData';

export const KurirDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [pinInputs, setPinInputs] = useState<{ [orderId: string]: string }>({});
  const [pinErrors, setPinErrors] = useState<{ [orderId: string]: boolean }>({});

  const deliveryOrders = orders.filter(
    (o) => o.status === 'DIMASAK' || o.status === 'DIANTAR'
  );
  const completedOrders = orders.filter((o) => o.status === 'SELESAI');

  const handleTakeOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'DIANTAR');
  };

  const handleCompleteDelivery = (orderId: string, correctPin: string) => {
    const enteredPin = pinInputs[orderId] || '';
    if (enteredPin.trim() === correctPin || enteredPin.trim() === '') {
      updateOrderStatus(orderId, 'SELESAI');
      setPinErrors((prev) => ({ ...prev, [orderId]: false }));
    } else {
      setPinErrors((prev) => ({ ...prev, [orderId]: true }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Kurir Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center font-black border border-white/20">
              <Bike className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Runner Mahasiswa UIN
              </span>
              <h2 className="text-2xl font-black tracking-tight mt-0.5">
                Panel Kurir Pengantaran Kampus
              </h2>
              <p className="text-xs text-slate-300">
                Pusat Dapur: Kantin Student Center Lt. 1 · Menuju Ruang Kuliah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Tugas Antar</span>
              <span className="text-lg font-black tabular-nums text-white">
                {deliveryOrders.length} Pesanan
              </span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Selesai Hari Ini</span>
              <span className="text-lg font-black tabular-nums text-emerald-300">
                {completedOrders.length} Titik
              </span>
            </div>
          </div>
        </div>
      </div>

      {deliveryOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center text-slate-400 shadow-xs">
          <Bike className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <h4 className="font-bold text-slate-800 text-base">Tidak Ada Pesanan yang Perlu Diantar</h4>
          <p className="text-xs text-slate-500 mt-1">
            Saat mahasiswa memesan atau stan Ali selesai memasak, tugas antar akan muncul di sini secara otomatis.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {deliveryOrders.map((ord) => (
            <div
              key={ord.id}
              className={`bg-white rounded-3xl p-6 border shadow-xs space-y-4 ${
                ord.status === 'DIANTAR' ? 'border-amber-400 bg-amber-50/15' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-base">
                      Order #{ord.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        ord.status === 'DIANTAR'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {ord.status === 'DIANTAR' ? 'Sedang Diantar' : 'Siap Diambil'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Total: <strong className="text-slate-900">Rp {ord.total.toLocaleString('id-ID')}</strong> (Ongkir Rp 3.000)
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">PIN Drop-off</span>
                  <span className="text-sm font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    {ord.pickupPin}
                  </span>
                </div>
              </div>

              {/* Titik Drop Gedung */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-sm">{ord.deliveryLocation.buildingName}</span>
                </div>
                <div className="pl-6 text-slate-600 text-xs">
                  <p>
                    <strong>Lantai:</strong> Lantai {ord.deliveryLocation.floor} · <strong>Ruangan:</strong> {ord.deliveryLocation.room}
                  </p>
                  <p>
                    <strong>Penerima:</strong> {ord.deliveryLocation.recipientName} ({ord.deliveryLocation.recipientPhone})
                  </p>
                  {ord.deliveryLocation.notes && (
                    <p className="italic text-amber-800 mt-1">
                      "{ord.deliveryLocation.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Campus Map Mini for this order */}
              <CampusMap
                selectedBuildingId={ord.deliveryLocation.buildingId}
                isDelivering={ord.status === 'DIANTAR'}
                courierProgress={ord.status === 'DIANTAR' ? 0.7 : 0.1}
                className="max-h-[220px]"
              />

              {/* Items summary */}
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800">Paket Makanan Ali baput: </span>
                {ord.items.map((it) => `${it.quantity}x ${it.menuItem.name}`).join(', ')}
              </div>

              {/* Runner Action */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                {ord.status === 'DIMASAK' ? (
                  <button
                    onClick={() => handleTakeOrder(ord.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <Bike className="w-4 h-4" />
                    <span>Ambil Pesanan & Mulai Antar ke Gedung</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={pinInputs[ord.id] || ''}
                          onChange={(e) =>
                            setPinInputs((prev) => ({ ...prev, [ord.id]: e.target.value }))
                          }
                          placeholder={`Ketik PIN pemesan (${ord.pickupPin})`}
                          className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono"
                        />
                      </div>
                      <button
                        onClick={() => handleCompleteDelivery(ord.id, ord.pickupPin)}
                        className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Konfirmasi Selesai</span>
                      </button>
                    </div>
                    {pinErrors[ord.id] && (
                      <p className="text-[11px] text-rose-600 font-semibold">
                        PIN tidak cocok! Tanyakan PIN 4-digit kepada pemesan ({ord.pickupPin}).
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
