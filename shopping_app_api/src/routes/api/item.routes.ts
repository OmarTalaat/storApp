import express from "express";
import items_Controller from "../../controllers/api/items.controller";





const items = express.Router({mergeParams: true});



items.post('/addproduct' ,items_Controller.addProductToOrder);
items.get('', items_Controller.getItemsList)
items.get('/:itemId',items_Controller.getItem_detailes);
items.put('/:itemId',items_Controller.update_quantity_Item);
items.delete('/:itemId',items_Controller.removeItem);







export default items;