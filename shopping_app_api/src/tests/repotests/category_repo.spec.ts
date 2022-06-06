import { CategoryDetailsDto } from "../../database/dtos/catergoryDtos/categoryDetailsDto";
import { CategoryListDto } from "../../database/dtos/catergoryDtos/categoryListDto";
import categories_repo from "../../database/repository/categoty.repo";




describe('category Model' ,() =>{

    it('should have an index method', () => {
        expect(categories_repo.getallategoriesFromRepo).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(categories_repo.getcategory_FromRepo_ById).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(categories_repo.addcategory_FromRepo).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(categories_repo.updateCategory).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(categories_repo.deletCategory).toBeDefined();
      });



      it('create method should add a category', async () => {
        
         
       const addcategory = await categories_repo.addcategory_FromRepo('Bakery');
       const result:CategoryDetailsDto ={id:addcategory.categoryid , name:addcategory.name }
       expect(result).toEqual({
         id: addcategory.categoryid,
         name: 'Bakery'
       });
     });

     it('show method should return the correct category', async () => {
        setTimeout(async () => {
          const addcategory = await categories_repo.addcategory_FromRepo('Bakery');
          const getcategory = await categories_repo.getcategory_FromRepo_ById(addcategory.categoryid);
          const result:CategoryDetailsDto ={id:getcategory.categoryid , name:getcategory.name }
          expect(result).toEqual({
            id: getcategory.categoryid,
          name: getcategory.name
          })
        }, 2000);
      });

      it('show method should return update category', async () => {
        setTimeout(async () => {
          
          const updatecategory = await categories_repo.updateCategory({id:1 , name: 'Bakery'});
          const result:CategoryDetailsDto ={id:updatecategory.categoryid , name:updatecategory.name }
          expect(result).toEqual({
            id: updatecategory.categoryid,
          name: 'Bakery'
          })
        }, 2000);
      });

      it("index method should return a list of category", async () => {
     
        setTimeout(async () => {
          const categoryListFromrepo = await categories_repo.getallategoriesFromRepo();
    
        const categoryList:CategoryListDto[] =[];
           const categories= categoryListFromrepo.map(category => {
              let  categorydetails:CategoryDetailsDto;
                        categorydetails ={ id: category.categoryid, name: category.name }
                return categorydetails
            })
            

        expect(categoryList).toEqual(categories)
        }, 3000);
      })


      it('delete method should remove the product', async () => {
     
        setTimeout(async () => {
          await categories_repo.deletCategory(1)
          const categoryListFromrepo = await categories_repo.getallategoriesFromRepo();
          const categoryList:CategoryListDto[] =[];
           const categories= categoryListFromrepo.map(category => {
              let  categorydetails:CategoryDetailsDto;
                        categorydetails ={ id: category.categoryid, name: category.name }
                return categorydetails
            })
       expect(categoryList).toEqual(categories)
        }, 6000);
       
      });

})