import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Building, User, Phone, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAMPUS_BUILDINGS } from '../data/mockData';
import { CampusBuilding } from '../types';

export const DeliveryLocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    deliveryLocation,
    setDeliveryLocation,
  } = useApp();

  const [selectedBuildingId, setSelectedBuildingId] = useState(deliveryLocation.buildingId);
  const [selectedFloor, setSelectedFloor] = useState(deliveryLocation.floor);
  const [selectedRoom, setSelectedRoom] = useState(deliveryLocation.room);
  const [notes, setNotes] = useState(deliveryLocation.notes || '');
  const [recipientName, setRecipientName] = useState(deliveryLocation.recipientName);
  const [recipientPhone, setRecipientPhone] = useState(deliveryLocation.recipientPhone);

  if (!isLocationModalOpen) return null;

  const currentBuilding =
    CAMPUS_BUILDINGS.find((b) => b.id === selectedBuildingId) || CAMPUS_BUILDINGS[0];

  const handleSelectBuilding = (b: CampusBuilding) => {
    setSelectedBuildingId(b.id);
    setSelectedFloor(b.floors[0]);
    setSelectedRoom(b.popularRooms[0] || 'Lobi Depan');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDeliveryLocation({
      buildingId: currentBuilding.id,
      buildingName: currentBuilding.name,
      floor: selectedFloor,
      room: selectedRoom,
      notes,
      recipientName: recipientName || 'Mahasiswa UIN',
      recipientPhone: recipientPhone || '081234567890',
    });
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200">
              <Navigation className="w-5 h-5 text-blue-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Pilih Titik Pengantaran Kampus UIN
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pesanan diantar langsung kurir ke ruangan kuliah Anda
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-xl text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="py-4 space-y-5">
          {/* 1. Pilih Gedung / Fakultas UIN */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-amber-600" />
                1. Pilih Gedung / Fakultas UIN Jakarta
              </span>
              <span className="text-[11px] font-medium text-slate-500 lowercase">
                klik untuk memilih
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {CAMPUS_BUILDINGS.map((b) => {
                const isSelected = b.id === selectedBuildingId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleSelectBuilding(b)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-extrabold text-xs ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                        {b.code}
                      </span>
                      <span className={`text-[9px] font-semibold ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {b.walkingTimeMinutes} mnt
                      </span>
                    </div>
                    <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-slate-100' : 'text-slate-600'}`}>
                      {b.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Pilih Lantai & Ruangan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Lantai */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5 block">
                2. Lantai Gedung
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {currentBuilding.floors.map((fl) => (
                  <button
                    key={fl}
                    type="button"
                    onClick={() => setSelectedFloor(fl)}
                    className={`py-2 text-center rounded-xl text-xs font-bold border transition-all ${
                      selectedFloor === fl
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Lt. {fl}
                  </button>
                ))}
              </div>
            </div>

            {/* Ruangan */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5 block">
                3. Ruangan / Lab / Titik Drop-off
              </label>
              <input
                type="text"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                placeholder="Contoh: R. 201, Lab Komputer, Selasar depan lift"
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {currentBuilding.popularRooms.slice(0, 3).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRoom(r)}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Detail Penerima & Catatan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Nama Pemesan
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
                placeholder="Nama Anda"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                No. WhatsApp Mahasiswa
              </label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                required
                placeholder="08xxxxxxxxxx"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Catatan Patokan */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">
              Catatan Khusus Pengantaran (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Sedang ada dosen, tolong titipkan di bangku selasar depan"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Summary Box */}
          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold block">
                  {currentBuilding.name} · Lantai {selectedFloor}
                </span>
                <span className="text-[11px] text-amber-800">
                  {selectedRoom || 'Ruangan belum diisi'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-600 font-semibold text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Est. {currentBuilding.walkingTimeMinutes} mnt antar</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              Simpan Titik Antar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
