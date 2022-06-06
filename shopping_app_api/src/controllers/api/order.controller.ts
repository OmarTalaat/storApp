import { Request, Response } from "express";
import { OrderEditDto } from "../../database/dtos/orderDtos/orderEditDto";
import { OrderToAddDto } from "../../database/dtos/orderDtos/orderToAddDto";
import Order from "../../database/model/types/order"
import orderservice from "../../services/orders-services"
import status from "../../helper/status "



const addOrder = async(req:Request, res:Response) =>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
        const order: OrderToAddDto = {
            status: status.Active
        }
        const userId=parseInt(req.params.userId)
        const orderToCreate = await orderservice.createOrderService(order.status , userId)
        return res.status(201).json(orderToCreate);
    } catch (err) {
        throw new Error(`you can not create this order becouse ${err}`)
    }
}


const getActiveOrder = async(req:Request,res:Response)=> {
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
       const userId =parseInt(req.params.userId);
       const status:string  = req.query.status as string;

       const orderByStatus = await orderservice.get_order_bystatus(status,userId);

       res.status(200).json(orderByStatus);
        
    } catch (err) {
        throw new Error(`you can not create this order becouse ${err}`)
    }
}

const editOrderStatus = async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const order:OrderEditDto ={
                id: parseInt(req.params.orderId),
                adress:req.body.adress,
                status: req.body.status,
                countryName:req.body.countryName,
                creditcardNumber: req.body.creditcardNumber,
                cvv:req.body.cvv,
                exirationDate:req.body.exirationDate,
                nameoncard:req.body.nameoncard,
                total:parseFloat(req.body.total),
                zip:req.body.zip
            }
           
           
        
              const orderedit =await orderservice.edit_order_status(order);
            res.status(200).json(orderedit)
        
    } catch (error) {
        throw new Error(`can not edit this order ${error}`)
    }

}


const editOrderAdress = async(req:Request,res:Response) =>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
      
            const order:OrderEditDto ={
                id: parseInt(req.params.id),
                status: req.body.status,
                countryName:req.body.countryName,
                creditcardNumber: req.body.creditcardNumber,
                cvv:req.body.cvv,
                exirationDate:req.body.exirationDate,
                nameoncard:req.body.nameoncard,
                total:req.body.total,
                zip:req.body.zip
            }
            const orderToEdit = await orderservice.edit_order_status(order);

            res.status(200).json(orderToEdit);
        
    } catch (error) {
        throw new Error(`can not edit this order ${error}`)
    }
}

const getOrderById = async(req:Request,res:Response) => {
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const orderId = parseInt(req.params.orderId)
            const order = await orderservice.get_order_byId(orderId);
            if (order== null) {
                res.json({message:'cant find this order'})
                return null
            } 
            res.status(200).json({order: order})
    } catch (error) {
        throw new Error(`can not get this order ${error}`)
    }
}

const deleteOrder = async(req:Request,res:Response) =>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const orderId = parseInt(req.params.orderId)
            
            const order = await orderservice.deleteOrder(orderId);
            res.status(200).json({message:'order removed successfully'})

    } catch (error) {
        
    }
}


const orders_controller = {
    addOrder,
    getActiveOrder,
    editOrderStatus,
    getOrderById,
    deleteOrder,
    editOrderAdress
}


export default orders_controller;