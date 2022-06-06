
import  User  from "../model/types/user";
import Client from '../../database/databaseconnection';
import bcrypt from 'bcrypt';
import { UserForRegisterDto } from "../dtos/userDtos/userForRegisterDto";
import { UserForEditDto } from "../dtos/userDtos/userForEditDto";


//Dealing with data base operations


 


 const  createUser= async (u:UserForRegisterDto ):Promise<User>=> {
        try {

      const conn = await Client.connect();
      const sql = 'INSERT INTO users (username,user_password) VALUES($1, $2) RETURNING *'
      const result = await conn
          .query(sql,[u.username,u.password]);
          const user = result.rows[0]
      conn.release();
      return user
        } catch (err) {
            throw new Error(`from repo Could not add new user ${u.username}. Error: ${err}`)
        }
    }


    const  isusernameexist= async(username:string):Promise<User| null>=> {
      try {
          const sql = `SELECT * FROM users  where username=($1);`
          const conn = await Client.connect()
          const result = await conn.query(sql,[username])
          const user = result.rows[0]
          conn.release()
          return user
          } catch (err) {
              throw new Error(`Could not find user ${username}. Error: ${err}`)
          }
   }

 const  getuserByName= async(username:string):Promise<User>=> {
    //console.log(username)
        try {
            const sql = `SELECT * FROM users  where username='${username}';`
            const conn = await Client.connect()
            const result = await conn.query(sql)
            const user = result.rows[0]
            conn.release()
            //console.log(user)
              return user
         
           
            } catch (err) {
                throw new Error(`Could not find user ${username}. Error: ${err}`)
            }
     }



const  getuserByid= async(id: number): Promise<User> => {
        try {
          
        const sql = `SELECT * from users where userid=${id}`

        const conn = await Client.connect()
    
        const result = await conn.query(sql)

        const user = result.rows[0]
        conn.release()
    
        return user
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }


const  editUser = async(u:UserForEditDto):Promise<User> => {
  try {
    
    
    const connection = await Client.connect();
    const sql =
        `UPDATE users SET username='${u.username}',user_password='${u.password}' WHERE userid=${u.id} RETURNING *`;
        const result = await connection.query(sql);
        const user = result.rows[0];
        connection.release();
        
      return user
  } catch (err) {
    throw new Error(`Could not find user ${u.id}. Error: ${err}`)
  }
}

const delete_User =async(id:number):Promise<User| null> => {
  try {
    const connection = await Client.connect();
    const sql = `DELETE FROM users WHERE userid=${id}`;
    const result = await connection.query(sql);
        
        connection.release();
        return result.rows[0]
  } catch (err) {
    throw new Error(`coud not delete this user with id:${id}`)
  }
}

   

 const getUsers = async():Promise<User[]> => {
  try {
          
    const sql = `SELECT * FROM users`

    const conn = await Client.connect()

    const result = await conn.query(sql)

    const users = result.rows
    conn.release()

    return users
    } catch (err) {
        throw new Error(`Could not find users. Error: ${err}`)
    }
 }

       const UserRepo = {
    createUser,
    getuserByName,
    getuserByid,
    getUsers,
    editUser,
    delete_User,
    isusernameexist
  } 



export default UserRepo;