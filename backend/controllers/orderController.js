import asyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import User from '../model/userModel.js';



/**
 * @description   Create new order
 * @route        GET /api/orders
 * @access       Public
 */

const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        
        res.status(400)
        throw new Error('No order items')
        return
    }else{

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingAddress,
            totalPrice
        })

        const orderSaved = await order.save()

        res.status(201).json(orderSaved)

    }

})



/**
 * @description   Get order by ID
 * @route        GET /api/orders/:id
 * @access       Private
 */

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    }else {
        res.status(400)
        throw new Error('Order not found')
    }
})



/**
 * @description  Update order to paid
 * @route        GET /api/orders/:id/pay
 * @access       Private
 */

const updateOrderToPaid = asyncHandler(async (req, res) => {


    const order = await Order.findById(req.params.id);

    
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }

    order.isPaid = true,
    order.paidAt = Date.now(),
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
    }
        
    const updatedOrder = await order.save()
    
    res.json(updatedOrder)

})



/**
* @desc    Update order to delivered
* @route   GET /api/orders/:id/deliver
* @access  Private/Admin
*/

const updateOrderToDelivered = asyncHandler(async (req, res) => {


    const order = await Order.findById(req.params.id);

    if (order) {
        
        order.isDelivered = true,
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    }else {
        res.status(400)
        throw new Error('Order not found')
    }

})



/**
 * @description  Get logged in user orders
 * @route        GET /api/orders/myorders
 * @access       Private
 */

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id })

    res.json(orders)
})






export { 
    addOrderItems,
    getOrderById,
    getMyOrders,
    updateOrderToPaid,
    updateOrderToDelivered
}