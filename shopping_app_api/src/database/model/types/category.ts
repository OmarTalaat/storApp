import { type } from "os";
import Product from "./product";


 type Category =  {
    categoryid: number;
    name: string;
    products:Product[];

}


export default Category;

