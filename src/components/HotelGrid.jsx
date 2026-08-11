import React from 'react';
import HotelCard from './HotelCard';
import { SearchX, Sparkles } from 'lucide-react';

export default function HotelGrid({ stays, savedStays, onToggleSave, destination }) {
  const savedIds = new Set(savedStays.map(s => s.id));

  if (stays.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        borderRadius: '24px',
        background: '#ffffff',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#f1f5f9',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <SearchX size={36} color="#64748b" />
        </div>
        <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: '800', marginBottom: '8px' }}>
          未找到符合「{destination || '搜尋條件'}」的飯店
        </h3>
        <p style={{ color: '#475569', fontSize: '0.94rem', maxWidth: '480px', margin: '0 auto' }}>
          建議嘗試調整關鍵字（例如搜尋：東京, 沖繩, 宜蘭, 台北），或調高預算上限。
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
      {stays.map(stay => (
        <HotelCard
          key={stay.id}
          stay={stay}
          isSaved={savedIds.has(stay.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
