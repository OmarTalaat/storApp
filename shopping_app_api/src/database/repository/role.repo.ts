
import Client from '../../database/databaseconnection';
import Role from '../model/types/role';




class RoleRepo {

async  GetuserwithRoles (userId: number):Promise<Role[]>{
    try {
      const conn = await Client.connect();
    const sql = `SELECT roles.name 
    FROM users LEFT OUTER JOIN user_roles ON users.userid  = user_roles.user_id 
               LEFT OUTER JOIN roles ON user_roles.role_id = roles.roleid  where users.userid =${userId}`
    const result = await conn.query(sql);
    const roles = result.rows
    conn.release()
    return roles
  } catch (err) {
    throw new Error(`unable get users with Roles: ${err}`)
    }
}

async getAllRollesbyId (){

try {
  const conn= await Client.connect();
  const sql = 'SELECT * FROM public.roles ORDER BY id ASC '
  const result = await conn.query(sql);
  conn.release()
  return result.rows
  
} catch (err) {
  throw new Error(`unable get  Roles: ${err}`)
}

}

async setRoles( userId:number, roleId:number) {
  try {
    const sql = 'INSERT INTO user_roles (user_id, role_id) VALUES($1, $2) RETURNING *'

    //@ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [userId, roleId])

    const userRoles = result.rows[0]

    conn.release();



    return userRoles
  } catch (err) {
    throw new Error(`Could not add Role ${roleId} to user ${userId}: ${err}`)
  }
}

async deletuser_from_roles(userId:number){
  try {
    const conn = await Client.connect();
    const sql = `DELETE FROM user_roles WHERE user_id=${userId}`;
    const result = await conn.query(sql);
     conn.release()
  return result.rows
  } catch (err) {
    throw new Error(`can not delete user with id:${userId} error:${err}`)
  }
}



}


export default RoleRepo;