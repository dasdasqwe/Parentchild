import React from 'react';
import { Theater, Clock, Calendar, Ticket, ExternalLink, Heart, Sparkles, AlertCircle, MapPin } from 'lucide-react';

export default function FamilyTheaterList({ theaters, savedItems, onToggleSave }) {
  const savedIds = new Set(savedItems.map(s => s.id));

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Top Banner Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Theater color="var(--accent-purple)" size={24} />
            近半年熱門親子劇場表演 & 最早開放購票時間
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            即時追蹤巧虎舞台劇、紙風車劇團、迪士尼冰上世界、蘋果劇團等近 6 個月巡迴時間與早鳥搶票時程
          </p>
        </div>

        <div className="badge-purple" style={{ fontSize: '0.85rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} /> 建議於「最早開放購票時間」第一時間卡位早鳥票 (享85折起優惠)
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {theaters.map(item => {
          const isSaved = savedIds.has(item.id);
          
          // 1. 官網/官方介紹連結 (大標題與圖片)
          const officialUrl = item.websiteUrl || item.ticketUrl || `https://www.google.com/search?q=${encodeURIComponent(item.title + ' 官網')}`;
          
          return (
            <div key={item.id} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}>
              
              {/* Media Header Image (官網連結) */}
              <div style={{ position: 'relative', height: '210px', width: '100%' }}>
                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  title="點擊查看劇團/表演官網"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>
                
                {/* Status Badge */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {item.ticketStatusType === 'success' && <span className="badge-green">🎉 {item.ticketStatus}</span>}
                  {item.ticketStatusType === 'warning' && <span className="badge-amber">⏰ {item.ticketStatus}</span>}
                  {item.ticketStatusType === 'info' && <span className="badge-purple">🌟 {item.ticketStatus}</span>}
                  <span className="badge-rose">{item.ageRecommendation}</span>
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

                {/* Earliest Ticket Open Time Glow Callout Bar */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95), transparent)',
                  padding: '12px 16px 8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock size={16} color="#fbbf24" className="pulsing-dot" />
                  <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: '800' }}>
                    最早可購票時間: {item.earliestTicketDate}
                  </span>
                </div>
              </div>

              {/* Performance Info Content */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  {/* 大標題: 官網/劇團連結 */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
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
                      title="點擊開啟劇團官網 / 表演介紹"
                    >
                      <span>{item.title}</span> 🌐
                    </a>
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Ticket size={14} color="var(--primary)" /> 主辦 / 製作: {item.organizer}
                  </div>

                  {/* Dates & Ticket Price */}
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-glass)',
                    marginBottom: '14px',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> 演出期間: {item.performanceDate}
                    </div>
                    <div style={{ color: '#a78bfa', fontWeight: '700' }}>
                      🎫 票價區間: {item.priceRange}
                    </div>
                  </div>

                  {/* Venues List (各巡迴地點連至 Google Maps) */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--primary)" /> 巡迴地點 / 展演場地:
                    </div>
                    <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {item.venues.map((v, vIdx) => {
                        const venueMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`;
                        return (
                          <li key={vIdx} style={{ marginBottom: '2px' }}>
                            <a
                              href={venueMapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--text-main)',
                                textDecoration: 'underline',
                                textUnderlineOffset: '2px',
                                transition: 'color 0.2s ease',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
                              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                              title="點擊開啟 Google Maps 地圖導覽"
                            >
                              {v} 📍
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                    💡 劇目亮點: {item.highlights}
                  </p>
                </div>

                {/* Ticket Platform Button */}
                <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
                  <a
                    href={item.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', padding: '10px 0' }}
                  >
                    前往 {item.ticketPlatform} 購票預訂 <ExternalLink size={14} />
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
