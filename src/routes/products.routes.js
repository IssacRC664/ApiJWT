import {Router} from 'express';
const router = Router()

//importamos todos los controller de  products
import * as productsCtrl from '../controllers/products.controllrer' 
import {authJwt} from '../middlewares'


//crear el proucto
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct )

//para optener todos los productos
router.get('/', productsCtrl.getProducts )

//para optener un producto por id
router.get('/:productId', productsCtrl.getProductById )

//para actualizar un producto por id
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById )

//para eliminar un producto por id
router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin] , productsCtrl.deleteProductById )


export default router;

