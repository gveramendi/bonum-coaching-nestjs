export interface Product extends Document {
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
}