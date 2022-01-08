const express = require('express');
const config = require('../manifest');
const PosterApi = require('../api/poster');
const ctrlTelegram = require('../api/telegram');
const addresses = require('../addresses.json')
const banners = require('../banners.json')
const popular_names = require('../popular_names.json')
const fs = require('fs')


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

    const populars = await posterApi.makePosterRequest('menu.getProducts')

    const names = popular_names

    let filtered = []

    for (const item of names) {
        test2 = populars.filter(popular => {
            return popular.product_name == item
        })
        filtered.push(test2[0])
    }
    
    res.send(filtered.filter(item => item));
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
        }
    });

    res.send(order)

});

router.get('/banners', async (req, res) => {
    res.send(banners)
})

router.post("/promoD", async (req, res) => {
    const data = await req.query

    if (banners.filter(item => item.promo_name == data.promo_name).length && data.action === 'add') {
        console.log('exists');
    } else if (data.action === 'add') {
        await banners.push(data)
        let fullData = JSON.stringify(banners, null, 2)
        fs.writeFile('gurmani-backend/banners.json', fullData, (err) => {
            if (err) console.log(err)
        })
    }

    if (data.action === 'delete') {
        let fullData = JSON.stringify(banners.filter(function (f) {
            return f.promo_name !== data.promo_name
        }), null, 2)
        fs.writeFile('gurmani-backend/banners.json', fullData, (err) => {
            if (err) console.log(err)
        })
    }


})

router.post('/telegram', ctrlTelegram.sendMsg);

router.post('/setNewAddress', async (req, res) => {
    const data = await req.query

    data.id = (addresses.length).toString()

    await addresses.push(data)
    let fullData = JSON.stringify(addresses, null, 2)
    fs.writeFile('gurmani-backend/addresses.json', fullData, (err) => {
        if (err) console.log(err)
    })
    res.end()

})

router.post('/deleteAddress', async (req, res) => {
    const data = await req.query

    addresses.splice(data.id, 1)
    let fullData = JSON.stringify(addresses, null, 2)
    fs.writeFile('gurmani-backend/addresses.json', fullData, (err) => {
        if (err) console.log(err)
    })
    res.end()
})

router.post('/setNewPopular', async (req, res) => {
    const data = await req.query

    await popular_names.push(data[0])
    let fullData = JSON.stringify(popular_names, null, 2)
    fs.writeFile('gurmani-backend/popular_names.json', fullData, (err) => {
        if (err) console.log(err)
    })

    res.end()
})

router.post('/deletePopular', async (req, res) => {
    const data = await req.query

    let filtered = await popular_names.filter(name => name !== data[0])
    let fullData = JSON.stringify(filtered, null, 2)
    fs.writeFile('gurmani-backend/popular_names.json', fullData, (err) => {
        if (err) console.log(err)
    })

    res.end()
})

module.exports = router;