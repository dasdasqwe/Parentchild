import React, { useState } from 'react';
import { Package, CheckCircle2, Star, Sparkles, ExternalLink, Heart, Ticket, Utensils } from 'lucide-react';

export default function PackageTourList({ packages, savedItems, onToggleSave }) {
  const [subFilter, setSubFilter] = useState('all'); // 'all' | 'tickets' | 'dining'
  const savedIds = new Set(savedItems.map(s => s.id));

  const isTicketPackage = (item) => {
    const text = (item.title + ' ' + (item.toursIncluded || []).join(' ')).toLowerCase();
    return text.includes('門票') || text.includes('樂園') || text.includes('水族館') || text.includes('海生館') || text.includes('票');
  };

  const isDiningPackage = (item) => {
    const text = (item.title + ' ' + (item.toursIncluded || []).join(' ')).toLowerCase();
    return text.includes('餐券') || text.includes('美食') || text.includes('晚餐') || text.includes('吃到飽') || text.includes('餐');
  };

  // 自動分類過濾
  const ticketPackages = packages.filter(isTicketPackage);
  const diningPackages = packages.filter(isDiningPackage);

  const displayedPackages = packages.filter(item => {
    if (subFilter === 'tickets') return isTicketPackage(item);
    if (subFilter === 'dining') return isDiningPackage(item);
    return true;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package color="var(--accent-purple)" size={22} />
            超值旅遊套裝行程組合 (住宿 + 門票/餐券一站購足)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            即時計算住宿與熱門景點門票單買價差，組合訂購平均省下 25% ~ 35% 預算
          </p>
        </div>

        {/* 語意子分類按鈕組 */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubFilter('all')}
            style={{
              background: subFilter === 'all' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: subFilter === 'all' ? 'none' : '1px solid var(--border-glass)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🌟 全部套裝行程 ({packages.length})
          </button>

          <button
            onClick={() => setSubFilter('tickets')}
            style={{
              background: subFilter === 'tickets' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: subFilter === 'tickets' ? 'none' : '1px solid var(--border-glass)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Ticket size={14} color="#a78bfa" />
            住宿 + 景點/樂園門票包 ({ticketPackages.length})
          </button>

          <button
            onClick={() => setSubFilter('dining')}
            style={{
              background: subFilter === 'dining' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: subFilter === 'dining' ? 'none' : '1px solid var(--border-glass)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Utensils size={14} color="#fbbf24" />
            飯店 + 特色美食餐券包 ({diningPackages.length})
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {displayedPackages.map(pkg => {
          const isSaved = savedIds.has(pkg.id);
          
          // 1. 直連套裝行程搶購與預訂網址 (大標題與圖片)
          const packageLink = pkg.url || pkg.ticketUrl || pkg.websiteUrl || `https://www.google.com/search?q=${encodeURIComponent(pkg.title + ' 預訂')}`;
          
          // 2. 地圖導覽連結 (住宿/地點列)
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pkg.stayIncluded || pkg.title + ' ' + (pkg.cityName || ''))}`;

          return (
            <div key={pkg.id} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}>
              
              {/* Media Image Banner (直連搶購與預訂網址) */}
              <div style={{ position: 'relative', height: '190px', width: '100%' }}>
                <a
                  href={packageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  title="點擊直連該套裝行程專屬預訂搶購頁面"
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>
                
                {/* Savings Callout Tag */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-rose))',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
                }}>
                  {pkg.savingsText}
                </div>

                <button
                  onClick={() => onToggleSave(pkg)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={18} color="#f43f5e" fill={isSaved ? "#f43f5e" : "transparent"} />
                </button>
              </div>

              {/* Package Info Content */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  {/* 大標題: 直連搶購網址 */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
                    <a
                      href={packageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-purple)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                      title="點擊直連該套裝行程專屬預訂搶購頁面"
                    >
                      <span>{pkg.title}</span> 🌐
                    </a>
                  </h3>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {pkg.tags.map((tag, idx) => (
                      <span key={idx} className="badge-purple" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stay Included Row (連至 Google Maps) */}
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-glass)',
                    marginBottom: '14px',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
                        title="點擊開啟 Google Maps 地圖導覽"
                      >
                        <CheckCircle2 size={16} />
                        <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                          搭配住宿: {pkg.stayIncluded} 📍
                        </span>
                      </a>
                    </div>

                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>
                      包含行程內容:
                    </div>
                    <ul style={{ paddingLeft: '18px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {pkg.toursIncluded.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Booking Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
                  <div>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'block' }}>
                      單買總價 NT$ {pkg.originalPrice.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#a78bfa' }}>
                      NT$ {pkg.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> /組合包</span>
                  </div>

                  <a
                    href={packageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      height: '44px',
                      padding: '0 18px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                      textDecoration: 'none',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      boxSizing: 'border-box'
                    }}
                  >
                    <span>搶購套裝行程 ({pkg.provider})</span>
                    <ExternalLink size={15} style={{ flexShrink: 0 }} />
                  </a>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
