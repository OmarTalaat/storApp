import { Request, Response } from "express";
import categoriesService from "../../services/category-services";








const getCategory =async (req:Request,res:Response) => {
    try {
    if (req.params.userId  != req.body.decoded.id) {
     return res.status(401).send({message: "Unauthorized!"});}
     const categoryId = parseInt(req.params.categoryId)
      const category = await categoriesService.getCategoryById(categoryId);
      return res.status(200).json({category:category});
    } catch (err) {
        throw new Error(`can not get categoery ${err}`)
    }
 }



 const getcategories =async (req:Request,res:Response) => {
     try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
        const categories = await categoriesService.getcategories_services();
        res.status(200).json(categories);
     } catch (error) {
         return error
     }
   
}

const getpubiliccategories =async (req:Request,res:Response) => {
    try {
      
       const categories = await categoriesService.getcategories_services();
       res.status(200).json(categories);
    } catch (error) {
        return error
    }
  
}




const categories_controller ={
    getCategory,
    getcategories,
    getpubiliccategories
}

export default categories_controller