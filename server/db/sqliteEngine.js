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

    return {
      all: (...params) => {
        if (sql.includes('FROM hotels')) {
          let list = [...self.data.hotels];
          if (params.length >= 2 && sql.includes('city_name LIKE')) {
            const c = params[0].replace(/%/g, '');
            if (c) {
              list = list.filter(h => h.city_name.includes(c) || h.address.includes(c));
            }
          }
          if (sql.includes('name_zh LIKE')) {
            const k = params[params.length - 1].replace(/%/g, '');
            if (k) {
              list = list.filter(h => h.name_zh.includes(k) || h.name_en.includes(k) || h.keywords.includes(k));
            }
          }
          return list;
        }

        if (sql.includes('FROM family_attractions')) {
          let list = [...self.data.family_attractions];
          if (params.length > 0) {
            const c = params[0].replace(/%/g, '');
            if (c) {
              list = list.filter(a => a.city_name.includes(c) || a.address.includes(c));
            }
          }
          return list;
        }

        if (sql.includes('FROM family_shows_galleries')) {
          let list = [...self.data.family_shows_galleries];
          if (params.length > 0) {
            const c = params[0].replace(/%/g, '');
            if (c) {
              list = list.filter(s => s.city_name.includes(c) || s.venue.includes(c));
            }
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
  // Always seed default full Taiwan database if missing key cities
  const existingCities = db.data.hotels.map(h => h.city_name);
  if (!existingCities.includes('台中') || !existingCities.includes('高雄') || !existingCities.includes('花蓮')) {
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
        hotel_key: 'mandarin_oriental_taipei',
        name_zh: '台北文華東方酒店',
        name_en: 'Mandarin Oriental Taipei',
        city_name: '台北',
        address: '台北市松山區敦化北路158號',
        description: '奢華歐式宮廷風格，極致貼心之親子VIP客房服務與專屬兒童禮遇。',
        rating: 4.9,
        reviews_count: 1890,
        hotel_class: 5,
        base_price: 11800,
        image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['米其林餐廳', '奢華SPA', '兒童專屬迎賓禮', '溫水泳池']),
        keywords: '台北 文華東方 奢華頂級 親子禮遇 敦化北路'
      },
      {
        id: 5,
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
      },
      {
        id: 6,
        hotel_key: 'freshfields_taichung',
        name_zh: '清新溫泉飯店',
        name_en: 'Freshfields Hotel Taichung',
        city_name: '台中',
        address: '台中市烏日區溫泉路2號',
        description: '天然碳酸氫鈉溫泉，戶外兒童戲水池區與巨型兒童室內球池俱樂部。',
        rating: 4.6,
        reviews_count: 2350,
        hotel_class: 5,
        base_price: 4200,
        image_url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['天然溫泉', '露天水療泡湯', '球池遊樂場', '夜景餐廳']),
        keywords: '台中 清新溫泉 烏日 溫泉 親子球池 夜景'
      },
      {
        id: 7,
        hotel_key: 'evergreen_taichung',
        name_zh: '台中長榮桂冠酒店',
        name_en: 'Evergreen Laurel Hotel Taichung',
        city_name: '台中',
        address: '台中市西屯區臺灣大道二段666號',
        description: '經典五星級飯店，打造全新海底世界兒童遊戲室與繪本閱讀空間。',
        rating: 4.7,
        reviews_count: 3100,
        hotel_class: 5,
        base_price: 3600,
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['海底世界球池', '戶外泳池', '健身房', '五星美食']),
        keywords: '台中 長榮桂冠 臺灣大道 親子遊戲室 西屯'
      },
      {
        id: 8,
        hotel_key: 'hualien_far_glory',
        name_zh: '遠雄悅來大飯店',
        name_en: 'Farglory Hotel Hualien',
        city_name: '花蓮',
        address: '花蓮縣壽豐鄉山嶺18號',
        description: '維多利亞宮廷渡假風，坐擁太平洋海景與海洋公園無縫接軌體驗。',
        rating: 4.8,
        reviews_count: 3100,
        hotel_class: 5,
        base_price: 6800,
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['海洋公園接駁', '無敵海景泳池', '兒童遊戲室']),
        keywords: '花蓮 遠雄悅來 海洋公園 海景飯店 壽豐 親子渡假'
      },
      {
        id: 9,
        hotel_key: 'kaohsiung_grand_hi_lai',
        name_zh: '高雄漢來大飯店',
        name_en: 'Grand Hi-Lai Hotel Kaohsiung',
        city_name: '高雄',
        address: '高雄市前金區成功一路266號',
        description: '高雄新灣區奢華地標，聯名三麗鷗主題親子房與露天泳池。',
        rating: 4.8,
        reviews_count: 4200,
        hotel_class: 5,
        base_price: 4800,
        image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
        amenities: JSON.stringify(['三麗鷗主題房', '露天海景泳池', '漢來海港餐廳']),
        keywords: '高雄 漢來 大飯店 三麗鷗 主題房 成功一路 親子'
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
      },
      {
        id: 3,
        attraction_key: 'national_science_museum_taichung',
        name: '國立自然科學博物館 (科博館)',
        city_name: '台中',
        address: '台中市北區館前路1號',
        category: '室內展館',
        ticket_price: 100,
        rating: 4.9,
        reviews_count: 14200,
        image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
        features: '會動的超巨型恐龍模型、生命科學廳、3D立體劇場與植物園溫室。',
        keywords: '台中 科博館 恐龍 展覽 室內景點 親子教育',
        official_url: 'https://www.nmns.edu.tw/',
        google_maps_url: 'https://maps.google.com/?q=國立自然科學博物館'
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
