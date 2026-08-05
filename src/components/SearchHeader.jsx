import React from 'react';
import { Search, MapPin, RefreshCw, Sparkles } from 'lucide-react';

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
  const quickCities = [
    { name: '沖繩', value: '沖繩' },
    { name: '台北', value: '台北' },
    { name: '東京', value: '東京' },
    { name: '京都', value: '京都' },
    { name: '首爾', value: '首爾' },
    { name: '台中', value: '台中' },
    { name: '曼谷', value: '曼谷' },
    { name: '宜蘭', value: '宜蘭' },
    { name: '大阪', value: '大阪' }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onTriggerScrape();
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)',
        marginBottom: '16px'
      }}>
        
        {/* Destination City Input */}
        <form onSubmit={handleFormSubmit} style={{ gridColumn: 'span 1' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
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

        {/* Unified Dates & Stay Duration Selector (Check-In, Nights, Check-Out) */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
            📅 住宿日期與天數 (入住 / 晚數 / 退房)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 1fr', gap: '8px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>入住日期</span>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => {
                  const newCheckIn = e.target.value;
                  setCheckInDate(newCheckIn);
                  try {
                    const d1 = new Date(checkInDate);
                    const d2 = new Date(checkOutDate);
                    const nights = Math.max(1, Math.round((d2 - d1) / (1000 * 3600 * 24)));
                    const target = new Date(newCheckIn);
                    target.setDate(target.getDate() + (nights || 2));
                    setCheckOutDate(target.toISOString().split('T')[0]);
                  } catch (err) {}
                }}
                style={{
                  width: '100%',
                  padding: '8px 10px',
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
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: '700', display: 'block', marginBottom: '2px', textAlign: 'center' }}>
                住宿天數
              </span>
              <select
                value={(() => {
                  try {
                    const d1 = new Date(checkInDate);
                    const d2 = new Date(checkOutDate);
                    const diff = Math.round((d2 - d1) / (1000 * 3600 * 24));
                    return diff > 0 ? diff : 1;
                  } catch { return 2; }
                })()}
                onChange={(e) => {
                  const nights = Number(e.target.value);
                  try {
                    const target = new Date(checkInDate);
                    target.setDate(target.getDate() + nights);
                    setCheckOutDate(target.toISOString().split('T')[0]);
                  } catch (err) {}
                }}
                style={{
                  width: '100%',
                  padding: '8px 4px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
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

            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>退房日期</span>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
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
        </div>

        {/* Adults & Children Count */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
            👨‍👩‍👧 人數設定 (大人 / 小孩)
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              value={adultsCount}
              onChange={(e) => setAdultsCount(Number(e.target.value))}
              style={{
                flex: 1,
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
                flex: 1,
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

        {/* Accommodation Type Filter */}
        {activeTab === 'stays' && (
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
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
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              <option value="all">所有類型 (飯店/親子/民宿)</option>
              <option value="Hotel">平價飯店 (Hotel)</option>
              <option value="Family Hotel">親子旅館 (Family Hotel)</option>
              <option value="B&B">特色民宿 (B&B)</option>
            </select>
          </div>
        )}

        {/* Max Budget Slider */}
        {activeTab === 'stays' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
              <span>最高預算上限</span>
              <span style={{ color: 'var(--primary)', fontWeight: '700' }}>NT$ {maxPrice.toLocaleString()} /晚</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer', marginTop: '6px' }}
            />
          </div>
        )}

        {/* Sort Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
            排序方式
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#ffffff',
              border: '1px solid var(--border-glass)',
              outline: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            <option value="price_asc">價格由低到高 (全網最低價優先)</option>
            <option value="price_desc">價格由高到低</option>
            <option value="rating_desc">評分滿意度最高優先</option>
          </select>
        </div>

      </div>

      {/* Quick City Pills Selection Strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={14} color="var(--primary)" /> 熱門快速選擇:
        </span>
        {quickCities.map(qc => (
          <button
            key={qc.value}
            onClick={() => {
              setSelectedCity(qc.value);
            }}
            style={{
              background: selectedCity === qc.value ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: selectedCity === qc.value ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
              color: selectedCity === qc.value ? '#34d399' : 'var(--text-muted)',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontWeight: selectedCity === qc.value ? '700' : '400',
              transition: 'all 0.2s ease'
            }}
          >
            {qc.name}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
