import React from 'react';
import { Search, ArrowUpDown, Calendar, DollarSign, SlidersHorizontal, RefreshCw, Globe, Users } from 'lucide-react';

export default function SearchPanel({
  destination,
  setDestination,
  sortBy,
  setSortBy,
  maxPrice,
  setMaxPrice,
  stayType,
  setStayType,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adults = 2,
  setAdults,
  childrenCount = 2,
  setChildrenCount,
  onSearch,
  isSearching
}) {
  const quickDestinations = [
    { label: '台北', value: '台北' },
    { label: '宜蘭', value: '宜蘭' },
    { label: '台中', value: '台中' },
    { label: '花蓮', value: '花蓮' },
    { label: '沖繩 🇯🇵', value: '沖繩' },
    { label: '東京 🇯🇵', value: '東京' },
    { label: '首爾 🇰🇷', value: '首爾' },
    { label: '曼谷 🇹🇭', value: '曼谷' }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const inputStyle = {
    height: '44px',
    padding: '0 14px',
    borderRadius: '12px',
    background: '#ffffff',
    color: '#0f172a',
    border: '1px solid rgba(15, 23, 42, 0.12)',
    outline: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid rgba(15, 23, 42, 0.08)',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.04)',
      padding: '24px',
      marginBottom: '28px'
    }}>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Main Search Row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Destination Input */}
          <div style={{ position: 'relative', flex: 2, minWidth: '260px' }}>
            <Search size={18} color="#059669" style={{ position: 'absolute', left: '14px', top: '13px' }} />
            <input
              type="text"
              list="global-destinations-list"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="搜尋國內外目的地飯店 (例如：沖繩, 東京, 宜蘭, 台北, 巴黎)..."
              style={{
                ...inputStyle,
                width: '100%',
                paddingLeft: '42px',
                borderColor: 'rgba(5, 150, 105, 0.3)',
                fontSize: '0.95rem',
                fontWeight: '700'
              }}
            />
            <datalist id="global-destinations-list">
              <option value="宜蘭">宜蘭 (Yilan)</option>
              <option value="台北">台北 (Taipei)</option>
              <option value="台中">台中 (Taichung)</option>
              <option value="花蓮">花蓮 (Hualien)</option>
              <option value="高雄">高雄 (Kaohsiung)</option>
              <option value="沖繩">沖繩 (Okinawa, Japan)</option>
              <option value="東京">東京 (Tokyo, Japan)</option>
              <option value="首爾">首爾 (Seoul, Korea)</option>
              <option value="曼谷">曼谷 (Bangkok, Thailand)</option>
              <option value="巴黎">巴黎 (Paris, France)</option>
              <option value="紐約">紐約 (New York, USA)</option>
            </datalist>
          </div>

          {/* Sort Selector */}
          <div style={{ flex: 1, minWidth: '180px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ ...inputStyle, width: '100%', fontWeight: '700' }}
            >
              <option value="price_asc">💰 價格由低到高 (最低價優先)</option>
              <option value="price_desc">💰 價格由高到低</option>
              <option value="rating_desc">⭐ 旅客評分由高到低</option>
            </select>
          </div>

          {/* Search CTA */}
          <button
            type="submit"
            disabled={isSearching}
            className="btn-primary"
            style={{ height: '44px', padding: '0 26px', borderRadius: '12px', fontSize: '0.94rem' }}
          >
            <RefreshCw size={16} className={isSearching ? 'animate-spin' : ''} style={{ animation: isSearching ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isSearching ? '即時搜尋中...' : '搜尋飯店'}</span>
          </button>

        </div>

        {/* Quick Destination Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} color="#059669" /> 熱門搜尋：
          </span>
          {quickDestinations.map(d => (
            <button
              key={d.value}
              type="button"
              onClick={() => { setDestination(d.value); }}
              style={{
                background: destination === d.value ? '#059669' : '#f8fafc',
                color: destination === d.value ? '#ffffff' : '#334155',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(15, 23, 42, 0.06)'
        }}>

          {/* Adults & Children Count Dropdowns (Placed directly in front of Check-in Date) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={15} color="#059669" /> 入住人數：
            </span>
            
            {/* Adult Select */}
            <select
              value={adults}
              onChange={(e) => setAdults && setAdults(Number(e.target.value))}
              style={{ ...inputStyle, fontWeight: '700', minWidth: '95px' }}
            >
              <option value={1}>大人 1 位</option>
              <option value={2}>大人 2 位</option>
              <option value={3}>大人 3 位</option>
              <option value={4}>大人 4 位</option>
              <option value={5}>大人 5 位</option>
              <option value={6}>大人 6 位</option>
            </select>

            {/* Children Select */}
            <select
              value={childrenCount}
              onChange={(e) => setChildrenCount && setChildrenCount(Number(e.target.value))}
              style={{ ...inputStyle, fontWeight: '700', minWidth: '95px' }}
            >
              <option value={0}>小孩 0 位</option>
              <option value={1}>小孩 1 位</option>
              <option value={2}>小孩 2 位</option>
              <option value={3}>小孩 3 位</option>
              <option value={4}>小孩 4 位</option>
            </select>

            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', marginLeft: '6px' }}>入住退房：</span>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              style={inputStyle}
            />
            <span style={{ color: '#94a3b8' }}>~</span>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Stay Type */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700' }}>住宿類型：</span>
            <select
              value={stayType}
              onChange={(e) => setStayType(e.target.value)}
              style={inputStyle}
            >
              <option value="all">全部分類</option>
              <option value="Hotel">平價飯店</option>
              <option value="Family Hotel">親子飯店</option>
              <option value="B&B">特色民宿</option>
            </select>
          </div>

          {/* Max Budget Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', whiteSpace: 'nowrap' }}>
              預算上限: <strong style={{ color: '#059669' }}>NT$ {maxPrice.toLocaleString()}</strong>
            </span>
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#059669' }}
            />
          </div>

        </div>

      </form>

    </div>
  );
}
