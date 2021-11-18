const express = require('express');
const config = require('../manifest');
const PosterApi = require('../api/poster');

const router = new express.Router();


router.get('/getProductsFromCategory:id', async (req, res) => {

    const posterApi = new PosterApi({ token: config.token });

    const products = await posterApi.makePosterRequest('menu.getProducts', 'GET', {
        body: {
            category_id: req.params.id
        }
    })
    res.send(products);
});

router.get('/populars', async (req, res) => {

    const posterApi = new PosterApi({ token: config.token });
    
    const categories = await posterApi.makePosterRequest('menu.getProducts')

    res.send(categories)
})

router.get('/categories', async (req, res) => {

    const posterApi = new PosterApi({ token: config.token });
    
    const categories = await posterApi.makePosterRequest('menu.getCategories')

    res.send(categories)
})

// router.post('/buy', async (req, res) => {
//     const posterApi = new PosterApi({ token: config.token });
//     const { productId } = req.body;

//     const order = await posterApi.makePosterRequest('incomingOrders.createIncomingOrder', 'post', {
//         body: {
//             spot_id: 1,
//             phone: '+380680000000',
//             products: [
//                 { product_id: productId, count: 1 },
//             ],
//         }
//     });

//     // const order = { incoming_order_id: 1 };

//     // res.render('order', { order: order });
// });


module.exports = router;
