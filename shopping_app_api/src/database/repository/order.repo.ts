import Client from '../../database/databaseconnection';
import { OrderEditDto } from '../dtos/orderDtos/orderEditDto';
import Order from '../model/types/order';




const createOrder = async(status:string , user_id:number):Promise<Order> => {
    try {
     
        const conn = await Client.connect();
        const sql = `INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *`
        const result = await conn
            .query(sql,[status,user_id]);
            const order = result.rows[0]
        conn.release();
        return order
          } catch (err) {
              throw new Error(`from repo Could not add new orders. Error: ${err}`)
          }
}


const getItems_in_order = async(userId:number, status:string) =>{
    try {
     
        const conn = await Client.connect();
        const sql = `SELECT items.itemid ,items.quantity ,
        products.name ,products.price FROM users INNER JOIN orders ON users.userid = orders.user_id
        inner join  items on orders.orderid  = items.order_id 
        inner  join products on products.productid  = items.product_id where orders.user_id=${userId} and orders.status='Active';`
        const result = await conn
            .query(sql);
            const orders = result.rows
        conn.release();
        
        return orders
          } catch (err) {
              throw new Error(`from repo Could not add new orders. Error: ${err}`)
          }
}

 const getOrdersByStatus = async(status:string , userId:number):Promise<Order>=>{
try {
    const conn = await Client.connect();
        const sql = `SELECT * FROM orders WHERE user_id =${userId} AND status='${status}';`
        const result = await conn
            .query(sql);
            const order = result.rows[0]
        conn.release();
        return order

} catch (err) {
    throw new Error(`from repo Could not add new orders. Error: ${err}`)
}


 
}

const getOrderById = async(orderId:number):Promise<Order>=>{
    const conn = await Client.connect();
    const sql = `SELECT orderid , status ,items.itemid ,items.quantity ,products.productid ,products.name , products.price FROM orders
    left outer join items on orderid = items.order_id 
    left outer  join products on products.productid  = items.product_id 
    WHERE orderid =(${orderId});`
    const result = await conn
        .query(sql);
        const order = result.rows[0]
    conn.release();
    return order
}



const Edit_Order_status = async(ordertoupdate:OrderEditDto) :Promise<Order>=>{
    try {
        const conn = await Client.connect();
        const sql = `UPDATE orders  SET
                     status='${ordertoupdate.status}',
                     adress='${ordertoupdate.adress}' ,
                     countryName='${ordertoupdate.countryName}',
                     zip='${ordertoupdate.zip}',
                     nameoncard='${ordertoupdate.nameoncard}',
                     creditcardNumber='${ordertoupdate.creditcardNumber}',
                     cvv='${ordertoupdate.cvv}',
                     exirationDate='${ordertoupdate.exirationDate}',
                     total='${ordertoupdate.total}'
                     WHERE orderid=${ordertoupdate.id} RETURNING *;`
        const result = await conn.query(sql);
            const order = result.rows[0]
        conn.release();
        return order
          } catch (err) {
              throw new Error(`from repo Could not add new orders. Error: ${err}`)
          }
}

const Edit_Order_adress = async(ordertocreate:OrderEditDto):Promise<Order>=>{
    try {
        const conn = await Client.connect();
        const sql = `UPDATE orders  SET adress='${ordertocreate.adress}' WHERE orderid=${ordertocreate.id} RETURNING *;`
        const result = await conn.query(sql);
            const order = result.rows[0]
        conn.release();
        return order
          } catch (err) {
              throw new Error(`from repo Could not add new orders. Error: ${err}`)
          }
}


const deleteorder =async(orderId:number)=>{
    try {
        const conn = await Client.connect();
        const sql = `DELETE FROM orders WHERE orderid=${orderId}`;
        const result = await conn.query(sql);
         conn.release()
      return result.rows
      } catch (err) {
        throw new Error(`can not delete item with id:${orderId} error:${err}`)
      }
}










const orderRepo ={

    createOrder,
    Edit_Order_status,
    getOrdersByStatus,
    getOrderById,
    getItems_in_order,
    deleteorder,
    Edit_Order_adress
}


export default orderRepo;