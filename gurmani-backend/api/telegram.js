module.exports.sendMsg = (req, res) => {
        //токен и id чата берутся из config.json
        const config = require('../telegram_config.json');
        let http = require('request')
        //каждый элемент обьекта запихиваем в массив

        let { comment, phone, first_name, client_address, client_address2, products, total_order_price } = req.query

        let clAddress = JSON.parse(client_address)
        let clAddress2 = JSON.parse(client_address2)
        



        let telegram_order = `Имя: ${first_name} \nТелефон: ${phone} ${clAddress.street !== undefined ? '\nАдрес доставки: ' + clAddress.street + ' Дом: ' + clAddress2.house + ' Квартира: ' + clAddress2.apartment + ' Подъезд: ' + clAddress2.entrance + ' Этаж: ' + clAddress2.floor : ''} \nБлюда: ${products.map(item => { return `${JSON.parse(item).product_name + '| Кол-во ' + JSON.parse(item).count + ' | Цена: ' + JSON.parse(item).price + '₽ |' + (JSON.parse(item).modification ? ' Допки: ' + JSON.parse(item).modification.map(item => {return (` | ${item.m + item.a}`)}) : '')  + '\n'}` })} \nКомментарий: ${comment}  \nОбщая сумма: ${total_order_price} ₽`
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