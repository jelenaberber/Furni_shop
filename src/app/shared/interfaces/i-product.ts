export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: {
    path: string;
    alt: string;
  };
  category_id: number;
  available: boolean
}
