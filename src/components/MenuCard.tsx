import React, { useState } from 'react';
import { Plus, Flame, Clock, Star, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { useApp } from '../context/AppContext';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart } = useApp();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState<number>(item.spicyLevelAvailable ? 2 : 0);
  const [selectedTemperature, setSelectedTemperature] = useState<string>(
    item.temperatureOptions ? item.temperatureOptions[0] : ''
  );
  const [selectedSugar, setSelectedSugar] = useState<string>(
    item.sugarOptions ? item.sugarOptions[0] : ''
  );
  const [notes, setNotes] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If item has options, open modal first to customize
    if (item.spicyLevelAvailable || (item.temperatureOptions && item.temperatureOptions.length > 1)) {
      setIsCustomizeOpen(true);
      return;
    }

    addToCart(item, {
      quantity: 1,
      spicyLevel: selectedSpicyLevel,
      temperature: selectedTemperature,
      sugar: selectedSugar,
      notes,
    });
    triggerToast();
  };

  const handleConfirmCustomize = () => {
    addToCart(item, {
      quantity: 1,
      spicyLevel: selectedSpicyLevel,
      temperature: selectedTemperature,
      sugar: selectedSugar,
      notes,
    });
    setIsCustomizeOpen(false);
    triggerToast();
  };

  const triggerToast = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  return (
    <>
      <div className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Image Container with aspect 4:3 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Graceful SVG fallback
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Quiet Unboxed Metadata Tags */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {item.popular && (
              <span className="bg-amber-500/95 backdrop-blur-xs text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                Favorit
              </span>
            )}
            {!item.inStock && (
              <span className="bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                Habis
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{item.prepTimeMinutes} mnt</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Category text separator */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-amber-600">
                {item.category === 'makanan' ? 'Olahan Ayam' : 'Minuman Segar'}
              </span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-0.5 text-slate-600 font-semibold text-[11px]">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Title */}
            <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-blue-900 transition-colors">
              {item.name}
            </h4>

            {/* Description */}
            <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium">Harga</span>
              <span className="text-base font-extrabold text-blue-950 tabular-nums">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={!item.inStock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
                !item.inStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : addedToast
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 active:scale-95'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Customizer for Spicy Levels / Sugar / Temp */}
      {isCustomizeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                <p className="text-sm font-extrabold text-amber-600 tabular-nums mt-0.5">
                  Rp {item.price.toLocaleString('id-ID')}
                </p>
              </div>
              <button
                onClick={() => setIsCustomizeOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Spicy level option */}
              {item.spicyLevelAvailable && (
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                    <Flame className="w-4 h-4 text-rose-500" />
                    Tingkat Kepedasan Sambal
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSelectedSpicyLevel(level)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border ${
                          selectedSpicyLevel === level
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Lv {level}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {selectedSpicyLevel === 1 && 'Level 1: Pedas manis santai'}
                    {selectedSpicyLevel === 2 && 'Level 2: Pedas gurih standar'}
                    {selectedSpicyLevel === 3 && 'Level 3: Pedas nampol khas kantin'}
                    {selectedSpicyLevel === 4 && 'Level 4: Ekstra cabai rawit'}
                    {selectedSpicyLevel === 5 && 'Level 5: Pedas membakar ujian'}
                  </span>
                </div>
              )}

              {/* Temperature option for drinks */}
              {item.temperatureOptions && item.temperatureOptions.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 block">
                    Pilihan Suhu Minuman
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.temperatureOptions.map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemperature(temp)}
                        className={`py-2 px-3 text-center rounded-xl text-xs font-bold transition-all border ${
                          selectedTemperature === temp
                            ? 'bg-blue-900 text-amber-300 border-blue-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sugar option for drinks */}
              {item.sugarOptions && item.sugarOptions.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 block">
                    Takaran Gula
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {item.sugarOptions.map((sugar) => (
                      <button
                        key={sugar}
                        type="button"
                        onClick={() => setSelectedSugar(sugar)}
                        className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all border ${
                          selectedSugar === sugar
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {sugar}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5 block">
                  Catatan untuk Stan Ali baput (Opsional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Bawang putih banyakin, sambal dipisah..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmCustomize}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 shadow-xs"
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
