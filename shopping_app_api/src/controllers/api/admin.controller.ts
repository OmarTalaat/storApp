
import { NextFunction, Request, Response } from "express";
import { CategoryForEditDto } from "../../database/dtos/catergoryDtos/categoryForEditDto";
import { CategoryToaddDto } from "../../database/dtos/catergoryDtos/categoryToaddDto";
import { ProductAddDto } from "../../database/dtos/productDtos/productAddDto";
import { ProductEditDto } from "../../database/dtos/productDtos/productEditDto";
import adminService from "../../services/admin-services";







const getAllUsers =async (req:Request,res:Response) => {

    const users = await adminService.getAlluserForAdmin();
   
    res.status(200).json(users);
}


const delete_user =async(req:Request,res:Response) =>{

    const remove_user = await adminService.deleteUser(parseInt(req.params.userId));

    res.status(200).json({message: `successfully remove user with id:${req.params.userId} `})

}




// ---------------------- categories ----------------------------------------------

const addCategory = async (req:Request, res:Response,next:NextFunction) => {
    try {
        const category: CategoryToaddDto = {
            name: req.body.name
        }
        const data  = await adminService.addCategory(category.name); 

       return res.status(201).json({category:data});
        
    } catch (err) {
        throw new Error(`can not Add category due to ${err}`)
    }
    
    
}

const updateCategory = async(req:Request, res:Response,next:NextFunction) => {
    try {
        
        const category: CategoryForEditDto = {
            id: parseInt(req.params.categoryId),
            name: req.body.name
        }

        
        const categoryToreturne = await adminService.editCategory(category)
        return res.status(204).json({categoryToreturne ,message: 'update successfully'})

    } catch (err) {
        throw new Error(`we can not update ${err}`)
    }
}

const deleteCategory =async(req:Request, res:Response) =>{
    try {
        const remove_category = await adminService.deleteCategory(parseInt(req.params.categoryId));

    res.status(200).json({message: `successfully remove category  with Id:${req.params.categoryId} `})
    } catch (err) {
        throw new Error(`can not delete category with Id:${req.params.categoryId} error: ${err}`)
    }
}

// -------------------------------------products ----------------------------------------------------



const addProduct = async(req:Request, res:Response,next:NextFunction) => {
  try {
    const category_id =  parseInt(req.params.categoryId)
    const product:ProductAddDto= {
        name: req.body.name,
        price:req.body.price,
        url:req.body.url,
        description:req.body.description
    }
  
    const data  = await adminService.addProduct(product,category_id)

     res.status(201).send({product:data , message: "product created successfully"});
  } catch (err) {
      throw new Error(`can not add this product due to ${err}`)
  }
  };

const updateProduct = async(req:Request, res:Response)=>{
    try {
        const product:ProductEditDto= {
            id:parseInt(req.params.productId),
            name: req.body.name,
            price:req.body.price,
            url:req.body.url,
            description:req.body.description
        }
        const updatededProduct = await adminService.updateProduct(product);
              res.status(204).json({updatededProduct, message: 'product updated successfully '})
    } catch (err) {
        throw new Error(`can not update this product due to ${err}`)
    }
}

const deleteProduct = async(req:Request, res:Response)=>{
    try {
        const remove_product = await adminService.deleteProduct(parseInt(req.params.productId));

    res.status(200).json({message: `successfully remove All products  with categoryId:${req.params.productId} `})
    } catch (err) {
        throw new Error(`can not delete all products with categoryId:${req.params.productId} error: ${err}`)
    }
}




const admin ={
    addProduct,
    getAllUsers,
    addCategory,
    delete_user,
    updateCategory,
    updateProduct,
    deleteProduct,
    deleteCategory
}


export default admin