import axios from 'axios';
import * as cheerio from 'cheerio';

// 部落格 RSS 源
const BLOGS = [
  { name: '寶寶溫旅行親子生活', url: 'https://bobowin.blog/feed/' },
  { name: '卡夫卡愛旅行', url: 'https://kafkalife.com/feed/' }
];

// 輔助函式：判斷日期是否在半年之內 (180天)
function isWithinSixMonths(dateStr) {
  try {
    const pubDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - pubDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 180;
  } catch (e) {
    return false;
  }
}

// 輔助功能：從 HTML 中提取第一張圖片
function extractImage(htmlContent) {
  if (!htmlContent) return 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80';
  const $ = cheerio.load(htmlContent);
  const imgUrl = $('img').first().attr('src');
  // 排除一些表情符號或小圖
  if (imgUrl && !imgUrl.includes('s.w.org') && !imgUrl.includes('avatar') && imgUrl.startsWith('http')) {
    return imgUrl;
  }
  return 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80';
}

// 輔助功能：從 HTML 中尋找地址
function extractAddress(htmlContent, cityName) {
  if (!htmlContent) return `${cityName} 熱門觀光地區`;
  const $ = cheerio.load(htmlContent);
  const text = $.text();
  
  // 搜尋「地址：」或「位置：」
  const addressMatch = text.match(/(?:地址|位置|地圖|導航|Add)\s*[:：]\s*([^\n\r，。;]+)/i);
  if (addressMatch && addressMatch[1]) {
    const addr = addressMatch[1].trim();
    if (addr.length > 5 && addr.length < 100) {
      return addr;
    }
  }

  // 模糊匹配地址模式
  const fuzzyMatch = text.match(/(?:台灣)?(?:[^\n\r，。;]+(?:縣|市)[^\n\r，。;]+(?:區|鄉|鎮|市)[^\n\r，。;]+(?:路|街|號))/);
  if (fuzzyMatch && fuzzyMatch[0]) {
    return fuzzyMatch[0].trim();
  }

  return `${cityName} 親子推薦觀光景點`;
}

// 輔助功能：根據內文關鍵字分析設施標籤
function analyzeFeatures(htmlContent) {
  if (!htmlContent) return ['親子友善', '戶外休閒'];
  const $ = cheerio.load(htmlContent);
  const text = $.text();
  const features = [];

  if (text.includes('推車') || text.includes('無障礙')) features.push('推車無障礙通道');
  if (text.includes('育嬰') || text.includes('哺乳') || text.includes('尿布')) features.push('育嬰哺乳室');
  if (text.includes('停車') || text.includes('車位')) features.push('附設停車場');
  if (text.includes('免費') || text.includes('免門票')) features.push('免費開放');
  if (text.includes('沙坑') || text.includes('溜滑梯') || text.includes('遊戲區')) features.push('兒童遊戲場');
  if (text.includes('冷氣') || text.includes('室內')) features.push('室內恆溫冷氣');
  if (text.includes('水豚') || text.includes('小鹿') || text.includes('動物')) features.push('近距離動物互動');

  // 限制長度
  if (features.length === 0) {
    features.push('親子友善設施', '推薦拍照打卡');
  }
  return features.slice(0, 4);
}

// 主抓取函式：根據城市關鍵字在 RSS 訂閱源中撈取並過濾出最近半年的親子景點
export async function scrapeBlogAttractions(cityQuery, onLog = console.log) {
  const attractions = [];
  onLog(`[SYS] 啟動聯邦親子部落格爬蟲，搜尋與「${cityQuery}」相關之半年內最新文章...`);

  for (const blog of BLOGS) {
    try {
      onLog(`[SYS] 正在抓取部落格 [${blog.name}] 最新 RSS 文章...`);
      const response = await axios.get(blog.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 5000
      });

      const xml = response.data;
      const $ = cheerio.load(xml, { xmlMode: true });

      $('item').each((idx, elem) => {
        const title = $(elem).find('title').text();
        const link = $(elem).find('link').text();
        const pubDateStr = $(elem).find('pubDate').text();
        const contentEncoded = $(elem).find('content\\:encoded').text() || $(elem).find('description').text();

        // 條件一：極精準城市匹配 Guard (防止標題寫著高雄、墾丁，內文提到金門而被錯誤採集)
        const cityList = ['台北', '臺北', '新北', '桃園', '台中', '臺中', '台南', '臺南', '高雄', '宜蘭', '花蓮', '台東', '臺東', '新竹', '苗栗', '彰化', '南投', '雲林', '嘉義', '屏東', '墾丁', '基隆', '澎湖', '金門', '馬祖', '沖繩', '東京', '大阪'];
        
        // 若標題中明確包含其他縣市或觀光區名稱（且非搜尋目標縣市），直接剔除
        const hasForeignCityTitle = cityList.some(c => c !== cityQuery && !c.includes(cityQuery) && title.includes(c));
        if (hasForeignCityTitle) {
          return;
        }

        // 提取地址
        const address = extractAddress(contentEncoded, cityQuery);

        // 文章標題必須包含該城市關鍵字，或者擷取的地址明確包含該城市名稱
        const matchesCityTitleOrAddr = title.toLowerCase().includes(cityQuery.toLowerCase()) || 
                                       address.toLowerCase().includes(cityQuery.toLowerCase());
        
        if (!matchesCityTitleOrAddr) return;

        // 條件二：發布日期必須在半年內 (180天)
        const withinSixMonths = isWithinSixMonths(pubDateStr);
        if (!withinSixMonths) {
          // 印出日誌以供偵錯
          onLog(`[DEBUG] 文章 [${title}] 日期為 ${new Date(pubDateStr).toLocaleDateString()} 已超過半年，略過。`);
          return;
        }

        // 開始解析出景點物件
        const imageUrl = extractImage(contentEncoded);
        const features = analyzeFeatures(contentEncoded);

        // 格式化發布時間
        const dateFormatted = new Date(pubDateStr).toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // 展覽資訊解析
        let exhibitionInfo = null;
        if (title.includes('展') || title.includes('快閃') || contentEncoded.includes('展覽') || contentEncoded.includes('特展')) {
          exhibitionInfo = {
            name: title.includes('展') ? title : `【特別展覽 / 特展】${title}`,
            date: `發布時間：${dateFormatted}`,
            description: `來自部落格 [${blog.name}] 最新推薦之親子展覽活動與實境心得。`
          };
        }

        attractions.push({
          id: `fam-blog-${blog.name}-${idx}-${cityQuery}`,
          cityId: cityQuery,
          cityName: cityQuery,
          name: title.replace(/【.*?】/g, '').trim(),
          location: address,
          category: `部落格精選景點 (${blog.name})`,
          image: imageUrl,
          rating: 4.8,
          features: features,
          description: `來自親子部落格 [${blog.name}] 於 ${dateFormatted} 推薦之熱門目的地。`,
          highlights: `發布於半年內 (${dateFormatted})。點選卡片直接閱讀部落格完整文章導覽與行程心得。`,
          blogUrl: link, // 新增部落格原文連結
          exhibitionInfo: exhibitionInfo // 展覽資訊
        });

        onLog(`[SUCCESS] 找到半年內部落格最新景點: ${title} (${dateFormatted})`);
      });

    } catch (err) {
      onLog(`[WARNING] 抓取部落格 [${blog.name}] 失敗: ${err.message}`);
    }
  }

  return attractions;
}
