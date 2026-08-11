import { searchGlobalHotels } from './hotelService.js';
import axios from 'axios';
import { config as env } from '../config/env.js';

export function parseLineMessage(text) {
  const clean = (text || '').trim();
  const tokens = clean.split(/\s+/);
  
  let destination = '宜蘭';
  let budget = 10000;

  if (tokens.length >= 2) {
    destination = tokens[0];
    const parsedNum = parseInt(tokens[1], 10);
    if (!isNaN(parsedNum) && parsedNum > 0) {
      budget = parsedNum;
    }
  } else if (tokens.length === 1 && tokens[0]) {
    const parsedNum = parseInt(tokens[0], 10);
    if (!isNaN(parsedNum) && parsedNum > 0) {
      budget = parsedNum;
    } else {
      destination = tokens[0];
    }
  }

  return { destination, budget };
}

export function buildLineFlexCarousel(destination, hotels) {
  const contents = hotels.map(item => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: item.name,
          weight: 'bold',
          size: 'md',
          wrap: true,
          maxLines: 2
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            {
              type: 'text',
              text: `⭐ ${item.rating || 4.8}`,
              size: 'xs',
              color: '#d97706',
              weight: 'bold',
              flex: 0
            },
            {
              type: 'text',
              text: ` (${item.reviewsCount || 800}則評價)`,
              size: 'xs',
              color: '#999999',
              flex: 0
            }
          ]
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            {
              type: 'text',
              text: `NT$ ${(item.price || 0).toLocaleString()}`,
              size: 'xl',
              color: '#059669',
              weight: 'bold'
            },
            {
              type: 'text',
              text: ' /晚起',
              size: 'xs',
              color: '#aaaaaa'
            }
          ]
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: '#059669',
          height: 'sm',
          action: {
            type: 'uri',
            label: `👑 前往 ${item.lowestPriceProvider || 'Agoda'} 搶購`,
            uri: item.url || 'https://www.agoda.com'
          }
        }
      ]
    }
  }));

  return {
    type: 'flex',
    altText: `🎯 StayPulse 為您找到「${destination}」精選比價飯店`,
    contents: {
      type: 'carousel',
      contents
    }
  };
}

export async function processLineQuery(text) {
  const { destination, budget } = parseLineMessage(text);
  const result = await searchGlobalHotels({
    destination,
    maxPrice: budget,
    sort: 'price_asc',
    page: 1,
    pageSize: 6
  });

  const hotels = result.data || [];
  const flexMessage = buildLineFlexCarousel(destination, hotels);

  return {
    success: true,
    destination,
    budget,
    count: hotels.length,
    data: hotels,
    flexMessage
  };
}

export async function replyLineWebhook(replyToken, messages) {
  if (!env.lineChannelAccessToken) return;
  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/reply',
      { replyToken, messages },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.lineChannelAccessToken}`
        }
      }
    );
  } catch (err) {
    console.error('LINE Reply API Error:', err.message);
  }
}
