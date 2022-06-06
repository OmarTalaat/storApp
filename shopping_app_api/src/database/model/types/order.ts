import Item from "./item";



type Order =  {
   orderid: number;
   status: string;
   adress?: string;
   countryName:string;
   zip:string;
   nameoncard:string;
   creditcardNumber?:string;
   cvv:string;
   exirationDate:string;
   total:number
   userId: number;
   items:Item[];
}


export default Order;

