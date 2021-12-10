const express = require('express');
const config = require('../manifest');
const PosterApi = require('../api/poster');
const addresses = require('../addresses.json')

const router = new express.Router();


router.get('/getProductsFromCategory:id', async (req, res) => {

    const posterApi = new PosterApi({
        token: config.token
    });

    const products = await posterApi.makePosterRequest('menu.getProducts', 'GET', {
        body: {
            category_id: req.params.id
        }
    })
    res.send(products);
});

router.get('/populars', async (req, res) => {

    const posterApi = new PosterApi({
        token: config.token
    });

    const categories = await posterApi.makePosterRequest('menu.getProducts')

    res.send(categories)
})

router.get('/categories', async (req, res) => {

    const posterApi = new PosterApi({
        token: config.token
    });

    const categories = await posterApi.makePosterRequest('menu.getCategories')

    res.send(categories)
})

router.get('/promocodes', async (req, res) => {

    const posterApi = new PosterApi({
        token: config.token
    });

    const promocodes = await posterApi.makePosterRequest('clients.getPromotions')

    res.send(promocodes)
})

router.get('/getDiscountProduct:id', async (req, res) => {

    const posterApi = new PosterApi({
        token: config.token
    });

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
            const posterApi = new PosterApi({
                token: config.token
            });
            const order_data = req.query;
            const order_data_address1 = JSON.parse(order_data.client_address)
            const order_data_address2 = JSON.parse(order_data.client_address2)
            // const order_products = JSON.parse(order_data.products);

            // console.log(order_products);

            const order = await posterApi.makePosterRequest('incomingOrders.createIncomingOrder', 'post', {
                    body: {
                        spot_id: 1,
                        first_name: order_data.first_name,
                        phone: order_data.phone,
                        delivery_price: order_data.service_mode == '3' ? order_data.delivery_price : '',
                        client_address: {
                            address1: order_data.service_mode == '3' ? `${order_data_address1.street} |` : '',
                            address2: `Дом: ${order_data_address2.house} | Квартира: ${order_data_address2.apartment} | Подъезд: ${order_data_address2.entrance} | Этаж ${order_data_address2.floor}`
                        },
                        comment: order_data.comment,
                        products: order_data.products.map(item => JSON.parse(item))
                        
                        // проблема с модификаторами либо в строке, либо в том, что я передаю modification в целом в заказ, а не конкретно в объект product
                        // Ебаная хуйня ее надо передавать прямо в продукт
                        }
                    });

                res.send(order)

            });

            // spot_id: 1,
            // first_name: "ddd",
            // phone: "+79176446552",
            // email: "",
            // client_id: "",
            // products: [{
            //         product_id: 12,
            //         modification: "[{\"m\":4,\"a\":5}]",
            //         count: 1,
            //         price: 28200
            //         }],
            //     comment: "",
            //     service_mode: 2,
            //     client_address: {
            //         delivery_time: "2021-10-21 16:52:22"
            //     }

        module.exports = router;