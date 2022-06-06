CREATE TABLE products (
    productid SERIAL PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR,
    price FLOAT,
    description VARCHAR,
    category_id bigint REFERENCES categories(categoryid)
    
);


INSERT INTO products
(name,
 url,
 price,
 description,
 category_id
 )
 VALUES 
 (
     'Book',
     'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
     9.99,
     'You can read it!',
     1
     
 ),
 (
     'Headphones',
     'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
     249.99,
     'Listen to stuff!',
     2
 ),
 ('Backpack',
   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   79.99,
   'Carry things around town!',
   4
   ),
   (
       'Glasses',
       'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
       129.99,
       'Now you can see!',
       2

   ),

   (
       'Cup',
       'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
       4.99,
       'Drink anything with it!',
       2
   ),
   (
       'Shirt',
       'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
       29.99,
       'Wear it with style!',
       3
   )