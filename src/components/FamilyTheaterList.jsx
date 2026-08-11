import React from 'react';
import { Theater, Clock, Calendar, Ticket, ExternalLink, Heart, Sparkles, MapPin } from 'lucide-react';

export default function FamilyTheaterList({ theaters, savedItems, onToggleSave }) {
  const savedIds = new Set(savedItems.map(s => s.id));

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

      {/* Top Banner Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Theater color="var(--accent-purple)" size={26} />
            近半年熱門親子劇場表演 & 最早開放購票時間
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            即時追蹤全台近半年熱門劇團巡迴時間與早鳥搶票時程
          </p>
        </div>

        <div className="badge-purple" style={{ fontSize: '0.86rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} /> 早鳥卡位優惠享 85 折起
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
          const ticketLink = item.ticketUrl || item.websiteUrl || `https://www.opentix.life/search?keyword=${encodeURIComponent(item.title)}`;

          return (
            <div key={item.id} className="glass-panel glass-card-hover" style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>

              {/* Media Image */}
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <a
                  href={ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>

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

                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'linear-gradient(to top, rgba(7, 10, 19, 0.95), transparent)',
                  padding: '14px 16px 10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <Clock size={16} color="#fbbf24" className="pulsing-dot" />
                  <span style={{ fontSize: '0.88rem', color: '#fbbf24', fontWeight: '800' }}>
                    最早搶票: {item.earliestTicketDate}
                  </span>
                </div>
              </div>

              {/* Theater Details */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
                    <a
                      href={ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffffff', textDecoration: 'none' }}
                    >
                      {item.title} 🎟️
                    </a>
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Ticket size={15} color="var(--primary)" /> 主辦: {item.organizer}
                  </div>

                  <div style={{
                    background: 'rgba(7, 10, 19, 0.75)',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '16px',
                    fontSize: '0.86rem'
                  }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary-light)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={15} /> 演出期間: {item.performanceDate}
                    </div>
                    <div style={{ color: '#a78bfa', fontWeight: '800' }}>
                      🎫 票價區間: {item.priceRange}
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="var(--primary)" /> 巡迴演出場地:
                    </div>
                    <ul style={{ paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      {item.venues.map((v, vIdx) => {
                        const venueMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`;
                        return (
                          <li key={vIdx}>
                            <a
                              href={venueMapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'var(--text-main)', textDecoration: 'underline' }}
                            >
                              {v} 📍
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                    💡 劇目亮點: {item.highlights}
                  </p>
                </div>

                <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <a
                    href={item.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      fontWeight: '800'
                    }}
                  >
                    <span>前往售票平台預訂搶票</span>
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
