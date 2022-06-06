import express from 'express';
import adminControler from '../../controllers/api/admin.controller';









const admin = express.Router({mergeParams: true});




admin.get('/users/all' ,adminControler.getAllUsers);

admin.delete('/users/:userId',adminControler.delete_user)


//-----------------   categories ---------------------
admin.post('/categories', adminControler.addCategory);

admin.put('/categories/:categoryId', adminControler.updateCategory);
admin.delete('/categories/:categoryId', adminControler.deleteCategory);


// ------------------------ products ---------------------
admin.post('/categories/:categoryId/products',adminControler.addProduct);
admin.put('/products/:productId',adminControler.updateProduct)
admin.delete('/products/:productId',adminControler.deleteProduct);





      




    export default admin;






