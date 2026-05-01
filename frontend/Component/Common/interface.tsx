export interface IProduct {
  _id?: string;
  productName?: string;
  productDisplayName?: string;
  price?: number;
  description?: string;
  category?: string;
  brand?: string;
  stock?: number;
  isActive?: boolean;
  discount?: number;
  rating?: number;
  createdAt?: string; // or Date if you parse it
  updatedAt?: string; // or Date if you parse it
  __v?: number;
}

export interface IUser {
  userName?: string;
  displayName?: string;
  email?: string;
  password?: string;
  phone?: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  address?: string;
  role?: string;
  _id?: string;
  createdAt?: string; // or Date if you parse it
  updatedAt?: string; // or Date if you parse it
  __v?: number;
}
