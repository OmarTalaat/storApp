import supertest, { agent } from "supertest";
import { CategoryToaddDto } from "../../database/dtos/catergoryDtos/categoryToaddDto";
import { UserForEditDto } from "../../database/dtos/userDtos/userForEditDto";
import { UserForLoginDto } from "../../database/dtos/userDtos/userForLoginDto";
import { UserForRegisterDto } from "../../database/dtos/userDtos/userForRegisterDto";
import { CategoryDetailsDto } from "../../database/dtos/catergoryDtos/categoryDetailsDto";
import app from "../../server";
import authService from "../../services/auth-services";
import adminService from "../../services/admin-services";
import { ProductAddDto } from "../../database/dtos/productDtos/productAddDto";
import productsService from "../../services/products-services";
import orderservice from "../../services/orders-services";
import { OrderEditDto } from "../../database/dtos/orderDtos/orderEditDto";
import itemService from "../../services/item-services";
import { ItemEditDto } from "../../database/dtos/itemDtos/itemEditDto";
import { CategoryForEditDto } from "../../database/dtos/catergoryDtos/categoryForEditDto";
import { ProductEditDto } from "../../database/dtos/productDtos/productEditDto";





const request =  supertest(app)





describe('All Endpoints For The App' ,async () =>{

    let userId:number;
    let token: string;
    let existingUsername:string;
    let categoryId:number;
    let productId:number;
    let orderId:number;
    let orederId_ForItem:number;
    let itemId:number;
    let AdminToken: string;
    let userId_foradmintest:number;
    let categoryfortestId:number;
    let producttestId:number;


    let userforregister:UserForRegisterDto;
    let userforlogin:UserForLoginDto;
    let newcategoryDto:CategoryToaddDto;
    let newcategoryfortestDto:CategoryToaddDto;
    let CategoryDetailsDto:CategoryDetailsDto;
    let productToadd:ProductAddDto;
    let Adminforlogin:UserForLoginDto;
    let userforregister_fortestadmin:UserForRegisterDto;
    let userfor_Adminlogin:UserForLoginDto;
    let addCategorytest:CategoryToaddDto;
    let productToaddtest:ProductAddDto;

    beforeAll(async()=>{

    
           // auth methods
             userforregister={username:'usertestApp',password:'password'}
                  const newuser = await authService.signUp(userforregister);
             userforlogin={username:'usertestApp' , password:'password'}
                  const user = await authService.SignIn(userforlogin)
                          userId =user!.user.id
                          token= user!.token
                  const existingUser = await authService.isusernameexist(userforlogin.username);
                        existingUsername = existingUser!.username
          // categories methods
            newcategoryDto={name:'categoery test'}
            const categoery = await adminService.addCategory(newcategoryDto.name)
                  categoryId=categoery.id

            // product methods

                        productToadd={name:'product1' ,url:'url example', price:10,description:'description test'}
            let newproduct = await adminService.addProduct(productToadd,categoryId)
                        productId = newproduct.id
            //oreder methods

            let ordernew =await orderservice.createOrderService('Active',userId)
            orderId=ordernew.id

            let ordernewforitem =await orderservice.createOrderService('Active',userId)
            orederId_ForItem=ordernewforitem.id

            // item method
            let itemtoreturn =await itemService.addProduct(1 ,orderId, productId )
            itemId = itemtoreturn.id
            // Admin test methods

            userforregister_fortestadmin={username:'usertest_forAdmin',password:'password'}
            const newuser_foradmin= await authService.signUp(userforregister_fortestadmin);
                    Adminforlogin={username:'Admin' , password:'$2b$10$DaV1APn3ehdp/zbAXpqCWO6KMgUlh.kM2ayRhBxVXjGSncUAuz9zW'}
            const admin = await authService.SignIn(Adminforlogin)
                    AdminToken= admin!.token
                    userfor_Adminlogin={username:'usertest_forAdmin',password:'password'}
            const userforAdmintest = await authService.SignIn(userfor_Adminlogin)
                    userId_foradmintest = userforAdmintest!.user.id
                    newcategoryfortestDto={name:'categoery test2'}
            const categoerytest = await adminService.addCategory(newcategoryfortestDto.name)
                  categoryfortestId=categoerytest.id

                  productToaddtest={name:'producttestadmin1' ,url:'url example', price:10 ,description:'descrption example'}
             const newproducttest = await adminService.addProduct(productToaddtest,categoryId)
                        producttestId = newproducttest.id

    })
    

        describe('users endpoints test', ()=>{


            it("gets the register endpoint",   () => {
                let usertestegister:UserForRegisterDto;
                usertestegister={username:'usertestregister',password:'password'}
            request
                .post("/api/auth/register")
                .send(usertestegister)
                .end(( err,res) => {
                    expect(res.status).toEqual(201)
                    if(err)
                    {console.log(err)}
                })
                })

            it('get login endpoint' ,  () =>{
            setTimeout(() => {
                request
                .post('/api/auth/login')
                .set('Content-Type',  'application/json')
                .send(userforlogin)
                .end((err,res) =>{
                expect(res.status).toBe(200)
                if (err) {
                    console.log(err)
                }
                })
            }, 15000);
            })

            it('isUerNameExist ' ,  ()=>{
             setTimeout(() => {
                request
                .get(`/api/auth/isUerNameExist=${existingUsername}`)
                .set('Content-Type',  'application/json')
                .end((err,res)=>{
                expect(res.status).toBe(200)
                if (err) {
                    console.log(err) 
                }
                })
             }, 25000);
            })

            it('get user details' , ()=>{
                
               setTimeout(() => {
                request
                .get(`/api/users/${userId}`).timeout(30000)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type',  'application/json')
                .end((err,res)=>{
                    expect(res.status).toBe(200)
                    if (err) {
                        console.log(err)
                    }
                })
               }, 10000);
            })


            it('edit user details' ,  ()=>{

                let userforedit:UserForEditDto;
                userforedit={id:userId ,username:'usertestEdit2' , password:'password'}
                request
                .get(`/api/users/${userId}`).timeout(30000)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type',  'application/json')
                .send(userforedit)
                .end((err,res)=>{
                expect(res.status).toBe(200)
                if (err) {
                    console.log(err)  
                }
                
                })
            })

        })


        describe('categories endpoints' , ()=>{

            it('get All getcategories', ()=>{

             setTimeout(() => {
                request
                .get(`/api/users/${userId}/categories`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type',  'application/json')
                .end((err,res)=>{
                    expect(res.status).toBe(200)
                    if (err) {
                        console.log(err)  
                    }
                })
             }, 10000);
            })

            it('get category by id' ,  ()=>{
        
              setTimeout(() => {
                request
                .get(`/api/users/${userId}/categories/${categoryId}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type',  'application/json')
                .end((err,res)=>{
                    expect(res.status).toBe(200)
                    if (err) {
                        console.log(err)  
                    }
                })
              }, 15000);
            })

        })


        describe('Products endpoints' , ()=>{


        it('get all products by category ' , ()=>{

            setTimeout(() => {
                request
            .get(`api/users/${userId}/categories/${categoryId}/products`)
            .set("Authorization", `Bearer ${token}`)
            .set('Content-Type',  'application/json')
            .end((err,res)=>{
                expect(res.status).toEqual(200)
                if (err) {
                    console.log(err)  
                  }
            })
            }, 10000);

        })

        it('get product by id' ,  ()=>{
           
            setTimeout(() => {
                request
                .get(`api/users/${userId}/categories/${categoryId}/products/${productId}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type',  'application/json')
                .end((err,res)=>{
                    expect(res.status).toEqual(200)
                    if (err) {
                        console.log(err)  
                      }
                })
            }, 15000);
        })

         })



        describe('orders endpoints' , ()=>{


                  
                    it('post order for user', ()=>{
                        
                        setTimeout(() => {
                            request
                            .post(`/api/users/${userId}/orders`)
                            .set("Authorization", `Bearer ${token}`)
                            .set('Content-Type',  'application/json')
                            .end((err,res)=>{
                                expect(res.status).toBe(201)
                                if (err) {
                                    console.log(err)  
                                }
                            })
                        }, 8000);
                    }) 
                

                    it('get order for user ' , ()=>{
                       setTimeout(() => {
                        request
                        .get(`/api/users/${userId}/orders`)
                        .set("Authorization", `Bearer ${token}`)
                        .set('Content-Type',  'application/json')
                        .end((err,res)=>{
                            expect(res.status).toBe(200)
                            if (err) {
                                console.log(err)  
                              }
                        })
                       }, 9000);
                    }) 

                
                        it('edit order status',  ()=>{
                            let orderedit:OrderEditDto;
                            orderedit={id:orderId ,
                                        status:'Complete',
                                        adress: 'example test of adress',
                                        countryName: 'country test',
                                        zip: '12365',
                                        nameoncard: 'name card test' ,
                                        creditcardNumber: '123654786',
                                        cvv: 'cvv test',
                                        exirationDate:'test date',
                                        total:20}
                          setTimeout(() => {
                            request
                            .put(`/api/users/${userId}/orders/${orderId}`)
                            .set("Authorization", `Bearer ${token}`)
                            .set('Content-Type',  'application/json')
                            .send(orderedit)
                            .end((err,res)=>{
                                expect(res.status).toBe(200)
                                if (err) {
                                    console.log(err)  
                                  }
                            })
                          }, 20000);
                        })
                    
                    

                    it('delete order',async ()=>{
                       setTimeout(() => {
                        request
                        .delete(`/api/users/${userId}/orders/${orderId}`)
                        .set("Authorization", `Bearer ${token}`)
                        .set('Content-Type',  'application/json')
                        .end((err,res)=>{
                            expect(res.status).toBe(200)
                            if (err) {
                               console.log(err)  
                             }
                        })
                       }, 30000);
                     }) 

 


          }) 


          describe('items endpoints' , ()=>{

                        it('add items to order' , ()=>{

                            let itemtoadd ={ productid:productId, quantity:1 }
                        setTimeout(() => {
                            request
                            .post(`/api/users/${userId}/orders/${orederId_ForItem}/items/addproduct`)
                            .set("Authorization", `Bearer ${token}`)
                            .set('Content-Type',  'application/json')
                            .send(itemtoadd)
                            .end((err,res)=>{
                            expect(res.status).toBe(201)
                            if (err) {
                                console.log(err)  
                            }
                            })
                        }, 25000);
                        })

                    it('get  item details in order',  ()=>{
                       setTimeout(() => {
                        request
                        .get(`/api/users/${userId}/orders/${orderId}/items/${itemId}`)
                        .set("Authorization", `Bearer ${token}`)
                        .set('Content-Type',  'application/json')
                        .end((err,res)=>{
                            expect(res.status).toBe(200)
                            if (err) {
                                console.log(err)  
                            }
                        })
                      }, 20000);
                    })

                    it('edit quantit of item',  ()=>{
                        let itemtoedit:ItemEditDto;
                        itemtoedit={id:itemId , quantity:3 }
                    setTimeout(() => {
                        request
                    .put(`/api/users/${userId}/orders/${orderId}/items/${itemId}`)
                    .set("Authorization", `Bearer ${token}`)
                    .set('Content-Type',  'application/json')
                    .send(itemtoedit)
                    .end((err,res)=>{
                        expect(res.status).toBe(200)
                        if (err) {
                            console.log(err)  
                        }
                    })
                    }, 30000);
                   })

                   it('item delete endpoints', ()=>{
                    setTimeout(() => {
                      request
                      .delete(`/api/users/${userId}/orders/${orderId}/items/${itemId}`)
                      .set("Authorization", `Bearer ${token}`)
                      .set('Content-Type',  'application/json')
                      .end((err,res)=>{
                          expect(res.status).toBe(200)
                          if (err) {
                            console.log(err)  
                        }
                      }) 
                    }, 40000); 
                  

                  })



          })


          describe('Admin endpoints' , ()=>{

                    it('get all users for admin', ()=>{
                        request
                        .get(`/api/admin//users/all`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .end((err, res)=>{
                            expect(res.status).toBe(200)
                            if (err) {
                                console.log(err)  
                            }
                        })
                    })

                    it('delete user by  admin', async ()=>{

                       setTimeout(() => {
                        request
                        .delete(`/api/admin/users/${userId_foradmintest}`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .end((err, res)=>{
                           expect(res.status).toBe(200)
                           if (err) {
                               console.log(err)  
                           }
                       })
                       }, 10000);
                    })
                    it('Add category by Admin', ()=>{
                        addCategorytest={name:'Categorytestadmin'}
                       setTimeout(() => {
                        request
                        .post(`/api/admin/categories`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .send(addCategorytest.name)
                        .end((err, res)=>{
                            expect(res.status).toBe(201)
                            if (err) {
                                console.log(err)  
                            }
                        })
                       }, 12000);
                    }) 

                    it('edit category by Admin', ()=>{
                        let category:CategoryForEditDto
                        category={id:categoryId, name:'categorytest2'}
                      setTimeout(() => {
                        request
                        .put(`/api/admin/categories/${categoryId}`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .send(category)
                        .end((err, res)=>{
                            expect(res.status).toBe(204)
                            if (err) {
                                console.log(err)  
                            }
                        })
                      }, 20000);
                        
                      })

                      it('Add product to category',async ()=>{
                        let product:ProductAddDto
                        product={name:'producttest2' ,url:'url example', price:10 , description:'descrption example'}
                        request
                        .post(`/api/admin/categories/${categoryId}/products`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .send(product)
                        .end((err, res)=>{
                            expect(res.status).toBe(201)
                            if (err) {
                                console.log(err)  
                            }
                        })
                      })

                      it('edit product by id ' , async ()=>{
      
        
                        let producttoedit:ProductEditDto;
                        producttoedit={id:productId , name:'producttest3' , price:10}
                        
                           setTimeout(() => {
                            request
                            .put(`/api/admin/categories/${categoryId}/products/${productId}`)
                            .set("Authorization", `Bearer ${AdminToken}`)
                            .set('Content-Type',  'application/json')
                            .send(producttoedit)
                            .end((err, res)=>{
                                expect(res.status).toBe(204)
                                if (err) {
                                    console.log(err)  
                                }
                            })
                           }, 20000);
                
                      })

                      it('delete category by Admin', ()=>{
                        setTimeout(() => {
                          request
                        .delete(`/api/admin/categories/${categoryfortestId}`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .end((err, res)=>{
                            expect(res.status).toBe(200)
                            if (err) {
                                console.log(err)  
                            }
                        })
                        }, 30000);
                      })
                     

                      it('delete product by id' ,  ()=>{
                        setTimeout(() => {
                          request
                        .delete(`/api/admin/categories/${categoryId}/products/${producttestId}`)
                        .set("Authorization", `Bearer ${AdminToken}`)
                        .set('Content-Type',  'application/json')
                        .end((err, res)=>{
                            expect(res.status).toBe(200)
                            if (err) {
                                console.log(err)  
                            }
                        })
                        }, 15000);
              
                  })
                    



          })



})