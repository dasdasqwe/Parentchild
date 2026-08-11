import React from 'react';
import StayCard from './StayCard';
import { Building2, SearchX, Sparkles } from 'lucide-react';

export default function StayList({ stays, savedStays, onToggleSave }) {
  const savedIds = new Set(savedStays.map(s => s.id));

  if (stays.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '70px 20px', borderRadius: '24px', background: '#ffffff' }}>
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
          未找到符合條件的平價住宿
        </h3>
        <p style={{ color: '#475569', fontSize: '0.94rem', maxWidth: '480px', margin: '0 auto' }}>
          建議提高最高預算上限，或切換至「全部分類」重試爬取數據。
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Bright Header */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        color: '#475569',
        fontSize: '0.9rem',
        flexWrap: 'wrap',
        gap: '12px',
        background: '#ffffff',
        padding: '12px 20px',
        borderRadius: '16px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={17} color="#059669" />
          <span>
            已在雷達畫布中為您載入 <strong style={{ color: '#059669', fontSize: '1.05rem' }}>{stays.length}</strong> 間平價精選住宿（多平台實時比價）
          </span>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ background: 'rgba(5, 150, 105, 0.12)', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
            👑 全網最低價
          </span>
          <span>已即時校正無效連結與優惠標籤</span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {stays.map(stay => (
          <StayCard
            key={stay.id}
            stay={stay}
            isSaved={savedIds.has(stay.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </div>
  );
}
