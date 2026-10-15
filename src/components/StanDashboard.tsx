import React from 'react';
import { ChefHat, Check, Clock, AlertCircle, ToggleLeft, ToggleRight, DollarSign, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_MERCHANT } from '../data/mockData';

export const StanDashboard: React.FC = () => {
  const { orders, updateOrderStatus, menuItems, toggleMenuItemStock } = useApp();

  const stanOrders = orders.filter((o) => o.status !== 'MENUNGGU_BAYAR');
  const activeOrders = stanOrders.filter((o) => o.status === 'DITERIMA' || o.status === 'DIMASAK');
  const totalRevenue = stanOrders
    .filter((o) => o.status !== 'MENUNGGU_BAYAR')
    .reduce((sum, o) => sum + o.subtotal, 0);

  return (
    <div className="space-y-6">
      {/* Merchant Header Profile */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 rounded-3xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black shadow-md">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 text-amber-300">
                  Panel Pemilik Stan
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  NMID: {OFFICIAL_MERCHANT.nmid}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-0.5">
                Dapur Stan {OFFICIAL_MERCHANT.name}
              </h2>
              <p className="text-xs text-slate-900/80 font-medium">
                {OFFICIAL_MERCHANT.canteenLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-slate-950/10">
              <span className="text-[10px] uppercase font-bold text-slate-900/80 block">
                Total Omzet Stan
              </span>
              <span className="text-lg font-black tabular-nums text-slate-950">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="bg-slate-950/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-slate-950/10">
              <span className="text-[10px] uppercase font-bold text-slate-900/80 block">
                Antrean Masak
              </span>
              <span className="text-lg font-black tabular-nums text-slate-950">
                {activeOrders.length} Pesanan
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antrean Pesanan Masuk (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              <span>Tiket Antrean Pesanan Masuk</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              {stanOrders.length} Riwayat Pesanan
            </span>
          </div>

          {stanOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-400">
              <p className="text-sm font-semibold">Belum ada pesanan masuk ke stan Ali baput.</p>
              <p className="text-xs mt-1">Buka tab Mahasiswa untuk mencoba simulasi pemesanan.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stanOrders.map((ord) => (
                <div
                  key={ord.id}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-xs ${
                    ord.status === 'DIMASAK'
                      ? 'border-amber-400 bg-amber-50/20'
                      : ord.status === 'DITERIMA'
                      ? 'border-blue-400'
                      : 'border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">
                          Order #{ord.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            ord.status === 'DIMASAK'
                              ? 'bg-amber-100 text-amber-900'
                              : ord.status === 'DIANTAR'
                              ? 'bg-blue-100 text-blue-900'
                              : ord.status === 'SELESAI'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {ord.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {new Date(ord.createdAt).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Antar ke:{' '}
                        <strong className="text-slate-900 font-bold">
                          {ord.deliveryLocation.buildingName} · Lt. {ord.deliveryLocation.floor} (
                          {ord.deliveryLocation.room})
                        </strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Metode:</span>
                      <span className="text-xs font-extrabold text-blue-900">
                        {ord.paymentMethod === 'qris' ? 'QRIS Ali baput' : 'Transfer BSI'}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="py-3 divide-y divide-slate-100 text-xs">
                    {ord.items.map((it) => (
                      <div key={it.id} className="py-1.5 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-slate-900">
                            {it.quantity}x {it.menuItem.name}
                          </span>
                          <div className="text-[11px] text-slate-500 flex gap-2">
                            {it.spicyLevel && (
                              <span className="text-rose-600 font-semibold">
                                Level Pedas {it.spicyLevel}
                              </span>
                            )}
                            {it.temperature && <span>{it.temperature}</span>}
                            {it.sugar && <span>{it.sugar}</span>}
                            {it.notes && (
                              <span className="italic text-amber-800 font-medium">
                                "{it.notes}"
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 tabular-nums">
                          Rp {it.subtotal.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-slate-500">
                      Pemesan: <strong className="text-slate-800">{ord.deliveryLocation.recipientName}</strong> (
                      {ord.deliveryLocation.recipientPhone})
                    </div>

                    <div className="flex gap-2">
                      {ord.status === 'DITERIMA' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'DIMASAK')}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
                        >
                          Mulai Masak
                        </button>
                      )}
                      {ord.status === 'DIMASAK' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'DIANTAR')}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs"
                        >
                          Siap Diantar Kurir
                        </button>
                      )}
                      {ord.status === 'DIANTAR' && (
                        <span className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Kurir Sedang Berjalan Menuju Fakultas</span>
                        </span>
                      )}
                      {ord.status === 'SELESAI' && (
                        <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          <span>Selesai Diserahterimakan</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Manajemen Stok Menu Stan Ali baput (1 col) */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <ToggleLeft className="w-5 h-5 text-amber-600" />
            <span>Ketersediaan Menu Stan</span>
          </h3>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs divide-y divide-slate-100">
            {menuItems.map((item) => (
              <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-900">{item.name}</h5>
                  <span className="text-[11px] text-slate-500 tabular-nums">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => toggleMenuItemStock(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    item.inStock
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-rose-50 text-rose-700 border border-rose-300'
                  }`}
                >
                  {item.inStock ? 'Tersedia' : 'Habis'}
                </button>
              </div>
            ))}
          </div>

          {/* Quick Bank & WhatsApp Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-800">Info Rekening & WhatsApp Stan</h5>
            <p className="text-slate-600">
              <strong>BSI:</strong> {OFFICIAL_MERCHANT.bsiAccount.accountNumber}
              <br />
              <strong>A.N:</strong> {OFFICIAL_MERCHANT.bsiAccount.accountHolder}
            </p>
            <p className="text-slate-600">
              <strong>WA:</strong> {OFFICIAL_MERCHANT.whatsappNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
