
import {  Request, Response } from "express";

import itemService from "../../services/item-services";
import orderservice from "../../services/orders-services";
import status from "../../helper/status ";





const addProductToOrder = async(req:Request,res:Response ) => {
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}

            const userId = parseInt(req.params.userId)
            const statusorder = status.Active
            const isorderexist = await orderservice.get_order_bystatus(statusorder ,userId)
            const productId = parseInt(req.body.productId)

            if (isorderexist !== null ) {
                const orderId = isorderexist.id

                const itemToreturn =await itemService.getItemInOrderbyproductandorderid(productId,orderId)

                if ( itemToreturn?.product.id) {
                  var  quantity =itemToreturn.quantity +1
                  const update_quantity =await itemService.update_quantity_Item(itemToreturn.id ,quantity)
                  res.status(200).json(update_quantity)
                }else{
                  const quantity: number = 1
                const addProductToOrder = await itemService.addProduct(quantity,orderId,productId);
                res.status(200).json(addProductToOrder) 
                } 
            }else if (isorderexist === null) {
                const ordertocreate = await orderservice.createOrderService(statusorder , userId)
                const order_id = ordertocreate.id;
                const itemToreturn =await itemService.getItemInOrderbyproductandorderid(productId,order_id)
                if ( itemToreturn?.product.id) {
                  var  quantity =itemToreturn.quantity +1
                  const update_quantity =await itemService.update_quantity_Item(itemToreturn.id ,quantity)
                  res.status(200).json(update_quantity)
                }else{
                  const quantity: number = 1
                const addProductToOrder = await itemService.addProduct(quantity,order_id,productId);
                res.status(200).json(addProductToOrder) 
                } 

            }
                
            

          
    } catch (err) {
       throw new Error(`can not add item to Order error:${err}`) 
    }
}


const getItemsList = async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const orderId = parseInt(req.params.orderId)

            const items = await itemService.getItemListInOrder(orderId)
            if (items) {

                res.status(200).json(items)
            } else {
                return res.sendStatus(404)
            }
    } catch (error) {
        
    }
}


const getItem_detailes =async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
    
            const itemId:number = parseInt(req.params.itemId)
 
    
            const Item_detailes =await itemService.getItem_detailes(itemId)
            if (Item_detailes == null) {
                res.json('this item not found')
                return res.sendStatus(404)
            }
            res.status(200).json(Item_detailes)
    } catch (err) {
        throw new Error(`can not get item detailes  error:${err}`) 
    }
}
const update_quantity_Item =async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const itemId:number = parseInt(req.params.itemId)
            const quantity: number = parseInt(req.body.quantity)
            const update_quantity =await itemService.update_quantity_Item(itemId,quantity)
            res.status(200).json({item:{id:update_quantity.id, quantity:update_quantity.quantity ,subtotal:parseFloat(update_quantity.subtotal.toFixed(2)) }})
    } catch (err) {
        throw new Error(`can not update item  error:${err}`) 
    }

}

const removeItem =async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const removeItem = await itemService.deleteItem(parseInt(req.params.itemId))
            res.status(200).json({message: 'the item removed successfully'})
    } catch (err) {
        throw new Error(`can not remove item  error:${err}`) 
    }
}



const items_Controller = {
    addProductToOrder,
    update_quantity_Item,
    removeItem,
    getItem_detailes,
    getItemsList
}


export default items_Controller;