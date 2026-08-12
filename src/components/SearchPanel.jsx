import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Calendar, DollarSign, SlidersHorizontal, RefreshCw, Globe, Users } from 'lucide-react';
import GuestPickerPopover from './GuestPickerPopover';

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
  rooms = 1,
  setRooms,
  adults = 2,
  setAdults,
  childrenCount = 2,
  setChildrenCount,
  childAges = ['', ''],
  setChildAges,
  onSearch,
  isSearching
}) {
  const [dbCities, setDbCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await fetch('/api/cities');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setDbCities(data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch cities from API:', err);
    }
  };

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
    height: '48px',
    padding: '0 14px',
    borderRadius: '14px',
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
            <Search size={18} color="#059669" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            <input
              type="text"
              list="global-destinations-list"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="搜尋飯店名稱或地點"
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
              {dbCities.length > 0 ? (
                dbCities.map(c => (
                  <option key={c.city_id} value={c.name.split(' ')[0]}>{`${c.name} (${c.country})`}</option>
                ))
              ) : (
                <>
                  <option value="宜蘭">宜蘭 (Yilan)</option>
                  <option value="台北">台北 (Taipei)</option>
                  <option value="台中">台中 (Taichung)</option>
                  <option value="花蓮">花蓮 (Hualien)</option>
                  <option value="高雄">高雄 (Kaohsiung)</option>
                  <option value="沖繩">沖繩 (Okinawa, Japan)</option>
                  <option value="東京">東京 (Tokyo, Japan)</option>
                  <option value="首爾">首爾 (Seoul, Korea)</option>
                  <option value="曼谷">曼谷 (Bangkok, Thailand)</option>
                </>
              )}
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
            style={{ height: '48px', padding: '0 26px', borderRadius: '14px', fontSize: '0.94rem' }}
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

          {/* Guest Picker Popover & Check-In/Out Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

            {/* Popover Guest Picker Component */}
            <GuestPickerPopover
              rooms={rooms}
              setRooms={setRooms}
              adults={adults}
              setAdults={setAdults}
              childrenCount={childrenCount}
              setChildrenCount={setChildrenCount}
              childAges={childAges}
              setChildAges={setChildAges}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700' }}>入住退房：</span>
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
              max="30000"
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
