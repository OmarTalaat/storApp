import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import productController from '../../controllers/api/products.controller';


const products = express.Router({mergeParams: true});


products.get('',productController.getAllProductsbycategory);

products.get("/:productId",productController.getproductbyId);



    export default products;