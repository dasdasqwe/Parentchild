import React, { useState } from 'react';
import { Star, MapPin, ExternalLink, Heart, Tag, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HotelCard({ stay, isSaved, onToggleSave }) {
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
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative',
      background: '#ffffff',
      border: '1px solid rgba(15, 23, 42, 0.08)',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* Media Photo Wall */}
      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <img
            src={activeImage}
            alt={stay.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          />
        </a>

        {/* Gallery Slider Controls */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={handlePrevImg}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
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
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Badges */}
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
          {stay.discountPercent && (
            <span className="badge-rose">🔥 -{stay.discountPercent}%</span>
          )}
        </div>

        {/* Bookmark Favorite */}
        <button
          onClick={() => onToggleSave(stay)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
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

        {/* Floating Price Callout */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 70%, transparent 100%)',
          padding: '16px 16px 10px 16px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end',
          zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.88rem', fontWeight: '800' }}>
            <Star size={15} fill="#fbbf24" /> {stay.rating} <span style={{ color: '#cbd5e1', fontWeight: '500', fontSize: '0.78rem' }}>({stay.reviewsCount} 則評價)</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            {stay.originalPrice && (
              <div style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.78rem' }}>
                NT$ {stay.originalPrice.toLocaleString()}
              </div>
            )}
            <div>
              <span className="font-display" style={{ fontSize: '1.45rem', fontWeight: '900', color: '#34d399' }}>
                NT$ {stay.price.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>/晚起 (含稅費)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Area */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0f172a', textDecoration: 'none' }}
            >
              {stay.name}
            </a>
          </h3>

          <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '12px' }}>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#475569', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <MapPin size={15} color="#059669" style={{ flexShrink: 0 }} />
              <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {stay.address}
              </span>
            </a>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {stay.tags.map((tag, idx) => (
              <span key={idx} style={{
                background: '#f1f5f9',
                color: '#475569',
                fontSize: '0.76rem',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                fontWeight: '600'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Provider Comparison Callout & Drawer */}
        <div>
          <div style={{
            background: 'rgba(5, 150, 105, 0.08)',
            border: '1px solid rgba(5, 150, 105, 0.2)',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={15} color="#059669" />
              <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#059669' }}>
                全網最低價: {providerName}
              </span>
            </div>
            <button
              onClick={() => setShowProviders(!showProviders)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              比價 ({stay.providers ? stay.providers.length : 3}家) {showProviders ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {showProviders && stay.providers && (
            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '12px',
              fontSize: '0.82rem',
              border: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              {stay.providers.map((p, pIdx) => (
                <div key={pIdx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: pIdx !== stay.providers.length - 1 ? '1px dashed rgba(15, 23, 42, 0.1)' : 'none'
                }}>
                  <span style={{ color: p.isLowest ? '#059669' : '#475569', fontWeight: p.isLowest ? '800' : '500' }}>
                    {p.name} {p.isLowest && '👑 最低'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: p.isLowest ? '#059669' : '#0f172a', fontWeight: '700' }}>
                      NT$ {p.price.toLocaleString()}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(5, 150, 105, 0.15)',
                        color: '#059669',
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
            <span>前往 {providerName} 預訂搶購</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </div>
  );
}
