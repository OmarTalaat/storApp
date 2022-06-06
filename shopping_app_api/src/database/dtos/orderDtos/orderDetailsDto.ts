import { ItemDetailsDto } from "../itemDtos/itemDetailsDto";
import { ItemListDto } from "../itemDtos/itemListDto";

export interface OrderDetailsDto {
    id:number;
    status:string;
    itemcount?:number;
    total?:number;
    adress?:string;
    items?:ItemListDto[];

}
