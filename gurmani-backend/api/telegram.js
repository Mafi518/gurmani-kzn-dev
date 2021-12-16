module.exports.sendMsg = (req, res) => {
        //токен и id чата берутся из config.json
        const config = require('../telegram_config.json');
        let http = require('request')
        //каждый элемент обьекта запихиваем в массив

        console.log(req.query);

        // let msg = req.query.comment

        let { comment, phone, first_name, client_address, client_address2, service_mode, products } = req.query

        let test = `Имя: ${first_name} \nТелефон: ${phone} \nКомментарий: ${comment}`
        //проходимся по массиву и склеиваем все в одну строку
        test = encodeURI(test)
        //делаем запрос
        http.post(`https://api.telegram.org/bot${config.token}/sendMessage?chat_id=${config.chat}&parse_mode=html&text=${test}`, function (error, response, body) {
            //не забываем обработать ответ
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
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