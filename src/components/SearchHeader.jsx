import React from 'react';
import { Search, RefreshCw, MapPin, Calendar, Users, Home, DollarSign, ArrowUpDown, Sparkles, Bot, Zap, ShieldCheck } from 'lucide-react';

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
    } catch (err) { }
  };

  const handleCheckInChange = (newCheckIn) => {
    setCheckInDate(newCheckIn);
    try {
      const nights = calculateNights();
      const target = new Date(newCheckIn);
      target.setDate(target.getDate() + nights);
      setCheckOutDate(target.toISOString().split('T')[0]);
    } catch (err) { }
  };

  const inputControlStyle = {
    width: '100%',
    height: '46px',
    padding: '0 14px',
    borderRadius: '12px',
    background: 'rgba(15, 23, 42, 0.95)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    outline: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxSizing: 'border-box',
    transition: 'all 0.25s ease'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.84rem',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: '700'
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto 28px auto', padding: '0 16px' }}>
      <div className="glass-panel-glow glass-panel" style={{
        padding: '28px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.85) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>

        {/* Top Hero Banner & Mode Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={14} /> Apify / RapidAPI 房價 Scraper 模式
              </span>
              <span className="badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Bot size={14} /> LINE 機器人關鍵字房價查詢
              </span>
            </div>
            
            <h1 className="font-display" style={{ fontSize: '1.9rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.5px' }}>
              <MapPin color="var(--primary)" size={28} />
              {activeTab === 'stays' && '平價住宿全網比價引擎'}
              {activeTab === 'packages' && '精選超值包套行程'}
              {activeTab === 'family' && '最新親子景點與主題展覽'}
              {activeTab === 'theaters' && '熱門兒童劇團近半年公演巡迴'}
              {activeTab === 'trends' && '住宿價格走勢與預算趨勢分析'}
            </h1>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginTop: '6px' }}>
              {activeTab === 'theaters'
                ? '即時爬取全台親子劇團巡迴公演時程，掌握最早搶票時間'
                : '即時透過 Scraper Actor 對比 Agoda, Booking.com, Trip.com 等多平台房價與獨家優惠'}
            </p>
          </div>

          <button
            onClick={onTriggerScrape}
            disabled={isScraping}
            className="btn-primary"
            style={{ padding: '12px 26px', fontSize: '1.02rem', borderRadius: '14px' }}
          >
            <RefreshCw size={20} className={isScraping ? 'animate-spin' : ''} style={{ animation: isScraping ? 'spin 1s linear infinite' : 'none' }} />
            {isScraping ? 'Scraper 抓取中...' : '即時抓取最新房價 (Scrape Now)'}
          </button>
        </div>

        {/* Accommodation Filter Grid (Stays & Trends Tabs) */}
        {(activeTab !== 'family' && activeTab !== 'theaters' && activeTab !== 'packages') && (
          <div style={{
            background: 'rgba(7, 10, 19, 0.75)',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '20px'
          }}>
            {/* ROW 1: Destination, Dates & Nights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '18px',
              marginBottom: '20px'
            }}>

              {/* Row 1 Col 1: Destination Keyword Input */}
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>
                  <MapPin size={16} color="var(--primary)" /> 目的地 / 城市關鍵字
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} color="var(--primary)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      list="city-suggestions"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      placeholder="輸入：沖繩、宜蘭、飯店..."
                      style={{
                        ...inputControlStyle,
                        paddingLeft: '40px',
                        borderColor: 'var(--border-glass-glow)',
                        fontWeight: '700'
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
                    style={{ padding: '0 20px', height: '46px', borderRadius: '12px', fontSize: '0.92rem' }}
                  >
                    搜尋
                  </button>
                </div>
              </form>

              {/* Row 1 Col 2: Check-In Date */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>
                  <Calendar size={16} color="var(--primary)" /> 入住日期 (Check-In)
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
                  <Calendar size={16} color="var(--primary)" /> 退房日期 (Check-Out)
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  style={inputControlStyle}
                />
              </div>

              {/* Row 1 Col 4: Stay Duration Selector */}
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
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  <option value={1} style={{ background: '#0f172a', color: '#fff' }}>1 晚</option>
                  <option value={2} style={{ background: '#0f172a', color: '#fff' }}>2 晚</option>
                  <option value={3} style={{ background: '#0f172a', color: '#fff' }}>3 晚</option>
                  <option value={4} style={{ background: '#0f172a', color: '#fff' }}>4 晚</option>
                  <option value={5} style={{ background: '#0f172a', color: '#fff' }}>5 晚</option>
                  <option value={7} style={{ background: '#0f172a', color: '#fff' }}>7 晚 (1週)</option>
                </select>
              </div>

            </div>

            {/* ROW 2: Guests, Property Type, Budget Slider & Sorting */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '18px'
            }}>

              {/* Row 2 Col 1: Guests Count */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>
                  <Users size={16} color="var(--primary)" /> 人數設定 (大人 / 兒童)
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

              {/* Row 2 Col 2: Property Type */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>
                  <Home size={16} color="var(--primary)" /> 住宿類型篩選
                </label>
                <select
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  style={inputControlStyle}
                >
                  <option value="all" style={{ background: '#0f172a' }}>全部分類 (飯店 / 親子 / 民宿)</option>
                  <option value="Hotel" style={{ background: '#0f172a' }}>平價飯店 (Hotel)</option>
                  <option value="Family Hotel" style={{ background: '#0f172a' }}>親子主題飯店 (Family Hotel)</option>
                  <option value="B&B" style={{ background: '#0f172a' }}>特色包棟民宿 (B&B)</option>
                </select>
              </div>

              {/* Row 2 Col 3: Budget Range Slider */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>
                    <DollarSign size={16} color="var(--primary)" /> 最高預算上限
                  </label>
                  <span style={{ color: 'var(--primary-light)', fontWeight: '800', fontSize: '0.9rem' }}>
                    NT$ {maxPrice.toLocaleString()} /晚
                  </span>
                </div>
                <div style={{ height: '46px', display: 'flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.95)', padding: '0 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
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

              {/* Row 2 Col 4: Sorting Mode */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>
                  <ArrowUpDown size={16} color="var(--primary)" /> 排序方式
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={inputControlStyle}
                >
                  <option value="price_asc" style={{ background: '#0f172a' }}>全網最低房價優先 (價格由低到高)</option>
                  <option value="price_desc" style={{ background: '#0f172a' }}>價格由高到低</option>
                  <option value="rating_desc" style={{ background: '#0f172a' }}>旅客滿意評分最高優先</option>
                </select>
              </div>

            </div>

          </div>
        )}

        {/* Attractions & Package Tours Single Search Box */}
        {(activeTab === 'family' || activeTab === 'packages') && (
          <div style={{
            background: 'rgba(7, 10, 19, 0.75)',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '20px'
          }}>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '640px' }}>
              <label style={labelStyle}>
                <MapPin size={16} color="var(--primary)" /> 目的地 / 景點關鍵字
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={18} color="var(--primary)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                  <input
                    type="text"
                    list="city-suggestions"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    placeholder="輸入：台中、宜蘭、遊樂園..."
                    style={{
                      ...inputControlStyle,
                      paddingLeft: '40px',
                      borderColor: 'var(--border-glass-glow)',
                      fontWeight: '700'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0 26px', height: '46px', borderRadius: '12px', fontSize: '0.95rem' }}
                >
                  搜尋
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Popular Cities Pills Bar */}
        {activeTab !== 'theaters' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={15} color="var(--primary)" /> 熱門觀光城市快捷：
            </span>
            {cities
              .filter(city => ['taipei', 'newtaipei', 'taoyuan', 'taichung', 'tainan', 'kaohsiung', 'yilan', 'okinawa'].includes(city.id))
              .map((city) => {
                const isSelected = selectedCity.trim() === city.name.split(' ')[0] || selectedCity.trim() === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.name.split(' ')[0])}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)' : 'rgba(255, 255, 255, 0.04)',
                      color: isSelected ? '#34d399' : 'var(--text-muted)',
                      border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '999px',
                      padding: '5px 16px',
                      fontSize: '0.86rem',
                      fontWeight: isSelected ? '800' : '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 14px rgba(16, 185, 129, 0.3)' : 'none'
                    }}
                  >
                    {city.name.split(' ')[0]}
                  </button>
                );
              })}
          </div>
        )}

      </div>
    </div>
  );
}
