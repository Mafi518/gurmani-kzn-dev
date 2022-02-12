const express = require('express');
const config = require('../manifest');
const PosterApi = require('../api/poster');
// const cors = require('cors');
const ctrlTelegram = require('../api/telegram');
const addresses = require('../addresses.json')
const banners = require('../banners.json')
const popular_names = require('../popular_names.json')
const product_positions = require('../category_positions_config.json')
const promocodes_usage = require('../promocode_type.json')
const fs = require('fs');
const e = require('express');


const router = new express.Router();

// let corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200
// }

router.get('/getProductsFromCategory:id', async (req, res) => {

    const posterApi = new PosterApi({
        token: config.token
    });

    const products = await posterApi.makePosterRequest('menu.getProducts', 'GET', {
        body: {
            category_id: req.params.id
        }
    })
    let sortId = 0
    products.map(item => item.sort_id = sortId++)

    if (product_positions.filter(el => el.category_id == req.params.id).length) {
        products.map(item => {
            let products_config = product_positions.filter(el => el.category_id == item.menu_category_id)

            if (products_config) {
                let config_products_data = products_config[0].products

                for (const item of products) {
                    let clone = config_products_data.filter(el => el.product_name == item.product_name)
                    let prod = products.filter(el => el.product_name == clone[0].product_name)
                    prod[0].sort_id = clone[0].sort_id
                }
            }
        })

        products.map(item => console.log(item.product_name, item.sort_id))

        products.sort((item1, item2) => {
            return item1.sort_id - item2.sort_id;
        });
    }

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

    promocodes.map(promocode => promocode.usage = 'reusable')

    if (promocodes_usage.length) {
        for (const promocode of promocodes) {

            let promo = promocodes_usage.filter(item => item.name.toUpperCase() == promocode.name.toUpperCase())
            if (promo.length) {
                promocode.usage = promo[0].usage
            }
        }
    }

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

    res.end()
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
    
    popular_names.splice(data[0], 1)

    let fullData = JSON.stringify(popular_names, null, 2)
    fs.writeFile('gurmani-backend/popular_names.json', fullData, (err) => {
        if (err) console.log(err)
    })

    res.end()
})

router.post('/saveProductPositions', async (req, res) => {
    const data = await req.body

    let obj = {
        category_id: data[0].menu_category_id,
        products: data.map(item => {
            return {
                product_name: item.product_name,
                category_name: item.category_name,
                category_id: item.menu_category_id,
                sort_id: item.sort_id
            }
        })
    }

    if (product_positions.filter(item => item.category_id == obj.category_id).length) {
        console.log('change');
        let index = product_positions.filter(item => item.category_id == obj.category_id)
        product_positions.splice(product_positions.indexOf(index[0]), 1)
        product_positions.push(obj)
    } else {
        product_positions.push(obj)
    }

    let fullData = JSON.stringify(product_positions, null, 2)
    fs.writeFile('gurmani-backend/category_positions_config.json', fullData, (err) => {
        if (err) console.log(err)
    })

    res.end()
})

router.post('/changePromocodeType', async (req, res) => {
    const promocode = await req.body

    if (promocodes_usage.filter(item => item.name.toUpperCase() == promocode.name.toUpperCase()).length) {
        let index = promocodes_usage.filter(item => item.name.toUpperCase() == promocode.name.toUpperCase())
        promocodes_usage.splice(promocodes_usage.indexOf(index[0]), 1)
        promocodes_usage.push(promocode)
        console.log('exist');
    } else {
        promocodes_usage.push(promocode)
    }

    let fullData = JSON.stringify(promocodes_usage, null, 2)
    fs.writeFile(`gurmani-backend/promocode_type.json`, fullData, (err) => {
        if (err) console.log(err)
    })

    res.end()
})

module.exports = router;