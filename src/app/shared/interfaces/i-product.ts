export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  img: {
    path: string;
    alt: string;
  };
  category_id: number;
  availability: boolean
}
