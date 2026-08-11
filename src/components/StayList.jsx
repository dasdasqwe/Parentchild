import React from 'react';
import StayCard from './StayCard';
import { Building2, SearchX } from 'lucide-react';

export default function StayList({ stays, savedStays, onToggleSave }) {
  const savedIds = new Set(savedStays.map(s => s.id));

  if (stays.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', margin: '0 auto', maxWidth: '1280px' }}>
        <SearchX size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '8px' }}>
          未找到符合篩選條件的平價住宿
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          建議提高最高預算上限，或切換至「所有類型」重試爬取數據。
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <span>共找到 <strong style={{ color: 'var(--primary)' }}>{stays.length}</strong> 間全網熱門平價住宿 (含實時比價)</span>
        <span>提示：標註 👑 標籤為爬蟲比價獲取的即時全網最低價點</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
