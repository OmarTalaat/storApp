
import bcrypt from 'bcrypt';
import confg from '../config/config';
import jwt, { JwtPayload } from 'jsonwebtoken';














const app_secret = confg.serve.APP_SECRET as string;
const token_secret = confg.serve.tOKEN_SECRET as string;


const   GenerateSalt = async() => {
     
    return await bcrypt.genSalt();
         
}; 




 const GeneratePassword = async (password:string|Buffer, salt:string | number) => {
    return await bcrypt.hashSync(password, salt);
};


 const ValidatePassword = async (enteredPassword: string | Buffer, savedPassword: string) => {
   // return await GeneratePassword(enteredPassword, salt) == savedPassword;
   return bcrypt.compare(enteredPassword, savedPassword);
};

 const  comparepasswod = async(password:string ,savedPassword: string)=>{
    const validPassword = await bcrypt.compare(password, savedPassword);
  }

 const  GenerateSignature = async (payload:JwtPayload) => {
    return jwt.sign( payload, token_secret , { expiresIn: 86400 } )
};


 const ValidateSignature  = async(req:any,res:any) => {

    try {
        const signature = req.headers.Authorization
    if (!signature) return res.status(401).send("Access Denied");
    if(signature){
        const token = signature.split(' ')[1]
            const payload = await jwt.verify(token, confg.serve.tOKEN_SECRET|| String);
            req.user = payload;
        return true
    }
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
      return
    }
};


const FormateData = (user:any) => {
    if(user){
        return { user }
    }else{
        throw new Error('Data Not found!')
    }
}





const password_Util = {

    GenerateSalt,
    GeneratePassword,
    ValidatePassword,
    GenerateSignature,
    ValidateSignature,
    FormateData,
    comparepasswod
    

}

export default password_Util;


