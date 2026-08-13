import { processLineMessage } from '../services/lineService.js';
import { Client } from '@line/bot-sdk';

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || ''
};

const client = lineConfig.channelAccessToken ? new Client(lineConfig) : null;

export async function handleWebhook(req, res) {
  try {
    const events = req.body.events || [];
    await Promise.all(events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        const replyMsg = await processLineMessage(event.message.text);
        if (client && event.replyToken) {
          await client.replyMessage(event.replyToken, replyMsg);
        }
      }
    }));
    res.status(200).send('OK');
  } catch (err) {
    console.error('[LINE Webhook Error]', err);
    res.status(500).send('Error');
  }
}

export async function handleSimulate(req, res) {
  try {
    const { text } = req.body;
    const replyMsg = await processLineMessage(text);
    res.json({ success: true, message: replyMsg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
