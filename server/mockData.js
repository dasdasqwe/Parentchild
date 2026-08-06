export const mockCities = [
  { id: 'taipei', name: '台北 (Taipei)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台北', 'taipei', '臺北', '大同區', '萬華區', '信義區', '中山區'] },
  { id: 'newtaipei', name: '新北 (New Taipei)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['新北', 'newtaipei', '新北市', '板橋', '淡水', '萬里', '金山', '烏來', '瑞芳'] },
  { id: 'yilan', name: '宜蘭 (Yilan)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['宜蘭', 'yilan', '宜蘭縣', '礁溪', '羅東', '頭城', '冬山', '三星', '蘇澳'] },
  { id: 'taichung', name: '台中 (Taichung)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台中', 'taichung', '臺中', '台中市', '西屯', '逢甲', '中區', '后里'] },
  { id: 'kaohsiung', name: '高雄 (Kaohsiung)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['高雄', 'kaohsiung', '高雄市', '新興區', '鹽埕區', '左營', '小港', '三民'] },
  { id: 'tainan', name: '台南 (Tainan)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台南', 'tainan', '臺南', '台南市', '中西區', '安平', '仁德'] },
  { id: 'taoyuan', name: '桃園 (Taoyuan)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['桃園', 'taoyuan', '桃園市', '中壢', '龍潭', '大溪'] },
  { id: 'hsinchu', name: '新竹 (Hsinchu)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['新竹', 'hsinchu', '新竹市', '新竹縣', '關西', '竹北', '新豐'] },
  { id: 'miaoli', name: '苗栗 (Miaoli)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['苗栗', 'miaoli', '苗栗縣', '通霄', '頭份', '三義'] },
  { id: 'changhua', name: '彰化 (Changhua)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['彰化', 'changhua', '彰化縣', '員林', '鹿港'] },
  { id: 'nantou', name: '南投 (Nantou)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['南投', 'nantou', '南投縣', '魚池', '日月潭', '仁德', '清境'] },
  { id: 'chiayi', name: '嘉義 (Chiayi)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['嘉義', 'chiayi', '嘉義市', '嘉義縣', '民雄', '大林', '阿里山'] },
  { id: 'pingtung', name: '屏東 (Pingtung)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['屏東', 'pingtung', '屏東縣', '車城', '恆春', '墾丁'] },
  { id: 'hualien', name: '花蓮 (Hualien)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['花蓮', 'hualien', '花蓮縣', '花蓮市', '壽豐', '吉安', '太魯閣'] },
  { id: 'taitung', name: '台東 (Taitung)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台東', 'taitung', '臺東', '台東縣', '卑南', '池上'] },
  { id: 'penghu', name: '澎湖 (Penghu)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['澎湖', 'penghu', '澎湖縣', '馬公', '白沙'] },
  { id: 'okinawa', name: '沖繩 (Okinawa)', country: '日本', currency: 'JPY', symbol: '¥', aliases: ['沖繩', 'okinawa', '那霸', '名護', '北谷'] },
  { id: 'tokyo', name: '東京 (Tokyo)', country: '日本', currency: 'JPY', symbol: '¥', aliases: ['東京', 'tokyo', '新宿', '上野', '淺草', '銀座'] },
  { id: 'osaka', name: '大阪 (Osaka)', country: '日本', currency: 'JPY', symbol: '¥', aliases: ['大阪', 'osaka', '難波', '心齋橋', '梅田'] },
  { id: 'seoul', name: '首爾 (Seoul)', country: '韓國', currency: 'KRW', symbol: '₩', aliases: ['首爾', 'seoul', '明洞', '弘大', '東大門'] },
  { id: 'kyoto', name: '京都 (Kyoto)', country: '日本', currency: 'JPY', symbol: '¥', aliases: ['京都', 'kyoto', '祇園', '河原町'] },
  { id: 'bangkok', name: '曼谷 (Bangkok)', country: '泰國', currency: 'THB', symbol: '฿', aliases: ['曼谷', 'bangkok', '暹羅', '素坤逸'] }
];

export const mockStays = [
  // 宜蘭 (Yilan)
  {
    id: 'yil-1',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭礁溪溫泉親子主題飯店 (Jiaoxi Hotspring Family Hotel)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 2150,
    address: '宜蘭縣礁溪鄉德陽路 (距離礁溪轉運站 步行5分鐘)',
    tags: ['私人溫泉湯屋', '兒童戲水池', '遊戲室', '含溫泉早餐'],
    lowestPriceProvider: 'Agoda',
    price: 2680,
    originalPrice: 4200,
    discountPercent: 36,
    providers: [
      { name: 'Agoda', price: 2680, url: 'https://www.agoda.com/zh-tw/search?kw=Jiaoxi+Hotspring+Family+Hotel', isLowest: true },
      { name: 'Booking.com', price: 2780, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Jiaoxi+Hotspring+Family+Hotel' },
      { name: 'Trip.com', price: 2850, url: 'https://hk.trip.com/hotels/w/yilan-hotels' }
    ]
  },
  {
    id: 'yil-2',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭羅東夜市平價觀光飯店 (Luodong Nightmarket Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 1680,
    address: '宜蘭縣羅東鎮公正路 (距離羅東夜市步行 2分鐘)',
    tags: ['羅東夜市旁', '免費停車位', '獨立衛浴', '含在地早餐'],
    lowestPriceProvider: 'Booking.com',
    price: 1580,
    originalPrice: 2500,
    discountPercent: 37,
    providers: [
      { name: 'Booking.com', price: 1580, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Luodong+Nightmarket+Hotel', isLowest: true },
      { name: 'Agoda', price: 1650, url: 'https://www.agoda.com/zh-tw/search?kw=Luodong+Nightmarket+Hotel' }
    ]
  },
  {
    id: 'yil-3',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭冬山河綠意稻田風情民宿 (Dongshan River B&B)',
    type: 'B&B',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 940,
    address: '宜蘭縣冬山鄉武淵三路 (近冬山河親水公園)',
    tags: ['稻田景觀', '免費自行車', '手作早餐', '星空露台'],
    lowestPriceProvider: 'Agoda',
    price: 1850,
    originalPrice: 2900,
    discountPercent: 36,
    providers: [
      { name: 'Agoda', price: 1850, url: 'https://www.agoda.com/zh-tw/search?kw=Dongshan+River+B%26B+Yilan', isLowest: true },
      { name: 'Booking.com', price: 1920, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Dongshan+River+B%26B+Yilan' }
    ]
  },
  {
    id: 'yil-4',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭蘭陽平原海景親子行館 (Lanyang Ocean Family Hotel)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1320,
    address: '宜蘭縣頭城鎮濱海路 (龜山島無敵海景門前)',
    tags: ['龜山島海景', '兒童沙坑區', '推車友善坡道', '親子露營區'],
    lowestPriceProvider: 'Booking.com',
    price: 2980,
    originalPrice: 4800,
    discountPercent: 38,
    providers: [
      { name: 'Booking.com', price: 2980, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Lanyang+Ocean+Family+Hotel', isLowest: true },
      { name: 'Agoda', price: 3100, url: 'https://www.agoda.com/zh-tw/search?kw=Lanyang+Ocean+Family+Hotel' }
    ]
  },
  {
    id: 'yil-5',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭礁溪晶泉楓旅主題溫泉飯店 (Wellspring by Silks Jiaoxi)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 3100,
    address: '宜蘭縣礁溪鄉溫泉路67號 (捷絲旅礁溪館旁)',
    tags: ['露天泳池', '親子湯屋', '無邊際風呂', '日式清酒禮遇'],
    lowestPriceProvider: 'Agoda',
    price: 4200,
    originalPrice: 6500,
    discountPercent: 35,
    providers: [
      { name: 'Agoda', price: 4200, url: 'https://www.agoda.com/zh-tw/search?kw=Wellspring+by+Silks+Jiaoxi', isLowest: true },
      { name: 'Booking.com', price: 4350, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Wellspring+by+Silks+Jiaoxi' }
    ]
  },

  // 台北 (Taipei)
  {
    id: 'tp-1',
    cityId: 'taipei',
    cityName: '台北',
    name: '台北車站親子友善精品飯店 (Flip Flop Family Hotel)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 1240,
    address: '台北市大同區長安西路137號 (距離台北車站 450m)',
    tags: ['嬰兒床浴盆', '近捷運站', '含豐盛早餐', '親子閱讀室'],
    lowestPriceProvider: 'Agoda',
    price: 1880,
    originalPrice: 3200,
    discountPercent: 41,
    providers: [
      { name: 'Agoda', price: 1880, url: 'https://www.agoda.com/zh-tw/search?kw=Flip+Flop+Family+Hotel+Taipei', isLowest: true },
      { name: 'Booking.com', price: 1950, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Flip+Flop+Family+Hotel+Taipei' }
    ]
  },
  {
    id: 'tp-2',
    cityId: 'taipei',
    cityName: '台北',
    name: '黑熊好眠站旅館 (Hey Bear Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 890,
    address: '新北市三重區重新路二段 1 號 (台北橋捷運站旁)',
    tags: ['獨立衛浴', '免費飲料區', '液晶電視', '捷運出口1分鐘'],
    lowestPriceProvider: 'Booking.com',
    price: 1390,
    originalPrice: 2200,
    discountPercent: 37,
    providers: [
      { name: 'Booking.com', price: 1390, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Hey+Bear+Hotel+Taipei', isLowest: true },
      { name: 'Agoda', price: 1450, url: 'https://www.agoda.com/zh-tw/search?kw=Hey+Bear+Hotel+Taipei' }
    ]
  },
  {
    id: 'tp-3',
    cityId: 'taipei',
    cityName: '台北',
    name: '西門町町記憶風情民宿 (Cho B&B Ximen)',
    type: 'B&B',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 2150,
    address: '台北市萬華區昆明街119號 (距離西門捷運站 300m)',
    tags: ['復古懷舊風', '免費古早味零食', '懷舊拍立得', '親子友善'],
    lowestPriceProvider: 'Trip.com',
    price: 1580,
    originalPrice: 2800,
    discountPercent: 43,
    providers: [
      { name: 'Trip.com', price: 1580, url: 'https://hk.trip.com/hotels/w/taipei-hotels', isLowest: true },
      { name: 'Agoda', price: 1650, url: 'https://www.agoda.com/zh-tw/search?kw=Cho+B%26B+Ximen+Taipei' }
    ]
  },
  {
    id: 'tp-4',
    cityId: 'taipei',
    cityName: '台北',
    name: '台北君品酒店 (Palais de Chine Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 4200,
    address: '台北市大同區承德路一段3號 (京站時尚廣場旁/台北車站直達)',
    tags: ['五星級典雅', '米其林三星餐廳', '親子高級備品', '連通京站購物'],
    lowestPriceProvider: 'Agoda',
    price: 4800,
    originalPrice: 7500,
    discountPercent: 36,
    providers: [
      { name: 'Agoda', price: 4800, url: 'https://www.agoda.com/zh-tw/search?kw=Palais+de+Chine+Hotel', isLowest: true },
      { name: 'Booking.com', price: 4950, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Palais+de+Chine+Hotel' }
    ]
  },
  {
    id: 'tp-5',
    cityId: 'taipei',
    cityName: '台北',
    name: '天成文旅 - 華山町 (Hua Shan Din Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 1890,
    address: '台北市中正區忠孝東路二段79號 (忠孝新生站步行3分鐘)',
    tags: ['華山園區旁', '設計風格', '親子閱讀室', '附精緻早餐'],
    lowestPriceProvider: 'Booking.com',
    price: 2380,
    originalPrice: 3800,
    discountPercent: 37,
    providers: [
      { name: 'Booking.com', price: 2380, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Hua+Shan+Din+Hotel', isLowest: true },
      { name: 'Agoda', price: 2450, url: 'https://www.agoda.com/zh-tw/search?kw=Hua+Shan+Din+Hotel' }
    ]
  },

  // 台中 (Taichung)
  {
    id: 'tc-1',
    cityId: 'taichung',
    cityName: '台中',
    name: '台中逢甲夜市親子歡樂行館 (Fengjia Joyous Family Hotel)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 2300,
    address: '台中市西屯區福星路 (逢甲夜市核心商圈步行 1分鐘)',
    tags: ['兒童球池', '免費停車', '嬰兒澡盆', '夜市美食首選'],
    lowestPriceProvider: 'Agoda',
    price: 1850,
    originalPrice: 3200,
    discountPercent: 42,
    providers: [
      { name: 'Agoda', price: 1850, url: 'https://www.agoda.com/zh-tw/search?kw=Fengjia+Joyous+Family+Hotel+Taichung', isLowest: true },
      { name: 'Booking.com', price: 1920, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Fengjia+Joyous+Family+Hotel+Taichung' }
    ]
  },
  {
    id: 'tc-2',
    cityId: 'taichung',
    cityName: '台中',
    name: '台中草悟道綠意設計酒店 (Calligraphy Greenway Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 1540,
    address: '台中市西區公益路 (草悟道/勤美誠品步行 3分鐘)',
    tags: ['草悟道綠意', '設計風格房', '人文咖啡館', '親善管家'],
    lowestPriceProvider: 'Booking.com',
    price: 2100,
    originalPrice: 3500,
    discountPercent: 40,
    providers: [
      { name: 'Booking.com', price: 2100, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Calligraphy+Greenway+Hotel+Taichung', isLowest: true },
      { name: 'Agoda', price: 2180, url: 'https://www.agoda.com/zh-tw/search?kw=Calligraphy+Greenway+Hotel+Taichung' }
    ]
  },
  {
    id: 'tc-3',
    cityId: 'taichung',
    cityName: '台中',
    name: '台中車站綠川風情精緻文旅 (Luchuan Riverside Inn)',
    type: 'B&B',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 1120,
    address: '台中市中區綠川西街 (距離台中火車站 步行4分鐘)',
    tags: ['宮原眼科旁', '綠川水岸觀景', '平價首選', '豐富早餐'],
    lowestPriceProvider: 'Agoda',
    price: 1380,
    originalPrice: 2400,
    discountPercent: 42,
    providers: [
      { name: 'Agoda', price: 1380, url: 'https://www.agoda.com/zh-tw/search?kw=Luchuan+Riverside+Inn+Taichung', isLowest: true },
      { name: 'Booking.com', price: 1450, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Luchuan+Riverside+Inn+Taichung' }
    ]
  },

  // 高雄 (Kaohsiung)
  {
    id: 'kh-1',
    cityId: 'kaohsiung',
    cityName: '高雄',
    name: '高雄駁二藝術特區港景親子飯店 (Pier-2 Ocean Family Hotel)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 2600,
    address: '高雄市鹽埕區大勇路 (輕軌駁二大義站 步行2分鐘)',
    tags: ['高雄港無敵海景', '輕軌捷運雙匯', '兒童大遊戲區', '含豐盛早午餐'],
    lowestPriceProvider: 'Agoda',
    price: 2280,
    originalPrice: 3800,
    discountPercent: 40,
    providers: [
      { name: 'Agoda', price: 2280, url: 'https://www.agoda.com/zh-tw/search?kw=Pier-2+Ocean+Family+Hotel+Kaohsiung', isLowest: true },
      { name: 'Booking.com', price: 2350, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Pier-2+Ocean+Family+Hotel+Kaohsiung' }
    ]
  },
  {
    id: 'kh-2',
    cityId: 'kaohsiung',
    cityName: '高雄',
    name: '高雄美麗島六合夜市文創行館 (Formosa Boulevard Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 1850,
    address: '高雄市新興區中山一路 (美麗島捷運站11號出口 10秒直達)',
    tags: ['光之穹頂旁', '六合夜市步行1分', '免費飲料區', '獨立乾濕分離'],
    lowestPriceProvider: 'Booking.com',
    price: 1480,
    originalPrice: 2600,
    discountPercent: 43,
    providers: [
      { name: 'Booking.com', price: 1480, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Formosa+Boulevard+Hotel+Kaohsiung', isLowest: true },
      { name: 'Agoda', price: 1550, url: 'https://www.agoda.com/zh-tw/search?kw=Formosa+Boulevard+Hotel+Kaohsiung' }
    ]
  },

  // 沖繩 (Okinawa)
  {
    id: 'oki-1',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩國際通親子主題渡假旅館 (AO Family Resort)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1120,
    address: '沖繩縣那霸市久茂地1-4-1 (距離國際通步行 3分鐘 / 縣廳前站 2分鐘)',
    tags: ['兒童遊戲區', '國際通旁', '嬰兒床備品', '免費親子早餐'],
    lowestPriceProvider: 'Agoda',
    price: 1680,
    originalPrice: 2800,
    discountPercent: 40,
    providers: [
      { name: 'Agoda', price: 1680, url: 'https://www.agoda.com/zh-tw/search?kw=Okinawa+AO+Family+Resort', isLowest: true },
      { name: 'Booking.com', price: 1750, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Okinawa+AO+Family+Resort' },
      { name: 'Trip.com', price: 1800, url: 'https://hk.trip.com/hotels/w/okinawa-hotels' }
    ]
  },
  {
    id: 'oki-2',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩海邊無敵海景平價飯店 (Okinawa Beachside Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 1540,
    address: '沖繩縣那霸市辻3-2-36 (鄰近波之上沙灘 / 免費停車)',
    tags: ['陽台無敵海景', '免費停車位', '大浴場洗禮', '親子放鬆'],
    lowestPriceProvider: 'Booking.com',
    price: 1580,
    originalPrice: 2800,
    discountPercent: 44,
    providers: [
      { name: 'Booking.com', price: 1580, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Okinawa+Beachside+Hotel', isLowest: true },
      { name: 'Agoda', price: 1650, url: 'https://www.agoda.com/zh-tw/search?kw=Okinawa+Beachside+Hotel' }
    ]
  },
  {
    id: 'oki-3',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩美榮橋親子歡樂文旅 (Myrica Family Inn)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 680,
    address: '沖繩縣那霸市牧志 (單軌美榮橋站步行1分鐘)',
    tags: ['推車友善', '兒童玩具區', '獨立親子房', '附洗沐用品'],
    lowestPriceProvider: 'Agoda',
    price: 1420,
    originalPrice: 2300,
    discountPercent: 38,
    providers: [
      { name: 'Agoda', price: 1420, url: 'https://www.agoda.com/zh-tw/search?kw=Okinawa+Myrica+Family+Inn', isLowest: true },
      { name: 'Booking.com', price: 1490, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Okinawa+Myrica+Family+Inn' }
    ]
  },
  {
    id: 'oki-4',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩美國村坎帕納船舶飯店 (Vessel Hotel Campana Okinawa)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 3800,
    address: '沖繩縣中頭郡北谷町美濱9-22 (美國村日落海灘旁)',
    tags: ['美國村日落海景', '海景大浴場', '18歲以下不加床免費', '親子推車借用'],
    lowestPriceProvider: 'Agoda',
    price: 2480,
    originalPrice: 4200,
    discountPercent: 41,
    providers: [
      { name: 'Agoda', price: 2480, url: 'https://www.agoda.com/zh-tw/search?kw=Vessel+Hotel+Campana+Okinawa', isLowest: true },
      { name: 'Booking.com', price: 2590, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Vessel+Hotel+Campana+Okinawa' }
    ]
  },
  {
    id: 'oki-5',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '那霸阿札特飯店 (Hotel Azat Okinawa)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 2100,
    address: '沖繩縣那霸市安里2-8-8 (單軌列車安里站 步行30秒)',
    tags: ['單軌站旁30秒', '超市24H旁', '平價乾淨', 'CP值極高'],
    lowestPriceProvider: 'Booking.com',
    price: 1250,
    originalPrice: 2100,
    discountPercent: 40,
    providers: [
      { name: 'Booking.com', price: 1250, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Hotel+Azat+Okinawa', isLowest: true },
      { name: 'Agoda', price: 1310, url: 'https://www.agoda.com/zh-tw/search?kw=Hotel+Azat+Okinawa' }
    ]
  },
  {
    id: 'oki-6',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩那霸日航都市飯店 (Hotel JAL City Naha)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 2950,
    address: '沖繩縣那霸市牧志1-3-70 (國際通正中央門口)',
    tags: ['國際通正中央', '日航星級服務', '豐富日式早餐', '親子舒適'],
    lowestPriceProvider: 'Agoda',
    price: 2150,
    originalPrice: 3500,
    discountPercent: 38,
    providers: [
      { name: 'Agoda', price: 2150, url: 'https://www.agoda.com/zh-tw/search?kw=Hotel+JAL+City+Naha', isLowest: true },
      { name: 'Booking.com', price: 2240, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Hotel+JAL+City+Naha' }
    ]
  },

  // 東京 (Tokyo)
  {
    id: 'tyo-1',
    cityId: 'tokyo',
    cityName: '東京',
    name: '東京新宿親子主題花園飯店 (Shinjuku Family Garden Hotel)',
    type: 'Family Hotel',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 3400,
    address: '東京都新宿區歌舞伎町 (距離新宿站步行 5分鐘)',
    tags: ['新宿車站旁', '兒童免費住宿', '免費日式早餐', '親子四人房'],
    lowestPriceProvider: 'Agoda',
    price: 3200,
    originalPrice: 5200,
    discountPercent: 38,
    providers: [
      { name: 'Agoda', price: 3200, url: 'https://www.agoda.com/zh-tw/search?kw=Shinjuku+Family+Garden+Hotel+Tokyo', isLowest: true },
      { name: 'Booking.com', price: 3350, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Shinjuku+Family+Garden+Hotel+Tokyo' }
    ]
  },
  {
    id: 'tyo-2',
    cityId: 'tokyo',
    cityName: '東京',
    name: '東京上野公園景觀精緻飯店 (Ueno Parkview Hotel)',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 2900,
    address: '東京都台東區上野公園前 (京成上野站步行 2分鐘 / 成田機場Skyliner直達)',
    tags: ['上野動物園旁', 'Skyliner直達', '綠意公園景觀', '繁體中文服務'],
    lowestPriceProvider: 'Booking.com',
    price: 2850,
    originalPrice: 4500,
    discountPercent: 36,
    providers: [
      { name: 'Booking.com', price: 2850, url: 'https://www.booking.com/searchresults.zh-tw.html?ss=Ueno+Parkview+Hotel+Tokyo', isLowest: true },
      { name: 'Agoda', price: 2950, url: 'https://www.agoda.com/zh-tw/search?kw=Ueno+Parkview+Hotel+Tokyo' }
    ]
  }
];

export const mockPackageTours = [
  {
    id: 'pkg-yil-1',
    cityId: 'yilan',
    cityName: '宜蘭',
    title: '【宜蘭礁溪溫泉親子飯店 + 傳藝中心門票+賞鯨體驗】超值組合包',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    stayIncluded: '礁溪溫泉親子飯店 雙人/四人客房 1晚',
    toursIncluded: ['國立傳統藝術中心門票', '龜山島繞島賞鯨體驗券', '礁溪名產伴手禮折價券'],
    price: 3280,
    originalPrice: 4800,
    discountPercent: 31,
    savingsText: '組合包比單買現省 NT$1,420',
    tags: ['賞鯨首選', '私人湯屋', '傳藝體驗'],
    rating: 4.9,
    reviewsCount: 680,
    url: 'https://www.kkday.com/zh-tw/product/128362-yilan-jiaoxi-tour-package'
  },
  {
    id: 'pkg-oki-1',
    cityId: 'okinawa',
    cityName: '沖繩',
    title: '【沖繩國際通親子飯店 + 美美麗海水族館門票+租車自駕優惠】',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    stayIncluded: '沖繩親子主題渡假旅館 2晚',
    toursIncluded: ['沖繩美麗海水族館快速通關門票', '租車自駕一日全險優惠抵用券', '古宇利島觀景台門票'],
    price: 4800,
    originalPrice: 6800,
    discountPercent: 29,
    savingsText: '組合包比單買現省 NT$2,000',
    tags: ['親子首選', '美麗海水族館', '海景陽台'],
    rating: 4.9,
    reviewsCount: 520,
    url: 'https://www.kkday.com/zh-tw/product/100523-okinawa-churaumi-package'
  }
];

export const mockFamilyAttractions = [
  // 宜蘭
  {
    id: 'fam-yil-1',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭斑比山丘 (Bambi Land 偽奈良親近小鹿樂園)',
    location: '宜蘭縣冬山鄉下湖路206號 (梅花湖風景區旁)',
    category: '戶外動物親近園區',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-12歲',
    rating: 4.9,
    features: ['親近水豚與梅花鹿', '平坦推車步道', '美美子霜淇淋', '五星級親子洗手間'],
    description: '宜蘭最熱門的親子動物農莊，能近距離餵食水豚與梅花鹿。',
    highlights: '小朋友能親手喂食水豚與小鹿，園內點心精緻優雅，步道推車友善。',
    exhibitionInfo: {
      name: '【夏季期間限定】水豚水上派對與小鹿彩繪DIY手作特展',
      date: '即日起 ~ 2026/09/30',
      description: '夏天特別推出大水豚涼爽水池生態觀察，並可現場體驗獨家小鹿造型木雕彩繪 DIY。'
    }
  },
  {
    id: 'fam-yil-2',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '張美阿嬤農場 (日式庭園小鹿體驗)',
    location: '宜蘭縣三星鄉行健溪一路二段161號',
    category: '休閒農場',
    image: 'https://images.unsplash.com/photo-1567608285969-48e24e930a0d?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-15歲',
    rating: 4.8,
    features: ['羊駝與水豚餵食', '日式和服體驗', '手工DIY蔥油餅', '專用免費停車場'],
    description: '超人氣日式庭園造景農場，飼養眾多可愛羊駝、水豚與梅花鹿。',
    highlights: '可以帶孩子換穿浴衣拍照，並體驗親手製作宜蘭特色蔥油餅。',
    exhibitionInfo: {
      name: '【季特展】日式祈福風鈴祭與笑臉羊駝近距離特展',
      date: '常設特展 (每日 09:00 - 17:30)',
      description: '全新打造上百座日式竹編祈福風鈴走廊，並可穿著兒童和服體驗親自餵食超萌水豚與笑臉羊駝。'
    }
  },
  // 台北
  {
    id: 'fam-tp-1',
    cityId: 'taipei',
    cityName: '台北',
    name: '台北市立動物園 (木柵動物園)',
    location: '台北市文山區新光路二段30號 (捷運動物園站直達)',
    category: '動植物園',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['大貓熊館與企鵝館', '嬰兒推車租借 (每次50元)', '全區無障礙坡道', '親子育嬰哺乳室'],
    description: '全台規模最大的動物園，擁有完善的推車步道與多元的動植物生態。',
    highlights: '明星大貓熊與國王企鵝超受歡迎，全區推車通行無阻，適合推嬰兒車的家庭。',
    exhibitionInfo: {
      name: '【熱門展覽】大貓熊生態館觀察展 & 酷暑夜間動物園特展',
      date: '常態特展 / 暑期特別開放',
      description: '展示大貓熊成長紀錄與保育成果，暑假特別開放夜間星空動物園探險觀察之旅。'
    }
  },
  {
    id: 'fam-tp-2',
    cityId: 'taipei',
    cityName: '台北',
    name: '台北市立兒童新樂園',
    location: '台北市士林區承德路五段55號 (近科學教育館)',
    category: '遊樂園',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '2-12歲',
    rating: 4.8,
    features: ['平價摩天輪與旋轉木馬', '室內球池遊戲區', '嬰兒推車寄放', '悠遊卡刷卡消費'],
    description: '專為兒童設計的都會型遊樂園，免門票負擔大，遊樂設施CP值極高。',
    highlights: '各設施皆有身高分級標誌，室內有大面積防雨防暑遊戲室，適合幼童放電。',
    exhibitionInfo: {
      name: '【暑期特別展】汪汪隊立大功水上狂歡派對 & 音樂摩天輪特展',
      date: '即日起 ~ 2026/09/01',
      description: '園內打造汪汪隊立大功主題大型裝置與水上遊樂區，夜晚摩天輪配合璀璨燈光秀。'
    }
  },
  {
    id: 'fam-tp-3',
    cityId: 'taipei',
    cityName: '台北',
    name: '國立臺灣科學教育館 (科教館)',
    location: '台北市士林區士商路189號 (兒童新樂園旁)',
    category: '科學館 / 展覽館',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '3-15歲',
    rating: 4.8,
    features: ['空中腳踏車與高空吊橋', '兒童室內科學遊戲室', '推車友善大型電梯', '附設收費地下停車場'],
    description: '結合多項科學實驗、動手做體驗與高空刺激的科學教育館，雨天避暑首選。',
    highlights: '全館推車無障礙通道，九層樓設計豐富，適合小學年齡層探索科學。',
    exhibitionInfo: {
      name: '【重磅特展】侏羅紀恐龍陸海空實境探索特展',
      date: '即日起 ~ 2026/10/15 (每週一休館)',
      description: '引進最新 1:1 機械動態恐龍模型，搭配沉浸式 VR 虛擬實境體驗與考古化石清刷 DIY 手作。'
    }
  },
  {
    id: 'fam-tp-4',
    cityId: 'taipei',
    cityName: '台北',
    name: '華山1914文化創意產業園區 (華山大草坪)',
    location: '台北市中正區八德路一段12號 (忠孝新生捷運站步行3分)',
    category: '文創園區 / 戶外大草坪',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.7,
    features: ['戶外大草坪野餐', '豐富卡通親子主題展', '推車友善平坦通道', '育嬰哺乳室設備'],
    description: '全台最受歡迎的藝文特區之一，定期舉辦親子特展，並擁有極為開闊的綠色草坪。',
    highlights: '大草坪極為適合幼兒奔跑野餐，周邊設有多家設計感親子餐廳。',
    exhibitionInfo: {
      name: '【快閃特展】波力救援小隊互動體驗展 & 5米高巨型 Hello Kitty 童樂展',
      date: '即日起 ~ 2026/09/20 (免費入場觀展)',
      description: '園內中4B館與大草坪打造巨型卡通打卡造景與多項動手操作互動遊戲區，適合親子家庭同樂。'
    }
  },
  // 台中
  {
    id: 'fam-tc-1',
    cityId: 'taichung',
    cityName: '台中',
    name: '國立自然科學博物館 (台中科博館)',
    location: '台中市北區館前路1號',
    category: '博物館 / 科學館',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '3-15歲',
    rating: 4.9,
    features: ['動態恐龍模型展', '嬰兒車免費租借', '科學中心動手玩', '親子閱覽室'],
    description: '擁有極受孩子喜愛的動態恐龍展示，是台中雨天最佳寓教於樂室內景點。',
    highlights: '超吸煙的巨大暴龍會吼叫點頭，科學中心有許多適合幼童的操作式物理裝置。',
    exhibitionInfo: {
      name: '【常態特展】生命科學廳 - 恐龍時代沉浸式動態展',
      date: '常設特展 (每週二至週日 09:00-17:00)',
      description: '館內最具知名度之巨大暴龍與翼龍動態生態展示，並設有立體 3D 劇場。'
    }
  },
  {
    id: 'fam-tc-2',
    cityId: 'taichung',
    cityName: '台中',
    name: '麗寶樂園 (探索世界親子區)',
    location: '台中市后里區福容路8號',
    category: '主題樂園',
    image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.8,
    features: ['POPA親子專用設施', '嬰兒車租借與育嬰室', '麗寶Outlet直通', '大型戶外停車場'],
    description: '結合大型主題樂園與Outlet，遊樂區擁有眾多為溫和幼兒量身打造的遊樂器械。',
    highlights: '設有大量棚遮與兒童劇場，直通 Outlet 便於家庭一站式用餐與採購。',
    exhibitionInfo: {
      name: '【夏季特展】水陸雙樂園泡泡狂歡特展 & 兒童劇場演出',
      date: '即日起 ~ 2026/09/10',
      description: '探索世界親子區推出大型彩色泡泡派對，並於午後舉辦 POPA 家族親子童話劇場。'
    }
  },
  // 高雄
  {
    id: 'fam-kh-1',
    cityId: 'kaohsiung',
    cityName: '高雄',
    name: '高雄國立科學工藝博物館 (科工館)',
    location: '高雄市三民區九如一路720號',
    category: '科學館',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '2-15歲',
    rating: 4.8,
    features: ['熱雪天堂探索樂園', '免費兒童科學園', '推車友善電梯', '親子哺乳室'],
    description: '專為親子設計的超大室內科學遊樂場，包含動手玩科學與室內巨型溜滑梯。',
    highlights: '熱雪天堂有常溫人工滑雪場與攀爬區，是高雄炎夏與雨天的消暑避暑首選。',
    exhibitionInfo: {
      name: '【熱門特展】熱雪天堂探索樂園常溫滑雪特展',
      date: '常設特展 (地下二樓特展區)',
      description: '南台灣唯一常溫人工造雪滑雪場，配有專屬小雪橇與大型三層攀爬探索網。'
    }
  },
  {
    id: 'fam-kh-2',
    cityId: 'kaohsiung',
    cityName: '高雄',
    name: '淨園農場 (落羽松草坪與看飛機起降)',
    location: '高雄市小港區明聖街135巷10-12號',
    category: '休閒農場 / 景觀餐廳',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-12歲',
    rating: 4.7,
    features: ['近距離觀看飛機起落', '落羽松露營野餐區', '羊駝與河馬動物區', '兒童沙坑遊戲場'],
    description: '能超近距離感受飛機起落的震撼，並飼養多種可愛動物與大型落羽松沙坑。',
    highlights: '可以看飛機、餵羊駝、讓孩子在大型沙坑放電，適合悠閒的午後家庭聚會。',
    exhibitionInfo: {
      name: '【星空特別展】落羽松星空帳篷音樂祭與可愛動物餵食體驗展',
      date: '每週末與國定假日 16:00 起',
      description: '落羽松區傍晚點亮夢幻燈飾，並安排現場兒童吉他演奏與大沙坑尋寶遊戲。'
    }
  },
  // 沖繩
  {
    id: 'fam-oki-1',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩美美麗海水族館 (海洋博公園)',
    location: '沖繩縣國頭郡本部町字石川424番地',
    category: '水族館 / 公園',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['黑潮之海巨大鯨鯊池', '免費海豚表演秀', '推車免費借用', '五星級育嬰室'],
    description: '全日本最知名的海洋水族館，欣賞巨大鯨鯊與鬼蝠魟游動的壯麗景色。',
    highlights: '海豚表演極具水準且免門票觀賞，館內無障礙坡道設計，推嬰兒車十分流暢。',
    exhibitionInfo: {
      name: '【海洋特別展】黑潮大水槽鯨鯊餵食秀與珊瑚礁探索特展',
      date: '每日固定場次展示 (15:00 / 17:00)',
      description: '展示數萬條熱帶魚與鬼蝠魟游動，並於每日下午舉辦精彩的鯨鯊垂直進食解說秀。'
    }
  },
  {
    id: 'fam-oki-2',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '名護動植物園 (NEO PARK OKINAWA)',
    location: '沖繩縣名護市名護4607-41',
    category: '動植物園',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-12歲',
    rating: 4.8,
    features: ['開放式鳥類飛禽區', '懷舊輕軌小火車', '水豚與草泥馬餵食', '無障礙推車通道'],
    description: '無障礙的動植物生態公園，孩子可以近距離親手餵食各種溫馴的小動物。',
    highlights: '能搭乘園內古老輕軌蒸汽火車環繞園區，鳥類會直接在身邊走動，體驗新奇。',
    exhibitionInfo: {
      name: '【園區特展】沖繩輕軌鐵道搭乘體驗與珍稀飛禽自由穿梭特展',
      date: '常設特展 (每日開放)',
      description: '乘坐復古紅頭火車橫跨湖泊，並可於開放式網室園區體驗數百隻紅鶴與紅鸛在身旁飛翔。'
    }
  },
  {
    id: 'fam-oki-3',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩兒童王國 (Okinawa Zoo & Museum)',
    location: '沖繩縣沖繩市胡屋5丁目7-1',
    category: '動物園 / 科學博物館',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '1-12歲',
    rating: 4.8,
    features: ['Wonder Museum室內探索', '親手餵食大象與羊駝', '嬰兒推車租借', '五星親子哺乳室'],
    description: '沖繩唯一的市立動物園與科學體驗館，結合戶外動物親近與室內光影展。',
    highlights: '神奇博物館 (Wonder Museum) 提供豐富的體感與聲光互動，適合各年齡兒童。',
    exhibitionInfo: {
      name: '【室內重磅展】Wonder Museum 神奇光影與聲響互動特展',
      date: '常設展區 (B1~2F)',
      description: '設有三大主題體驗樓層，孩子能利用手勢控制光雕投影與製造巨型彩色泡泡。'
    }
  },
  // 台南真實景點
  {
    id: 'fam-tn-1',
    cityId: 'tainan',
    cityName: '台南',
    name: '台南奇美博物館 (絕美歐洲神殿大草坪)',
    location: '台南市仁德區文華路二段66號',
    category: '博物館 / 戶外藝術園區',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['超豐富動物標本展區', '嬰兒推車免費借用', '絕美歐洲羅馬廣場', '全區多功能哺乳室'],
    description: '希臘神殿式華麗外觀與絕美繆思廣場，館內有豐富的動物標本展與兵器展。',
    highlights: '戶外開闊的草坪與親水廣場極為適合野餐放電，且館內設有五星級哺乳設施。',
    exhibitionInfo: {
      name: '【國際特展】從拉斐爾到梵谷 - 英國國家藝廊珍藏大展',
      date: '即日起 ~ 2026/10/10 (需提前預約場次)',
      description: '展出 50 位西洋藝術大師經典真跡，並針對兒童設計互動導覽地圖與手冊。'
    }
  },
  {
    id: 'fam-tn-2',
    cityId: 'tainan',
    cityName: '台南',
    name: '十鼓文創園區 (仁德糖廠極限體驗)',
    location: '台南市仁德區文華路二段326號',
    category: '文創遊樂園區',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '2-15歲',
    rating: 4.8,
    features: ['幼兒專用超大球池', '室內五層樓滑梯體驗', '傳統打鼓樂趣DIY', '推車置放專屬區'],
    description: '由舊糖廠改造的文創冒險園區，設有專為兒童設計的室內大型極限球池與煙囪滑梯。',
    highlights: '孩子能親身體驗擊鼓樂趣，並在高度安全的幼兒滑梯室內遊戲室盡情玩耍。',
    exhibitionInfo: {
      name: '【魔法特展】魔法工廠魔法師世界沉浸式打卡展 & 室內巨型透明滑梯',
      date: '常設特展 (每日開放)',
      description: '打造宛如霍格華茲魔法飛天書牆與沉浸式光影展，並設有 5 層樓高兒童極限透明滑梯。'
    }
  },
  // 京都真實景點
  {
    id: 'fam-ky-1',
    cityId: 'kyoto',
    cityName: '京都',
    name: '京都水族館 (梅小路公園內)',
    location: '京都府京都市下京區觀音寺町56-3',
    category: '水族館',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.8,
    features: ['京都特有大鯢觀察', '露天海豚表演秀', '平坦無障礙推車道', '親子多功能洗手間'],
    description: '日本首家完全使用人工海水的水族館，展示大量日本大鯢（娃娃魚）及豐富海洋生物。',
    highlights: '海豚秀以東寺五重塔為背景，景色壯麗。全館有無障礙推車動線，非常貼心。',
    exhibitionInfo: {
      name: '【夏季特別展】水母天空沉浸光影水族展 & 大鯢特展',
      date: '即日起 ~ 2026/09/30',
      description: '全日本最大水母球形水槽配合夢幻藍色光影，展示上千隻夢幻漂浮水母。'
    }
  },
  {
    id: 'fam-ky-2',
    cityId: 'kyoto',
    cityName: '京都',
    name: '京都鐵道博物館',
    location: '京都府京都市下京區觀音寺町 (梅小路公園旁)',
    category: '鐵道主題博物館',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '2-12歲',
    rating: 4.9,
    features: ['實體蒸汽火車扇形車庫', '電車模擬駕駛體驗', '大尺寸鐵道模型展', '推車免費寄放服務'],
    description: '日本最大的鐵道博物館之一，保存了多台古老實體蒸汽火車與新幹線車頭。',
    highlights: '鐵道迷孩子的天堂！能與百年老火車拍照，並有非常平坦的推車參觀動線。',
    exhibitionInfo: {
      name: '【鐵道特別展】新幹線與蒸汽火車近距離運轉實境展',
      date: '常設特展 (每週三休館)',
      description: '展示歷代 53 輛鐵道車輛，孩子可實際登上老蒸汽火車頭並觀賞全日本最大規模的模型動態運轉展。'
    }
  },
  // 首爾真實景點
  {
    id: 'fam-se-1',
    cityId: 'seoul',
    cityName: '首爾',
    name: '首爾兒童大公園 (動物園與大型兒童遊樂場)',
    location: '首爾特別市廣津區陵洞路216 (捷運兒童大公園站)',
    category: '主題公園 / 親子公園',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-15歲',
    rating: 4.8,
    features: ['完全免費免票入場', '附設戶外動物園區', '大型沙坑與溜滑梯', '推車友善洗手間'],
    description: '首爾極受家長歡迎的免費大型公園，結合了動物園、植物園與多項遊樂設施。',
    highlights: '免票入場且占地廣闊，動物園內能看到大象與老虎，是親民度滿分的放電景點。',
    exhibitionInfo: {
      name: '【戶外體驗展】熱帶植物溫室與動物親密互動特展',
      date: '常態開放 (免費參觀)',
      description: '設有巨型玻璃溫室花園與野生動物區，孩子可近距離觀察可愛狐獴與斑馬。'
    }
  },
  {
    id: 'fam-se-2',
    cityId: 'seoul',
    cityName: '首爾',
    name: '韓國愛寶樂園 (Everland Safari World)',
    location: '京畿道龍仁市處仁區蒲谷邑愛寶樂園路199',
    category: '大型主題樂園 / 動物園',
    image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['水陸兩用野生動物車', '四季花卉慶典花園', '嬰兒推車付費租借', '五星母嬰育嬰中心'],
    description: '韓國規模最大、最受家庭喜愛的主題樂園，結合遊樂設施與豐富的野生動物世界。',
    highlights: '搭乘 Safari 巴士能近距離觀看熊、獅子與老虎，樂園對推嬰兒車的家庭支援相當完善。',
    exhibitionInfo: {
      name: '【盛夏慶典】四季花園玫瑰花海與水上潑水狂歡特展',
      date: '即日起 ~ 2026/09/10',
      description: '園內四季花園打造歐洲玫瑰花海裝置，並於午後舉辦歡樂的水上音樂潑水大戰。'
    }
  },
  // 曼谷真實景點
  {
    id: 'fam-bk-1',
    cityId: 'bangkok',
    cityName: '曼谷',
    name: '曼谷野生動物世界 (Safari World 長頸鹿餵食)',
    location: '99 Panya Indra Rd, Sam Wa Tawan Tok, Khlong Sam Wa, Bangkok',
    category: '野生動物園區 / 海洋公園',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['開車進入野生猛獸區', '超大型長頸鹿餵食台', '海豚與猩猩娛樂秀', '遮陽棚推車大通道'],
    description: '泰國最具代表性的野生動物園，能近距離親手拿香蕉餵食上百隻溫馴的長頸鹿。',
    highlights: '坐著遊覽車深入獅子與老虎棲息地，長頸鹿餵食台高度安全，孩子玩得超開心。',
    exhibitionInfo: {
      name: '【動態表演展】西部牛仔特技秀與海豚水上跳躍特展',
      date: '每日固定表演場次 (10:20 - 15:40)',
      description: '包含驚險的西部爆破特效特技秀，以及海豚與海獅雙重歡樂水上表演。'
    }
  },
  {
    id: 'fam-bk-2',
    cityId: 'bangkok',
    cityName: 'bangkok',
    name: '暹羅海洋世界 (SEA LIFE Bangkok Ocean World)',
    location: 'Siam Paragon B1-B2, 991 Rama I Rd, Pathum Wan, Bangkok (捷運Siam站直達)',
    category: '室內水族館',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.8,
    features: ['大型百貨商場B1直達', '360度海底玻璃隧道', '推車寄放與輪椅坡道', '冷氣恆溫避暑首選'],
    description: '東南亞最大的室內水族館之一，位於知名 Siam Paragon 百貨內，交通購物極佳。',
    highlights: '炎熱曼谷的消暑避暑首選！館內設有美麗的玻璃海底隧道與企鵝觀察區，推車友善。',
    exhibitionInfo: {
      name: '【室內沈浸展】玻璃底船探險觀鯊展 & 冰雪企鵝觀察展',
      date: '常設特展 (每日 10:00 - 20:00)',
      description: '乘坐特殊玻璃底船於鯊魚水槽上方滑行，並於冰雪區探訪巴布亞企鵝家園。'
    }
  },
  // 新北真實景點
  {
    id: 'fam-ntp-1',
    cityId: 'newtaipei',
    cityName: '新北',
    name: '野柳海洋世界 (Yehliu Ocean World)',
    location: '新北市萬里區野柳里港東路167-3號',
    category: '海洋樂園 / 水族館',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-12歲',
    rating: 4.7,
    features: ['海獅與海豚跳水秀', '室內童樂水族館區', '推車友善無障礙通道', '專用收費停車場'],
    description: '台灣第一座海洋動物表演公園，欣賞海獅與海豚精彩演出，並設有室內海底隧道展。',
    highlights: '海豚表演極具教育意義，並可近距離觀察海洋生物，鄰近野柳地質公園。',
    exhibitionInfo: {
      name: '【海洋特展】童樂水族館探索展與海獅親子互動秀',
      date: '每日固定演出場次 (10:30 / 13:30 / 15:30)',
      description: '展出百種奇特海洋魚類與觸摸池，並特別舉辦海獅幽默跳水與加州海獅解說展。'
    }
  },
  {
    id: 'fam-ntp-2',
    cityId: 'newtaipei',
    cityName: '新北',
    name: '朱銘美術館 (戶外雕塑藝術園區)',
    location: '新北市金山區西勢湖2號',
    category: '戶外藝術公園 / 美術館',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.8,
    features: ['超廣闊綠意雕塑大草坪', '兒童藝術水戲世界', '推車租借與哺乳室', '免費接駁車與停車場'],
    description: '全台最大的戶外雕塑美術館，擁有一整片大草坪與太極系列巨型雕塑。',
    highlights: '極適合推嬰兒車的戶外藝術公園，設有兒童親水區與塗鴉繪畫區。',
    exhibitionInfo: {
      name: '【夏季特別展】太極系列戶外雕塑與兒童水戲夏令特展',
      date: '即日起 ~ 2026/10/31 (每週一休館)',
      description: '將藝術融入自然生態，設有獨特的兒童水戲噴泉與粉筆塗鴉自由創作大道。'
    }
  },
  // 桃園真實景點
  {
    id: 'fam-ty-1',
    cityId: 'taoyuan',
    cityName: '桃園',
    name: '雄獅文具想像力製造所 (彩色筆DIY)',
    location: '桃園市龍潭區中興路九龍段229號',
    category: '觀光工廠 / 色彩美學館',
    image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '2-12歲',
    rating: 4.9,
    features: ['全館牆面自由塗鴉', '彩色筆與泡泡灌墨DIY', '森林戶外步道', '室內美型咖啡廳'],
    description: '全台最美的色彩美學體驗館，孩子可以在純白牆面上隨意塗鴉、組裝彩色筆。',
    highlights: '設計極具現代感，DIY 課程豐富刺激，全區無障礙且雨天避暑非常適合。',
    exhibitionInfo: {
      name: '【美學特展】夜光彩繪互動展與限定版漸層彩色筆 DIY 特展',
      date: '每日 09:00 - 17:00 (每週三休館)',
      description: '館內打造夢幻夜光森林彩繪展，孩子能親手組裝個人專屬的 3 色漸層彩色筆。'
    }
  },
  {
    id: 'fam-ty-2',
    cityId: 'taoyuan',
    cityName: '桃園',
    name: 'Xpark 水族館 (都會型都市水族館)',
    location: '桃園市中壢區春德路105號 (青埔置地廣場旁)',
    category: '都市水族館',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.8,
    features: ['日本橫濱八景島海外首館', '企鵝穿梭咖啡廳', '冷氣恆溫無障礙', '高鐵站步行7分'],
    description: '來自日本的高科技新都會型水族館，融合音樂、燈光與海洋生態展。',
    highlights: '企鵝會在用餐區的透明管道中游動穿梭，離高鐵桃園站與華泰名品城極近。',
    exhibitionInfo: {
      name: '【沉浸特展】癒見水母夢幻光影展 & 企鵝水中穿梭奇幻特展',
      date: '常設特展 (每日開放)',
      description: '運用音樂與光雕投影打造圓柱水母悠游空間，感受前所未有的五感震撼體驗。'
    }
  },
  // 新竹真實景點
  {
    id: 'fam-hc-1',
    cityId: 'hsinchu',
    cityName: '新竹',
    name: '六福村主題遊樂園 (非洲部落野生動物園)',
    location: '新竹縣關西鎮仁安里拱子溝60號',
    category: '主題樂園 / 野生動物園',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['猛獸區遊園巴士', '蒸汽火車看草食動物', '溫和幼兒旋轉木馬', '推車付費租借與哺乳室'],
    description: '全台唯一的結合野生動物園與大型主題遊樂園，搭乘蒸汽火車近距離觀賞白犀牛與美洲野牛。',
    highlights: '搭乘猛獸巴士能看黃金獵犬與白老虎，園區針對家庭設計眾多溫和幼兒設施。',
    exhibitionInfo: {
      name: '【部落盛夏展】部落狂歡大遊行與白犀牛家族觀察特展',
      date: '即日起 ~ 2026/09/15',
      description: '每天午後舉辦熱帶狂歡音樂大遊行，並有專人解說白犀牛保育成果與犀牛泥巴浴。'
    }
  },
  // 苗栗真實景點
  {
    id: 'fam-ml-1',
    cityId: 'miaoli',
    cityName: '苗栗',
    name: '飛牛牧場 (綠野草原與餵小牛體驗)',
    location: '苗栗縣通霄鎮南和里166號',
    category: '休閒農場 / 綠色草原',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-12歲',
    rating: 4.8,
    features: ['親手拿奶瓶餵小牛', '鴨子大軍划水逛街', '純濃手作鮮奶冰淇淋', '大草坪野餐'],
    description: '全台知名的綠色自然牧場，擁有極大幅員的丘陵大草坪與荷蘭荷斯坦乳牛。',
    highlights: '小朋友能體驗親自餵小奶牛喝奶、擠牛奶，並品嚐純濃鮮奶布丁。',
    exhibitionInfo: {
      name: '【牧場特展】鴨子大軍大放行與鮮奶DIY樂趣特展',
      date: '每日 07:00 - 19:00',
      description: '每天特定時間有成群白鴨子聽搖鈴搖擺逛街，並提供親子現場調製鮮奶搖搖杯。'
    }
  },
  // 屏東真實景點
  {
    id: 'fam-pt-1',
    cityId: 'pingtung',
    cityName: '屏東',
    name: '國立海洋生物博物館 (墾丁海生館)',
    location: '屏東縣車城鄉後灣路2號',
    category: '水族館 / 生態公園',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['小白鯨與小白鯨隧道', '巨型海底巨藻水槽', '極地企鵝餵食觀察', '無障礙坡道與育嬰室'],
    description: '全台灣規模最大的海洋生物博物館，分為台灣水域、珊瑚王國與世界水域三館。',
    highlights: '海底隧道可以看到巨大的魟魚與小白鯨優雅游過，設施齊全，適合全家大小放鬆度假。',
    exhibitionInfo: {
      name: '【重磅特展】巨藻森林沉浸展與企鵝夜宿餵食體驗特展',
      date: '常設特展 (每日開放)',
      description: '高達三層樓高的巨大海藻林水槽，每日定時舉辦企鵝餵食秀與鯨鯊生態解說。'
    }
  },
  // 花蓮真實景點
  {
    id: 'fam-hl-1',
    cityId: 'hualien',
    cityName: '花蓮',
    name: '花蓮遠雄海洋公園 (太平洋海景遊樂園)',
    location: '花蓮縣壽豐鄉鹽寮村福德189號',
    category: '海洋主題樂園 / 水族館',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.9,
    features: ['美人魚實境水中秀', '海豚與海獅劇場', '晴空纜車俯瞰太平洋', '無障礙電梯與推車借用'],
    description: '緊鄰無敵太平洋海景的海洋主題樂園，設有浪漫的美人魚表演與海豚表演。',
    highlights: '搭乘晴空纜車能飽覽蔚藍太平洋，園區無障礙坡道與電梯規劃極佳，放電與度假一次滿足。',
    exhibitionInfo: {
      name: '【海洋慶典】夢幻美人魚真人實境水下舞蹈與海豚大遊行特展',
      date: '即日起 ~ 2026/10/31',
      description: '全台唯一的真人配樂水下姿態美人魚舞蹈，並有海豚高空跳躍水花秀演出。'
    }
  },
  // 澎湖真實景點
  {
    id: 'fam-ph-1',
    cityId: 'penghu',
    cityName: '澎湖',
    name: '澎湖水族館 (Penghu Aquarium)',
    location: '澎湖縣白沙鄉岐頭村58號',
    category: '水族館',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-99歲',
    rating: 4.8,
    features: ['14米長拱型海底隧道', '綠蠵龜戶外復育池', '大斑節蝦與觸摸池', '室內涼爽無障礙'],
    description: '澎湖唯一的展覽水族館，展示綠蠵龜、玳瑁與澎湖周邊海域獨特的珊瑚礁生態。',
    highlights: '設有長達 14 米的海底隧道與觸摸池，是澎湖炎夏消暑與雨天最佳備案。',
    exhibitionInfo: {
      name: '【海洋生態展】綠蠵龜保育特展與大水槽大魟魚餵食秀',
      date: '每日固定場次 (15:00 大水槽餵食)',
      description: '工作人員潛入大水槽餵食巨型龍膽石斑與魟魚，並設有綠蠵龜生態解說互動館。'
    }
  }
];

export const mockPriceTrends = {
  taipei: [
    { month: '1月', avgPrice: 2200, budgetRange: 'NT$ 1,400 - 4,800' },
    { month: '2月 (農曆新年)', avgPrice: 3100, budgetRange: 'NT$ 2,000 - 6,500' },
    { month: '3月', avgPrice: 2050, budgetRange: 'NT$ 1,300 - 4,200' },
    { month: '4月', avgPrice: 2100, budgetRange: 'NT$ 1,350 - 4,500' },
    { month: '5月', avgPrice: 1980, budgetRange: 'NT$ 1,250 - 4,000' },
    { month: '6月 (畢業季)', avgPrice: 2350, budgetRange: 'NT$ 1,500 - 5,200' },
    { month: '7月 (暑假旺季)', avgPrice: 2800, budgetRange: 'NT$ 1,800 - 6,000' },
    { month: '8月 (暑假旺季)', avgPrice: 2900, budgetRange: 'NT$ 1,900 - 6,200' },
    { month: '9月', avgPrice: 2000, budgetRange: 'NT$ 1,300 - 4,200' },
    { month: '10月 (國慶連假)', avgPrice: 2400, budgetRange: 'NT$ 1,500 - 5,000' },
    { month: '11月', avgPrice: 1950, budgetRange: 'NT$ 1,250 - 4,000' },
    { month: '12月 (跨年)', avgPrice: 2700, budgetRange: 'NT$ 1,700 - 5,800' }
  ],
  yilan: [
    { month: '1月', avgPrice: 1580, budgetRange: 'NT$ 1,200 - 2,800' },
    { month: '2月 (農曆新年)', avgPrice: 2500, budgetRange: 'NT$ 1,800 - 4,500' },
    { month: '3月', avgPrice: 1650, budgetRange: 'NT$ 1,300 - 2,800' },
    { month: '4月', avgPrice: 1720, budgetRange: 'NT$ 1,350 - 2,900' },
    { month: '5月', avgPrice: 1600, budgetRange: 'NT$ 1,250 - 2,700' },
    { month: '6月 (童玩節前夕)', avgPrice: 2150, budgetRange: 'NT$ 1,600 - 3,800' },
    { month: '7月 (童玩節旺季)', avgPrice: 2600, budgetRange: 'NT$ 1,900 - 4,200' },
    { month: '8月 (暑假)', avgPrice: 2500, budgetRange: 'NT$ 1,800 - 4,000' },
    { month: '9月', avgPrice: 1550, budgetRange: 'NT$ 1,200 - 2,600' },
    { month: '10月', avgPrice: 1700, budgetRange: 'NT$ 1,300 - 2,900' },
    { month: '11月 (溫泉季)', avgPrice: 1900, budgetRange: 'NT$ 1,400 - 3,200' },
    { month: '12月 (溫泉旺季)', avgPrice: 2200, budgetRange: 'NT$ 1,600 - 3,800' }
  ],
  taichung: [
    { month: '1月', avgPrice: 1800, budgetRange: 'NT$ 1,200 - 3,800' },
    { month: '2月 (農曆新年)', avgPrice: 2600, budgetRange: 'NT$ 1,700 - 5,000' },
    { month: '3月', avgPrice: 1750, budgetRange: 'NT$ 1,150 - 3,500' },
    { month: '4月', avgPrice: 1800, budgetRange: 'NT$ 1,200 - 3,600' },
    { month: '5月', avgPrice: 1700, budgetRange: 'NT$ 1,100 - 3,400' },
    { month: '6月', avgPrice: 1900, budgetRange: 'NT$ 1,300 - 3,800' },
    { month: '7月 (暑假)', avgPrice: 2300, budgetRange: 'NT$ 1,500 - 4,500' },
    { month: '8月 (暑假)', avgPrice: 2400, budgetRange: 'NT$ 1,600 - 4,800' },
    { month: '9月', avgPrice: 1700, budgetRange: 'NT$ 1,100 - 3,400' },
    { month: '10月 (國慶)', avgPrice: 2000, budgetRange: 'NT$ 1,300 - 4,000' },
    { month: '11月', avgPrice: 1650, budgetRange: 'NT$ 1,100 - 3,300' },
    { month: '12月 (跨年)', avgPrice: 2200, budgetRange: 'NT$ 1,400 - 4,500' }
  ],
  kaohsiung: [
    { month: '1月', avgPrice: 1700, budgetRange: 'NT$ 1,100 - 3,600' },
    { month: '2月 (農曆新年)', avgPrice: 2400, budgetRange: 'NT$ 1,600 - 4,800' },
    { month: '3月', avgPrice: 1650, budgetRange: 'NT$ 1,050 - 3,400' },
    { month: '4月', avgPrice: 1700, budgetRange: 'NT$ 1,100 - 3,500' },
    { month: '5月', avgPrice: 1600, budgetRange: 'NT$ 1,000 - 3,200' },
    { month: '6月', avgPrice: 1800, budgetRange: 'NT$ 1,200 - 3,600' },
    { month: '7月 (暑假)', avgPrice: 2200, budgetRange: 'NT$ 1,400 - 4,500' },
    { month: '8月 (暑假)', avgPrice: 2300, budgetRange: 'NT$ 1,500 - 4,600' },
    { month: '9月', avgPrice: 1600, budgetRange: 'NT$ 1,000 - 3,200' },
    { month: '10月 (國慶)', avgPrice: 1900, budgetRange: 'NT$ 1,200 - 3,800' },
    { month: '11月', avgPrice: 1550, budgetRange: 'NT$ 1,000 - 3,100' },
    { month: '12月 (跨年)', avgPrice: 2100, budgetRange: 'NT$ 1,400 - 4,200' }
  ],
  okinawa: [
    { month: '1月', avgPrice: 1350, budgetRange: 'NT$ 1,200 - 2,500' },
    { month: '2月', avgPrice: 1400, budgetRange: 'NT$ 1,300 - 2,800' },
    { month: '3月 (賞櫻)', avgPrice: 1800, budgetRange: 'NT$ 1,500 - 3,500' },
    { month: '4月', avgPrice: 1750, budgetRange: 'NT$ 1,500 - 3,200' },
    { month: '5月 (海灘開放)', avgPrice: 1900, budgetRange: 'NT$ 1,600 - 3,500' },
    { month: '6月 (梅雨季)', avgPrice: 1500, budgetRange: 'NT$ 1,300 - 2,800' },
    { month: '7月 (暑假旺季)', avgPrice: 2800, budgetRange: 'NT$ 2,000 - 5,500' },
    { month: '8月 (暑假旺季)', avgPrice: 3000, budgetRange: 'NT$ 2,200 - 6,000' },
    { month: '9月', avgPrice: 2000, budgetRange: 'NT$ 1,600 - 3,800' },
    { month: '10月', avgPrice: 1800, budgetRange: 'NT$ 1,400 - 3,500' },
    { month: '11月', avgPrice: 1500, budgetRange: 'NT$ 1,200 - 2,800' },
    { month: '12月', avgPrice: 1400, budgetRange: 'NT$ 1,100 - 2,600' }
  ],
  tokyo: [
    { month: '1月', avgPrice: 2500, budgetRange: 'NT$ 1,800 - 5,000' },
    { month: '2月', avgPrice: 2400, budgetRange: 'NT$ 1,700 - 4,800' },
    { month: '3月 (賞櫻旺季)', avgPrice: 3500, budgetRange: 'NT$ 2,500 - 7,000' },
    { month: '4月 (賞櫻)', avgPrice: 3200, budgetRange: 'NT$ 2,200 - 6,500' },
    { month: '5月 (黃金週)', avgPrice: 3000, budgetRange: 'NT$ 2,000 - 6,000' },
    { month: '6月', avgPrice: 2300, budgetRange: 'NT$ 1,600 - 4,500' },
    { month: '7月 (暑假)', avgPrice: 2800, budgetRange: 'NT$ 2,000 - 5,500' },
    { month: '8月 (暑假)', avgPrice: 2900, budgetRange: 'NT$ 2,100 - 5,800' },
    { month: '9月', avgPrice: 2200, budgetRange: 'NT$ 1,600 - 4,500' },
    { month: '10月 (紅葉季)', avgPrice: 2800, budgetRange: 'NT$ 2,000 - 5,500' },
    { month: '11月 (紅葉季)', avgPrice: 2700, budgetRange: 'NT$ 1,900 - 5,200' },
    { month: '12月 (跨年)', avgPrice: 3100, budgetRange: 'NT$ 2,200 - 6,200' }
  ],
  osaka: [
    { month: '1月', avgPrice: 2200, budgetRange: 'NT$ 1,500 - 4,500' },
    { month: '2月', avgPrice: 2100, budgetRange: 'NT$ 1,400 - 4,200' },
    { month: '3月 (賞櫻)', avgPrice: 3000, budgetRange: 'NT$ 2,000 - 6,000' },
    { month: '4月 (賞櫻)', avgPrice: 2800, budgetRange: 'NT$ 1,900 - 5,600' },
    { month: '5月', avgPrice: 2300, budgetRange: 'NT$ 1,600 - 4,500' },
    { month: '6月', avgPrice: 2000, budgetRange: 'NT$ 1,400 - 4,000' },
    { month: '7月 (暑假)', avgPrice: 2500, budgetRange: 'NT$ 1,700 - 5,000' },
    { month: '8月 (暑假)', avgPrice: 2600, budgetRange: 'NT$ 1,800 - 5,200' },
    { month: '9月', avgPrice: 2000, budgetRange: 'NT$ 1,400 - 4,000' },
    { month: '10月', avgPrice: 2400, budgetRange: 'NT$ 1,600 - 4,800' },
    { month: '11月 (紅葉季)', avgPrice: 2500, budgetRange: 'NT$ 1,700 - 5,000' },
    { month: '12月', avgPrice: 2300, budgetRange: 'NT$ 1,500 - 4,500' }
  ],
  seoul: [
    { month: '1月', avgPrice: 1800, budgetRange: 'NT$ 1,200 - 3,600' },
    { month: '2月', avgPrice: 1750, budgetRange: 'NT$ 1,100 - 3,500' },
    { month: '3月', avgPrice: 1900, budgetRange: 'NT$ 1,300 - 3,800' },
    { month: '4月 (賞櫻)', avgPrice: 2300, budgetRange: 'NT$ 1,500 - 4,500' },
    { month: '5月', avgPrice: 2100, budgetRange: 'NT$ 1,400 - 4,200' },
    { month: '6月', avgPrice: 1900, budgetRange: 'NT$ 1,300 - 3,800' },
    { month: '7月 (暑假)', avgPrice: 2200, budgetRange: 'NT$ 1,500 - 4,500' },
    { month: '8月', avgPrice: 2300, budgetRange: 'NT$ 1,600 - 4,600' },
    { month: '9月 (中秋)', avgPrice: 2100, budgetRange: 'NT$ 1,400 - 4,200' },
    { month: '10月 (紅葉)', avgPrice: 2400, budgetRange: 'NT$ 1,600 - 4,800' },
    { month: '11月', avgPrice: 2000, budgetRange: 'NT$ 1,300 - 4,000' },
    { month: '12月 (聖誕)', avgPrice: 2200, budgetRange: 'NT$ 1,500 - 4,500' }
  ],
  kyoto: [
    { month: '1月', avgPrice: 2400, budgetRange: 'NT$ 1,600 - 5,000' },
    { month: '2月', avgPrice: 2300, budgetRange: 'NT$ 1,500 - 4,800' },
    { month: '3月 (賞櫻旺季)', avgPrice: 3800, budgetRange: 'NT$ 2,500 - 7,500' },
    { month: '4月 (賞櫻)', avgPrice: 3500, budgetRange: 'NT$ 2,300 - 7,000' },
    { month: '5月', avgPrice: 2500, budgetRange: 'NT$ 1,700 - 5,000' },
    { month: '6月', avgPrice: 2200, budgetRange: 'NT$ 1,500 - 4,500' },
    { month: '7月 (祇園祭)', avgPrice: 3000, budgetRange: 'NT$ 2,000 - 6,000' },
    { month: '8月', avgPrice: 2600, budgetRange: 'NT$ 1,800 - 5,200' },
    { month: '9月', avgPrice: 2200, budgetRange: 'NT$ 1,500 - 4,500' },
    { month: '10月 (紅葉旺季)', avgPrice: 3600, budgetRange: 'NT$ 2,400 - 7,200' },
    { month: '11月 (紅葉旺季)', avgPrice: 3800, budgetRange: 'NT$ 2,500 - 7,500' },
    { month: '12月', avgPrice: 2500, budgetRange: 'NT$ 1,700 - 5,000' }
  ],
  bangkok: [
    { month: '1月', avgPrice: 1500, budgetRange: 'NT$ 900 - 3,000' },
    { month: '2月', avgPrice: 1550, budgetRange: 'NT$ 950 - 3,100' },
    { month: '3月', avgPrice: 1400, budgetRange: 'NT$ 850 - 2,800' },
    { month: '4月 (潑水節)', avgPrice: 2000, budgetRange: 'NT$ 1,200 - 4,000' },
    { month: '5月', avgPrice: 1300, budgetRange: 'NT$ 800 - 2,600' },
    { month: '6月', avgPrice: 1200, budgetRange: 'NT$ 750 - 2,400' },
    { month: '7月 (暑假)', avgPrice: 1600, budgetRange: 'NT$ 1,000 - 3,200' },
    { month: '8月 (暑假)', avgPrice: 1650, budgetRange: 'NT$ 1,050 - 3,300' },
    { month: '9月', avgPrice: 1200, budgetRange: 'NT$ 750 - 2,400' },
    { month: '10月', avgPrice: 1300, budgetRange: 'NT$ 800 - 2,600' },
    { month: '11月 (涼季)', avgPrice: 1700, budgetRange: 'NT$ 1,100 - 3,400' },
    { month: '12月 (跨年旺季)', avgPrice: 2100, budgetRange: 'NT$ 1,300 - 4,200' }
  ]
};

export const mockFamilyTheaters = [
  {
    id: 'th-1',
    cityId: 'taipei',
    cityName: '台北 / 台中 / 高雄 / 臺東',
    title: '【巧連智巧虎大型舞台劇】2026 夏季巡迴《銀河怪盜的祕密》',
    organizer: '日商倍樂生 (巧連智) & 財團法人巧影文教基金會',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    performanceDate: '2026/08/15 - 2026/10/24 (每週六日巡迴)',
    earliestTicketDate: '2026/08/12 12:00 (年代售票獨家開賣)',
    ticketStatus: '年代售網熱賣中',
    ticketStatusType: 'warning',
    priceRange: 'NT$ 500 - 1,800',
    ageRecommendation: '2 - 8 歲 (巧虎經典唱跳)',
    venues: [
      '台北市政府親子劇場 (08/15 - 08/17)',
      '台中國家歌劇院 (09/05 - 09/07)',
      '高雄衛武營藝術文化中心 (10/22 - 10/24)',
      '臺東藝文中心演藝廳 (10/30 - 11/01)'
    ],
    highlights: '巧虎、琪琪、桃樂比經典登場！注意：巧虎舞台劇全台主要由「ERA 年代售票 (ticket.com.tw)」獨家售票與退換票！',
    ticketUrl: 'https://ticket.com.tw',
    ticketPlatform: 'ERA 年代售票系統 (ticket.com.tw)'
  },
  {
    id: 'th-2',
    cityId: 'taipei',
    cityName: '台北國家音樂廳 / 巡迴',
    title: '【MUZIKids x 古典名曲】2026 寶寶的交響樂 2《音樂魔法森林》',
    organizer: 'MUZIK Kids & 兩廳院文化生活',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    performanceDate: '2026/09/25 - 2026/09/27 (雙週末演)',
    earliestTicketDate: '2026/08/10 12:00 (OPENTIX 早鳥85折)',
    ticketStatus: 'OPENTIX 開賣',
    ticketStatusType: 'success',
    priceRange: 'NT$ 400 - 1,500',
    ageRecommendation: '0 - 6 歲 (寶寶首座音樂廳)',
    venues: [
      '台北國家音樂廳 (09/25 - 09/27)'
    ],
    highlights: 'OPENTIX 主推熱門節目！專為嬰幼兒感官啟蒙設計的互動古典音樂會，全場放鬆歡迎發聲與律動。',
    ticketUrl: 'https://www.opentix.life',
    ticketPlatform: 'OPENTIX 兩廳院文化生活'
  },
  {
    id: 'th-3',
    cityId: 'taichung',
    cityName: '台北 / 台中 / 高雄',
    title: '【風動室內樂團】《公主百分百》親子動漫交響音樂會',
    organizer: '風動室內樂團',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    performanceDate: '2026/09/10 - 2026/11/05',
    earliestTicketDate: '2026/08/15 12:00 (OPENTIX 獨家首售)',
    ticketStatus: 'OPENTIX 預售中',
    ticketStatusType: 'info',
    priceRange: 'NT$ 500 - 1,600',
    ageRecommendation: '3 - 12 歲',
    venues: [
      '台北國家戲劇院 (09/10 - 09/12)',
      '台中國家歌劇院中劇院 (10/02 - 10/04)'
    ],
    highlights: 'OPENTIX 兩廳院熱門榜第一名！現場管弦樂精緻編曲迪士尼與經典動漫公主主題曲。',
    ticketUrl: 'https://www.opentix.life',
    ticketPlatform: 'OPENTIX 兩廳院文化生活'
  },
  {
    id: 'th-4',
    cityId: 'taipei',
    cityName: '全台巡迴',
    title: '【紙風車劇團】《368鄉鎮親子藝術工程 - 狂熱奇幻島》',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    performanceDate: '2026/08/20 - 2026/11/30',
    earliestTicketDate: '2026/08/12 09:00 (免費索票/現場入場)',
    ticketStatus: '免費索票',
    ticketStatusType: 'success',
    priceRange: '免費入場 (敬請提早入場)',
    ageRecommendation: '0 - 99 歲 (全年齡戶外大劇)',
    organizer: '紙風車文教基金會',
    venues: [
      '台北市市民廣場 (08/20)',
      '宜蘭羅東運動公園 (09/12)',
      '台中文心森林公園 (10/18)'
    ],
    highlights: '巨型空飄偶與氣球巨龍現場巡遊，震撼戶外舞台光影視覺！現場自由入場。',
    ticketUrl: 'https://www.paperwindmill.com.tw',
    ticketPlatform: '紙風車官方網站'
  },
  {
    id: 'th-5',
    cityId: 'taipei',
    cityName: '台北小巨蛋',
    title: '【迪士尼冰上世界 Disney On Ice 2026】亞洲巡迴公演《冰雪奇緣與魔法滿屋》',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    performanceDate: '2026/10/10 - 2026/10/18',
    earliestTicketDate: '2026/08/20 12:00 (寬宏售票優先搶票)',
    ticketStatus: '熱烈預告',
    ticketStatusType: 'info',
    priceRange: 'NT$ 800 - 3,800',
    ageRecommendation: '3 - 15 歲 (全家夢幻冰上饗宴)',
    organizer: 'Feld Entertainment / 寬宏藝術',
    venues: [
      '台北小巨蛋 (10/10 - 10/18 雙週末演出)'
    ],
    highlights: '米奇米妮引領 Elsa、Anna 及 Mirabel 於溜冰場上展現高難度花式溜冰與絕美冰上特技！',
    ticketUrl: 'https://kham.com.tw',
    ticketPlatform: 'Kham 寬宏售票系統'
  }
];
