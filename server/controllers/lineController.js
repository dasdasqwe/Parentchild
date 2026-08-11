import { processLineQuery, replyLineWebhook } from '../services/lineService.js';

export async function handleLineWebhook(req, res) {
  try {
    const events = req.body.events || [];
    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const userText = event.message.text;
        const result = await processLineQuery(userText);
        await replyLineWebhook(event.replyToken, [result.flexMessage]);
      }
    }
    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('LINE Webhook Error:', err);
    return res.status(500).json({ status: 'error', error: err.message });
  }
}

export async function simulateLineMessage(req, res) {
  try {
    const queryText = req.body.query || '宜蘭 3000';
    const result = await processLineQuery(queryText);
    return res.json(result);
  } catch (err) {
    console.error('LINE Simulate Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
