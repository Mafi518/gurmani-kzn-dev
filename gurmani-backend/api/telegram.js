module.exports.sendMsg = (req, res) => {
    // токен и id чата берутся из config.json
    const config = require('../telegram_config.json');
    let http = require('request')
    // каждый элемент обьекта запихиваем в массив

    let {
        order_description,
        order_phone,
        order_name,
        products,
        order_total,
        order_address,
        address,
        order_delivery_pay,
        pickup_address
    } = req.body



    let telegram_order = `
    Имя: ${order_name}
${pickup_address.affilate_address !== '' ? `Адрес самовывоза: ${pickup_address.affilate_address}` : ''}
${address.empty !== true ? `Адрес доставки: ${order_address.search_value}, Дом: ${order_address.house}, Квартира: ${order_address.apartment}, Подъезд: ${order_address.entrance}, Этаж: ${order_address.floor}` : ``}
Телефон: ${order_phone}

Блюда: \n ${products.map(item => {return `${item.name} | Кол-во: ${item.count} шт | ${item.price} ₽ ${item.modifications.length ? `| Допки: ` + item.modifications.map(item => `${item.name} (${item.count})`) : ``}\n ` }) }
Комментарий: ${order_description} ${order_delivery_pay !== 0 ? `| Доставка ${order_delivery_pay}₽` : ''}

Общая сумма: ${order_total} ₽`

    //проходимся по массиву и склеиваем все в одну строку
    telegram_order = encodeURI(telegram_order)


    //делаем запрос
    http.post(`https://api.telegram.org/bot${config.token}/sendMessage?chat_id=${config.chat}&parse_mode=html&text=${telegram_order}`, function (error, response, body) {
        //не забываем обработать ответ
        // console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('body:', body);
        if (response.statusCode === 200) {
            res.status(200).json({
                status: 'ok',
                message: 'Успешно отправлено!'
            });
        }
        if (response.statusCode !== 200) {
            res.status(400).json({
                status: 'error',
                message: 'Произошла ошибка!'
            });
        }
    });
}