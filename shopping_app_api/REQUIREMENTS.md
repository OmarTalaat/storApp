

API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# API Endpoints

Authorization
   Create User 'http://localhost:3000/api/auth/register' [post]
       in body json Example: { "username":"user", "password":"password"}

   login  user 'http://localhost:3000/api/auth/login' [post]
     in body json Example: { "username":"user", "password":"password"}

     check if username exist 'http://localhost:3000/api/auth/?isUerNameExist=username'[GET] for using as directive for angular to check the username before register

Admin [need Admin login]
        to login as Admin 
             { "username":"Admin", "password":"password"}
     For users  control
        index of All Users  [token required] [required Admin Role] 'http://localhost:3000/api/admin/users/all' [GET]
            
        delete user  [token required] [required Admin Role] 'http://localhost:3000/api/admin/users/:userId' [delete] 

      For Category control
                
          Add category [token required] [required Admin Role] 'http://localhost:3000/api/admin/categories'[post]
                            in body json Example:    {"name":"category test"}

                     
          update category by Id [token required] [required Admin Role] 'http://localhost:3000/api/admin/categories/:categoryId'[put]
                                    in body json Example:  {"name":" category test2"}


          delete category by Id [token required] [required Admin Role] 'http://localhost:3000/api/admin/categories/:categoryId' [delete]

     For Product control
                             
                Add product [token required] [required Admin Role] 'http://localhost:3000/api/admin/categories/:categoryId/products' [post]
                                            in body json Example:       {"name":"product test", "price":10}
                              
                update product [token required] [required Admin Role] 'http://localhost:3000/api/admin/categories/:categoryId/products/:productId' [put]
                                        in body json Example:       {"name":"product test2", "price":10}


                delete product [token required] [required Admin Role] 'http://localhost:3000/api/admin/categories/:categoryId/products/:productId' [delete]




Users
   get user details
      Show [token required]  'http://localhost:3000/api/users/:userId' [GET]
       
   update user details
      put [token required]  'http://localhost:3000/api/users/:userId' [put]
        
        in the body request 
        {id: 1,
         username: "example",
         password:"examplepassword"}

categories 
     user can get All categories [token required] 'http://localhost:3000/api/users/:userId/categories' [GET]

     user can get gategory details by id [token required] 'http://localhost:3000/api/users/:userId/categories/:categoryId' [GET]
       
     

Products
     user can get  All products depend on category [token required] 'http://localhost:3000/api/users/:userId/categories/:categoryId' [GET]

     user can get  product by Id depend on category [token required] 'http://localhost:3000/api/users/:userId/categories/:categoryId/products/:productId' [GET]
       


Orders
   user create order [token required] 'http://localhost:3000/api/users/:userId/orders' [post]

     Current Active Order by user [token required] 'http://localhost:3000/api/users/:userId/orders/?status=Active' [GET]

 

   get order details with items and products by orderId  [token required] 'http://localhost:3000/api/users/:userId/orders/:orderId' [GET] 

    complete order by user [token required] 'http://localhost:3000/api/users/:userId/orders/:orderId' [put]
     
                   in body json Example: { "status": "Complete"} 

    user can delete order [token required] 'http://localhost:3000/api/users/:userId/orders/:orderId' [delete]
    
  

  Items :- 
  
   user can add item to order [token required] 'http://localhost:3000/api/users/:userId/orders/:orderId/items/addproduct' [post]
      
          in body json Example:     {"quantity":1, "productId":1 } also can use this method to update quantity

     user can get item details by itemId  [token required]  'http://localhost:3000/api/users/:userId/orders/:orderId/items/:itemId' [GET]

     user can update quantity of item in order [token required]  'http://localhost:3000/api/users/:userId/orders/:orderId/items/:itemId' [put]   
              in body json Example:  {"quantity":2}

     user can remove item from order [token required]  'http://localhost:3000/api/users/:userId/orders/:orderId/items/:itemId' [delete]

   
       

        

 

  
   Completed Orders by user [token required] 'http://localhost:3000/api/users/:userId/orders/?status=Complete' [GET]
      




# Data Shapes


users
    userid SERIAL PRIMARY KEY,
    username VARCHAR(100),
    user_password VARCHAR

roles
    roleid SERIAL PRIMARY KEY,
    name VARCHAR(15)

user_roles
    user_id bigint REFERENCES users(userid),
    role_id bigint REFERENCES roles(roleid)

categories
    categoryid SERIAL PRIMARY KEY,
    name VARCHAR(50)

products
    productid SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price FLOAT,
    category_id bigint REFERENCES categories(categoryid)

orders
   orderid SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(userid)


items
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(orderid),
    product_id bigint REFERENCES products(productid)

