"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  BRANCHES,
  MIE_BASES,
  SPICY_LEVEL_INFO,
  TOPPING_OPTIONS,
} from "@/data/warmindoData";
import {
  CartItem,
  CustomMieConfig,
  DonenessLevel,
  MenuItem,
  OrderMethod,
  ReservationTicket,
  ToastMessage,
} from "@/types/warmindo";

const DEFAULT_CUSTOM_MIE: CustomMieConfig = {
  baseId: "goreng-original",
  doneness: "Pas (Kenyal)",
  spicyLevel: 2,
  toppingIds: ["telur-setengah-matang", "keju-mozzarella"],
  doublePortion: false,
  customName: "",
  note: "",
};

interface OrderCheckoutState {
  method: OrderMethod;
  branchId: string;
  tableNumber: string;
  customerName: string;
  deliveryAddress: string;
  notes: string;
}

interface WarmindoState {
  cart: CartItem[];
  customMie: CustomMieConfig;
  reservations: ReservationTicket[];
  activeTicketCode: string | null;
  checkout: OrderCheckoutState;
  isCartOpen: boolean;
  toasts: ToastMessage[];

  // Cart actions
  setCartOpen: (open: boolean) => void;
  addRegularItemToCart: (item: MenuItem) => void;
  addCustomMieToCart: () => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;

  // Custom Mie Studio actions
  setCustomBase: (baseId: string) => void;
  setCustomDoneness: (doneness: DonenessLevel) => void;
  setCustomSpicyLevel: (level: 0 | 1 | 2 | 3 | 4 | 5) => void;
  toggleCustomTopping: (toppingId: string) => void;
  setCustomDoublePortion: (doublePortion: boolean) => void;
  setCustomName: (name: string) => void;
  setCustomNote: (note: string) => void;
  randomizeCustomMie: () => void;
  resetCustomMie: () => void;

  // Checkout actions
  updateCheckout: (patch: Partial<OrderCheckoutState>) => void;

  // Reservation actions
  addReservation: (ticket: ReservationTicket) => void;
  setActiveTicketCode: (code: string | null) => void;
  deleteReservation: (bookingCode: string) => void;

  // Toast actions
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

export function calculateCustomMieSummary(config: CustomMieConfig) {
  const base =
    MIE_BASES.find((b) => b.id === config.baseId) ?? MIE_BASES[0];
  const selectedToppings = TOPPING_OPTIONS.filter((t) =>
    config.toppingIds.includes(t.id)
  );
  const spicyInfo = SPICY_LEVEL_INFO[config.spicyLevel];

  const basePrice = config.doublePortion ? base.price + 6500 : base.price;
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const spicyPrice = spicyInfo.extraPrice;
  const totalPrice = basePrice + toppingsPrice + spicyPrice;

  const baseCalories = config.doublePortion
    ? Math.round(base.calories * 1.85)
    : base.calories;
  const toppingsCalories = selectedToppings.reduce(
    (sum, t) => sum + t.calories,
    0
  );
  const spicyCalories = config.spicyLevel * 8;
  const totalCalories = baseCalories + toppingsCalories + spicyCalories;

  return {
    base,
    selectedToppings,
    spicyInfo,
    basePrice,
    toppingsPrice,
    spicyPrice,
    totalPrice,
    totalCalories,
  };
}

export const useWarmindoStore = create<WarmindoState>()(
  persist(
    (set, get) => ({
      cart: [],
      customMie: DEFAULT_CUSTOM_MIE,
      reservations: [],
      activeTicketCode: null,
      checkout: {
        method: "dine-in",
        branchId: BRANCHES[0].id,
        tableNumber: "",
        customerName: "",
        deliveryAddress: "",
        notes: "",
      },
      isCartOpen: false,
      toasts: [],

      setCartOpen: (open) => set({ isCartOpen: open }),

      addRegularItemToCart: (item) => {
        const cart = get().cart;
        const existing = cart.find(
          (c) => c.type === "regular" && c.menuItemId === item.id
        );

        if (existing) {
          set({
            cart: cart.map((c) =>
              c.cartItemId === existing.cartItemId
                ? { ...c, quantity: c.quantity + 1 }
                : c
            ),
          });
        } else {
          const newItem: CartItem = {
            cartItemId: `reg-${item.id}`,
            type: "regular",
            menuItemId: item.id,
            name: item.name,
            image: item.image,
            unitPrice: item.price,
            calories: item.calories,
            quantity: 1,
          };
          set({ cart: [...cart, newItem] });
        }

        get().pushToast({
          title: "Masuk Keranjang!",
          description: `${item.name} siap dipesan.`,
          variant: "success",
        });
      },

      addCustomMieToCart: () => {
        const config = get().customMie;
        const summary = calculateCustomMieSummary(config);
        const sortedToppings = [...config.toppingIds].sort().join(",");
        const signatureKey = `custom-${config.baseId}-${config.doneness}-lvl${config.spicyLevel}-${config.doublePortion ? "2x" : "1x"}-${sortedToppings}-${config.customName.trim()}-${config.note.trim()}`;

        const displayName = config.customName.trim()
          ? `Racikan "${config.customName.trim()}"`
          : `Racikan ${summary.base.name}${config.doublePortion ? " (Jumbo 2x)" : ""}`;

        const cart = get().cart;
        const existing = cart.find((c) => c.cartItemId === signatureKey);

        if (existing) {
          set({
            cart: cart.map((c) =>
              c.cartItemId === signatureKey
                ? { ...c, quantity: c.quantity + 1 }
                : c
            ),
          });
        } else {
          const newCustomItem: CartItem = {
            cartItemId: signatureKey,
            type: "custom",
            name: displayName,
            image:
              summary.base.style === "Goreng"
                ? "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80"
                : "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
            unitPrice: summary.totalPrice,
            calories: summary.totalCalories,
            quantity: 1,
            customDetails: {
              baseName: summary.base.name,
              style: summary.base.style,
              doneness: config.doneness,
              spicyLevel: config.spicyLevel,
              toppings: summary.selectedToppings.map((t) => t.shortName),
              doublePortion: config.doublePortion,
              note: config.note.trim() || undefined,
            },
          };
          set({ cart: [...cart, newCustomItem] });
        }

        get().pushToast({
          title: "Racikan Custom Ditambahkan!",
          description: `${displayName} • Level ${config.spicyLevel} (${summary.selectedToppings.length} topping)`,
          variant: "success",
        });
      },

      updateCartItemQuantity: (cartItemId, delta) => {
        const cart = get().cart;
        const updated = cart
          .map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0);
        set({ cart: updated });
      },

      removeCartItem: (cartItemId) => {
        set({
          cart: get().cart.filter((item) => item.cartItemId !== cartItemId),
        });
      },

      clearCart: () => set({ cart: [] }),

      setCustomBase: (baseId) =>
        set((state) => ({
          customMie: { ...state.customMie, baseId },
        })),

      setCustomDoneness: (doneness) =>
        set((state) => ({
          customMie: { ...state.customMie, doneness },
        })),

      setCustomSpicyLevel: (spicyLevel) =>
        set((state) => ({
          customMie: { ...state.customMie, spicyLevel },
        })),

      toggleCustomTopping: (toppingId) =>
        set((state) => {
          const exists = state.customMie.toppingIds.includes(toppingId);
          const toppingIds = exists
            ? state.customMie.toppingIds.filter((id) => id !== toppingId)
            : [...state.customMie.toppingIds, toppingId];
          return {
            customMie: { ...state.customMie, toppingIds },
          };
        }),

      setCustomDoublePortion: (doublePortion) =>
        set((state) => ({
          customMie: { ...state.customMie, doublePortion },
        })),

      setCustomName: (customName) =>
        set((state) => ({
          customMie: { ...state.customMie, customName },
        })),

      setCustomNote: (note) =>
        set((state) => ({
          customMie: { ...state.customMie, note },
        })),

      randomizeCustomMie: () => {
        const randomBase =
          MIE_BASES[Math.floor(Math.random() * MIE_BASES.length)];
        const donenessPool: DonenessLevel[] = [
          "Al Dente",
          "Pas (Kenyal)",
          "Lembek",
        ];
        const randomDoneness =
          donenessPool[Math.floor(Math.random() * donenessPool.length)];
        const randomSpicy = Math.floor(Math.random() * 6) as
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5;
        const shuffledToppings = [...TOPPING_OPTIONS].sort(
          () => Math.random() - 0.5
        );
        const count = 2 + Math.floor(Math.random() * 3); // 2 to 4 toppings
        const selectedIds = shuffledToppings.slice(0, count).map((t) => t.id);

        set({
          customMie: {
            baseId: randomBase.id,
            doneness: randomDoneness,
            spicyLevel: randomSpicy,
            toppingIds: selectedIds,
            doublePortion: Math.random() > 0.72,
            customName: "Chef Mystery Bowl",
            note: "",
          },
        });

        get().pushToast({
          title: "Racikan Acak Siap!",
          description: `${randomBase.name} • ${randomDoneness} • Level ${randomSpicy}`,
          variant: "info",
        });
      },

      resetCustomMie: () => set({ customMie: DEFAULT_CUSTOM_MIE }),

      updateCheckout: (patch) =>
        set((state) => ({
          checkout: { ...state.checkout, ...patch },
        })),

      addReservation: (ticket) =>
        set((state) => ({
          reservations: [ticket, ...state.reservations],
          activeTicketCode: ticket.bookingCode,
        })),

      setActiveTicketCode: (code) => set({ activeTicketCode: code }),

      deleteReservation: (bookingCode) =>
        set((state) => {
          const remaining = state.reservations.filter(
            (r) => r.bookingCode !== bookingCode
          );
          return {
            reservations: remaining,
            activeTicketCode:
              state.activeTicketCode === bookingCode
                ? remaining[0]?.bookingCode ?? null
                : state.activeTicketCode,
          };
        }),

      pushToast: (toast) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        set((state) => ({
          toasts: [...state.toasts.slice(-2), { ...toast, id }],
        }));
        if (typeof window !== "undefined") {
          window.setTimeout(() => {
            get().dismissToast(id);
          }, 3200);
        }
      },

      dismissToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "warmindo-nusantara-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        customMie: state.customMie,
        reservations: state.reservations,
        activeTicketCode: state.activeTicketCode,
        checkout: state.checkout,
      }),
    }
  )
);

