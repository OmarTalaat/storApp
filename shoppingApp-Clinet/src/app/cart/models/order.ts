import { Item } from "./item";

export interface Order {
  id:number;
  status:string;
  itemcount?:number;
  total?:number;
  adress:string;
  countryName:string;
  zip:string;
  nameoncard:string;
  creditcardNumber:string;
  exirationDate:string;
  cvv:string;
  items?:Item[];
}
