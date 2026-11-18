'use client';

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import type { Product, RABItem, SchoolInfo } from '@/types/product';

interface RABContextType {
  items: RABItem[];
  schoolInfo: SchoolInfo;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateSchoolInfo: (info: Partial<SchoolInfo>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const RABContext = createContext<RABContextType | undefined>(undefined);

const STORAGE_KEY = 'mahalaleel-rab-cart';
const SCHOOL_STORAGE_KEY = 'mahalaleel-school-info';

const defaultSchoolInfo: SchoolInfo = {
  schoolName: '',
  city: '',
  contactPerson: '',
  notes: '',
};

export function RABProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RABItem[]>([]);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(defaultSchoolInfo);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      const savedSchool = localStorage.getItem(SCHOOL_STORAGE_KEY);
      if (savedSchool) {
        setSchoolInfo(JSON.parse(savedSchool));
      }
    } catch (e) {
      console.error('Failed to load RAB from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(schoolInfo));
    }
  }, [schoolInfo, isHydrated]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const updateSchoolInfo = useCallback((info: Partial<SchoolInfo>) => {
    setSchoolInfo(prev => ({ ...prev, ...info }));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    if (item.product.price_numeric > 0) {
      return sum + item.product.price_numeric * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <RABContext.Provider
      value={{
        items,
        schoolInfo,
        addItem,
        removeItem,
        updateQuantity,
        updateSchoolInfo,
        clearCart,
        totalItems,
        totalPrice,
        isDrawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </RABContext.Provider>
  );
}

export function useRAB() {
  const context = useContext(RABContext);
  if (!context) {
    throw new Error('useRAB must be used within a RABProvider');
  }
  return context;
}
