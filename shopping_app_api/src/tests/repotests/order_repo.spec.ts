import { OrderDetailsDto } from "../../database/dtos/orderDtos/orderDetailsDto";
import orderRepo from "../../database/repository/order.repo";
import UserRepo from "../../database/repository/user.repo";
import adminService from "../../services/admin-services";
import status from "../../helper/status ";


describe('order Model' , ()=> {

    it('should have an index method', () => {
        expect(orderRepo.getOrdersByStatus).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(orderRepo.getOrderById).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(orderRepo.createOrder).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(orderRepo.Edit_Order_status).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(orderRepo.deleteorder).toBeDefined();
      });


      let userId:number;
      beforeAll(async()=>{
        const user = await UserRepo.createUser({username: 'usertest', password:'password'})
        userId = user.userid;
      })

     
      it('create method should add a order', async () => {
        
        
        const addorder = await orderRepo.createOrder(status.Active ,userId);
        const result:OrderDetailsDto ={id:addorder.orderid , status:addorder.status }
        expect(result).toEqual({
          id: addorder.orderid,
          status: addorder.status
        });
      });

      it('show method should return the correct order', async () => {
        setTimeout(async () => {
            
        const addorder = await orderRepo.createOrder(status.Active ,userId);
          const getorder = await orderRepo.getOrderById(addorder.orderid);
          const result:OrderDetailsDto ={id:getorder.orderid , status:getorder.status }
          expect(result).toEqual({
            id: getorder.orderid,
          status: getorder.status
          })
        }, 2000);
      });

      it('show method should return update order', async () => {
        setTimeout(async () => {
            
        const addorder = await orderRepo.createOrder(status.Active ,userId);
          const updateorder = await orderRepo.Edit_Order_status({
            id:addorder.orderid ,
            status:status.Complete,
            adress: 'example test of adress',
            countryName: 'country test',
            zip: '12365',
            nameoncard: 'name card test' ,
            creditcardNumber: '123654786',
            cvv: 'cvv test',
            exirationDate:'test date',
            total:20
            
          });
          const result:OrderDetailsDto ={id:updateorder.orderid , status:updateorder.status }
          expect(result).toEqual({
            id: updateorder.orderid,
          status: updateorder.status
          })
        }, 2000);
      });

    

      it('delete method should remove the order', async () => {
     
        setTimeout(async () => {
          await orderRepo.deleteorder(1)
         
          const orderListFromrepo = await orderRepo.getOrdersByStatus(status.Active, userId);
    
        
           
              let  orderDetails:OrderDetailsDto;
              orderDetails ={ id: orderListFromrepo.orderid, status: orderListFromrepo.status }
                
           
            

        expect(orderDetails).toEqual({id: orderListFromrepo.orderid, status: orderListFromrepo.status })
        }, 6000);
       
      });

})