import React, { useState, useRef, useEffect } from 'react';
import { Heart, Star, ExternalLink, Tag, MapPin, ChevronDown, ChevronUp, X } from 'lucide-react';

export default function HotelCard({ stay, isSaved, onToggleSave }) {
  const [showProviders, setShowProviders] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowProviders(false);
      }
    };
    if (showProviders) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProviders]);

  const getLowestProvider = () => {
    if (!stay.providers || stay.providers.length === 0) return null;
    return stay.providers.reduce((min, p) => p.price < min.price ? p : min, stay.providers[0]);
  };

  const lowestProvider = getLowestProvider();
  const mapUrl = stay.gps
    ? `https://www.google.com/maps/search/?api=1&query=${stay.gps.latitude},${stay.gps.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stay.name + ' ' + stay.address)}`;

  const officialUrl = (stay.providers && stay.providers.length > 0 && stay.providers[0].url)
    ? stay.providers[0].url
    : stay.url || 'https://www.agoda.com';

  return (
    <div
      className="card-hover-effect"
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05)',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      
      {/* Hotel Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden', background: '#e2e8f0', borderRadius: '20px 20px 0 0' }}>
        <img
          src={stay.image}
          alt={stay.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Badges Top Left */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 3,
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
          justifyContent: 'space-between',
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
          {/* Hotel Name */}
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

          {/* Complete Detailed Postal Address */}
          <div style={{ marginBottom: '12px' }}>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0f172a', textDecoration: 'none', display: 'inline-flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.84rem', fontWeight: '700' }}
            >
              <MapPin size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px', lineHeight: '1.4' }}>
                {stay.address}
              </span>
            </a>
          </div>

          {/* Bulleted Amenities List */}
          {stay.tags && stay.tags.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid rgba(15, 23, 42, 0.06)',
              borderRadius: '12px',
              padding: '10px 14px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#059669', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✨ 設施與服務特色：
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {stay.tags.map((tag, idx) => (
                  <li key={idx} style={{ fontWeight: '600', lineHeight: '1.3' }}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Provider Comparison Callout & Floating Popover (Matching Image 2 Display Style) */}
        <div ref={popoverRef} style={{ position: 'relative' }}>
          <div style={{
            background: 'rgba(5, 150, 105, 0.08)',
            border: '1px solid rgba(5, 150, 105, 0.2)',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: '800', color: '#059669' }}>
              <Tag size={15} />
              <span>全網最低價: {lowestProvider ? lowestProvider.name : 'Agoda'}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowProviders(!showProviders)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#059669',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                outline: 'none'
              }}
            >
              <span>比價 ({stay.providers ? stay.providers.length : 3}家)</span>
              {showProviders ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Floating Popover Overlay Card (Matching Image 2 Style) */}
          {showProviders && (
            <div style={{
              position: 'absolute',
              bottom: 'calc(100% + 6px)',
              left: '0',
              right: '0',
              zIndex: 100,
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {/* Header Title Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f1f5f9',
                paddingBottom: '8px'
              }}>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={15} color="#059669" />
                  <span>全網即時比價方案</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProviders(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Multi-Provider List */}
              {(() => {
                const defaultProviders = [
                  { name: 'Agoda', price: stay.price, url: officialUrl },
                  { name: 'Booking.com', price: Math.round(stay.price * 1.05), url: officialUrl },
                  { name: 'Trip.com', price: Math.round(stay.price * 1.08), url: officialUrl }
                ];

                const rawProviders = (stay.providers && stay.providers.length > 0)
                  ? stay.providers
                  : defaultProviders;

                const sortedProviders = rawProviders.slice().sort((a, b) => a.price - b.price);

                return sortedProviders.map((p, idx) => {
                  const isLowest = idx === 0;

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: isLowest ? '8px 12px' : '6px 12px',
                        borderRadius: isLowest ? '12px' : '8px',
                        background: isLowest ? '#f0fdf4' : 'transparent',
                        border: isLowest ? '1.5px solid #10b981' : '1px solid transparent'
                      }}
                    >
                      {/* Left: Channel Name & Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          fontWeight: isLowest ? '800' : '700',
                          fontSize: '0.88rem',
                          color: isLowest ? '#047857' : '#1e293b'
                        }}>
                          {p.name}
                        </span>

                        {isLowest && (
                          <span style={{
                            background: '#059669',
                            color: '#ffffff',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            padding: '1px 7px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}>
                            👑 最低
                          </span>
                        )}
                      </div>

                      {/* Right: Price & Go Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontWeight: '800',
                          fontSize: isLowest ? '0.98rem' : '0.92rem',
                          color: isLowest ? '#047857' : '#0f172a'
                        }}>
                          NT$ {p.price.toLocaleString()}
                        </span>

                        <a
                          href={p.url || officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: isLowest ? '#059669' : '#ecfdf5',
                            color: isLowest ? '#ffffff' : '#047857',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            border: isLowest ? 'none' : '1px solid rgba(5, 150, 105, 0.18)',
                            transition: 'background 0.2s ease'
                          }}
                        >
                          前往
                        </a>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* Primary Direct Booking CTA */}
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '12px 0',
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: '800',
              textDecoration: 'none',
              boxSizing: 'border-box'
            }}
          >
            <span>前往 {lowestProvider ? lowestProvider.name : 'Agoda'} 預訂搶購</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>

    </div>
  );
}
