export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableCategories?: string[];
  bannerImage?: string;
  code?: string;
}
