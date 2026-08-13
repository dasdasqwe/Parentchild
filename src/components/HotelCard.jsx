import React, { useState } from 'react';
import { Star, MapPin, ExternalLink, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function HotelCard({ hotel }) {
  const [showTable, setShowTable] = useState(true);

  return (
    <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Image */}
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: 200 }}>
          <img
            src={hotel.image_url}
            alt={hotel.name_zh}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '0.25rem 0.6rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: '#fbbf24',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <Star size={14} fill="#fbbf24" />
            {hotel.rating} ({hotel.reviews_count} 評價)
          </div>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 700, marginBottom: '0.2rem' }}>
              {hotel.city_name} • {hotel.hotel_class} 星級親子飯店
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
              {hotel.name_zh}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
              <MapPin size={14} />
              {hotel.address}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '1rem' }}>
              {hotel.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {hotel.amenities?.map((tag, idx) => (
              <span key={idx} style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#a5b4fc',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              全網最低價
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#6366f1', marginTop: '0.4rem' }}>
              NT$ {hotel.lowestPrice?.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>每晚含稅起</div>
          </div>

          <a
            href={hotel.deepLinks?.agoda}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              marginTop: '1rem',
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            前往最優管道 Agoda 訂房
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Modern Multi-Platform Comparison Table */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
        <button
          onClick={() => setShowTable(!showTable)}
          style={{
            background: 'none',
            border: 'none',
            color: '#a5b4fc',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          {showTable ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          四大訂房平台價格比價一覽表
        </button>

        {showTable && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
            {hotel.platforms?.map((p, idx) => {
              const linkKey = p.name === 'Agoda' ? 'agoda' : p.name === 'Booking.com' ? 'booking' : p.name === 'Trip.com' ? 'trip' : 'hotelsCom';
              return (
                <div key={idx} style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: p.isLowest ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  border: p.isLowest ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                    {p.name}
                    {p.isLowest && <ShieldCheck size={14} color="#10b981" />}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: p.isLowest ? '#10b981' : '#fff' }}>
                    NT$ {p.price.toLocaleString()}
                  </div>
                  <a
                    href={hotel.deepLinks?.[linkKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.75rem', color: '#818cf8', textDecoration: 'none', fontWeight: 700, marginTop: '0.25rem' }}
                  >
                    直連訂房 ➔
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
