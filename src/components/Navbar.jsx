import React from 'react';
import { Compass, Hotel, Calendar, MessageSquare, Heart, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, toggleLineDrawer, savedCount }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem 2rem',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('hotels')}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
        }}>
          <Sparkles color="#fff" size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.025em', background: 'linear-gradient(to right, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            StayPulse
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>親子旅遊一站式比價與探索</p>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <button
          onClick={() => setActiveTab('hotels')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'hotels' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <Hotel size={18} />
          飯店比價
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'explore' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <Compass size={18} />
          親子探索
        </button>

        <button
          onClick={() => setActiveTab('itinerary')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'itinerary' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <Calendar size={18} />
          行程規劃
        </button>
      </nav>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={toggleLineDrawer}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #06C755 0%, #00B900 100%)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(6, 199, 85, 0.3)'
          }}
        >
          <MessageSquare size={18} />
          LINE Bot 測試器
        </button>
      </div>
    </header>
  );
}
