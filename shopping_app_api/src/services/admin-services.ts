import { CategoryDetailsDto } from "../database/dtos/catergoryDtos/categoryDetailsDto";
import { CategoryForEditDto } from "../database/dtos/catergoryDtos/categoryForEditDto";
import { CategoryToaddDto } from "../database/dtos/catergoryDtos/categoryToaddDto";
import { ProductAddDto } from "../database/dtos/productDtos/productAddDto";
import { ProductDetailsDto } from "../database/dtos/productDtos/productDetailsDto";
import { ProductEditDto } from "../database/dtos/productDtos/productEditDto";
import { UserForListDto } from "../database/dtos/userDtos/userForListDto";
import Category from "../database/model/types/category";
import Product from "../database/model/types/product";
import categories_repo from "../database/repository/categoty.repo";
import productRepo from "../database/repository/products.repo";
import RoleRepo from "../database/repository/role.repo";
import UserRepo from "../database/repository/user.repo";
import password_Util from "../utilities/password-utilit";


const rolerepo = new RoleRepo();
///   users conrole -----------------------------------------------------
const getAllUser = async()=>{

   try {
    const usersInrepo = await UserRepo.getUsers();
    var userlist: UserForListDto[] =[];
    usersInrepo.forEach(user => {
        userlist.push({id:user.userid ,username:user.username})
    })
    return userlist;
   } catch (err) {
       throw new Error(`can not get data for all users due to ${err}`)
   }
}


const deleteUser = async(userId:number) =>{
    try {

        const remove_user_from_roles = await rolerepo.deletuser_from_roles(userId);

        const remove_user =await UserRepo.delete_User(userId);
        return null;
        
    } catch (error) {
        throw new Error(`coud not delete this user with id:${userId}`)
    }
}

// ------- Category controle ------------------------------------------------------------------


const addCategory = async(name:string) =>{
    try {

        const catergoryfromrepo = await categories_repo.addcategory_FromRepo(name);

        var categoery:CategoryDetailsDto
         categoery={id:catergoryfromrepo.categoryid ,name:catergoryfromrepo.name}
         return categoery
    } catch (error) {
        throw new Error(`you cant create this category ${error}` )
    }
    
}
const editCategory = async(cat:CategoryForEditDto) => {
    try {
        
        const catergoryfromrepo = await categories_repo.updateCategory(cat);
        var categoery:CategoryDetailsDto
         categoery={id:catergoryfromrepo.categoryid ,name:catergoryfromrepo.name }
         return categoery
   
    } catch (err) {
        throw new Error(`can not update this category ${cat.name} error:${err}`)
    }
}
const deleteCategory = async(id:number) => {
    try {
        
        const deleteAllproducts = await productRepo.deletAllproductby_categoryId(id);
        
        const removecatergoryfromrepo = await categories_repo.deletCategory(id);

        return removecatergoryfromrepo
    } catch (err) {
        throw new Error(`can not delete this category ${id} error:${err}`)
    }
}

// --------- product controle ---------------------------------------------------------------------
const addProduct = async(productToCreat:ProductAddDto,category_id:number) => {
    try {
        
        const productfromrepo = await productRepo.addProductRepo(productToCreat.name,productToCreat.url,productToCreat.price ,productToCreat.description,category_id);
        var product:ProductDetailsDto
         product={id:productfromrepo.productid ,name:productfromrepo.name , price: productfromrepo.price};
         return product
    } catch (error) {
        throw new Error(`you cant create this product ${error}` )
    }
}

const updateProduct = async(product:ProductEditDto) => {
    try {
        const updatedProduct = await productRepo.editProduct(product);

        var productToreturn:ProductDetailsDto;

        return productToreturn={id:updatedProduct.productid,name:updatedProduct.name,price:updatedProduct.price , url:updatedProduct.url , description:updatedProduct.description}

    } catch (err) {
        throw new Error(`can not update product ${product.name}`);
    }
}


const deleteProduct = async(id:number) => {
    try {
        const remove_product = await productRepo.deleteProduct(id);
        return remove_product
    } catch (err) {
        throw new Error(`can not remove this product error: ${err}`)
    }
}





const adminService = {
    getAlluserForAdmin:getAllUser,
    deleteUser,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    editCategory,
    deleteCategory
}


export default adminService;