import React, { useState } from 'react';
import { MessageCircle, Phone, Copy, Check, ExternalLink, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_MERCHANT } from '../data/mockData';

export const WhatsAppSupportModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen, activeOrder } = useApp();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!isSupportModalOpen) return null;

  const phoneRaw = OFFICIAL_MERCHANT.whatsappNumber; // 081385433514
  const intlPhone = '6281385433514';
  const defaultMessage = OFFICIAL_MERCHANT.whatsappMessageTemplate; // hai al's,perihal order&pickup(yang kamu ingin keluhkan/sarankan),mohon responnya.

  // Optional append order number if active
  const messageWithOrder = activeOrder
    ? `${defaultMessage} [No. Order: #${activeOrder.orderNumber} - ${activeOrder.deliveryLocation.buildingName}]`
    : defaultMessage;

  const waUrl = `https://wa.me/${intlPhone}?text=${encodeURIComponent(messageWithOrder)}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageWithOrder);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Pusat Bantuan & Layanan Stan Ali
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Keluhan, Saran, Perihal Order & Pickup Makanan
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-xl text-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Card Nomor WhatsApp */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl text-white">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  Nomor Kontak Resmi (WhatsApp)
                </span>
                <span className="text-lg font-black text-slate-900 font-mono tabular-nums">
                  {phoneRaw}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyPhone}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-xs"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin No</span>
                </>
              )}
            </button>
          </div>

          {/* Template Pesan Otomatis */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Format Pesan Otomatis
              </label>
              <button
                onClick={handleCopyMessage}
                className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
              >
                {copiedMsg ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMsg ? 'Tersalin' : 'Salin Pesan'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
              "{messageWithOrder}"
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Pesan ini akan otomatis terisi saat Anda membuka aplikasi WhatsApp.
            </p>
          </div>

          {/* Info Jam Responsif */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-950">
            <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Respons Cepat Jam Operasional Kantin</span>
              <span className="text-[11px] text-blue-800">
                Layanan aktif setiap hari kerja (Senin - Jumat 07.30 - 17.00 WIB) untuk memastikan pesanan Anda sampai tepat waktu ke gedung kuliah.
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Tutup
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Pesan ke WhatsApp Sekarang</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};
