import { ItemDetailsDto } from "../../database/dtos/itemDtos/itemDetailsDto";
import { ItemEditDto } from "../../database/dtos/itemDtos/itemEditDto";
import { ItemListDto } from "../../database/dtos/itemDtos/itemListDto";
import { ProductDetailsDto } from "../../database/dtos/productDtos/productDetailsDto";
import { UserForLoginDto } from "../../database/dtos/userDtos/userForLoginDto";
import { UserForRegisterDto } from "../../database/dtos/userDtos/userForRegisterDto";
import categories_repo from "../../database/repository/categoty.repo";
import itemrepo from "../../database/repository/item.repo";
import orderRepo from "../../database/repository/order.repo";
import productRepo from "../../database/repository/products.repo";
import UserRepo from "../../database/repository/user.repo";
import adminService from "../../services/admin-services";
import authService from "../../services/auth-services";
import status from "../../helper/status ";



describe('item Model' , () =>{




    it('should have an index method', () => {
        expect(itemrepo.getitemsbyorder).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(itemrepo.getItem_detailes).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(itemrepo.addProduct).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(itemrepo.update_quantity_Item).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(itemrepo.deleteItem).toBeDefined();
      });

      let userforregister:UserForRegisterDto;
      userforregister={username:'usertest',password:'password'}
      let userforlogin:UserForLoginDto;
      userforlogin={username:'usertest' , password:'password'}
      let product:ProductDetailsDto 

      let userId:number;
      let orderid:number;
      let categoryId:number;
      let name:string ='producttest'
      let price:number = 10
      let url:string = 'example url'
      let description:string ='example description'
      const quantity:number =1
      let productId:number;
      beforeAll(async()=>{
        let newuser = await UserRepo.createUser(userforregister);
        let user = await authService.SignIn(userforlogin);
        const order = await orderRepo.createOrder(status.Active , userId)
        const category=  await categories_repo.addcategory_FromRepo('Dairy')
        const addproduct = await productRepo.addProductRepo(name,url,price,description,categoryId);

        userId=user!.user.id
        orderid= order.orderid
        categoryId = category.categoryid
        productId= addproduct.productid
        product={id:addproduct.productid ,name:addproduct.name,url:addproduct.url ,price:addproduct.price,description:addproduct.description}
    })

    


    
      it('create method should add a item', async () => {
        const item = await itemrepo.addProduct(quantity,orderid,productId);
        const result:ItemDetailsDto ={id:item.itemid , quantity:item.quantity, product:product ,subtotal:item.quantity * product.price }
        expect(result).toEqual({
          id: item.itemid,
          quantity: item.quantity,
          product: product,
          subtotal: item.quantity * product.price
        });
      });

      it('show method should return the correct item', async () => {
        setTimeout(async () => {
          const item = await itemrepo.getItem_detailes(1);
          const result:ItemDetailsDto ={id:item.itemid , quantity:item.quantity ,product:product  ,subtotal: item.quantity * product.price}
          expect(result).toEqual({
            id: item.itemid,
          quantity: item.quantity,
          product:product,
          subtotal: item.quantity * product.price
          })
        }, 2000);
      });

      it('show method should return update item', async () => {
        setTimeout(async () => {
          const item = await itemrepo.update_quantity_Item(1 ,2);
          const result:ItemEditDto ={id:item.itemid , quantity:item.quantity  }
          expect(result).toEqual({
            id: item.itemid,
          quantity: item.quantity
          })
        }, 4000);
      });

      it("index method should return a list of items", async () => {
     
        setTimeout(async () => {

          const itemListFromrepo = await itemrepo.getitemsbyorder(orderid);
        const itemList:Awaited<ItemListDto[]> =[];
           const items= Promise.all(itemListFromrepo.map( async (item) => {
            let  itemdetails:ItemDetailsDto;
            itemdetails ={ id: item.itemid, quantity: item.quantity, product:product , subtotal: item.quantity * product.price }
              return itemdetails
          }))
        expect( itemList).toEqual( await items)
        }, 6000);
      });


      it('delete method should remove the item', async () => {
     
        setTimeout(async () => {
          await itemrepo.deleteItem(1)


          const itemListFromrepo = await itemrepo.getitemsbyorder(orderid);
        const itemList:Awaited<ItemListDto[]> =[];
           const items= Promise.all(itemListFromrepo.map( async (item) => {
            let  itemdetails:ItemDetailsDto;
            itemdetails ={ id: item.itemid, quantity: item.quantity, product:product , subtotal: item.quantity * product.price }
              return itemdetails
          }))
        expect( itemList).toEqual( await items)
        }, 10000);
       
      });
})