import express from 'express';
import createOrder from '../../controllers/user/order/createOrder.controller';
import { verifyPayment } from '../../controllers/user/order/verifyPayment.controller';
import orderStatusController from '../../controllers/user/order/orderStatus.controller';
import { cancelOrder } from '../../controllers/user/order/cancelOrder.controller';
import { listOrders } from '../../controllers/user/order/listOrders.controller';
const router = express.Router();

router.post('/', createOrder);

router.get('/', listOrders);

router.post('/payment/success', verifyPayment);

router.get('/status/:orderId', orderStatusController);

router.post('/cancel', cancelOrder);

export default router;