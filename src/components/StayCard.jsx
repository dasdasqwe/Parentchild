import React, { useState } from 'react';
import { Star, MapPin, ExternalLink, Heart, Check, Tag, ChevronDown, ChevronUp } from 'lucide-react';

export default function StayCard({ stay, isSaved, onToggleSave }) {
  const [showProviders, setShowProviders] = useState(false);

  const lowestProvider = stay.providers?.find(p => p.isLowest || p.name === stay.lowestPriceProvider) || stay.providers?.[0];
  const targetUrl = lowestProvider?.url || stay.url || 'https://www.agoda.com';
  const providerName = stay.lowestPriceProvider || lowestProvider?.name || 'Agoda';

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      position: 'relative'
    }}>
      
      {/* Top Media Banner & Tags */}
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        <img
          src={stay.image}
          alt={stay.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px'
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
            transition: 'transform 0.2s ease'
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
          alignItems: 'flex-end'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700' }}>
            <Star size={14} fill="#fbbf24" /> {stay.rating} <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>({stay.reviewsCount} 則評價)</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            {stay.originalPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)', fontSize: '0.8rem', marginRight: '6px' }}>
                NT$ {stay.originalPrice.toLocaleString()}
              </span>
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
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4', marginBottom: '6px' }}>
            {stay.name}
          </h3>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            <MapPin size={14} color="var(--primary)" /> {stay.address}
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
            style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', padding: '10px 0', fontSize: '0.9rem' }}
          >
            前往 {providerName} 預訂 <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  );
}
