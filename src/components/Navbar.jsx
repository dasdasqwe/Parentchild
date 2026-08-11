import React from 'react';
import { Building2, Bot, Heart, Sparkles, MapPin, Search } from 'lucide-react';

export default function Navbar({ onOpenLineBotDrawer, onOpenSavedModal, savedCount }) {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            color: '#ffffff'
          }}>
            🏨
          </div>
          <div>
            <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>
              StayPulse
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: '600', marginTop: '-2px' }}>
              全球國內外飯店比價 • LINE 機器人
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenLineBotDrawer}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'rgba(6, 199, 85, 0.1)',
              border: '1px solid rgba(6, 199, 85, 0.3)',
              color: '#059669',
              fontWeight: '700',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Bot size={18} color="#06c755" />
            <span>LINE 機器人查詢</span>
          </button>

          <button
            onClick={onOpenSavedModal}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              color: '#0f172a',
              fontWeight: '700',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Heart size={18} color="#f43f5e" fill={savedCount > 0 ? "#f43f5e" : "transparent"} />
            <span>收藏清單 ({savedCount})</span>
          </button>
        </div>

      </div>
    </header>
  );
}
