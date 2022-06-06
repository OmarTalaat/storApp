

import { UserfordetailsDto } from '../database/dtos/userDtos/userfordetailsDto';
import { UserForEditDto } from '../database/dtos/userDtos/userForEditDto';
import { UserToreturn } from '../database/dtos/userDtos/userToreturn';
import UserRepo from '../database/repository/user.repo';
import password_Util from '../utilities/password-utilit';






const getUserById = async(userId: number) =>{

    try {
        const existingUser = await UserRepo.getuserByid(userId);
        var user:UserfordetailsDto
        return user={id:existingUser.userid ,username:existingUser.username };

    } catch (error) {
        
    }
}

const editUser = async(u:UserForEditDto) => {
    try {
        const userFromRepo = await UserRepo.getuserByid(u.id);

        if (userFromRepo) {
            const salt = await password_Util.GenerateSalt();
            const  userPassword = await password_Util.GeneratePassword(u.password, salt);
            u.password = userPassword;
            
            const updatedUser = await UserRepo.editUser(u);

            var user:{}
            return user={id:updatedUser.userid ,username:updatedUser.username};
        } else {
            return `can not update ${u.username} `
        }
    } catch (err) {
        throw new Error(`can not update due to:${err}`)
    }
}



 const UserService = {

    getUserById,
    editUser
} 

export default UserService;

