import { ProductListDto } from "../productDtos/productListDto";

export interface CategoryDetailsDto {
    id:number;
    name:string;
    products?:ProductListDto[];
}
