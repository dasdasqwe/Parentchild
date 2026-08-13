import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, 'staypulse_db.json');

class LocalJSONDatabase {
  constructor() {
    this.data = {
      hotels: [],
      family_attractions: [],
      family_shows_galleries: [],
      price_history: [],
      price_alerts: [],
      itineraries: []
    };
    this.load();
  }

  load() {
    if (fs.existsSync(jsonPath)) {
      try {
        const raw = fs.readFileSync(jsonPath, 'utf8');
        this.data = JSON.parse(raw);
      } catch (e) {
        console.error('Error loading JSON DB:', e);
      }
    }
  }

  save() {
    fs.writeFileSync(jsonPath, JSON.stringify(this.data, null, 2), 'utf8');
  }

  prepare(sql) {
    const self = this;

    // Simple pattern matching helper for DB operations
    return {
      all: (...params) => {
        if (sql.includes('FROM hotels')) {
          let list = [...self.data.hotels];
          if (params.length >= 2 && sql.includes('city_name LIKE')) {
            const c = params[0].replace(/%/g, '');
            list = list.filter(h => h.city_name.includes(c) || h.address.includes(c));
          }
          if (sql.includes('name_zh LIKE')) {
            const k = params[params.length - 1].replace(/%/g, '');
            list = list.filter(h => h.name_zh.includes(k) || h.name_en.includes(k) || h.keywords.includes(k));
          }
          return list;
        }

        if (sql.includes('FROM family_attractions')) {
          let list = [...self.data.family_attractions];
          if (params.length > 0) {
            const c = params[0].replace(/%/g, '');
            list = list.filter(a => a.city_name.includes(c) || a.address.includes(c));
          }
          return list;
        }

        if (sql.includes('FROM family_shows_galleries')) {
          let list = [...self.data.family_shows_galleries];
          if (params.length > 0) {
            const c = params[0].replace(/%/g, '');
            list = list.filter(s => s.city_name.includes(c) || s.venue.includes(c));
          }
          return list;
        }

        return [];
      },

      get: (...params) => {
        if (sql.includes('FROM itineraries')) {
          const code = params[0];
          return self.data.itineraries.find(i => i.share_code === code) || null;
        }
        return null;
      },

      run: (...params) => {
        if (sql.includes('INSERT INTO price_history')) {
          self.data.price_history.push({
            id: Date.now(),
            hotel_key: params[0],
            provider_name: params[1],
            price: params[2],
            check_in_date: params[3],
            check_out_date: params[4],
            query_timestamp: params[5]
          });
          self.save();
          return { lastInsertRowid: Date.now() };
        }

        if (sql.includes('INSERT INTO itineraries')) {
          const item = {
            id: Date.now(),
            share_code: params[0],
            title: params[1],
            items_json: params[2],
            created_at: params[3],
            updated_at: params[4]
          };
          self.data.itineraries.push(item);
          self.save();
          return { lastInsertRowid: item.id };
        }

        return { lastInsertRowid: Date.now() };
      }
    };
  }
}

const db = new LocalJSONDatabase();

export function initDatabase() {
  if (db.data.hotels.length === 0) {
    db.data.hotels = [
      {
        id: 1,
        hotel_key: 'silks_place_yilan',
        name_zh: '蘭城晶英酒店',
        name_en: 'Silks Place Yilan',
        city_name: '宜蘭',
        address: '宜蘭縣宜蘭市民權路二段36號',
        description: '台灣最頂級親子飯店！內建賽車場、卡芬妮兒童遊樂空間與豐厚芬朵奇堡主題房。',
        rating: 4.8,
        reviews_count: 3420,
        hotel_class: 5,
        base_price: 7800,
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['賽車場', '兒童戲水池', '影城免費看', '親子專屬樓層']),
        keywords: '宜蘭 蘭城晶英 賽車 親子飯店 奢華 溜滑梯房'
      },
      {
        id: 2,
        hotel_key: 'welsh_park_yilan',
        name_zh: '綠舞國際觀光飯店',
        name_en: 'Dancewoods Hotel & Resort',
        city_name: '宜蘭',
        address: '宜蘭縣五結鄉五濱路二段459號',
        description: '日式庭園主題飯店，可體驗浴衣穿著、抹茶體驗與可愛水豚、羊駝近距離互動。',
        rating: 4.7,
        reviews_count: 2100,
        hotel_class: 5,
        base_price: 6200,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['日式庭園', '萌寵動物區', '浴衣體驗', '露天風呂']),
        keywords: '宜蘭 綠舞 日式庭園 水豚 萌寵 五結 親子住宿'
      },
      {
        id: 3,
        hotel_key: 'grand_hotel_taipei',
        name_zh: '圓山大飯店',
        name_en: 'The Grand Hotel Taipei',
        city_name: '台北',
        address: '台北市中山區中山北路四段1號',
        description: '經典宮殿式建築，俯瞰台北夜景，探索百年密道與親子文化導覽。',
        rating: 4.6,
        reviews_count: 4850,
        hotel_class: 5,
        base_price: 4500,
        image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['宮殿導覽', '密道體驗', '戶外泳池', '網球場']),
        keywords: '台北 圓山大飯店 密道 文化體驗 親子景觀飯店'
      },
      {
        id: 4,
        hotel_key: 'leofoo_resort_hsinchu',
        name_zh: '關西六福莊生態渡假旅館',
        name_en: 'Leofoo Resort Guanshi',
        city_name: '新竹',
        address: '新竹縣關西鎮仁安里拱子溝60號',
        description: '亞洲唯一生態生機渡假飯店，窗外即是長頸鹿、白犀牛與斑馬！',
        rating: 4.7,
        reviews_count: 2980,
        hotel_class: 4,
        base_price: 8900,
        image_url: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['動物近距離觀賞', '六福村門票套票', '生態導覽']),
        keywords: '新竹 關西 六福莊 動物飯店 長頸鹿 六福村 親子'
      }
    ];

    db.data.family_attractions = [
      {
        id: 1,
        attraction_key: 'zhang_mei_ama',
        name: '張美阿嬤農場',
        city_name: '宜蘭',
        address: '宜蘭縣三星鄉行健溪一路二段161號',
        category: '萌寵農場',
        ticket_price: 200,
        rating: 4.9,
        reviews_count: 8500,
        image_url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&auto=format&fit=crop',
        features: '和服體驗、水豚君泡湯、笑臉羊近距離餵食、現場手做蔥油餅DIY。',
        keywords: '宜蘭 三星 張美阿嬤 農場 水豚君 和服 親子景點',
        official_url: 'https://www.facebook.com/zhangmeiama',
        google_maps_url: 'https://maps.google.com/?q=張美阿嬤農場'
      },
      {
        id: 2,
        attraction_key: 'taipei_astronomical_museum',
        name: '臺北市立天文科學教育館',
        city_name: '台北',
        address: '台北市士林區基河路363號',
        category: '室內展館',
        ticket_price: 50,
        rating: 4.8,
        reviews_count: 6200,
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
        features: '宇宙探險車、立體劇場、全天域宇宙劇場與互動太空科學體驗。',
        keywords: '台北 士林 天文館 宇宙探險 室內科普 雨天備案',
        official_url: 'https://www.tam.gov.taipei/',
        google_maps_url: 'https://maps.google.com/?q=臺北市立天文科學教育館'
      }
    ];

    db.data.family_shows_galleries = [
      {
        id: 1,
        show_key: 'paper_windmill_fantasy',
        title: '紙風車劇團《神奇魔法書》全國巡演',
        venue: '台北國家戲劇院',
        city_name: '台北',
        ticket_price: 500,
        rating: 4.9,
        reviews_count: 980,
        image_url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop',
        event_date: '2026-09-01 ~ 2026-09-15',
        highlights: '紙風車經典兒童劇，融合特技、偶戲與全場巨型黑光互動！',
        keywords: '台北 紙風車 兒童劇 戲劇 舞台劇 親子表演',
        ticket_url: 'https://www.opentix.life/',
        venue_maps_url: 'https://maps.google.com/?q=國家戲劇院'
      }
    ];

    db.save();
  }
}

export default db;
