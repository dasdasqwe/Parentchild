import React from 'react';
import { Baby, Star, MapPin, Check, Heart, Compass, Sparkles } from 'lucide-react';

export default function FamilyAttractionList({ attractions, savedItems, onToggleSave, onJumpToStay }) {
  const savedIds = new Set(savedItems.map(s => s.id));

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Baby color="var(--accent-amber)" size={22} />
            最新熱門親子景點與周邊平價住宿推薦
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            收錄各地最新熱門親子目的地、推車設施標籤、育嬰室與親民門票情報
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '24px'
      }}>
        {attractions.map(item => {
          const isSaved = savedIds.has(item.id);
          return (
            <div key={item.id} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              
              {/* Media Image */}
              <div style={{ position: 'relative', height: '190px', width: '100%' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge-amber">{item.ageRecommendation}</span>
                </div>

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

              {/* Details Body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: '1.4' }}>
                      {item.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700' }}>
                      <Star size={14} fill="#fbbf24" /> {item.rating}
                    </div>
                  </div>

                  <div style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '10px' }}>
                    🎟️ {item.ticketPrice}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.5' }}>
                    {item.description}
                  </p>

                  {/* Amenities Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {item.features.map((feat, fIdx) => (
                      <span key={fIdx} style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: '#fbbf24',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        fontSize: '0.75rem',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                  {/* Highlight Callout */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderLeft: '3px solid var(--primary)',
                    padding: '8px 12px',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.8rem',
                    color: '#a7f3d0',
                    marginBottom: '16px'
                  }}>
                    💡 親子亮點: {item.highlights}
                  </div>
                </div>

                {/* Nearby Budget Stays Link */}
                <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                    🏠 推薦周邊平價住宿:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.nearbyStays.map((ns, nIdx) => (
                      <button
                        key={nIdx}
                        onClick={onJumpToStay}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--primary)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Compass size={12} /> {ns}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
