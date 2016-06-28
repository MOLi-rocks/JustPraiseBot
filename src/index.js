import TelegramBot from 'node-telegram-bot-api';
import { token } from './env.js';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;

  bot.sendMessage(chatId, '讚讚', {reply_to_message_id: msgId});
});
