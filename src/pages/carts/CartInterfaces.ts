import { ProductType } from '../products/ProductInterfaces';

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
}

export interface CartProductType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface CartType {
  id: number;
  products: ProductType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  user: UserType;
}

export interface CartResponseType {
  limit: number;
  carts: CartType[];
  skip: number;
  total: number;
}
