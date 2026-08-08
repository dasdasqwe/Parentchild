import React, { useState } from 'react';
import { Star, MapPin, ExternalLink, Heart, Tag, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StayCard({ stay, isSaved, onToggleSave }) {
  const [showProviders, setShowProviders] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const gallery = (stay.images && stay.images.length > 0) ? stay.images : [stay.image];
  const activeImage = gallery[currentImgIdx] || stay.image;

  const lowestProvider = stay.providers?.find(p => p.isLowest || p.name === stay.lowestPriceProvider) || stay.providers?.[0];
  const targetUrl = lowestProvider?.url || stay.url || 'https://www.agoda.com';
  const providerName = stay.lowestPriceProvider || lowestProvider?.name || 'Agoda';

  // 1. 直連飯店比價與訂房頁面 (標題與圖片)
  const officialUrl = stay.websiteUrl || stay.url || `https://www.agoda.com/zh-tw/search?text=${encodeURIComponent(stay.name)}`;
  
  // 2. 地圖導覽連結
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
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      position: 'relative'
    }}>
      
      {/* Top Media Banner & Gallery Carousel (連結至官網) */}
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%' }}
          title="點擊查看飯店官網 / 介紹"
        >
          <img
            src={activeImage}
            alt={stay.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          />
        </a>

        {/* Carousel Navigation Arrows if multiple photos */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={handlePrevImg}
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImg}
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Thumbnail Dots Indicator */}
            <div style={{
              position: 'absolute',
              top: '44px',
              right: '12px',
              display: 'flex',
              gap: '4px',
              background: 'rgba(15, 23, 42, 0.6)',
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
          zIndex: 2
        }}>
          {stay.type === 'Family Hotel' && <span className="badge-amber">👨‍👩‍👧‍👦 親子旅館</span>}
          {stay.type === 'Hotel' && <span className="badge-purple">🏨 平價飯店</span>}
          {stay.type === 'B&B' && <span className="badge-green">🏡 特色民宿</span>}
          {!['Family Hotel', 'Hotel', 'B&B'].includes(stay.type) && <span className="badge-purple">{stay.type}</span>}
          {stay.discountPercent && (
            <span className="badge-rose">-{stay.discountPercent}% OFF</span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={() => onToggleSave(stay)}
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
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            zIndex: 3
          }}
        >
          <Heart size={18} color="#f43f5e" fill={isSaved ? "#f43f5e" : "transparent"} />
        </button>

        {/* Lowest Price Callout Bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95), transparent)',
          padding: '12px 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700' }}>
            <Star size={14} fill="#fbbf24" /> {stay.rating} <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>({stay.reviewsCount} 則評價)</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            {stay.originalPrice && (
              <>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)', fontSize: '0.8rem', marginRight: '6px' }}>
                  NT$ {stay.originalPrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#fb7185', fontWeight: '700', background: 'rgba(244,63,94,0.15)', padding: '1px 5px', borderRadius: '4px', marginRight: '4px' }}>
                  省 NT$ {(stay.originalPrice - stay.price).toLocaleString()}
                </span>
              </>
            )}
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>
              NT$ {stay.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/晚起</span>
          </div>
        </div>
      </div>

      {/* Card Content Details */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* 大標題: 飯店官網/介紹 */}
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4', marginBottom: '6px' }}>
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
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
              title="點擊開啟飯店官網 / 介紹"
            >
              <span>{stay.name}</span>
            </a>
          </h3>

          {/* 下方地址: Google Maps 地圖超連結 */}
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
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
              <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {stay.address} 📍
              </span>
            </a>
          </p>

          {/* Amenity Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
            {stay.tags.map((tag, idx) => (
              <span key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid var(--border-glass)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price Comparison Provider Section */}
        <div>
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={14} color="var(--primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#34d399' }}>
                全網最低價: {providerName}
              </span>
            </div>
            <button
              onClick={() => setShowProviders(!showProviders)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              比價 ({stay.providers.length}平台) {showProviders ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Providers Drawer Breakdown */}
          {showProviders && (
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '12px',
              fontSize: '0.8rem',
              border: '1px solid var(--border-glass)'
            }}>
              {stay.providers.map((p, pIdx) => (
                <div key={pIdx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 0',
                  borderBottom: pIdx !== stay.providers.length - 1 ? '1px dashed var(--border-glass)' : 'none'
                }}>
                  <span style={{ color: p.isLowest ? '#34d399' : 'var(--text-muted)', fontWeight: p.isLowest ? '700' : '400' }}>
                    {p.name} {p.isLowest && '👑最低'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: p.isLowest ? '#34d399' : 'var(--text-main)', fontWeight: '600' }}>
                      NT$ {p.price.toLocaleString()}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#34d399', fontSize: '0.75rem', textDecoration: 'underline' }}
                    >
                      前往
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Book Now Button */}
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              width: '100%',
              height: '44px',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'none',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: '700',
              boxSizing: 'border-box'
            }}
          >
            <span>前往 {providerName} 預訂</span>
            <ExternalLink size={15} style={{ flexShrink: 0 }} />
          </a>
        </div>

      </div>
    </div>
  );
}
