import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "../types";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (productId: string, shadeId: string) => void;
  removeItem: (productId: string, shadeId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((productId: string, shadeId: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.shadeId === shadeId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.shadeId === shadeId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { productId, shadeId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string, shadeId: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.shadeId === shadeId)
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, itemCount, addItem, removeItem, clearCart }),
    [items, itemCount, addItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
