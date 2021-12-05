const express = require('express');
const config = require('../manifest');
const PosterApi = require('../api/poster');
const addresses = require('../addresses.json')

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

router.get('/promocodes', async (req, res) => {
    
    const posterApi = new PosterApi({ token: config.token });
    
    const promocodes = await posterApi.makePosterRequest('clients.getPromotions')

    res.send(promocodes)
})

router.get('/getDiscountProduct:id', async (req, res) => {

    const posterApi = new PosterApi({ token: config.token });

    const discount_product = await posterApi.makePosterRequest('menu.getProduct', 'GET', {
        body: {
            product_id: req.params.id
        }
    })
    console.log(req.params.id);
    res.send(discount_product);
});

router.get('/getAddresses', async (req, res) => {

    res.send(addresses)

})


router.post('/order', async (req, res) => {
    const posterApi = new PosterApi({ token: config.token });
    const order_data = req.query;
    // const order_products = order_data.products.map(item => JSON.parse(item))

    // console.log(order_data);

    // function getOrderProducts() {
    //     let arr = []
    //     for (let item of order_products) {
    //         arr.push(
    //             {
    //                 product_id: item.product_id,
    //                 count: item.count,
    //                 price: item.price[1] / item.count,
    //             }
    //         );
    //     }
    //     return arr
    // }

    // console.log(order_data.client_address);

    const order = await posterApi.makePosterRequest('incomingOrders.createIncomingOrder', 'post', {
        body: {
            spot_id: 1,
            first_name: order_data.first_name,
            phone: order_data.phone,
            delivery_price: order_data.service_mode == '3' ? order_data.delivery_price : '',
            client_address: {address1: order_data.service_mode == '3' ? order_data.client_address : ''},
            comment: order_data.comment,
            products: order_data.products.map(item => JSON.parse(item))
        }
    });

    res.send(order)

});


module.exports = router;
