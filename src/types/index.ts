export type UserRole = 'mahasiswa' | 'stan' | 'kurir';

export interface MenuItem {
  id: string;
  name: string;
  category: 'makanan' | 'minuman';
  price: number;
  description: string;
  image: string;
  popular?: boolean;
  spicyLevelAvailable?: boolean;
  temperatureOptions?: string[]; // e.g. ['Dingin / Es', 'Hangat / Panas', 'Suhu Normal']
  sugarOptions?: string[]; // e.g. ['Manis', 'Sedang', 'Tawar']
  inStock: boolean;
  rating: number;
  prepTimeMinutes: number;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  quantity: number;
  spicyLevel?: number;
  temperature?: string;
  sugar?: string;
  notes?: string;
  subtotal: number;
}

export interface CampusBuilding {
  id: string;
  code: string;
  name: string;
  campusArea: 'Kampus 1' | 'Kampus 2';
  floors: number[];
  popularRooms: string[];
  coordinates: { x: number; y: number }; // percentage on 2D map
  walkingTimeMinutes: number;
}

export interface DeliveryLocation {
  buildingId: string;
  buildingName: string;
  floor: number;
  room: string;
  notes?: string;
  recipientName: string;
  recipientPhone: string;
}

export type OrderStatus =
  | 'MENUNGGU_BAYAR'
  | 'DITERIMA'
  | 'DIMASAK'
  | 'DIANTAR'
  | 'SELESAI';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  deliveryLocation: DeliveryLocation;
  paymentMethod: 'qris' | 'bsi_transfer';
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  pickupPin: string;
  courierName?: string;
  courierPhone?: string;
  estimatedDeliveryMinutes: number;
  paidAt?: string;
}

export interface MerchantInfo {
  name: string;
  ownerName: string;
  tagline: string;
  canteenLocation: string;
  nmid: string;
  terminal: string;
  whatsappNumber: string;
  whatsappMessageTemplate: string;
  bsiAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}
