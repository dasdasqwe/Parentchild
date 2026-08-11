import React, { useState } from 'react';
import { Star, MapPin, ExternalLink, Heart, Tag, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sparkles, Building } from 'lucide-react';

export default function StayCard({ stay, isSaved, onToggleSave }) {
  const [showProviders, setShowProviders] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const gallery = (stay.images && stay.images.length > 0) ? stay.images : [stay.image];
  const activeImage = gallery[currentImgIdx] || stay.image;

  const lowestProvider = stay.providers?.find(p => p.isLowest || p.name === stay.lowestPriceProvider) || stay.providers?.[0];
  const targetUrl = lowestProvider?.url || stay.url || 'https://www.agoda.com';
  const providerName = stay.lowestPriceProvider || lowestProvider?.name || 'Agoda';

  const officialUrl = stay.websiteUrl || targetUrl;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stay.name + ' ' + (stay.address || stay.cityName || ''))}`;

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx(prev => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx(prev => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="glass-panel glass-card-hover" style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative',
      background: 'rgba(15, 23, 42, 0.85)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>

      {/* Media Image Banner */}
      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%' }}
          title="點擊查看飯店官網 / 詳細介紹"
        >
          <img
            src={activeImage}
            alt={stay.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          />
        </a>

        {/* Image Navigation Arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={handlePrevImg}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextImg}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div style={{
              position: 'absolute',
              top: '46px',
              right: '12px',
              display: 'flex',
              gap: '4px',
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '3px 8px',
              borderRadius: '999px',
              zIndex: 2
            }}>
              {gallery.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(dotIdx); }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: currentImgIdx === dotIdx ? '#34d399' : 'rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 2,
          flexWrap: 'wrap'
        }}>
          {stay.type === 'Family Hotel' && <span className="badge-amber">👨‍👩‍👧‍👦 親子飯店</span>}
          {stay.type === 'Hotel' && <span className="badge-purple">🏨 平價飯店</span>}
          {stay.type === 'B&B' && <span className="badge-green">🏡 特色民宿</span>}
          {!['Family Hotel', 'Hotel', 'B&B'].includes(stay.type) && <span className="badge-purple">{stay.type}</span>}
          {stay.discountPercent && (
            <span className="badge-rose">🔥 -{stay.discountPercent}%</span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={() => onToggleSave(stay)}
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
            zIndex: 3
          }}
        >
          <Heart size={18} color="#f43f5e" fill={isSaved ? "#f43f5e" : "transparent"} />
        </button>

        {/* Bottom Price Floating Bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'linear-gradient(to top, rgba(7, 10, 19, 0.96) 0%, rgba(7, 10, 19, 0.4) 70%, transparent 100%)',
          padding: '16px 16px 10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.88rem', fontWeight: '800' }}>
            <Star size={15} fill="#fbbf24" /> {stay.rating} <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.78rem' }}>({stay.reviewsCount} 則評價)</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            {stay.originalPrice && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                  NT$ {stay.originalPrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#fb7185', fontWeight: '800', background: 'rgba(244, 63, 94, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                  省 ${stay.originalPrice - stay.price}
                </span>
              </div>
            )}
            <div>
              <span className="font-display" style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--primary-light)' }}>
                NT$ {stay.price.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '2px' }}>/晚起</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content Details */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
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
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-light)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
              title="點擊開啟飯店官網 / 介紹"
            >
              <span>{stay.name}</span>
            </a>
          </h3>

          {/* Map Location Link */}
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                maxWidth: '100%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              title="點擊開啟 Google Maps 地圖導覽"
            >
              <MapPin size={15} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {stay.address}
              </span>
            </a>
          </p>

          {/* Amenity Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {stay.tags.map((tag, idx) => (
              <span key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                fontSize: '0.76rem',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontWeight: '500'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Lowest Price Callout & Drawer */}
        <div>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={15} color="var(--primary)" />
              <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#34d399' }}>
                全網最低價: {providerName}
              </span>
            </div>
            <button
              onClick={() => setShowProviders(!showProviders)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              比價 ({stay.providers.length}家) {showProviders ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {/* Providers Drawer Breakdown */}
          {showProviders && (
            <div style={{
              background: 'rgba(7, 10, 19, 0.95)',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '12px',
              fontSize: '0.82rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {stay.providers.map((p, pIdx) => (
                <div key={pIdx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: pIdx !== stay.providers.length - 1 ? '1px dashed rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  <span style={{ color: p.isLowest ? '#34d399' : 'var(--text-muted)', fontWeight: p.isLowest ? '800' : '500' }}>
                    {p.name} {p.isLowest && '👑 最低'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: p.isLowest ? '#34d399' : '#ffffff', fontWeight: '700' }}>
                      NT$ {p.price.toLocaleString()}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#34d399',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      前往
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Booking Action Button */}
          <a
            href={targetUrl}
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
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: '800',
              boxSizing: 'border-box'
            }}
          >
            <span>前往 {providerName} 搶購預訂</span>
            <ExternalLink size={16} style={{ flexShrink: 0 }} />
          </a>
        </div>

      </div>
    </div>
  );
}
