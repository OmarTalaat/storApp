import { Request, Response } from "express";
import productsService from "../../services/products-services";





const getAllProductsbycategory = async(req:Request,res:Response)=>{
   try {
    if (req.params.userId  != req.body.decoded.id) {
        return res.status(401).send({message: "Unauthorized!"});}
        const categoryId = parseInt(req.params.categoryId)
        const products = await productsService.getproductsbycategory(categoryId);
        res.status(200).json(products);
   } catch (err) {
       throw new Error(`can not get list of products due to :${err}`)
   }

}


const getproductbyId = async(req:Request,res:Response) =>{
   try {
    if (req.params.userId  != req.body.decoded.id) {
        return res.status(401).send({message: "Unauthorized!"});}
        const productId = parseInt(req.params.productId)
        const product = await productsService.getproductbyId(productId)
        res.status(200).json(product);
   } catch (err) {
       throw new Error(`can not get this product due to ${err}`)
   }

}




const productController ={
    getAllProductsbycategory,
    getproductbyId
}

export default productController;