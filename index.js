const TelegramBotApi = require('node-telegram-bot-api')
const  token = '5370039758:AAHSCM-78v9ZPXCgTKtbY_ay85E2uB3EXJA'

const bot = new TelegramBotApi(token, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветстивие'},
    {command: '/info', description: 'Выводит имя пользователя'},
    {command: '/application', description: 'Оставить заявку'},
])

const chats = {}

const  gameOpt = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1',callback_data:'1'},{text: '2',callback_data:'2'},{text: '3',callback_data:'3'}],
            [{text: '4',callback_data:'4'},{text: '5',callback_data:'5'},{text: '6',callback_data:'6'}],
            [{text: '7',callback_data:'7'},{text: '8',callback_data:'8'},{text: '9',callback_data:'9'}],
            [{text: '0',callback_data:'0'}],
        ]
    })
}

const start = () => {
    bot.on('message' , async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        //const chatIds = 515667991;

        if (text === '/start') {
            await bot.sendPhoto(chatId, 'https://s-k56.ru/images/system/ck_logo.png')
            return  bot.sendMessage(chatId, `Добро пожаловать вас приветствует SteelComBot`)

        }

        if (text === '/info') {
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }


    })
    bot.on('message', async (msg,match) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        let notes = []
        if (text === '/application') {
            bot.sendMessage(chatId,'Введите название организации ')
            let text1 = notes[0];
            bot.sendMessage(chatId,'Введите ваше имя')
            let text2 = notes[1];
            const call = notes.push({'1': text1, '2': text2})
            bot.sendMessage(chatId, `${call}`)
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatid = msg.message.chat.id;
        if (data === chats[chatid]) {
            return bot.sendMessage(chatid,`Поздравляю ты угадал число ${chats[chatid]}`)
        } else {
            return bot.sendMessage(chatid, `Не угадал! Бот загадал ${chats[chatid]}`)
        }

    })

}
start()