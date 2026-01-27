export interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  sold: number;
  revenue: number;
  createdAt: string;
}
