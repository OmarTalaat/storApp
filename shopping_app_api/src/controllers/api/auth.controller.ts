

import { NOTFOUND } from 'dns';
import { NextFunction, Request ,Response } from 'express';
import { UserForLoginDto } from '../../database/dtos/userDtos/userForLoginDto';
import { UserForRegisterDto } from '../../database/dtos/userDtos/userForRegisterDto';
import User from '../../database/model/types/user';
import UserRepo from '../../database/repository/user.repo';
import authService from '../../services/auth-services';






const register = async (req:Request, res:Response,next:NextFunction) => {
    try {
        const user: UserForRegisterDto = {
            
            username: req.body.username,
            password: req.body.password
        }
       
       
        const data  = await authService.signUp(user); 

        res.status(201).json({user: data , message: 'user created successfully'})
       
        
    } catch (err) {
        throw new Error(`you can not register due to: ${err}`)
    }
    
    
}

const login = async (req:Request, res:Response,next:NextFunction) =>{
   
   
    try {

        const user: UserForLoginDto ={
            
            username: req.body.username,
            password:req.body.password
        }
        const  usertoreturn  = await authService.SignIn(user);
        if (usertoreturn) {
            return res.status(200).json(usertoreturn);
        } else {
            res.sendStatus(401).json('Somthing rong with username or passord');
        }

    } catch (error) {
        throw new Error(`you can not login due to: ${error}`)
    }
}

const isusernameexist = async(req:Request, res:Response)=>{
    
    const existingUser = await authService.isusernameexist(req.query.username as string);

    if (existingUser == null) {
        res.status(204).json(null)
    } else {
        res.status(200).json(existingUser.username)
    }

}
const auth_controller ={
    register,
    login,
    isusernameexist
}


export default auth_controller;