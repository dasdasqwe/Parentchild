import React from 'react';
import { Search, RefreshCw, MapPin, Calendar, Users, Home, DollarSign, ArrowUpDown, Sparkles, Bot, Zap, Filter, LayoutGrid, List } from 'lucide-react';

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
    height: '42px',
    padding: '0 12px',
    borderRadius: '10px',
    background: '#ffffff',
    color: '#0f172a',
    border: '1px solid rgba(15, 23, 42, 0.12)',
    outline: 'none',
    fontSize: '0.86rem',
    fontWeight: '600',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      
      {/* Bright Command Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)'
      }}>

        {/* Global Command Search Bar */}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="#059669" style={{ position: 'absolute', left: '14px', top: '12px' }} />
            <input
              type="text"
              list="workspace-city-suggestions"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              placeholder="輸入搜尋關鍵字 (例：宜蘭 3000、沖繩 飯店、花蓮 民宿)..."
              style={{
                ...inputControlStyle,
                width: '100%',
                paddingLeft: '40px',
                borderColor: 'rgba(5, 150, 105, 0.4)',
                fontSize: '0.92rem',
                fontWeight: '700'
              }}
            />
            <datalist id="workspace-city-suggestions">
              <option value="宜蘭">宜蘭 (Yilan)</option>
              <option value="沖繩">沖繩 (Okinawa)</option>
              <option value="台北">台北 (Taipei)</option>
              <option value="台中">台中 (Taichung)</option>
              <option value="花蓮">花蓮 (Hualien)</option>
              <option value="高雄">高雄 (Kaohsiung)</option>
              <option value="東京">東京 (Tokyo)</option>
            </datalist>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0 22px', height: '42px', borderRadius: '10px', fontSize: '0.9rem' }}
          >
            即時搜尋
          </button>
        </form>

        {/* Quick Date Range & Guests Controls */}
        {activeTab === 'stays' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Check-In */}
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => handleCheckInChange(e.target.value)}
              style={inputControlStyle}
              title="入住日期"
            />
            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>~</span>
            {/* Check-Out */}
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              style={inputControlStyle}
              title="退房日期"
            />

            {/* Nights Selector */}
            <select
              value={calculateNights()}
              onChange={(e) => handleNightsChange(Number(e.target.value))}
              style={{
                ...inputControlStyle,
                background: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                border: '1px solid #059669',
                fontWeight: '800'
              }}
            >
              <option value={1} style={{ background: '#fff', color: '#0f172a' }}>1晚</option>
              <option value={2} style={{ background: '#fff', color: '#0f172a' }}>2晚</option>
              <option value={3} style={{ background: '#fff', color: '#0f172a' }}>3晚</option>
              <option value={5} style={{ background: '#fff', color: '#0f172a' }}>5晚</option>
              <option value={7} style={{ background: '#fff', color: '#0f172a' }}>7晚</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={inputControlStyle}
            >
              <option value="price_asc" style={{ background: '#fff' }}>💰 價格低到高 (最低價優先)</option>
              <option value="price_desc" style={{ background: '#fff' }}>💰 價格高到低</option>
              <option value="rating_desc" style={{ background: '#fff' }}>⭐ 滿意評分最高</option>
            </select>

            {/* Scrape Refresh Trigger Button */}
            <button
              onClick={onTriggerScrape}
              disabled={isScraping}
              className="btn-primary"
              style={{ height: '42px', padding: '0 16px', borderRadius: '10px', fontSize: '0.86rem' }}
            >
              <RefreshCw size={16} className={isScraping ? 'animate-spin' : ''} style={{ animation: isScraping ? 'spin 1s linear infinite' : 'none' }} />
              <span>{isScraping ? '爬取中...' : '重新抓取'}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
