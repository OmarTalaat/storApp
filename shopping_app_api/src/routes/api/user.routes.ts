import express from 'express';
import items_Controller from '../../controllers/api/items.controller';
import user_controller from '../../controllers/api/users.controller';

import category from './category.routes';

import orders from './order.routes';








const users = express.Router();










users.get("/:userId", user_controller.getUser);
users.put("/:userId", user_controller.updateUser);
users.post("/:userId/addproduct",items_Controller.addProductToOrder)
users.use("/:userId/categories", category);
users.use("/:userId/orders",orders)




      





    export default users;