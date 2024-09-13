export interface createUserArgsType {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface Product {
  description: string;
  id: string;
  name: string;
  created_at: Date | null;
  price: string;
  quantity: number;
  categoryId: string | null;
  productImage: string;
}

interface Category {
  id: string;
  name: string;
  created_at: Date | null;
}

export interface ProductTypes {
  products: Product;
  categories: Category;
}
