import { NextFunction, Request, Response } from "express";
import { UserForEditDto } from "../../database/dtos/userDtos/userForEditDto";
import User from "../../database/model/types/user";
import UserService from "../../services/user-services";






const getUser =async (req:Request,res:Response, next:NextFunction) => {
     
       if (req.params.userId  != req.body.decoded.id) {
        return res.status(401).send({message: "Unauthorized!"});}
        
         const user = await UserService.getUserById(parseInt(req.params.userId));
         next();
         return res.status(200).json(user);
    }



const updateUser = async(req:Request, res:Response)=>{
  if (req.params.userId  != req.body.decoded.id) {
    return res.status(401).send({
      message: "Unauthorized!"
    });
    
 }
 const usertoreturn: UserForEditDto = {
  id:req.body.id,
  username: req.body.username,
  password: req.body.password
}

 const user = await UserService.editUser(usertoreturn);

 res.status(204).json({user: user})
 


}
    


    const user_controller = {
        getUser,
        updateUser
    }

    export default user_controller;

