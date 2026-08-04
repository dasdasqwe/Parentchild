export const mockCities = [
  { id: 'taipei', name: '台北 (Taipei)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台北', 'taipei', '臺北', '大同區', '萬華區', '信義區', '中山區'] },
  { id: 'yilan', name: '宜蘭 (Yilan)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['宜蘭', 'yilan', '礁溪', '羅東', '頭城', '冬山'] },
  { id: 'taichung', name: '台中 (Taichung)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台中', 'taichung', '臺中', '西屯', '逢甲', '中區'] },
  { id: 'kaohsiung', name: '高雄 (Kaohsiung)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['高雄', 'kaohsiung', '新興區', '鹽埕區', '左營'] },
  { id: 'tainan', name: '台南 (Tainan)', country: '台灣', currency: 'TWD', symbol: 'NT$', aliases: ['台南', 'tainan', '臺南', '中西區', '安平'] },
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
  {
    id: 'fam-yil-1',
    cityId: 'yilan',
    cityName: '宜蘭',
    name: '宜蘭斑比山丘 (Bambi Land 偽奈良親近小鹿樂園)',
    category: '戶外動物親近園區',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-12歲 (全家療癒體驗)',
    rating: 4.9,
    ticketPrice: '全票 NT$200 (附贈紅蘿蔔餵食胡蘿蔔杯)',
    features: ['親近水豚與梅花鹿', '平坦推車步道', '美美子霜淇淋', '親子洗手間'],
    description: '宜蘭最火爆的親子動物樂園！近距離餵食溫馴梅花鹿與萌萌水豚君，園區設有綠油油草地與無障礙坡道。',
    nearbyStays: ['礁溪溫泉親子主題飯店 (車程20分)', '冬山河風情民宿 (車程10分)'],
    highlights: '小朋友能親手喂食水豚與小鹿，園內點心精緻優雅。'
  },
  {
    id: 'fam-oki-1',
    cityId: 'okinawa',
    cityName: '沖繩',
    name: '沖繩美美麗海水族館 & 鯨鯊海豚劇場 (Churaumi Aquarium)',
    category: '海洋水族館 / 自然公園',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    ageRecommendation: '0-15歲 (全家必訪第一名)',
    rating: 4.9,
    ticketPrice: '約 JPY 2,180 (6歲以下免費)',
    features: ['黑潮之海巨型鯨鯊池', '免費海豚表演', '無障礙坡道', '五星育嬰室', '推車免費租借'],
    description: '亞洲最雄偉的水族館之一！觀賞巨大鯨鯊與鬼蝠魟在「黑潮之海」水槽游動。',
    nearbyStays: ['沖繩國際通親子主題渡假旅館 (車程直達)'],
    highlights: '推車全館暢行無阻。'
  }
];

export const mockPriceTrends = {
  yilan: [
    { month: '1月', avgPrice: 1580, budgetRange: 'NT$ 1,200 - 2,800' },
    { month: '2月', avgPrice: 1980, budgetRange: 'NT$ 1,500 - 3,500' },
    { month: '3月', avgPrice: 1650, budgetRange: 'NT$ 1,300 - 2,800' },
    { month: '4月', avgPrice: 1720, budgetRange: 'NT$ 1,350 - 2,900' },
    { month: '5月', avgPrice: 1600, budgetRange: 'NT$ 1,250 - 2,700' },
    { month: '6月 (童玩節前夕)', avgPrice: 2150, budgetRange: 'NT$ 1,600 - 3,800' }
  ],
  okinawa: [
    { month: '1月', avgPrice: 1350, budgetRange: 'NT$ 1,200 - 2,500' },
    { month: '2月', avgPrice: 1400, budgetRange: 'NT$ 1,300 - 2,800' },
    { month: '3月', avgPrice: 1600, budgetRange: 'NT$ 1,400 - 3,000' },
    { month: '4月', avgPrice: 1750, budgetRange: 'NT$ 1,500 - 3,200' },
    { month: '5月 (海灘開放)', avgPrice: 1900, budgetRange: 'NT$ 1,600 - 3,500' },
    { month: '6月 (夏日熱浪)', avgPrice: 2250, budgetRange: 'NT$ 1,800 - 4,200' }
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
