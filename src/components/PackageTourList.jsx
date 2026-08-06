import React from 'react';
import { Package, CheckCircle2, Star, Sparkles, ExternalLink, Heart } from 'lucide-react';

export default function PackageTourList({ packages, savedItems, onToggleSave }) {
  const savedIds = new Set(savedItems.map(s => s.id));

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package color="var(--accent-purple)" size={22} />
            超值旅遊包套組合 (住宿 + 門票/交通一站購足)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            即時計算住宿與熱門景點門票單買價差，組合訂購平均省下 25% ~ 35% 預算
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {packages.map(pkg => {
          const isSaved = savedIds.has(pkg.id);
          
          // 1. 官網/行程連結 (標題與圖片)
          const officialUrl = pkg.websiteUrl || pkg.url || `https://www.google.com/search?q=${encodeURIComponent(pkg.title + ' 官網')}`;
          
          // 2. 地圖導覽連結 (住宿/地點列)
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pkg.stayIncluded || pkg.title + ' ' + (pkg.cityName || ''))}`;

          return (
            <div key={pkg.id} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}>
              
              {/* Media Image Banner (連結至官網/行程) */}
              <div style={{ position: 'relative', height: '190px', width: '100%' }}>
                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  title="點擊查看行程官網 / 介紹"
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
                  {/* 大標題: 行程/官網 */}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '10px' }}>
                    <a
                      href={officialUrl}
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
                      title="點擊開啟包套行程官網 / 介紹"
                    >
                      <span>{pkg.title}</span> 🌐
                    </a>
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontSize: '0.85rem', marginBottom: '14px' }}>
                    <Star size={14} fill="#fbbf24" /> {pkg.rating}
                    <span style={{ color: 'var(--text-muted)' }}>({pkg.reviewsCount} 人已預訂)</span>
                  </div>

                  {/* Included Stay & Tours Breakdown (住宿地圖導覽) */}
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-glass)',
                    marginBottom: '16px',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--primary)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
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
                    href={pkg.url || pkg.ticketUrl || 'https://www.kkday.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', textDecoration: 'none', padding: '10px 18px' }}
                  >
                    搶購包套 <ExternalLink size={14} />
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
