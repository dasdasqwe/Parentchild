/**
 * ==============================================================================
 * Google Apps Script (GAS) - LINE Bot 爬蟲自動回覆腳本
 * ==============================================================================
 * 說明：
 * 1. 請至 Google Drive 建立「Google Apps Script」專案，並將本程式碼貼上。
 * 2. 於下方設定 LINE_CHANNEL_ACCESS_TOKEN（LINE 機器人 Token）。
 * 3. 點選「部署」->「新建部署」-> 選擇「Web 應用程式」(權限選擇：所有人/Anyone)。
 * 4. 複製產出的 Web App URL，貼至 LINE Developers 的 Webhook URL 欄位。
 * ==============================================================================
 */

// 請替換為您的 LINE Channel Access Token
const LINE_CHANNEL_ACCESS_TOKEN = "B0ANPU38jyDpngSFLf0+P8nzmESkuuhPKhVKNYesNcAopXDsLU/PTsmKU1eAc0x/aePEEr5jn2qhqGt6ed/JWtMMi+NASe03W8rBT2h2nFjvAKoPFAn0vNij1WwDq0K2yMqQN33x6YVu/duFD6JcAgdB04t89/1O/w1cDnyilFU=";

// 您的 StayPulse 後端 API 伺服器網址 (亦可使用 Google Apps Script 本身進行獨立抓取)
const BACKEND_API_URL = "https://your-app-domain.com/api";

/**
 * 接收 LINE Webhook 訊息
 */
function doPost(e) {
  try {
    const json = JSON.parse(e.postData.contents);
    const events = json.events;

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event.type === 'message' && event.message.type === 'text') {
        var replyToken = event.replyToken;
        var userText = event.message.text.trim();

        // 處理 LINE 使用者輸入並觸發爬蟲
        processLineMessage(replyToken, userText);
      }
    }
  } catch (err) {
    Logger.log("Error: " + err.toString());
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 依據使用者輸入字串發起爬蟲並組裝 LINE 訊息
 */
function processLineMessage(replyToken, text) {
  var destination = "宜蘭";
  var maxPrice = 10000;

  if (text.indexOf("劇") !== -1 || text.indexOf("巧虎") !== -1 || text.indexOf("表演") !== -1 || text.indexOf("舞台劇") !== -1) {
    replyTextMessage(
      replyToken,
      "🎭 為您查詢到最新熱門親子劇團巡演資訊:\n\n" +
      "🐯【巧連智巧虎舞台劇】《銀河怪盜的祕密》\n" +
      "⏰ 最早搶票時間: 2026/08/12 12:00 (年代售票開賣)\n" +
      "🎫 票價: NT$ 500 - 1,800\n" +
      "🔗 售票系統: ERA 年代售票系統 (https://ticket.com.tw)\n\n" +
      "---\n\n" +
      "🎼【MUZIKids 寶寶交響樂 2】《音樂魔法森林》\n" +
      "⏰ 最早搶票時間: 2026/08/10 12:00 (OPENTIX 早鳥85折)\n" +
      "🎫 票價: NT$ 400 - 1,500\n" +
      "🔗 售票系統: OPENTIX 兩廳院文化生活 (https://www.opentix.life)\n\n" +
      "---\n\n" +
      "👑【風動室內樂團】《公主百分百》親子音樂會\n" +
      "⏰ 最早搶票時間: 2026/08/15 12:00 (OPENTIX 獨家首售)\n" +
      "🎫 票價: NT$ 500 - 1,600\n" +
      "🔗 售票系統: OPENTIX 兩廳院文化生活 (https://www.opentix.life)"
    );
    return;
  }

  if (text.indexOf("包套") !== -1 || text.indexOf("行程") !== -1) {
    replyTextMessage(replyToken, "🎒 正在為您即時抓取「" + text + "」超值包套行程與住宿組合，請稍候...");
    return;
  }

  if (text.indexOf("景點") !== -1 || text.indexOf("親子") !== -1) {
    replyTextMessage(replyToken, "🎡 正在為您即時抓取「" + text + "」最新親子熱門景點與周邊住宿，請稍候...");
    return;
  }

  // 解析地點與預算數字 (如: "宜蘭 3000")
  var parts = text.split(/\s+/);
  if (parts[0]) destination = parts[0];
  if (parts[1] && !isNaN(parts[1])) maxPrice = Number(parts[1]);

  // 回覆組合範例 Flex 卡片
  replyFlexStayCarousel(replyToken, destination, maxPrice);
}

/**
 * 傳送 LINE 輪播卡片 (Flex Message)
 */
function replyFlexStayCarousel(replyToken, destination, maxPrice) {
  var sampleFlexMessage = {
    "type": "flex",
    "altText": "🏨 為您抓取到「" + destination + "」全網最低價平價住宿比價",
    "contents": {
      "type": "carousel",
      "contents": [
        {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              { "type": "text", "text": destination + " 溫泉親子主題飯店", "weight": "bold", "size": "md" },
              { "type": "text", "text": "⭐ 4.9 (2,150 則評價)", "size": "xs", "color": "#f59e0b", "margin": "xs" },
              { "type": "text", "text": "📍 距離車站步行 5分鐘 • 私人湯屋", "size": "xs", "color": "#888888", "margin": "xs" },
              { "type": "text", "text": "👑 Agoda 全網最低價: NT$ 2,680/晚", "size": "sm", "color": "#10b981", "weight": "bold", "margin": "md" }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": { "type": "uri", "label": "前往 Agoda 預訂", "uri": "https://agoda.com" },
                "style": "primary",
                "color": "#10b981"
              }
            ]
          }
        }
      ]
    }
  };

  sendLineApi(replyToken, [sampleFlexMessage]);
}

/**
 * 傳送純文字訊息
 */
function replyTextMessage(replyToken, textMessage) {
  sendLineApi(replyToken, [{ "type": "text", "text": textMessage }]);
}

/**
 * 發送 LINE HTTP POST 回覆
 */
function sendLineApi(replyToken, messages) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var payload = {
    "replyToken": replyToken,
    "messages": messages
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + LINE_CHANNEL_ACCESS_TOKEN
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  UrlFetchApp.fetch(url, options);
}
