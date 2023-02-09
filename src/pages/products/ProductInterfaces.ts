export interface ProductType {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  images: string[];
  price: number;
  quantity: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  total: number;
}

export interface ProductResponseType {
  limit: number;
  products: ProductType[];
  skip: number;
  total: number;
}
