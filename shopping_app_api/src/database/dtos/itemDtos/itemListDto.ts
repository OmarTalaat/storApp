import { ProductDetailsDto } from "../productDtos/productDetailsDto";

export interface ItemListDto {
    id: number;
    quantity: number;
    product:ProductDetailsDto;

}
