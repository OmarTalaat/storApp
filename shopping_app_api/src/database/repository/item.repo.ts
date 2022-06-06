import client from "../../database/databaseconnection"
import Item from "../model/types/item"






 const addProduct = async(quantity: number, orderId: number, productId: number): Promise<Item> => {
  

    try {
     
        const conn = await client.connect()
      const sql = `INSERT INTO items (quantity,order_id,product_id) VALUES($1, $2, $3) RETURNING *`
      

      const result = await conn
          .query(sql, [quantity, orderId, productId])

      const itemToreturn = result.rows[0]
      conn.release()

      return itemToreturn
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }


  const getItem_detailes = async(itemId:number):Promise<Item>=>{
    try {
     
      const conn = await client.connect()
    const sql = `select items.itemid , items.quantity ,products.productid ,products.name ,products.price  from items 
    inner join products on products.productid  = items.product_id where  items.itemid =${itemId}`
    

    const result = await conn
        .query(sql)

    const itemToreturn = result.rows[0]
    conn.release()

    return itemToreturn
  } catch (err) {
    throw new Error(` ${err}`)
  }
  }

  const getitemsbyorder = async(orderId:number):Promise<Item[]> => {
    try {
     
      const conn = await client.connect()
    const sql = `select items.itemid , items.quantity ,products.productid ,products.name ,products.price  from items 
    inner join products on products.productid = items.product_id where  items.order_id =${orderId}`
    

    const result = await conn
        .query(sql)

    const itemToreturn = result.rows
    conn.release()
    

    return itemToreturn
  } catch (err) {
    throw new Error(` ${err}`)
  }
  }

  const getitemsCountbyorder = async(orderId:number)=> {
    try {
     
      const conn = await client.connect()
    const sql = `select items.itemid  from items 
    inner join products on products.productid  = items.product_id where  items.order_id =${orderId}`
    

    const result = await conn.query(sql)
    const itemcount = result.rowCount
    conn.release()

    return itemcount
  } catch (err) {
    throw new Error(` ${err}`)
  }
  }

  const getitembyordernadproduct =async(productId:number , orderId:number):Promise<Item>=>{
    try {
     
      const conn = await client.connect()
    const sql = `select items.itemid , items.quantity ,products.productid ,products.name ,products.price  from items 
    inner join products on products.productid = items.product_id where  items.product_id=${productId} and items.order_id =${orderId}`
    

    const result = await conn
        .query(sql)

    const itemToreturn = result.rows[0]
    conn.release()
    

    return itemToreturn
  } catch (err) {
    throw new Error(` ${err}`)
  }

  }
const update_quantity_Item = async(itemId:number , quantity:number):Promise<Item> =>{
  try {

    const connection = await client.connect();
    const sql =
        `UPDATE items SET quantity=${quantity} WHERE itemid=${itemId} RETURNING itemid ,
         quantity , product_id as productid ,order_id as orderid`;
        const result = await connection.query(sql);
        const item = result.rows[0];
        connection.release();
        
      return item
  } catch (err) {
    throw new Error(`Could not update item  with id:${itemId}. Error: ${err}`)
  }
}
  const deleteItem = async(id:number) => {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM items WHERE itemid=${id}`;
      const result = await conn.query(sql);
       conn.release()
    return result.rows
    } catch (err) {
      throw new Error(`can not delete item with id:${id} error:${err}`)
    }
  }

  const deleteItemByOrderId = async(orderId:number) => {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM items WHERE order_id=${orderId}`;
      const result = await conn.query(sql);
       conn.release()
    return result.rows
    } catch (err) {
      throw new Error(`can not delete item with id:${orderId} error:${err}`)
    }

  }
  


  
  const itemrepo ={
      addProduct,
      getItem_detailes,
      deleteItem,
      update_quantity_Item,
      getitemsbyorder,
      getitemsCountbyorder,
      deleteItemByOrderId,
      getitembyordernadproduct
  }


  export default itemrepo;