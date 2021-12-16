process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api');
const telegram_config = require('./telegram_config.json')
const addresses = require('./addresses.json')

const bot = new TelegramBot(telegram_config.token, {
    polling: true
});

bot.setMyCommands([
    {command: '/start', description: 'Привет, я бот Gurmani'},
    {command: '/streetInfo', description: 'Получить информацию об улице'},
])

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        return bot.sendMessage(chatId, 'Привет, я бот Gurmani')
    }
    if (text === '/streetInfo') {
        return bot.sendMessage(chatId, text)
    }

    return bot.sendMessage(chatId, 'Попробуй ещё раз')
});
