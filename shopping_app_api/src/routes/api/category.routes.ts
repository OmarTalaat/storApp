import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import productController from '../../controllers/api/products.controller';
import products from './product.routes';
import categories_controller from '../../controllers/api/category.controller';
import authJwt from '../../controllers/api/middlewares/authJwt';
import users from './user.routes';







const categories = express.Router({mergeParams: true});












categories.get('',categories_controller.getcategories);
categories.get('/:categoryId',categories_controller.getCategory)
categories.use('/:categoryId/products', products);





      


    export default categories;