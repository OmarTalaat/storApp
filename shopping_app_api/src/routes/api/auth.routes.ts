import express from 'express';
import auth_controller from '../../controllers/api/auth.controller';








const auth = express.Router();



auth.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });





auth.post('/register', auth_controller.register);




      
auth.post('/login',  auth_controller.login);


auth.get('/isUerNameExist',auth_controller.isusernameexist);

    export default auth;






