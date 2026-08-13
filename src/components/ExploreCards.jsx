import React from 'react';
import { MapPin, ExternalLink, Navigation, Tag } from 'lucide-react';

export function AttractionCard({ attraction }) {
  return (
    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: 160, marginBottom: '0.75rem' }}>
          <img src={attraction.image_url} alt={attraction.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            background: 'rgba(15,23,42,0.85)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            color: '#10b981',
            fontWeight: 700
          }}>
            {attraction.category}
          </span>
        </div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
          {attraction.name}
        </h4>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.5rem' }}>
          <MapPin size={14} />
          {attraction.address}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '0.75rem' }}>
          {attraction.features}
        </p>
      </div>

      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981', marginBottom: '0.75rem' }}>
          🎫 NT$ {attraction.ticket_price} <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>/ 人</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <a
            href={attraction.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem'
            }}
          >
            <Navigation size={14} /> Maps 導航
          </a>
          <a
            href={attraction.official_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem'
            }}
          >
            <ExternalLink size={14} /> 官方網站
          </a>
        </div>
      </div>
    </div>
  );
}

export function ShowCard({ show }) {
  return (
    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ borderRadius: '10px', overflow: 'hidden', height: 160, marginBottom: '0.75rem' }}>
          <img src={show.image_url} alt={show.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
          {show.title}
        </h4>
        <p style={{ fontSize: '0.8rem', color: '#f472b6', fontWeight: 600, marginBottom: '0.2rem' }}>
          🏛 {show.venue}
        </p>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
          📅 {show.event_date}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '0.75rem' }}>
          {show.highlights}
        </p>
      </div>

      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ec4899', marginBottom: '0.75rem' }}>
          🎫 NT$ {show.ticket_price} <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>起</span>
        </div>
        <a
          href={show.ticket_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '0.6rem',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
          }}
        >
          🎫 OPENTIX 線上購票
        </a>
      </div>
    </div>
  );
}
