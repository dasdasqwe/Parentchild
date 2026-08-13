/**
 * Builder functions for LINE Flex Message Carousel & Bubble Layouts
 */

const publicUrl = process.env.PUBLIC_URL || 'https://parentchild.onrender.com';

export function buildHotelCarouselFlex(hotels) {
  const bubbles = hotels.slice(0, 10).map(h => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: h.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
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
          text: h.name_zh,
          weight: 'bold',
          size: 'lg',
          wrap: true
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            { type: 'text', text: '★ ' + h.rating, size: 'sm', color: '#f59e0b', weight: 'bold' },
            { type: 'text', text: `(${h.reviews_count} 則評價)`, size: 'xs', color: '#6b7280', margin: 'sm' }
          ]
        },
        {
          type: 'box',
          layout: 'baseline',
          margin: 'md',
          contents: [
            { type: 'text', text: 'NT$ ' + h.lowestPrice.toLocaleString(), size: 'xl', color: '#6366f1', weight: 'bold' },
            { type: 'text', text: ' 起 / 晚', size: 'xs', color: '#9ca3af' }
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
          color: '#6366f1',
          action: {
            type: 'uri',
            label: '🏷 前往最低價 Agoda',
            uri: h.deepLinks.agoda
          }
        },
        {
          type: 'button',
          style: 'secondary',
          action: {
            type: 'uri',
            label: '📊 完整四大平台比價',
            uri: `${publicUrl}/?hotel=${encodeURIComponent(h.name_zh)}`
          }
        }
      ]
    }
  }));

  return {
    type: 'flex',
    altText: `為您搜尋到 ${hotels.length} 間優質親子飯店`,
    contents: {
      type: 'carousel',
      contents: bubbles
    }
  };
}

export function buildAttractionCarouselFlex(attractions) {
  const bubbles = attractions.slice(0, 10).map(a => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: a.image_url || 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: a.name, weight: 'bold', size: 'lg', wrap: true },
        { type: 'text', text: `📍 ${a.address}`, size: 'xs', color: '#4b5563', margin: 'xs', wrap: true },
        { type: 'text', text: `🎫 門票: NT$ ${a.ticket_price}`, size: 'sm', color: '#059669', weight: 'bold', margin: 'md' },
        { type: 'text', text: a.features || '', size: 'xs', color: '#6b7280', margin: 'sm', wrap: true }
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
          color: '#10b981',
          action: {
            type: 'uri',
            label: '📍 Google Maps 導航',
            uri: a.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(a.name)}`
          }
        },
        {
          type: 'button',
          style: 'secondary',
          action: {
            type: 'uri',
            label: '📖 官方資訊連結',
            uri: a.official_url || publicUrl
          }
        }
      ]
    }
  }));

  return {
    type: 'flex',
    altText: `探索熱門親子景點`,
    contents: {
      type: 'carousel',
      contents: bubbles
    }
  };
}

export function buildShowCarouselFlex(shows) {
  const bubbles = shows.slice(0, 10).map(s => ({
    type: 'bubble',
    hero: {
      type: 'image',
      url: s.image_url || 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: s.title, weight: 'bold', size: 'lg', wrap: true },
        { type: 'text', text: `🏛 場館: ${s.venue}`, size: 'xs', color: '#4b5563', margin: 'xs', wrap: true },
        { type: 'text', text: `📅 日期: ${s.event_date}`, size: 'xs', color: '#4b5563', margin: 'xs' },
        { type: 'text', text: `🎫 票價: NT$ ${s.ticket_price} 起`, size: 'sm', color: '#ec4899', weight: 'bold', margin: 'md' }
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
          color: '#ec4899',
          action: {
            type: 'uri',
            label: '🎫 OPENTIX 立即購票',
            uri: s.ticket_url || 'https://www.opentix.life/'
          }
        }
      ]
    }
  }));

  return {
    type: 'flex',
    altText: `親子表演與精選特展`,
    contents: {
      type: 'carousel',
      contents: bubbles
    }
  };
}

export function buildHelpFlex() {
  return {
    type: 'text',
    text: `🤖 【StayPulse 親子資訊 LINE Bot 指令助手】\n\n` +
      `您可以直接輸入以下指令來探索資訊：\n\n` +
      `🏨 飯店比價相關：\n` +
      `• 搜尋飯店 宜蘭 (或: 飯店 宜蘭 5000)\n` +
      `• 比價 蘭城晶英酒店\n` +
      `• 訂房 蘭城晶英 0815-0817 2大2小\n\n` +
      `🎠 親子景點與表演：\n` +
      `• 親子景點 台北\n` +
      `• 親子表演 宜蘭\n` +
      `• 展覽 台中\n\n` +
      `📋 系統工具：\n` +
      `• 首頁 (開啟 Web App 網頁版)`
  };
}
