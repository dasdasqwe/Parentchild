import axios from 'axios';
import { runScraperJob, runPackageScraperJob, runFamilyAttractionScraperJob, runTheaterScraperJob } from './scraper.js';

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';

/**
 * Handle incoming LINE Webhook events
 */
export async function handleLineWebhook(req, res) {
  const events = req.body.events || [];
  
  // Acknowledge LINE webhook immediately
  res.status(200).send('OK');

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      await processUserMessage(event.replyToken, event.message.text);
    }
  }
}

/**
 * Process text query from LINE user & send response
 */
async function processUserMessage(replyToken, userText) {
  const text = userText.trim();
  
  // Parse command keywords
  let maxPrice = 10000;
  let type = 'all';

  const cleanNoise = (rawText) => {
    return rawText
      .replace(/請幫我查|請幫我|幫我查|幫我|請查|查詢|推薦|比價|平價|請|幫|查|找|的/g, '')
      .replace(/劇|巧虎|表演|舞台劇|包套|行程|組合|套票|景點|親子|放電|遊樂|公園|住宿|飯店|民宿|旅館/g, '')
      .replace(/\d+/g, '')
      .trim();
  };

  if (text.includes('劇') || text.includes('巧虎') || text.includes('表演') || text.includes('舞台劇')) {
    // Search family theater performances over next 6 months
    const city = cleanNoise(text) || 'taipei';
    const theaters = await runTheaterScraperJob({ cityId: city }, () => {});
    return await replyLineTheaters(replyToken, city, theaters);
  }

  if (text.includes('包套') || text.includes('行程')) {
    // Search package tours
    const city = cleanNoise(text) || '宜蘭';
    const packages = await runPackageScraperJob({ cityId: city }, () => {});
    return await replyLinePackages(replyToken, city, packages);
  }

  if (text.includes('景點') || text.includes('親子')) {
    // Search family attractions
    const city = cleanNoise(text) || '宜蘭';
    const attractions = await runFamilyAttractionScraperJob({ cityId: city }, () => {});
    return await replyLineAttractions(replyToken, city, attractions);
  }

  // General Stay Search parsing: e.g. "宜蘭 3000" or "宜蘭住宿" or "沖繩 飯店"
  if (text.includes('飯店')) type = 'Hotel';
  if (text.includes('親子旅館') || text.includes('親子飯店')) type = 'Family Hotel';
  if (text.includes('民宿')) type = 'B&B';

  // Extract numbers for maxPrice if any
  const priceMatch = text.match(/\d+/);
  if (priceMatch) {
    maxPrice = Number(priceMatch[0]);
  }

  let destination = cleanNoise(text) || '宜蘭';

  const stays = await runScraperJob({ cityId: destination, maxPrice, type }, () => {});
  await replyLineStays(replyToken, destination, stays);
}

/**
 * Reply Stays using LINE Flex Carousel Cards
 */
async function replyLineStays(replyToken, destination, stays) {
  if (!stays || stays.length === 0) {
    return await sendLineTextMessage(replyToken, `🔍 找不到符合「${destination}」的平價住宿資訊，建議放寬預算上限。`);
  }

  const topStays = stays.slice(0, 6);

  // Build LINE Flex Carousel Bubble List
  const flexBubbles = topStays.map(stay => {
    const lowestProvider = stay.providers?.find(p => p.isLowest) || stay.providers?.[0];
    const targetUrl = lowestProvider?.url || stay.url || 'https://agoda.com';
    const providerName = stay.lowestPriceProvider || lowestProvider?.name || 'Agoda';

    return {
      type: 'bubble',
      hero: {
        type: 'image',
        url: stay.image,
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
            text: stay.name,
            weight: 'bold',
            size: 'md',
            wrap: true
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              { type: 'text', text: '⭐ ' + stay.rating, size: 'sm', color: '#f59e0b', weight: 'bold' },
              { type: 'text', text: ` (${stay.reviewsCount}則評價)`, size: 'xs', color: '#888888', margin: 'md' }
            ]
          },
          {
            type: 'text',
            text: '📍 ' + stay.address,
            size: 'xs',
            color: '#666666',
            margin: 'sm',
            wrap: true
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: `👑 ${providerName} 最低價`,
                size: 'xs',
                color: '#10b981',
                weight: 'bold'
              },
              {
                type: 'text',
                text: `NT$ ${stay.price.toLocaleString()}`,
                size: 'lg',
                color: '#10b981',
                weight: 'bold',
                align: 'end'
              }
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: `前往 ${providerName} 預訂`,
              uri: targetUrl
            },
            style: 'primary',
            color: '#10b981'
          }
        ]
      }
    };
  });

  const flexMessage = {
    type: 'flex',
    altText: `🏨 為您找到 ${stays.length} 間「${destination}」精選住宿比價`,
    contents: {
      type: 'carousel',
      contents: flexBubbles
    }
  };

  await sendLineMessage(replyToken, [flexMessage]);
}

/**
 * Reply Package Tours via LINE Flex Carousel Cards
 */
async function replyLinePackages(replyToken, destination, packages) {
  if (!packages || packages.length === 0) {
    return await sendLineTextMessage(replyToken, `🎒 暫無「${destination}」超值包套行程。`);
  }

  const topPackages = packages.slice(0, 6);
  const flexBubbles = topPackages.map(pkg => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: pkg.image,
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: pkg.title, weight: 'bold', size: 'md', wrap: true },
        { type: 'text', text: `💡 ${pkg.savingsText}`, size: 'xs', color: '#8b5cf6', weight: 'bold', margin: 'md' },
        { type: 'text', text: `🏠 含: ${pkg.stayIncluded}`, size: 'xs', color: '#666666', margin: 'xs', wrap: true },
        { type: 'text', text: `💰 特惠價: NT$ ${pkg.price.toLocaleString()}`, size: 'lg', color: '#10b981', weight: 'bold', margin: 'sm' }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: '前往搶購包套行程',
            uri: pkg.url || pkg.ticketUrl || 'https://www.kkday.com'
          },
          style: 'primary',
          color: '#8b5cf6'
        }
      ]
    }
  }));

  const flexMessage = {
    type: 'flex',
    altText: `🎒 為您抓取到「${destination}」超值包套行程組合`,
    contents: {
      type: 'carousel',
      contents: flexBubbles
    }
  };

  await sendLineMessage(replyToken, [flexMessage]);
}

/**
 * Reply Family Attractions via LINE Flex Carousel Cards
 */
async function replyLineAttractions(replyToken, destination, attractions) {
  if (!attractions || attractions.length === 0) {
    return await sendLineTextMessage(replyToken, `🎡 暫無「${destination}」親子景點資料。`);
  }

  const topAttractions = attractions.slice(0, 6);
  const flexBubbles = topAttractions.map(item => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: item.image,
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: item.name, weight: 'bold', size: 'md', wrap: true },
        { type: 'text', text: `🎟️ 門票: ${item.ticketPrice}`, size: 'xs', color: '#10b981', weight: 'bold', margin: 'md' },
        { type: 'text', text: `👶 年齡: ${item.ageRecommendation}`, size: 'xs', color: '#666666', margin: 'xs' },
        { type: 'text', text: `💡 亮點: ${item.highlights}`, size: 'xs', color: '#888888', margin: 'xs', wrap: true }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: '查看景點門票與資訊',
            uri: item.url || item.ticketUrl || 'https://www.klook.com'
          },
          style: 'primary',
          color: '#10b981'
        }
      ]
    }
  }));

  const flexMessage = {
    type: 'flex',
    altText: `🎡 為您抓取到「${destination}」最新親子熱門景點`,
    contents: {
      type: 'carousel',
      contents: flexBubbles
    }
  };

  await sendLineMessage(replyToken, [flexMessage]);
}

/**
 * Reply Family Theaters via LINE Flex Carousel Cards
 */
async function replyLineTheaters(replyToken, destination, theaters) {
  if (!theaters || theaters.length === 0) {
    return await sendLineTextMessage(replyToken, `🎭 暫無「${destination}」劇場公演時程。`);
  }

  const topTheaters = theaters.slice(0, 6);
  const flexBubbles = topTheaters.map(t => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: t.image,
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: t.title, weight: 'bold', size: 'md', wrap: true },
        { type: 'text', text: `⏰ 最早搶票: ${t.earliestTicketDate}`, size: 'xs', color: '#f59e0b', weight: 'bold', margin: 'md' },
        { type: 'text', text: `📅 演出期間: ${t.performanceDate}`, size: 'xs', color: '#666666', margin: 'xs', wrap: true },
        { type: 'text', text: `🎫 票價: ${t.priceRange}`, size: 'sm', color: '#8b5cf6', weight: 'bold', margin: 'xs' }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: `前往 ${t.ticketPlatform || '售票平台'} 搶購`,
            uri: t.ticketUrl || 'https://ticket.com.tw'
          },
          style: 'primary',
          color: '#8b5cf6'
        }
      ]
    }
  }));

  const flexMessage = {
    type: 'flex',
    altText: `🎭 為您抓取到 ${theaters.length} 檔最新熱門親子劇團早鳥搶票連結`,
    contents: {
      type: 'carousel',
      contents: flexBubbles
    }
  };

  await sendLineMessage(replyToken, [flexMessage]);
}

/**
 * Send raw JSON LINE reply
 */
async function sendLineMessage(replyToken, messages) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) {
    console.log('[LINE BOT] Notice: LINE_CHANNEL_ACCESS_TOKEN not set in environment.');
    return;
  }
  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/reply',
      { replyToken, messages },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
        }
      }
    );
  } catch (err) {
    console.error('[LINE BOT ERROR]', err.response?.data || err.message);
  }
}

/**
 * Send text message helper
 */
async function sendLineTextMessage(replyToken, textMessage) {
  await sendLineMessage(replyToken, [
    { type: 'text', text: textMessage }
  ]);
}
