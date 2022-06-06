import Product from "../model/types/product";
import Client from '../../database/databaseconnection';
import { ProductEditDto } from "../dtos/productDtos/productEditDto";






const  addProductRepo= async (name:string,url:string, price:number, description:string ,category_id:number ):Promise<Product>=> {
    try {
     
  const conn = await Client.connect();
  const sql = `INSERT INTO products (name,url,price,description,category_id) VALUES($1,$2,$3,$4,$5) RETURNING *`
  const result = await conn
      .query(sql,[name,url,price,description,category_id]);
      const product = result.rows[0]
  conn.release();
  return product
    } catch (err) {
        throw new Error(`from repo Could not add new product ${name}. Error: ${err}`)
    }
}




const getAllproductsbycategory_repo = async(category_id:number):Promise<Product[]> => {
    try {
        const conn = await Client.connect()
        const sql = `SELECT products.productid ,products.name ,products.url , products.price , products.description FROM products  WHERE products.category_id=(${category_id})`
        const result = await conn.query(sql)
        const products = result.rows
        
        conn.release()
        return products
    } catch (err) {
        throw new Error(`Could not find products. Error: ${err}`)
    }
}

const getproductByid = async(productId:number):Promise<Product> => {
    try {
        const conn = await Client.connect();
        const sql = `SELECT products.productid ,products.name ,products.url, products.price , products.description FROM products where productid=($1)`
        const result = await conn.query(sql,[productId])
        const product = result.rows[0]
        conn.release()
        return product

    } catch (err) {
        throw new Error(`Could not find product. Error: ${err}`)
    }
}

const editProduct = async(pro:ProductEditDto ):Promise<Product> => {
    try {
        const conn = await Client.connect()
        const sql = `UPDATE products SET name='${pro.name}',
                    url=${pro.url} , price=${pro.price} , description=${pro.description}WHERE productid=${pro.id}`
        const result = await conn.query(sql)
        const product = result.rows[0]
        
        conn.release()
        return product
        
    } catch (err) {
        throw new Error(`can not update product with name:${pro.name}`)
    }
}

const deleteProduct = async(id:number) =>{
    try {
        const conn = await Client.connect();
        const sql = `DELETE FROM products WHERE productid=${id}`;
        const result = await conn.query(sql);
         conn.release()
      return result.rows
      } catch (err) {
        throw new Error(`can not delete product with id:${id} error:${err}`)
      }
}

const deletAllproductby_categoryId = async(categoryId:number) =>{
    try {
        const conn = await Client.connect();
        const sql = `DELETE  FROM products WHERE products.category_id=${categoryId}`;
        const result = await conn.query(sql);
         conn.release()
      return result.rows
      } catch (err) {
        throw new Error(`can not delete  All products depend on cat  with id:${categoryId} error:${err}`)
      }
}

const productRepo ={
    addProductRepo,
    getAllproductsbycategory_repo,
    getproductByid,
    editProduct,
    deleteProduct,
    deletAllproductby_categoryId
}

export default productRepo;