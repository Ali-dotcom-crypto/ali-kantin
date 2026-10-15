import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, MapPin, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    deliveryLocation,
    setIsLocationModalOpen,
    setIsCheckoutModalOpen,
  } = useApp();

  if (!isCartOpen) return null;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      {/* Slide-over cart panel */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 rounded-xl text-slate-950">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Keranjang Pesanan Anda
              </h3>
              <p className="text-xs text-slate-500">
                Stan Kantin Ali baput · UIN Jakarta
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Destination Strip */}
        <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-500 font-medium block text-[10px] uppercase tracking-wider">
                Titik Pengantaran
              </span>
              <span className="font-bold text-slate-900 truncate">
                {deliveryLocation.buildingName} · Lt. {deliveryLocation.floor} ({deliveryLocation.room})
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsLocationModalOpen(true);
            }}
            className="text-[11px] font-bold text-blue-900 hover:text-blue-700 underline shrink-0 ml-2"
          >
            Ubah
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-slate-300" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">Keranjang Anda Masih Kosong</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
                Yuk pilih aneka menu olahan ayam gurih dan minuman segar dari Ali baput!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {item.menuItem.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customization pills */}
                  <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500 font-medium">
                    {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
                      <span className="bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-semibold">
                        Lv {item.spicyLevel}
                      </span>
                    )}
                    {item.temperature && (
                      <span className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded">
                        {item.temperature}
                      </span>
                    )}
                    {item.sugar && (
                      <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded">
                        {item.sugar}
                      </span>
                    )}
                    {item.notes && (
                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded italic">
                        "{item.notes}"
                      </span>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-black text-slate-900 tabular-nums">
                      Rp {item.subtotal.toLocaleString('id-ID')}
                    </span>

                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 tabular-nums w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Panel */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal Menu</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  Rp {cartSubtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ongkir Kurir Kampus UIN</span>
                <span className="font-semibold text-emerald-700 tabular-nums">
                  Rp {deliveryFee.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                <span>Total Pembayaran</span>
                <span className="text-base text-blue-950 tabular-nums">
                  Rp {cartTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
