import React, { useState } from 'react';
import { QrCode, CreditCard, Copy, Check, ShieldCheck, MapPin, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRISVoucher } from './QRISVoucher';
import { OFFICIAL_MERCHANT } from '../data/mockData';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cartTotal,
    deliveryLocation,
    createOrder,
    updateOrderStatus,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    setActiveTrackingOrderId,
  } = useApp();

  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(OFFICIAL_MERCHANT.bsiAccount.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCompletePayment = (simulateImmediateCook = true) => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder(selectedPaymentMethod);
      if (simulateImmediateCook) {
        updateOrderStatus(order.id, 'DIMASAK');
      }
      setIsProcessing(false);
      setIsCheckoutModalOpen(false);
      setActiveTrackingOrderId(order.id);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Pembayaran Digital Aman</span>
            </div>
            <h3 className="font-extrabold text-xl text-slate-900 mt-0.5">
              Selesaikan Pembayaran Pesanan
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-xl text-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount & Destination Banner */}
        <div className="my-4 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Total Tagihan Mahasiswa
            </span>
            <span className="text-2xl font-black text-amber-400 tabular-nums">
              Rp {cartTotal.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 sm:text-right">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-left sm:text-right">
              <span className="font-bold text-white block">
                {deliveryLocation.buildingName.split('(')[0]}
              </span>
              <span className="text-slate-400 text-[11px]">
                Lt. {deliveryLocation.floor} ({deliveryLocation.room})
              </span>
            </div>
          </div>
        </div>

        {/* Payment Tabs: QRIS Ali baput vs Transfer BSI */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-4 border border-slate-200">
          <button
            onClick={() => setSelectedPaymentMethod('qris')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              selectedPaymentMethod === 'qris'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-red-600" />
            <span>QRIS Resmi Ali baput</span>
          </button>

          <button
            onClick={() => setSelectedPaymentMethod('bsi_transfer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              selectedPaymentMethod === 'bsi_transfer'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <span>Transfer Bank BSI</span>
          </button>
        </div>

        {/* Tab Content: QRIS */}
        {selectedPaymentMethod === 'qris' ? (
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <QRISVoucher amount={cartTotal} />
            </div>

            <div className="text-center text-xs text-slate-500">
              <p>Buka aplikasi perbankan atau dompet digital Anda, lalu scan QR di atas.</p>
              <p className="font-semibold text-slate-700 mt-0.5">
                Merchant Resmi: <strong>{OFFICIAL_MERCHANT.name}</strong> · NMID: {OFFICIAL_MERCHANT.nmid}
              </p>
            </div>
          </div>
        ) : (
          /* Tab Content: BSI Transfer */
          <div className="space-y-4 py-2">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg relative overflow-hidden border border-emerald-500/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  {OFFICIAL_MERCHANT.bsiAccount.bankName}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 text-[10px] font-bold border border-emerald-400/30">
                  Rekening Resmi Stan
                </span>
              </div>

              <div className="mb-4">
                <span className="text-[11px] text-emerald-200/70 block uppercase font-medium">
                  Nomor Rekening
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl font-black font-mono tracking-wider tabular-nums text-white">
                    {OFFICIAL_MERCHANT.bsiAccount.accountNumber}
                  </span>
                  <button
                    onClick={handleCopyAccount}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-xs font-bold transition-all text-white border border-emerald-400/40"
                  >
                    {copiedAccount ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin No. Rek</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-300/80 block">Atas Nama Pemilik:</span>
                  <span className="font-extrabold text-sm text-amber-300">
                    {OFFICIAL_MERCHANT.bsiAccount.accountHolder}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-300/80 block">Jumlah Transfer:</span>
                  <span className="font-extrabold text-sm text-white tabular-nums">
                    Rp {cartTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">Petunjuk Transfer Bank BSI:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-500">
                <li>Buka BSI Mobile atau ATM / Mobile Banking bank lain</li>
                <li>Pilih transfer ke Rekening BSI <strong>{OFFICIAL_MERCHANT.bsiAccount.accountNumber}</strong></li>
                <li>Pastikan nama penerima: <strong>{OFFICIAL_MERCHANT.bsiAccount.accountHolder}</strong></li>
                <li>Masukkan nominal persis <strong>Rp {cartTotal.toLocaleString('id-ID')}</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => handleCompletePayment(true)}
            disabled={isProcessing}
            className="w-full flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
          >
            {isProcessing ? (
              <span>Memproses Konfirmasi...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Simulasi Pembayaran Berhasil & Kirim</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
