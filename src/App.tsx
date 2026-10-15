import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MahasiswaView } from './components/MahasiswaView';
import { StanDashboard } from './components/StanDashboard';
import { KurirDashboard } from './components/KurirDashboard';
import { CartDrawer } from './components/CartDrawer';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppSupportModal } from './components/WhatsAppSupportModal';
import { UINLogo } from './components/UINLogo';
import { OFFICIAL_MERCHANT } from './data/mockData';
import { MessageCircle, Phone, Clock, MapPin } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, setIsSupportModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-900">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {role === 'mahasiswa' && <MahasiswaView />}
          {role === 'stan' && <StanDashboard />}
          {role === 'kurir' && <KurirDashboard />}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <DeliveryLocationModal />
      <CheckoutModal />
      <WhatsAppSupportModal />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <UINLogo size="sm" />
            <div className="text-[11px] leading-relaxed text-slate-500 border-t sm:border-t-0 sm:border-l sm:pl-4 border-slate-200">
              <p className="font-bold text-slate-800">
                KantinKampus UIN Syarif Hidayatullah Jakarta
              </p>
              <p>Dapur Mitra: Stan {OFFICIAL_MERCHANT.name} · Student Center Lt. 1</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: {OFFICIAL_MERCHANT.whatsappNumber}</span>
            </button>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Buka: 07.30 - 17.00 WIB</span>
            </div>
            <div className="text-[11px] text-slate-400">
              © 2026 Civitas Akademika UIN Jakarta. Hak Cipta Dilindungi.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
