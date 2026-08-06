import React from 'react';
import { Baby, Star, MapPin, Heart } from 'lucide-react';

export default function FamilyAttractionList({ attractions, savedItems, onToggleSave }) {
  const savedIds = new Set(savedItems.map(s => s.id));

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Baby color="var(--accent-amber)" size={22} />
            最新熱門親子景點
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            精選各地熱門親子景點，提供景點圖片、地點、設施服務與特色亮點
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {attractions.map(item => {
          const isSaved = savedIds.has(item.id);
          const locationText = item.location || item.address || `${item.cityName || item.cityId || ''} 熱門觀光景點區`;

          return (
            <div key={item.id} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              
              {/* 1. 圖片 */}
              <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {item.rating && (
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#fbbf24',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}>
                    <Star size={14} fill="#fbbf24" /> {item.rating}
                  </div>
                )}

                <button
                  onClick={() => onToggleSave(item)}
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

              {/* 詳情內文 */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
                    {item.name}
                  </h3>

                  {/* 2. 地點 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    marginBottom: '14px'
                  }}>
                    <MapPin size={16} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {locationText}
                    </span>
                  </div>

                  {/* 3. 特色 */}
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.08)',
                    borderLeft: '3px solid var(--accent-amber)',
                    padding: '10px 12px',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.85rem',
                    color: '#fef3c7',
                    marginBottom: '14px',
                    lineHeight: '1.5'
                  }}>
                    <span style={{ fontWeight: '700', color: 'var(--accent-amber)', marginRight: '6px' }}>
                      💡 特色:
                    </span>
                    {item.highlights || item.description}
                  </div>

                  {/* 4. 設施 */}
                  {item.features && item.features.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '6px' }}>
                        🛠️ 設施服務:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {item.features.map((feat, fIdx) => (
                          <span key={fIdx} style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            color: '#6ee7b7',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}>
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. 部落格原文連結 */}
                  {item.blogUrl && (
                    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
                      <a
                        href={item.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          width: '100%',
                          boxSizing: 'border-box',
                          textAlign: 'center'
                        }}
                      >
                        📖 閱讀部落格完整文章導覽
                      </a>
                    </div>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

