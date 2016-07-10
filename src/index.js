import fs from 'fs';
import path from 'path';

import TelegramBot from 'node-telegram-bot-api';

import { token } from './env.js';

const bot = new TelegramBot(token, {polling: true});
const recordFilePath = path.join(__dirname, '../', 'record.json');

bot.on('message', function (msg) {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;

  let record = JSON.parse(fs.readFileSync(recordFilePath));
  record.count++;
  fs.writeFileSync(recordFilePath, JSON.stringify(record) );

  bot.sendMessage(chatId, '讚讚', {reply_to_message_id: msgId});
});

bot.onText(/\/status/, function (msg) {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;

  let record = JSON.parse(fs.readFileSync(recordFilePath));

  bot.sendMessage(chatId, `已讚讚 ${record.count} 次 <3`, {reply_to_message_id: msgId});
});
