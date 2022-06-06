import express from "express";
import orders_controller from "../../controllers/api/order.controller";
import items from "./item.routes";



const orders = express.Router({mergeParams: true});




orders.post('',orders_controller.addOrder);
orders.get('',orders_controller.getActiveOrder);
orders.put('/:orderId',orders_controller.editOrderStatus);


orders.get('/:orderId',orders_controller.getOrderById);
orders.delete('/:orderId', orders_controller.deleteOrder)////////
orders.use('/:orderId/items' , items);






export default orders;