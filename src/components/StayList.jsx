import React from 'react';
import StayCard from './StayCard';
import { Building2, SearchX, Sparkles, Filter } from 'lucide-react';

export default function StayList({ stays, savedStays, onToggleSave }) {
  const savedIds = new Set(savedStays.map(s => s.id));

  if (stays.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '70px 20px', margin: '0 auto', maxWidth: '1320px', borderRadius: '24px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <SearchX size={36} color="var(--text-muted)" />
        </div>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '8px' }}>
          未找到符合條件的平價住宿
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '480px', margin: '0 auto' }}>
          建議提高最高預算上限，或將住宿類型切換至「全部分類」重試爬取數據。
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
      
      {/* Results Header Bar */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '12px 20px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={17} color="var(--primary)" />
          <span>
            共為您找到 <strong style={{ color: 'var(--primary-light)', fontSize: '1.05rem' }}>{stays.length}</strong> 間平價精選住宿（全網多平台動態比價）
          </span>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
            👑 全網最低價
          </span>
          <span>已通過防禦過濾器實時校正</span>
        </div>
      </div>

      {/* Stay Card Grid */}
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
