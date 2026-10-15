import React, { createContext, useContext, useEffect, useState } from 'react';
import { CAMPUS_BUILDINGS, INITIAL_MENU_ITEMS, OFFICIAL_MERCHANT } from '../data/mockData';
import { CartItem, DeliveryLocation, MenuItem, Order, OrderStatus, UserRole } from '../types';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  menuItems: MenuItem[];
  toggleMenuItemStock: (itemId: string) => void;
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    options?: {
      quantity?: number;
      spicyLevel?: number;
      temperature?: string;
      sugar?: string;
      notes?: string;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  deliveryLocation: DeliveryLocation;
  setDeliveryLocation: React.Dispatch<React.SetStateAction<DeliveryLocation>>;
  orders: Order[];
  createOrder: (paymentMethod: 'qris' | 'bsi_transfer') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (orderId: string | null) => void;
  activeOrder: Order | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  selectedPaymentMethod: 'qris' | 'bsi_transfer';
  setSelectedPaymentMethod: (method: 'qris' | 'bsi_transfer') => void;
}

const STORAGE_KEYS = {
  ORDERS: 'kantinkampus_orders_v2',
  MENU: 'kantinkampus_menu_v2',
  LOCATION: 'kantinkampus_location_v2',
  ROLE: 'kantinkampus_role_v2',
};

const DEFAULT_LOCATION: DeliveryLocation = {
  buildingId: 'fst',
  buildingName: 'Fakultas Sains & Teknologi (FST)',
  floor: 2,
  room: 'Ruang Kuliah 201',
  notes: 'Titip di depan meja dosen atau selasar dekat tangga',
  recipientName: 'Mahasiswa UIN Jakarta',
  recipientPhone: '081234567890',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Role
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'mahasiswa';
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
  };

  // 2. Menu Items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MENU_ITEMS;
  });

  const toggleMenuItemStock = (itemId: string) => {
    setMenuItems((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item
      );
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(updated));
      return updated;
    });
  };

  // 3. Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 4. Delivery Location
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCATION);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_LOCATION;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(deliveryLocation));
  }, [deliveryLocation]);

  // 5. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    // Seed initial active order demo
    const sampleOrder: Order = {
      id: 'ord-demo-01',
      orderNumber: 'UIN-9382',
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      items: [
        {
          id: 'item-1',
          menuItem: INITIAL_MENU_ITEMS[0], // Ayam Geprek
          quantity: 1,
          spicyLevel: 3,
          notes: 'Sambal dipisah sedikit ya mas Ali',
          subtotal: 15000,
        },
        {
          id: 'item-2',
          menuItem: INITIAL_MENU_ITEMS[4], // Teh Manis
          quantity: 1,
          temperature: 'Dingin / Es',
          sugar: 'Manis Pas',
          subtotal: 5000,
        },
      ],
      deliveryLocation: DEFAULT_LOCATION,
      paymentMethod: 'qris',
      status: 'DIMASAK',
      subtotal: 20000,
      deliveryFee: 3000,
      total: 23000,
      pickupPin: '5841',
      courierName: 'Rizki (Runner DEMA UIN)',
      courierPhone: OFFICIAL_MERCHANT.whatsappNumber,
      estimatedDeliveryMinutes: 12,
      paidAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    };
    return [sampleOrder];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // 6. Active tracking
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(() => {
    return orders.length > 0 ? orders[0].id : null;
  });

  const activeOrder = orders.find((o) => o.id === activeTrackingOrderId) || orders[0] || null;

  // 7. Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'qris' | 'bsi_transfer'>('qris');

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const deliveryFee = cart.length > 0 ? 3000 : 0; // Flat terjangkau mahasiswa UIN
  const cartTotal = cartSubtotal + deliveryFee;

  const addToCart = (
    item: MenuItem,
    options?: {
      quantity?: number;
      spicyLevel?: number;
      temperature?: string;
      sugar?: string;
      notes?: string;
    }
  ) => {
    const qty = options?.quantity ?? 1;
    const spicy = options?.spicyLevel;
    const temp = options?.temperature;
    const sug = options?.sugar;
    const notes = options?.notes || '';

    // Create a key to match existing cart items with identical customizations
    const existingIndex = cart.findIndex(
      (c) =>
        c.menuItem.id === item.id &&
        c.spicyLevel === spicy &&
        c.temperature === temp &&
        c.sugar === sug &&
        c.notes === notes
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        next[existingIndex].subtotal = next[existingIndex].quantity * item.price;
        return next;
      });
    } else {
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        menuItem: item,
        quantity: qty,
        spicyLevel: spicy,
        temperature: temp,
        sugar: sug,
        notes,
        subtotal: item.price * qty,
      };
      setCart((prev) => [...prev, newCartItem]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              subtotal: newQty * item.menuItem.price,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (paymentMethod: 'qris' | 'bsi_transfer'): Order => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNum = `UIN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      items: [...cart],
      deliveryLocation: { ...deliveryLocation },
      paymentMethod,
      status: 'MENUNGGU_BAYAR',
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      pickupPin: randomPin,
      courierName: 'Kurir Mahasiswa UIN',
      courierPhone: OFFICIAL_MERCHANT.whatsappNumber,
      estimatedDeliveryMinutes: 15,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrder.id);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = { ...o, status };
          if (status === 'DITERIMA' && !o.paidAt) {
            updated.paidAt = new Date().toISOString();
          }
          return updated;
        }
        return o;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        menuItems,
        toggleMenuItemStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        deliveryLocation,
        setDeliveryLocation,
        orders,
        createOrder,
        updateOrderStatus,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        activeOrder,
        isCartOpen,
        setIsCartOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isSupportModalOpen,
        setIsSupportModalOpen,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
