import { CategoryDetailsDto } from "../database/dtos/catergoryDtos/categoryDetailsDto";
import { CategoryListDto } from "../database/dtos/catergoryDtos/categoryListDto";
import { ProductDetailsDto } from "../database/dtos/productDtos/productDetailsDto";
import { ProductListDto } from "../database/dtos/productDtos/productListDto";
import categories_repo from "../database/repository/categoty.repo";
import productRepo from "../database/repository/products.repo";









const getCategoryById = async(id: number) =>{
    try {
        const existingCategory = await categories_repo.getcategory_FromRepo_ById(id);
        const productsToreturn = await productRepo.getAllproductsbycategory_repo(id);
        
       let products=  Promise.all(productsToreturn.map(pro =>{
        let productdetails:ProductDetailsDto
          productdetails={ id:pro.productid , name:pro.name , price:pro.price , url:pro.url}
        return productdetails
    } ))
        var categoery: CategoryDetailsDto
        return categoery={id:existingCategory.categoryid ,name:existingCategory.name , products:await products}
    } catch (error) {
        return new Error('can not get Category')
    }
}


const getcategories_services = async()=>{
    
    const categoriesInrepo = await categories_repo.getallategoriesFromRepo();
  
        let categories = Promise.all(categoriesInrepo.map(async cat =>{
            let categoery:CategoryDetailsDto;
            const productsToreturn = await productRepo.getAllproductsbycategory_repo(cat.categoryid);
        
                let products=  Promise.all(productsToreturn.map(pro =>{
                    let productdetails:ProductDetailsDto
                    productdetails={ id:pro.productid , name:pro.name , price:pro.price , url:pro.url}
                    return productdetails
                    } ))

            categoery={ id: cat.categoryid , name:cat.name , products: await products}
                    return categoery
        }))
        
     
    return categories
    

}





const categoriesService = {

    getCategoryById,
    getcategories_services

}

export default categoriesService;


