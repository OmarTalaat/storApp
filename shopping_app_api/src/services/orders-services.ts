import { ItemDetailsDto } from "../database/dtos/itemDtos/itemDetailsDto";
import { ItemListDto } from "../database/dtos/itemDtos/itemListDto";
import { OrderDetailsDto } from "../database/dtos/orderDtos/orderDetailsDto";
import { OrderEditDto } from "../database/dtos/orderDtos/orderEditDto";
import { OrderToretuenDto } from "../database/dtos/orderDtos/orderToretuenDto";
import { ProductDetailsDto } from "../database/dtos/productDtos/productDetailsDto";
import itemrepo from "../database/repository/item.repo";
import orderRepo from "../database/repository/order.repo"
import itemService from "./item-services";
import productsService from "./products-services";





const createOrderService = async(status:string ,user_id:number) => {
    try {
        const  orderTocreate = await orderRepo.createOrder(status,user_id);
            var order:OrderDetailsDto;
            return  order={id:orderTocreate.orderid ,status:orderTocreate.status };
    } catch (error) {
        throw new Error(`you cant create this order ${error}` )
    }
}



const get_order_bystatus = async( status:string , userId:number ) =>{

    try {
        const orderfromrepo = await orderRepo.getOrdersByStatus(status,userId);

       if (orderfromrepo ) {
        const itemcount = await itemrepo.getitemsCountbyorder(orderfromrepo.orderid);
        var order:OrderDetailsDto;
       var items= await itemService.getItemListInOrder(orderfromrepo.orderid);
       
       const sum = items!.filter(item => item.subtotal)
       .reduce((sum, current) => (sum + current.subtotal), 0).toFixed(2);
         order={id:orderfromrepo.orderid,status:orderfromrepo.status ,
            itemcount:itemcount, items:items ,total: parseFloat(sum) , adress:orderfromrepo.adress};
        
        return order
       } else {
           return null
       }
          

        
    } catch (err) {
        throw new Error(`you can not edit status ${err}`)
    }
}

const edit_order_status =async(orderToEdit:OrderEditDto)=>{
    try {
        const orderToreturn = await orderRepo.Edit_Order_status(orderToEdit);

        var order:OrderToretuenDto;
        return order={id:orderToreturn.orderid , 
                      status:orderToreturn.status, 
                      adress: orderToreturn.adress,
                      countryName: orderToreturn.countryName,
                      zip: orderToreturn.zip,
                      nameoncard: orderToreturn.nameoncard,
                     creditcardNumber: orderToreturn.creditcardNumber,
                     cvv:orderToreturn.cvv,
                     exirationDate: orderToreturn.exirationDate,
                     total: orderToreturn.total}
    } catch (err) {
        throw new Error(`you can not edit your order due to ${err}`)
    }
}

const edit_order_Adress =async(orderToEdit:OrderEditDto)=>{
    try {
        const orderToreturn = await orderRepo.Edit_Order_adress(orderToEdit);

        var order:OrderToretuenDto;
        return order={
                      id:orderToreturn.orderid , 
                      status:orderToreturn.status, 
                      adress: orderToreturn.adress,
                      countryName: orderToreturn.countryName,
                      zip: orderToreturn.zip,
                      nameoncard: orderToreturn.nameoncard,
                     creditcardNumber:orderToreturn.creditcardNumber,
                     cvv:orderToreturn.cvv,
                     exirationDate: orderToreturn.exirationDate,
                     total: orderToreturn.total
        }
    } catch (err) {
        throw new Error(`you can not edit your order due to ${err}`)
    }
}



const get_order_byId =async(orderId:number) => {
    try {
        const orderToreturn =await orderRepo.getOrderById(orderId);
    
            const itemcount = await itemrepo.getitemsCountbyorder(orderId);
        var order:OrderDetailsDto;
       var items= await itemService.getItemListInOrder(orderId);
       const sum = items!.filter(item => item.subtotal)
       .reduce((sum, current) => (sum + current.subtotal), 0).toFixed(2);
         order={id:orderToreturn.orderid,status:orderToreturn.status ,itemcount:itemcount, items:items ,
             total:parseFloat(sum) , adress:orderToreturn.adress};
         
         return order;
      
        
    } catch (error) {
        throw new Error(`can not get this orde ${error}`);
    }
}



const deleteOrder = async(orderId:number) =>{
    try {
        const deleteItemfromorder = await itemrepo.deleteItemByOrderId(orderId);
        const removeorder= await orderRepo.deleteorder(orderId)

        return removeorder
    } catch (err) {
        throw new Error(` you can not delete order with Id: ${orderId} error: ${err} `)
    }
}

const orderservice = {
    createOrderService,
    get_order_bystatus,
    edit_order_status,
    get_order_byId,
    deleteOrder,
    edit_order_Adress
}


export default orderservice;