// src/hooks/useWhatsApp.ts
import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Product } from '@/data/products';

const fetchWhatsAppNumber = async (): Promise<string> => {
  const { data } = await api.get('/api/v1/whatsapp/number');
  return data.data.number;
};

export const useWhatsApp = () => {
  const [number, setNumber] = useState<string>('');

  useEffect(() => {
    fetchWhatsAppNumber()
      .then(setNumber)
      .catch(() => setNumber(import.meta.env.VITE_WHATSAPP_NUMBER ?? ''));
  }, []);

  const buildOrderUrl = useCallback(
    (product: Product, username: string, phone: string, quantity = 1): string => {
      if (!number) return '#';

      const lines = [
        `Hi Manish Kejani 👋`,
        `I'd like to order the following:`,
        ``,
        `Product: ${product.name}`,
        `Price: KSh ${product.price.toLocaleString()}`,
        `Quantity: ${quantity}`,
        `Total: KSh ${(product.price * quantity).toLocaleString()}`,
        ``,
        `My details:`,
        `Name: ${username}`,
        `Phone: ${phone}`,
        ``,
        `Please confirm availability and delivery. Thank you!`,
      ];

      return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
    },
    [number]
  );

  const openWhatsApp = useCallback(
    (product: Product, username: string, phone: string, quantity = 1) => {
      const url = buildOrderUrl(product, username, phone, quantity);
      if (url !== '#') window.open(url, '_blank');
    },
    [buildOrderUrl]
  );

  return { number, buildOrderUrl, openWhatsApp };
};