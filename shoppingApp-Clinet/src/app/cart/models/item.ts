import { Product } from "../../products/models/product";

export interface Item {
    id: number;
    quantity: number;
    subtotal:number;
    product:Product;
}
