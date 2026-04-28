export interface LoginDetails {
  email: string;
  password: string;
}

export interface UserDetails {
  name: string;
  email: string;
  role?: string
  password: string;
  confirmPassword?: string;
}

export interface UsersSlice {
  loggedInUser: UserDetails;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export interface OrdersList {
  id: string;
  user_id: string;
  final_price: string;
  shipping_cost: string;
  created_at: Date;
  ordered_items: CartItem[];
}


export interface CartItem {
  id?: string;
  order_id: string;
  cart_id?: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export interface CartData {
  id: string;
  user_id: string;
  cart_items: CartItem[];
}

export interface AuthState {
  loggedInUser: UserDetails | null
}

export interface CartState {
  items: CartItem[];
}