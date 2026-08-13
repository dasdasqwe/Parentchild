import React from 'react';
import HotelCard from './HotelCard';

export default function HotelGrid({ hotels, loading }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#a5b4fc' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>🔍 正在搜尋全網四大訂房平台價格...</div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
        <h3>😔 找不到符合條件的飯店</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>請嘗試調整搜尋地區、關鍵字或預算條件。</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem', fontWeight: 600 }}>
        共找到 <span style={{ color: '#6366f1', fontWeight: 800 }}>{hotels.length}</span> 間推薦優質親子飯店
      </div>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id || hotel.hotel_key} hotel={hotel} />
      ))}
    </div>
  );
}
