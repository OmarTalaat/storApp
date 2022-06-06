import { ProductDetailsDto } from "../productDtos/productDetailsDto";

export interface ItemDetailsDto {
    id: number;
    quantity: number;
    subtotal:number;
    product:ProductDetailsDto;
}
