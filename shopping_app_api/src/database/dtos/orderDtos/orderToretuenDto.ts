export interface OrderToretuenDto {
    id:number;
    status?:string;
    adress?:string;
    countryName:string;
    zip:string;
    nameoncard: string;
    creditcardNumber?:string;
    cvv:string;
    exirationDate: string;
    total:number;

}
