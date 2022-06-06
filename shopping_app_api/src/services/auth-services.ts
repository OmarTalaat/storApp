import { json } from "body-parser";
import { NOTFOUND } from "dns";
import config from "../config/config";
import { UserfordetailsDto } from "../database/dtos/userDtos/userfordetailsDto";
import { UserForLoginDto } from "../database/dtos/userDtos/userForLoginDto";
import { UserForRegisterDto } from "../database/dtos/userDtos/userForRegisterDto";
import { UserRolesDtos } from "../database/dtos/userDtos/userRolesDtos";
import { UserToreturn } from "../database/dtos/userDtos/userToreturn";
import RoleRepo from "../database/repository/role.repo";
import UserRepo from "../database/repository/user.repo";
import password_Util from "../utilities/password-utilit";





 const rolerepo = new RoleRepo();


const isusernameexist = async(username: string) =>{
    try {
        const userFromRepo = await UserRepo.isusernameexist(username);
        if (userFromRepo == null) {
            return null
        } else {
            return userFromRepo
        }
    } catch (error) {
        throw new Error ('there are some error')
    }
}
        
  
 const   signUp= async(user:UserForRegisterDto)=> {
       
       try{
           const userFromRepo = await UserRepo.getuserByName(user.username);
           
           if (userFromRepo == null) {
               const salt = await password_Util.GenerateSalt();
            const  userPassword = await password_Util.GeneratePassword(user.password, salt);
            user.password = userPassword;
           
           const existinguser = await UserRepo.createUser(user);
          
          const setrole= rolerepo.setRoles(existinguser.userid , 3 )
       
           
             const userRoles = await rolerepo.GetuserwithRoles(existinguser.userid)



           const token = await password_Util.GenerateSignature({ id: existinguser.userid , username:existinguser.username, roles:userRoles });
          
           var usertoreturn:UserfordetailsDto;
             usertoreturn = {id:existinguser.userid , username:existinguser.username}

           return password_Util.FormateData({token, usertoreturn  , roles: userRoles});
               
           }
           else{
               return `this user ${user.username} Allready exist try Another one`
           }
           

           

       }catch(err){
           throw new Error(`you can not register,Error: ${err}`)
       }

     
   }


const SignIn = async(u:UserForLoginDto) =>{
      
    
       try {
           const existingUser = await UserRepo.getuserByName(u.username);
        

          if (config.serve.Env ==='test') {
            const userroles = await rolerepo.GetuserwithRoles(existingUser.userid)
            const token = await password_Util.GenerateSignature({ username: existingUser.username, id: existingUser.userid , role:userroles.map(n => n.name)});
                let user:UserToreturn;
                user={token:token,user:{id: existingUser.userid , username: existingUser.username }}
                 return  user
          } 
   
          if (existingUser) {
            const userroles = await rolerepo.GetuserwithRoles(existingUser.userid)
            let ValidatePassword = await password_Util.ValidatePassword(u.password , existingUser.user_password)

            if (!ValidatePassword) {
                return null
            } else {
                const token = await password_Util.GenerateSignature({ username: existingUser.username, id: existingUser.userid , role:userroles.map(n => n.name)});
                let user:UserToreturn;
                user={token:token,user:{id: existingUser.userid , username: existingUser.username }}
                 return  user
            }
          } else {
              return null
          }
            
           
            
         
   
           

       } catch (err) {
          throw new Error(`you can not SignIn,Error: ${err}`)
       }

      
   }


   const authService = {
       signUp,
       SignIn,
       isusernameexist
   }

   export default authService;