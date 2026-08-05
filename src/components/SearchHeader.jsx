import React from 'react';
import { Search, RefreshCw, MapPin, Calendar, Users, Home, DollarSign, ArrowUpDown } from 'lucide-react';

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

  const inputControlStyle = {
    width: '100%',
    height: '42px',
    padding: '0 12px',
    borderRadius: '10px',
    background: 'rgba(30, 41, 59, 0.9)',
    color: '#ffffff',
    border: '1px solid var(--border-glass)',
    outline: 'none',
    fontSize: '0.88rem',
    fontWeight: '500',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    marginBottom: '6px',
    fontWeight: '600'
  };

  return (
    <div className="glass-panel-glow glass-panel" style={{ margin: '0 auto 24px auto', maxWidth: '1280px', padding: '24px' }}>
      
      {/* Top Banner Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
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
          style={{ padding: '12px 24px', fontSize: '1rem', borderRadius: '10px' }}
        >
          <RefreshCw size={18} className={isScraping ? 'animate-spin' : ''} style={{ animation: isScraping ? 'spin 1s linear infinite' : 'none' }} />
          {isScraping ? '爬蟲抓取中...' : '即時重新爬取 (Scrape Now)'}
        </button>
      </div>

      {/* Symmetrical 4-Column x 2-Row Filter Grid */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.65)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid var(--border-glass)',
        marginBottom: '20px'
      }}>
        
        {/* ROW 1: Location & Date Controls (4 Equal Columns) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '16px'
        }}>
          
          {/* Row 1 Col 1: Destination City */}
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>
              <MapPin size={15} color="var(--primary)" /> 目的地 / 城市
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} color="var(--primary)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="text"
                  list="city-suggestions"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="輸入：沖繩、宜蘭..."
                  style={{
                    ...inputControlStyle,
                    paddingLeft: '36px',
                    border: '1px solid var(--border-glass-glow)',
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
                style={{ padding: '0 16px', height: '42px', borderRadius: '10px', fontSize: '0.85rem' }}
              >
                搜尋
              </button>
            </div>
          </form>

          {/* Row 1 Col 2: Check-In Date */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>
              <Calendar size={15} color="var(--primary)" /> 入住日期 (Check-In)
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => handleCheckInChange(e.target.value)}
              style={inputControlStyle}
            />
          </div>

          {/* Row 1 Col 3: Check-Out Date */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>
              <Calendar size={15} color="var(--primary)" /> 退房日期 (Check-Out)
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              style={inputControlStyle}
            />
          </div>

          {/* Row 1 Col 4: Stay Duration (Nights) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ ...labelStyle, color: '#34d399' }}>
              🌙 住宿天數 (晚數)
            </label>
            <select
              value={calculateNights()}
              onChange={(e) => handleNightsChange(Number(e.target.value))}
              style={{
                ...inputControlStyle,
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid var(--primary)',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <option value={1} style={{ background: '#0f172a', color: '#fff' }}>1 晚</option>
              <option value={2} style={{ background: '#0f172a', color: '#fff' }}>2 晚</option>
              <option value={3} style={{ background: '#0f172a', color: '#fff' }}>3 晚</option>
              <option value={4} style={{ background: '#0f172a', color: '#fff' }}>4 晚</option>
              <option value={5} style={{ background: '#0f172a', color: '#fff' }}>5 晚</option>
              <option value={6} style={{ background: '#0f172a', color: '#fff' }}>6 晚</option>
              <option value={7} style={{ background: '#0f172a', color: '#fff' }}>7 晚 (1週)</option>
              <option value={10} style={{ background: '#0f172a', color: '#fff' }}>10 晚</option>
              <option value={14} style={{ background: '#0f172a', color: '#fff' }}>14 晚 (2週)</option>
            </select>
          </div>

        </div>

        {/* ROW 2: Guests, Type, Budget & Sorting (4 Equal Columns) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          
          {/* Row 2 Col 1: Guests Count (Adults & Children) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>
              <Users size={15} color="var(--primary)" /> 人數設定 (大人 / 小孩)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={adultsCount}
                onChange={(e) => setAdultsCount(Number(e.target.value))}
                style={{ ...inputControlStyle, flex: 1 }}
              >
                <option value={1} style={{ background: '#0f172a' }}>1位 大人</option>
                <option value={2} style={{ background: '#0f172a' }}>2位 大人</option>
                <option value={3} style={{ background: '#0f172a' }}>3位 大人</option>
                <option value={4} style={{ background: '#0f172a' }}>4位 大人</option>
                <option value={5} style={{ background: '#0f172a' }}>5位+ 大人</option>
              </select>

              <select
                value={childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                style={{ ...inputControlStyle, flex: 1 }}
              >
                <option value={0} style={{ background: '#0f172a' }}>0位 兒童</option>
                <option value={1} style={{ background: '#0f172a' }}>1位 兒童</option>
                <option value={2} style={{ background: '#0f172a' }}>2位 兒童</option>
                <option value={3} style={{ background: '#0f172a' }}>3位 兒童</option>
              </select>
            </div>
          </div>

          {/* Row 2 Col 2: Accommodation Type */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>
              <Home size={15} color="var(--primary)" /> 住宿類型
            </label>
            <select
              value={stayType}
              onChange={(e) => setStayType(e.target.value)}
              style={inputControlStyle}
            >
              <option value="all" style={{ background: '#0f172a' }}>所有類型 (飯店/親子/民宿)</option>
              <option value="Hotel" style={{ background: '#0f172a' }}>平價飯店 (Hotel)</option>
              <option value="Family Hotel" style={{ background: '#0f172a' }}>親子旅館 (Family Hotel)</option>
              <option value="B&B" style={{ background: '#0f172a' }}>特色民宿 (B&B)</option>
            </select>
          </div>

          {/* Row 2 Col 3: Max Budget Slider */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>
                <DollarSign size={15} color="var(--primary)" /> 最高預算上限
              </label>
              <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem' }}>
                NT$ {maxPrice.toLocaleString()} /晚
              </span>
            </div>
            <div style={{ height: '42px', display: 'flex', alignItems: 'center', background: 'rgba(30, 41, 59, 0.9)', padding: '0 14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Row 2 Col 4: Sort Selector */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>
              <ArrowUpDown size={15} color="var(--primary)" /> 排序方式
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={inputControlStyle}
            >
              <option value="price_asc" style={{ background: '#0f172a' }}>價格由低到高 (全網最低價優先)</option>
              <option value="price_desc" style={{ background: '#0f172a' }}>價格由高到低</option>
              <option value="rating_desc" style={{ background: '#0f172a' }}>評分滿意度最高優先</option>
            </select>
          </div>

        </div>

      </div>

      {/* Row 3: Popular Quick City Selection Bar */}
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

    </div>
  );
}
