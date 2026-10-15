import React from 'react';
import { ShoppingBag, MessageCircle, MapPin, ChefHat, Bike, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UINLogo } from './UINLogo';
import { OFFICIAL_MERCHANT } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    cart,
    setIsCartOpen,
    deliveryLocation,
    setIsLocationModalOpen,
    setIsSupportModalOpen,
    activeOrder,
  } = useApp();

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getRoleBadge = () => {
    switch (role) {
      case 'stan':
        return { label: 'Stan Ali baput', icon: ChefHat, bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'kurir':
        return { label: 'Kurir Kampus', icon: Bike, bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      default:
        return { label: 'Mahasiswa UIN', icon: User, bg: 'bg-blue-100 text-blue-900 border-blue-200' };
    }
  };

  const roleInfo = getRoleBadge();
  const RoleIcon = roleInfo.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with UIN Jakarta Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <UINLogo size="md" />
        </div>

        {/* Zone 2: Navigation & Quick Context Info */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {/* Quick campus drop-off trigger */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 hover:text-slate-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer text-left"
            title="Ubah titik pengantaran kampus"
          >
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Antar Ke</span>
              <span className="font-bold text-slate-800 truncate max-w-[170px]">
                {deliveryLocation.buildingName.split('(')[0] || deliveryLocation.buildingName}
              </span>
            </div>
          </button>

          {/* WhatsApp Hotline direct help */}
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-emerald-50 text-slate-700 text-xs font-semibold"
            title={`Hubungi WhatsApp ${OFFICIAL_MERCHANT.whatsappNumber}`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Bantuan WA ({OFFICIAL_MERCHANT.whatsappNumber})</span>
          </button>

          {/* Quick active order status indicator */}
          {activeOrder && activeOrder.status !== 'SELESAI' && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="font-semibold">Order #{activeOrder.orderNumber}:</span>
              <span className="capitalize text-amber-800 font-bold">{activeOrder.status.replace('_', ' ')}</span>
            </div>
          )}
        </nav>

        {/* Zone 3: Role Switcher & Cart Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Role Switcher Dropdown / Segment */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setRole('mahasiswa')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'mahasiswa'
                  ? 'bg-blue-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Mode Pemesan Mahasiswa UIN"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mahasiswa</span>
            </button>
            <button
              onClick={() => setRole('stan')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'stan'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Mode Stan Kantin Ali baput"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stan Ali</span>
            </button>
            <button
              onClick={() => setRole('kurir')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'kurir'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Mode Kurir Mahasiswa UIN"
            >
              <Bike className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kurir</span>
            </button>
          </div>

          {/* Cart Button with Count Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 transition-colors shadow-xs"
            aria-label="Buka Keranjang Pesanan"
            title="Keranjang Pesanan"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
