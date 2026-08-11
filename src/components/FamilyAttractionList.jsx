import React, { useState } from 'react';
import { Baby, Star, MapPin, Heart, Sparkles, RefreshCw, Calendar } from 'lucide-react';

function isExhibitionItem(item) {
  if (!item) return false;
  if (item.exhibitionInfo && item.exhibitionInfo.name) return true;
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('展') || cat.includes('快閃') || cat.includes('季') || cat.includes('祭')) return true;
  const name = (item.name || '').toLowerCase();
  if (name.includes('展') || name.includes('特展') || name.includes('快閃') || name.includes('博覽')) return true;
  return false;
}

export default function FamilyAttractionList({ attractions, savedItems, onToggleSave }) {
  const [subFilter, setSubFilter] = useState('all');
  const [syncStatus, setSyncStatus] = useState({ lastUpdated: '已啟動自動排程', isRefreshing: false });
  const savedIds = new Set(savedItems.map(s => s.id));

  React.useEffect(() => {
    fetch('/api/attractions-status')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.lastUpdated) {
          setSyncStatus(prev => ({ ...prev, lastUpdated: data.lastUpdated }));
        }
      })
      .catch(() => {});
  }, []);

  const handleManualRefresh = async () => {
    setSyncStatus(prev => ({ ...prev, isRefreshing: true }));
    try {
      const res = await fetch('/api/refresh-attractions', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSyncStatus({ lastUpdated: data.lastUpdated, isRefreshing: false });
      } else {
        setSyncStatus(prev => ({ ...prev, isRefreshing: false }));
      }
    } catch {
      setSyncStatus(prev => ({ ...prev, isRefreshing: false }));
    }
  };

  const spotItems = attractions.filter(item => !isExhibitionItem(item));
  const exhibitionItems = attractions.filter(item => isExhibitionItem(item));

  const renderCard = (item, idx) => {
    const isSaved = savedIds.has(item.id);
    const locationText = item.location || item.address || `${item.cityName || item.cityId || ''} 熱門觀光景點區`;
    const officialUrl = item.websiteUrl || item.ticketUrl || item.blogUrl || `https://www.klook.com/zh-TW/search/result/?query=${encodeURIComponent(item.name)}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + (item.location || item.address || ''))}`;

    return (
      <div key={item.id || idx} className="glass-panel glass-card-hover" style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Media Image */}
        <div style={{ position: 'relative', height: '210px', width: '100%' }}>
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </a>
          
          {item.rating && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '4px 12px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#fbbf24',
              fontSize: '0.84rem',
              fontWeight: '800'
            }}>
              <Star size={15} fill="#fbbf24" /> {item.rating}
            </div>
          )}

          <button
            onClick={() => onToggleSave(item)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2
            }}
          >
            <Heart size={18} color="#f43f5e" fill={isSaved ? "#f43f5e" : "transparent"} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff', textDecoration: 'none' }}
              >
                {item.name}
              </a>
            </h3>

            <div style={{ marginBottom: '14px' }}>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
                  textDecoration: 'none'
                }}
              >
                <MapPin size={16} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {locationText}
                </span>
              </a>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              borderLeft: '3px solid var(--accent-amber)',
              padding: '12px',
              borderRadius: '0 12px 12px 0',
              fontSize: '0.86rem',
              color: '#fef3c7',
              marginBottom: '16px',
              lineHeight: '1.5'
            }}>
              <span style={{ fontWeight: '800', color: 'var(--accent-amber)', marginRight: '6px' }}>
                💡 特色:
              </span>
              {item.highlights || item.description}
            </div>

            {item.exhibitionInfo && (
              <div style={{
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#a5b4fc' }}>
                    🎨 當前展覽 / 特展活動:
                  </span>
                  {item.exhibitionInfo.date && (
                    <span style={{ fontSize: '0.74rem', color: '#818cf8', background: 'rgba(99, 102, 241, 0.2)', padding: '2px 8px', borderRadius: '6px' }}>
                      📅 {item.exhibitionInfo.date}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ffffff' }}>
                  {item.exhibitionInfo.name}
                </div>
              </div>
            )}
          </div>

          <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                fontSize: '0.88rem',
                height: '44px',
                borderRadius: '12px',
                width: '100%',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              }}
            >
              🎟️ 查看景點門票與預訂資訊
            </a>
          </div>

        </div>

      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Baby color="var(--accent-amber)" size={26} />
            熱門親子景點與展覽活動
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            自動歸類為「常態親子景點」與「當期熱門展覽」，並自動即時剔除過期活動
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px', fontSize: '0.82rem', color: '#34d399', flexWrap: 'wrap' }}>
            <span className="pulsing-dot"></span>
            <span>已啟動全台自動巡檢 (每6小時排程更新) | 最後同步: {syncStatus.lastUpdated}</span>
            <button
              onClick={handleManualRefresh}
              disabled={syncStatus.isRefreshing}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {syncStatus.isRefreshing ? '⏳ 秒級抓取中...' : '🔄 立即強制同步'}
            </button>
          </div>
        </div>

        {/* Sub-filter pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubFilter('all')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.86rem',
              fontWeight: subFilter === 'all' ? '800' : '600',
              background: subFilter === 'all' ? 'var(--gradient-gold)' : 'rgba(255, 255, 255, 0.05)',
              color: subFilter === 'all' ? '#ffffff' : 'var(--text-muted)',
              border: subFilter === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer'
            }}
          >
            🌟 全部項目 ({attractions.length})
          </button>
          <button
            onClick={() => setSubFilter('spots')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.86rem',
              fontWeight: subFilter === 'spots' ? '800' : '600',
              background: subFilter === 'spots' ? 'var(--gradient-gold)' : 'rgba(255, 255, 255, 0.05)',
              color: subFilter === 'spots' ? '#ffffff' : 'var(--text-muted)',
              border: subFilter === 'spots' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer'
            }}
          >
            🎡 親子景點 ({spotItems.length})
          </button>
          <button
            onClick={() => setSubFilter('exhibitions')}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.86rem',
              fontWeight: subFilter === 'exhibitions' ? '800' : '600',
              background: subFilter === 'exhibitions' ? 'var(--gradient-purple)' : 'rgba(255, 255, 255, 0.05)',
              color: subFilter === 'exhibitions' ? '#ffffff' : 'var(--text-muted)',
              border: subFilter === 'exhibitions' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer'
            }}
          >
            🎨 特展活動 ({exhibitionItems.length})
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {attractions.map((item, idx) => renderCard(item, idx))}
      </div>

    </div>
  );
}
