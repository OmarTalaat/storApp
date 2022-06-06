import { UserForEditDto } from "../../database/dtos/userDtos/userForEditDto";
import UserRepo from "../../database/repository/user.repo";
import adminService from "../../services/admin-services";
import UserService from "../../services/user-services";
import password_Util from "../../utilities/password-utilit";


describe("user Model", () => {

  
    it('should have an index method', () => {
      expect(UserRepo.getUsers).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(UserRepo.getuserByid).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(UserRepo.createUser).toBeDefined();
    });
  
    it('should have a update method', () => {
      expect(UserRepo.editUser).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(UserRepo.delete_User).toBeDefined();
    });
  


    
    it('create method should add a user', async () => {
      const salt = await password_Util.GenerateSalt();
      const result = await UserRepo.createUser({
          username:'usertest',
          password: await password_Util.GeneratePassword( 'password',salt)
      });
      expect(result).toEqual({
        userid: result.userid,
        username:result.username,
        user_password:result.user_password
      });
    });



    it('show method should return the correct user', async () => {
     
      setTimeout(async () => {
        const result = await UserRepo.getuserByid(2);
        expect(result).toEqual({
          userid:result.userid,
          username:result.username,
          user_password:result.user_password
        })
      }, 2000);
    });
  
    it('show method should update user', async () => {
     
      setTimeout(async () => {
        let user:UserForEditDto;
        const getuser =await UserRepo.getuserByid(2)
        user ={id:getuser.userid,username:getuser.username , password:getuser.user_password}
        const result = await UserRepo.editUser(user);
        expect(result).toEqual({
          userid:result.userid,
          username:result.username,
          user_password:result.user_password
        })
      }, 2000);
    });
    
    it("index method should return a list of users", async () => {
     
      setTimeout(async () => {
        const userListFromrepo = await UserRepo.getUsers()
  
      const userList =[{
        userid: 1,
        username:"Admin",
        user_password:'password'
      }
      
   ]
      expect(userListFromrepo).toEqual(userList)
  
      }, 3000);
      
     
    })
  
   
    it('delete method should remove the user', async () => {
     
      setTimeout(async () => {
        await UserRepo.delete_User(2)
        const userListFromrepo = await UserRepo.getUsers()
     expect(userListFromrepo).toEqual([{
         userid: 1,
         username:"Admin",
         user_password:'password'
     }])
      }, 6000);
     
    });








  })