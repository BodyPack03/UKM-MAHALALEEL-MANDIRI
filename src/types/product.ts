export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  school_area: string;
  price_numeric: number;
  price_display: string;
  unit: string;
  specs: string;
  pdf_page: number;
  featured: boolean;
  image_path: string;
  customizable: boolean;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export interface SchoolArea {
  slug: string;
  name: string;
  subtitle: string;
}

export interface RABItem {
  product: Product;
  quantity: number;
}

export interface SchoolInfo {
  schoolName: string;
  city: string;
  contactPerson: string;
  notes: string;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  category_label: string;
  region: string;
  contacts: ContactInfo[];
}

export interface ContactInfo {
  name: string;
  phone_display: string;
  wa_e164?: string;
  wa_number_note?: string;
  role: string;
}

export interface ProductsData {
  brand: BrandInfo;
  categories: Category[];
  school_areas: SchoolArea[];
  total_products: number;
  products: Product[];
}
