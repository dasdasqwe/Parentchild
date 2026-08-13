import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from 'lucide-react';
import GuestPickerPopover from './GuestPickerPopover';

export default function SearchPanel({ onSearch }) {
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [stayNights, setStayNights] = useState(1);
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [sortBy, setSortBy] = useState('composite');

  // Dual linkage: nights -> checkout
  const handleNightsChange = (nights) => {
    const n = Math.max(1, parseInt(nights, 10) || 1);
    setStayNights(n);
    const cinDate = new Date(checkIn);
    cinDate.setDate(cinDate.getDate() + n);
    setCheckOut(cinDate.toISOString().split('T')[0]);
  };

  // Dual linkage: checkout -> nights
  const handleCheckOutChange = (coutStr) => {
    setCheckOut(coutStr);
    const cinDate = new Date(checkIn);
    const coutDate = new Date(coutStr);
    const diffTime = coutDate - cinDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      setStayNights(diffDays);
    }
  };

  const handleTriggerSearch = () => {
    onSearch({
      city,
      keyword,
      checkIn,
      checkOut,
      adults,
      children,
      childAges,
      sortBy
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 100 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
        {/* City & Keyword */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
            目的地或飯店名稱
          </label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={{ position: 'absolute', left: 12, top: 12, color: '#6366f1' }} />
            <input
              type="text"
              placeholder="例：宜蘭, 蘭城晶英"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.65rem 0.65rem 2.5rem',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff'
              }}
            />
          </div>
        </div>

        {/* Dates & Nights */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
            入住 - 退房日期 (晚數)
          </label>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff'
              }}
            />
            <input
              type="number"
              min="1"
              max="30"
              value={stayNights}
              onChange={(e) => handleNightsChange(e.target.value)}
              style={{
                width: '60px',
                padding: '0.65rem',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                color: '#6366f1',
                fontWeight: 700,
                textAlign: 'center'
              }}
            />
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>晚</span>
          </div>
        </div>

        {/* Guests Picker */}
        <div style={{ position: 'relative' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
            入住人數
          </label>
          <button
            type="button"
            onClick={() => setShowGuestPicker(!showGuestPicker)}
            style={{
              width: '100%',
              padding: '0.65rem',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Users size={16} color="#6366f1" />
              {adults} 大 {children} 小
            </span>
          </button>

          {showGuestPicker && (
            <GuestPickerPopover
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              childAges={childAges}
              setChildAges={setChildAges}
              onClose={() => setShowGuestPicker(false)}
            />
          )}
        </div>

        {/* Sort Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
            排序方式
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }}
          >
            <option value="composite">✨ 綜合推薦 (評分與價格平衡)</option>
            <option value="price_asc">💰 價格由低到高</option>
            <option value="price_desc">💎 價格由高到低</option>
            <option value="rating">★ 評分優先</option>
          </select>
        </div>

        {/* Search Button */}
        <div>
          <button
            type="button"
            onClick={handleTriggerSearch}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
          >
            <Search size={18} />
            搜尋比價
          </button>
        </div>
      </div>
    </div>
  );
}
