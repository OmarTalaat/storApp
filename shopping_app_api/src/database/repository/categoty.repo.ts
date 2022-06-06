import Category from "../model/types/category";
import Client from '../../database/databaseconnection';
import { CategoryForEditDto } from "../dtos/catergoryDtos/categoryForEditDto";









const  addCategory= async (name:string ):Promise<Category>=> {
    try {
     
  const conn = await Client.connect();
  const sql = `INSERT INTO categories (name) VALUES($1) RETURNING *`
  const result = await conn
      .query(sql,[name]);
      const Category = result.rows[0]
  conn.release();
  return Category
    } catch (err) {
        throw new Error(`from repo Could not add new Category ${name}. Error: ${err}`)
    }
}

const getAllcategories = async():Promise<Category[]> => {
    try {
        const conn = await Client.connect()
        const sql = `SELECT * FROM categories;`
        const result = await conn.query(sql)
        const categories = result.rows
        conn.release()
        return categories
    } catch (err) {
        throw new Error(`Could not find categories. Error: ${err}`)
    }
}





const updateCategory = async(cat:CategoryForEditDto):Promise<Category> => {
    try {

        const conn = await Client.connect();
        const sql = `UPDATE categories SET name='${cat.name}' WHERE categoryid=${cat.id} RETURNING * ; `
        const result = await conn.query(sql)
        const category = result.rows[0];
        conn.release()
        return category

    } catch (err) {
        throw new Error(`Could not update category. Error: ${err}`)
    }
}




const  getCatergoryById= async(id:number):Promise<Category>=> {
    try {
      const conn = await Client.connect()
        const sql = `SELECT * FROM categories  where categoryid=($1);`
        const result = await conn.query(sql,[id]);
        const category = result.rows[0];
        conn.release();
        return category;
        } catch (err) {
            throw new Error(`Could not find category ${id}. Error: ${err}`);
        }
 }
 const  getCatergoryname= async(name:string):Promise<Category>=> {
    try {
      const conn = await Client.connect()
        const sql = `SELECT * FROM categories  where name=($1);`
        const result = await conn.query(sql,[name]);
        const category = result.rows[0];
        conn.release();
        return category;
        } catch (err) {
            throw new Error(`Could not find category ${name}}. Error: ${err}`);
        }
 }

const deletCategory = async(id:number) =>{
    try {
        const conn = await Client.connect();
        const sql = `DELETE FROM categories WHERE categoryid=${id}`;
        const result = await conn.query(sql);
         conn.release()
      return result.rows
      } catch (err) {
        throw new Error(`can not delete category with id:${id} error:${err}`)
      }
}

 const categories_repo ={
     addcategory_FromRepo:addCategory,
     getallategoriesFromRepo:getAllcategories,
     getcategory_FromRepo_ById:getCatergoryById,
     getcategoryFromRepobyName:getCatergoryname,
     updateCategory,
     deletCategory
 }

 export default categories_repo;