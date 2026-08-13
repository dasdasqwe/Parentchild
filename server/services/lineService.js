import { parseLineCommand } from './lineCommandParser.js';
import { buildHotelCarouselFlex, buildAttractionCarouselFlex, buildShowCarouselFlex, buildHelpFlex } from './lineFlexBuilder.js';
import { searchHotelsService } from './hotelService.js';
import db from '../db/sqliteEngine.js';
import { fetchOpenDataAttractions } from './openDataService.js';

const publicUrl = process.env.PUBLIC_URL || 'https://parentchild.onrender.com';

export async function processLineMessage(userText) {
  const parsed = parseLineCommand(userText);

  switch (parsed.type) {
    case 'HELP':
      return buildHelpFlex();

    case 'HOME':
      return {
        type: 'template',
        altText: '點擊開啟 StayPulse 官方網站',
        template: {
          type: 'buttons',
          text: '🌐 歡迎使用 StayPulse 親子旅遊一站式平台',
          actions: [
            {
              type: 'uri',
              label: '🚀 開啟官方網站',
              uri: publicUrl
            }
          ]
        }
      };

    case 'SEARCH_HOTELS': {
      const hotels = await searchHotelsService({
        city: parsed.city,
        maxPrice: parsed.maxPrice
      });
      if (hotels.length === 0) {
        return { type: 'text', text: `😔 抱歉，找不到位於「${parsed.city}」符合條件的飯店。您可以嘗試查詢：「搜尋飯店 台北」` };
      }
      return buildHotelCarouselFlex(hotels);
    }

    case 'COMPARE_HOTEL': {
      const hotels = await searchHotelsService({ keyword: parsed.hotelName });
      if (hotels.length === 0) {
        return { type: 'text', text: `😔 找不到名稱包含「${parsed.hotelName}」的飯店。` };
      }
      const target = hotels[0];
      let msg = `📊 【${target.name_zh}】各大平台比價一覽表：\n\n`;
      target.platforms.forEach(p => {
        msg += `${p.isLowest ? '🔥 [最便宜] ' : '• '}${p.name}: NT$ ${p.price.toLocaleString()}\n`;
      });
      msg += `\n🔗 立即前往訂房頁面比價：\n${publicUrl}/?hotel=${encodeURIComponent(target.name_zh)}`;
      return { type: 'text', text: msg };
    }

    case 'BOOK_HOTEL': {
      const hotels = await searchHotelsService({ keyword: parsed.hotelName });
      if (hotels.length === 0) {
        return { type: 'text', text: `😔 找不到「${parsed.hotelName}」飯店資訊。` };
      }
      const target = hotels[0];
      return {
        type: 'text',
        text: `🛒 【${target.name_zh}】訂房直連按鈕已產生：\n\n` +
          `• Agoda: ${target.deepLinks.agoda}\n\n` +
          `• Booking.com: ${target.deepLinks.booking}\n\n` +
          `• Trip.com: ${target.deepLinks.trip}`
      };
    }

    case 'SEARCH_ATTRACTIONS': {
      const attrs = db.prepare(`SELECT * FROM family_attractions WHERE city_name LIKE ? OR address LIKE ?`).all(`%${parsed.city}%`, `%${parsed.city}%`);
      if (attrs.length === 0) {
        return { type: 'text', text: `🎪 目前「${parsed.city}」尚無特選景點，為您導引至全台熱門景點探索！` };
      }
      return buildAttractionCarouselFlex(attrs);
    }

    case 'SEARCH_SHOWS': {
      const shows = db.prepare(`SELECT * FROM family_shows_galleries WHERE city_name LIKE ? OR venue LIKE ?`).all(`%${parsed.city}%`, `%${parsed.city}%`);
      if (shows.length === 0) {
        return { type: 'text', text: `🎭 目前「${parsed.city}」無近期表演。` };
      }
      return buildShowCarouselFlex(shows);
    }

    case 'SEARCH_EXHIBITIONS': {
      const openDataList = await fetchOpenDataAttractions();
      let text = `🖼 【文化部 Open Data 展覽資訊】\n\n`;
      openDataList.forEach((item, idx) => {
        text += `${idx + 1}. ${item.title}\n📍 ${item.location}\n📅 ${item.time}\n\n`;
      });
      return { type: 'text', text };
    }

    case 'MY_ITINERARY':
      return {
        type: 'text',
        text: `📋 請點擊以下連結查看與管理您的「親子行程規劃」：\n${publicUrl}/?tab=itinerary`
      };

    default: {
      const hotels = await searchHotelsService({ keyword: parsed.query || userText });
      if (hotels.length > 0) {
        return buildHotelCarouselFlex(hotels);
      }
      return buildHelpFlex();
    }
  }
}
