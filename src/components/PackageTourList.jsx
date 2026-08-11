import React, { useState } from 'react';
import { Package, CheckCircle2, Star, Sparkles, ExternalLink, Heart, Ticket, Utensils } from 'lucide-react';

export default function PackageTourList({ packages, savedItems, onToggleSave, onCityChange }) {
  const [subFilter, setSubFilter] = useState('all');
  const savedIds = new Set(savedItems.map(s => s.id));
  
  const hotCities = [
    { label: '台北', icon: '🏙️' },
    { label: '新北', icon: '🏘️' },
    { label: '台中', icon: '🎡' },
    { label: '高雄', icon: '🌊' },
    { label: '花蓮', icon: '🐳' },
    { label: '宜蘭', icon: '🧧' },
    { label: '墾丁', icon: '🏖️' },
    { label: '沖繩', icon: '🌏' },
  ];

  const isTicketPackage = (item) => {
    const text = (item.title + ' ' + (item.toursIncluded || []).join(' ')).toLowerCase();
    return text.includes('門票') || text.includes('樂園') || text.includes('水族館') || text.includes('海生館') || text.includes('票');
  };

  const isDiningPackage = (item) => {
    const text = (item.title + ' ' + (item.toursIncluded || []).join(' ')).toLowerCase();
    return text.includes('餐券') || text.includes('美食') || text.includes('晚餐') || text.includes('吃到飽') || text.includes('餐');
  };

  const ticketPackages = packages.filter(isTicketPackage);
  const diningPackages = packages.filter(isDiningPackage);

  const displayedPackages = packages.filter(item => {
    if (subFilter === 'tickets') return isTicketPackage(item);
    if (subFilter === 'dining') return isDiningPackage(item);
    return true;
  });

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package color="var(--accent-purple)" size={26} />
            超值旅遊套裝行程組合 (住宿 + 門票/餐券一站購足)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            即時計算住宿與熱門景點門票單買價差，組合訂購平均省下 25% ~ 35% 預算
          </p>
        </div>

        {/* Sub-filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubFilter('all')}
            style={{
              background: subFilter === 'all' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: subFilter === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.86rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🌟 全部套裝 ({packages.length})
          </button>

          <button
            onClick={() => setSubFilter('tickets')}
            style={{
              background: subFilter === 'tickets' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: subFilter === 'tickets' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.86rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Ticket size={15} color="#a78bfa" />
            住宿 + 樂園門票 ({ticketPackages.length})
          </button>

          <button
            onClick={() => setSubFilter('dining')}
            style={{
              background: subFilter === 'dining' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))' : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border: subFilter === 'dining' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.86rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Utensils size={15} color="#fbbf24" />
            飯店 + 美食餐券 ({diningPackages.length})
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
          const fallbackUrl = pkg.provider === 'KKday'
            ? `https://www.kkday.com/zh-tw/product/search?keyword=${encodeURIComponent(pkg.title)}`
            : `https://www.klook.com/zh-TW/search/result/?query=${encodeURIComponent(pkg.title)}`;
          const packageLink = pkg.url || pkg.ticketUrl || pkg.websiteUrl || fallbackUrl;

          return (
            <div key={pkg.id} className="glass-panel glass-card-hover" style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              
              {/* Media Banner */}
              <div style={{ position: 'relative', height: '210px', width: '100%' }}>
                <a
                  href={packageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>
                
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 2
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    color: '#fff',
                    fontSize: '0.76rem',
                    fontWeight: '800',
                    padding: '4px 12px',
                    borderRadius: '999px'
                  }}>
                    包套現省 NT${((pkg.originalPrice || pkg.price * 1.3) - pkg.price).toLocaleString()}
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '54px',
                  zIndex: 2
                }}>
                  <span style={{
                    background: pkg.provider === 'KKday'
                      ? 'linear-gradient(135deg, #2563eb, #06b6d4)'
                      : 'linear-gradient(135deg, #f97316, #ef4444)',
                    color: '#fff',
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '8px'
                  }}>
                    {pkg.provider || 'Klook'}
                  </span>
                </div>

                <button
                  onClick={() => onToggleSave(pkg)}
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
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={18} color="#f43f5e" fill={isSaved ? "#f43f5e" : "transparent"} />
                </button>
              </div>

              {/* Package Details */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '10px' }}>
                    <a
                      href={packageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffffff', textDecoration: 'none' }}
                    >
                      {pkg.title}
                    </a>
                  </h3>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {pkg.tags.map((tag, idx) => (
                      <span key={idx} className="badge-purple">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    background: 'rgba(7, 10, 19, 0.75)',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '16px',
                    fontSize: '0.86rem'
                  }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary-light)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} />
                      <span>搭配住宿: {pkg.stayIncluded}</span>
                    </div>

                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '700' }}>
                      包含行程內容:
                    </div>
                    <ul style={{ paddingLeft: '18px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {pkg.toursIncluded.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Price & Booking CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'block' }}>
                      單買總價 NT$ {pkg.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-display" style={{ fontSize: '1.45rem', fontWeight: '900', color: '#a78bfa' }}>
                      NT$ {pkg.price.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={packageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      height: '46px',
                      padding: '0 20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      fontWeight: '800'
                    }}
                  >
                    <span>搶購套裝 ({pkg.provider})</span>
                    <ExternalLink size={16} />
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
