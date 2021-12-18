process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api');
const telegram_config = require('./telegram_config.json')
const addresses = require('./addresses.json')

const bot = new TelegramBot(telegram_config.token, {
    polling: true
});

bot.setMyCommands([{
        command: '/start',
        description: 'Привет, я бот Gurmani'
    },
    {
        command: '/streetinfo',
        description: 'Введите название улицы, чтобы получить информацию о ней'
    }
])


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        return bot.sendMessage(chatId, 'Привет, я бот Gurmani')
    }
    if (text === '/streetinfo') {

        // console.log(addresses.map(item => item.address));

        await bot.on('message', async (msg) => {
            const street = msg.text
            // console.log(addresses.filter(item => item.address.includes(street)).length);
            let same = addresses.filter(item => item.address.includes(street)).map(item => {
                switch (item.delivery_zone) {
                    case "1":
                        item.delivery_pay = 1;
                        item.delivery_free = 600;
                        break;
                    case "2":
                        item.delivery_pay = 100;
                        item.delivery_free = 800;
                        break;
                    case "3":
                        item.delivery_pay = 150;
                        item.delivery_free = 1000;
                        break;
                    case "4":
                        item.delivery_pay = 150;
                        item.delivery_free = 1200;
                        break;
                    case "5":
                        item.delivery_pay = 200;
                        item.delivery_free = 1400;
                        break;
                    case "6":
                        item.delivery_pay = 250;
                        item.delivery_free = 1800;
                        break;
                    case "7":
                        item.delivery_pay = 300;
                        item.delivery_free = 2000;
                        break;
                    default:
                        break;
                }

                return {
                    item
                }
            })
            // console.log(same);

            // console.log(same);
            // for (const data of same) {
            //     return bot.sendMessage(chatId, data)
            // }
            for (let index = 0; index < same.length; index++) {
                const { address, delivery_zone, street_index, delivery_pay, delivery_free } = same[index].item;
                console.log(address);
                let msg = `Улица: ${address} \nЗона доставки: ${delivery_zone} \nБесплатная доставка от: ${delivery_free} ₽ \nПлатная доставка: ${delivery_pay} ₽ \nИндекс улицы: ${street_index}`
                bot.sendMessage(chatId, msg)
            }
        })
    }
    // Скорее всего проблема в том, что он возвращает объект или массив, нужно преобразовать в строку (Так оно и есть)
    // return await bot.sendMessage(chatId, 'Попробуй ещё раз')
});

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    console.log(data);
    // if (data === chats[chatId]) {
    //     return await bot.sendMessage(chatId, `dasdad`)
    // }
})