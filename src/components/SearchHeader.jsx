import React from 'react';
import { Search, RefreshCw, MapPin } from 'lucide-react';

export default function SearchHeader({
  cities,
  selectedCity,
  setSelectedCity,
  stayType,
  setStayType,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adultsCount,
  setAdultsCount,
  childrenCount,
  setChildrenCount,
  onTriggerScrape,
  isScraping,
  activeTab
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onTriggerScrape();
  };

  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diff = Math.round((d2 - d1) / (1000 * 3600 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 2;
    }
  };

  const handleNightsChange = (nights) => {
    try {
      const target = new Date(checkInDate);
      target.setDate(target.getDate() + nights);
      setCheckOutDate(target.toISOString().split('T')[0]);
    } catch (err) {}
  };

  const handleCheckInChange = (newCheckIn) => {
    setCheckInDate(newCheckIn);
    try {
      const nights = calculateNights();
      const target = new Date(newCheckIn);
      target.setDate(target.getDate() + nights);
      setCheckOutDate(target.toISOString().split('T')[0]);
    } catch (err) {}
  };

  return (
    <div className="glass-panel-glow glass-panel" style={{ margin: '0 auto 24px auto', maxWidth: '1280px', padding: '24px' }}>
      
      {/* Top Banner Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin color="var(--primary)" size={24} />
            {activeTab === 'stays' && '平價住宿比價與全網最低價抓取'}
            {activeTab === 'packages' && '超值包套行程 (住宿+門票+交通接送)'}
            {activeTab === 'family' && '最新熱門親子景點與周邊平價住宿'}
            {activeTab === 'trends' && '全網住宿價格走勢與預算分析'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            即時抓取 Agoda, Booking.com, Trip.com, Klook 等多平台公開最新價格數據
          </p>
        </div>

        <button
          onClick={onTriggerScrape}
          disabled={isScraping}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '1rem' }}
        >
          <RefreshCw size={18} className={isScraping ? 'animate-spin' : ''} style={{ animation: isScraping ? 'spin 1s linear infinite' : 'none' }} />
          {isScraping ? '爬蟲抓取中...' : '即時重新爬取 (Scrape Now)'}
        </button>
      </div>

      {/* Filter Form Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        background: 'rgba(15, 23, 42, 0.65)',
        padding: '18px',
        borderRadius: '14px',
        border: '1px solid var(--border-glass)',
        marginBottom: '16px'
      }}>
        
        {/* Col 1: Destination City Input */}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
            目的地 / 城市
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} color="var(--primary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                list="city-suggestions"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                placeholder="輸入：沖繩、宜蘭..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '8px',
                  background: 'rgba(30, 41, 59, 0.9)',
                  color: '#ffffff',
                  border: '1px solid var(--border-glass-glow)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              />
              <datalist id="city-suggestions">
                <option value="沖繩">沖繩 (Okinawa)</option>
                <option value="台北">台北 (Taipei)</option>
                <option value="東京">東京 (Tokyo)</option>
                <option value="京都">京都 (Kyoto)</option>
                <option value="首爾">首爾 (Seoul)</option>
                <option value="台中">台中 (Taichung)</option>
                <option value="宜蘭">宜蘭 (Yilan)</option>
                <option value="大阪">大阪 (Osaka)</option>
                <option value="曼谷">曼谷 (Bangkok)</option>
              </datalist>
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              搜尋
            </button>
          </div>
        </form>

        {/* Col 2: Dates (Check-Out directly underneath Check-In aligned, Nights on right) */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
            📅 住宿日期與天數
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: '10px', alignItems: 'center' }}>
            
            {/* Stacked Check-In and Check-Out aligned */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>入住日期</span>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    background: 'rgba(30, 41, 59, 0.9)',
                    color: '#ffffff',
                    border: '1px solid var(--border-glass)',
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>退房日期</span>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    background: 'rgba(30, 41, 59, 0.9)',
                    color: '#ffffff',
                    border: '1px solid var(--border-glass)',
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                />
              </div>
            </div>

            {/* Stay Duration Selector */}
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.08)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: '700', display: 'block', marginBottom: '4px', textAlign: 'center' }}>
                住宿天數
              </span>
              <select
                value={calculateNights()}
                onChange={(e) => handleNightsChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 2px',
                  borderRadius: '6px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  border: '1px solid var(--primary)',
                  outline: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <option value={1}>1 晚</option>
                <option value={2}>2 晚</option>
                <option value={3}>3 晚</option>
                <option value={4}>4 晚</option>
                <option value={5}>5 晚</option>
                <option value={6}>6 晚</option>
                <option value={7}>7 晚 (1週)</option>
                <option value={10}>10 晚</option>
                <option value={14}>14 晚 (2週)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Col 3: Adults & Children Count */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
            👨‍👩‍👧 人數設定 (大人 / 小孩)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <select
              value={adultsCount}
              onChange={(e) => setAdultsCount(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '9px 10px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.9)',
                color: '#ffffff',
                border: '1px solid var(--border-glass)',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            >
              <option value={1}>1位 大人</option>
              <option value={2}>2位 大人</option>
              <option value={3}>3位 大人</option>
              <option value={4}>4位 大人</option>
              <option value={5}>5位+ 大人</option>
            </select>

            <select
              value={childrenCount}
              onChange={(e) => setChildrenCount(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '9px 10px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.9)',
                color: '#ffffff',
                border: '1px solid var(--border-glass)',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            >
              <option value={0}>0位 兒童</option>
              <option value={1}>1位 兒童</option>
              <option value={2}>2位 兒童</option>
              <option value={3}>3位 兒童</option>
            </select>
          </div>
        </div>

        {/* Col 4: Accommodation Type */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
            住宿類型
          </label>
          <select
            value={stayType}
            onChange={(e) => setStayType(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#ffffff',
              border: '1px solid var(--border-glass)',
              outline: 'none',
              fontSize: '0.85rem',
              fontWeight: '500'
            }}
          >
            <option value="all">所有類型 (飯店/親子/民宿)</option>
            <option value="Hotel">平價飯店 (Hotel)</option>
            <option value="Family Hotel">親子旅館 (Family Hotel)</option>
            <option value="B&B">特色民宿 (B&B)</option>
          </select>
        </div>

      </div>

      {/* Bottom Bar: Popular City Quick Pills (Left) + Budget Cap & Sort Selector (Far Right) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Popular City Hot Pills (Left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            ✨ 熱門快速選擇：
          </span>
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              style={{
                background: selectedCity === city.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCity === city.id ? '#34d399' : 'var(--text-muted)',
                border: selectedCity === city.id ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '0.85rem',
                fontWeight: selectedCity === city.id ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {city.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Far Right: Budget Cap Slider & Sort Order Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Max Budget Slider */}
          {activeTab === 'stays' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.7)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>最高預算:</span>
              <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>NT$ {maxPrice.toLocaleString()}</span>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '110px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          )}

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.7)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>排序方式:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: 'none',
                outline: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <option value="price_asc" style={{ background: '#0f172a' }}>價格由低到高 (全網最低價優先)</option>
              <option value="price_desc" style={{ background: '#0f172a' }}>價格由高到低</option>
              <option value="rating_desc" style={{ background: '#0f172a' }}>評分滿意度最高優先</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  );
}
