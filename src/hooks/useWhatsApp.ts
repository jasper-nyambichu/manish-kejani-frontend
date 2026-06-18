import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import type { Product } from "@/types/product.types";

const fetchWhatsAppNumber = async (): Promise<string> => {
  const { data } = await api.get("/api/v1/whatsapp/number");
  return data.data?.number ?? "";
};

export const useWhatsApp = () => {
  const [number, setNumber] = useState<string>(
    import.meta.env.VITE_WHATSAPP_NUMBER ?? ""
  );

  useEffect(() => {
    fetchWhatsAppNumber()
      .then(setNumber)
      .catch(() => {});
  }, []);

  const buildOrderUrl = useCallback(
    (product: Product, username: string, phone: string, quantity = 1): string => {
      const n = number || import.meta.env.VITE_WHATSAPP_NUMBER;
      if (!n) return "#";

      const imageUrl = product.images?.[0]?.url ?? (product as any).image ?? "";
      const productId = product.id ?? (product as any)._id ?? "";
      const discount = product.discountPercent ?? (product as any).discount ?? 0;
      const originalPrice = product.originalPrice;
      const productUrl = window.location.origin + "/product/" + productId;

      const lines: string[] = [
        "📦 *NEW ORDER - Manish Households*",
        "----------------------",
        "*Product:* " + product.name,
        "*Price:* KSh " + product.price.toLocaleString(),
        "*Quantity:* " + quantity,
        "*Total:* KSh " + (product.price * quantity).toLocaleString(),
      ];

      if (originalPrice) {
        lines.push("*Original Price:* KSh " + originalPrice.toLocaleString());
      }

      if (discount > 0) {
        lines.push("*Discount:* " + discount + "% OFF 🔥");
      }

      lines.push("----------------------");
      lines.push("*Customer Details:*");
      lines.push("*Name:* " + username);
      lines.push("*Phone:* " + phone);
      lines.push("----------------------");
      lines.push("🔗 *View Product Page:*");
      lines.push(productUrl);

      if (imageUrl) {
        lines.push("🖼️ *Product Image:*");
        lines.push(imageUrl);
      }

      lines.push("----------------------");
      lines.push("Hello! I would like to order the above product. Kindly confirm availability and delivery details. Thank you! 🙏");

      return "https://wa.me/" + n + "?text=" + encodeURIComponent(lines.join("\n"));
    },
    [number]
  );

  const openWhatsApp = useCallback(
    (product: Product, username: string, phone: string, quantity = 1) => {
      const url = buildOrderUrl(product, username, phone, quantity);
      if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");
    },
    [buildOrderUrl]
  );

  return { number, buildOrderUrl, openWhatsApp };
};