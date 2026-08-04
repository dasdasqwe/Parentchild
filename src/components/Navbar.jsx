import React from 'react';
import { Building2, Package, Baby, Theater, TrendingUp, Bell, Heart, Terminal } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAlertModal, onOpenSavedModal, savedCount, toggleConsole, isConsoleOpen }) {
  return (
    <nav className="glass-panel" style={{ margin: '16px auto', maxWidth: '1280px', padding: '14px 24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('stays')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}>
            🏨
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', background: 'linear-gradient(90deg, #ffffff, #a7f3d0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              StayPulse
            </span>
            <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--text-muted)', fontWeight: '500' }}>
              平價住宿 • 親子劇場 • 包套行程抓取引擎
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          <button
            onClick={() => setActiveTab('stays')}
            className={activeTab === 'stays' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Building2 size={16} /> 平價住宿比價
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={activeTab === 'packages' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Package size={16} /> 超值包套行程
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={activeTab === 'family' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Baby size={16} /> 最新親子景點
          </button>
          <button
            onClick={() => setActiveTab('theaters')}
            className={activeTab === 'theaters' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Theater size={16} /> 親子劇場表演
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={activeTab === 'trends' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <TrendingUp size={16} /> 價格走勢
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleConsole}
            className="btn-secondary"
            title="開啟/關閉爬蟲即時控制台"
            style={{
              borderColor: isConsoleOpen ? 'var(--primary)' : 'var(--border-glass)',
              color: isConsoleOpen ? 'var(--primary)' : 'var(--text-main)'
            }}
          >
            <Terminal size={18} />
            <span style={{ fontSize: '0.85rem' }}>爬蟲 Console</span>
          </button>

          <button onClick={onOpenAlertModal} className="btn-secondary" title="設定價格降價通知">
            <Bell size={18} color="#f59e0b" />
            <span style={{ fontSize: '0.85rem' }}>降價提醒</span>
          </button>

          <button onClick={onOpenSavedModal} className="btn-secondary" style={{ position: 'relative' }}>
            <Heart size={18} color="#f43f5e" fill={savedCount > 0 ? "#f43f5e" : "transparent"} />
            <span style={{ fontSize: '0.85rem' }}>收藏 ({savedCount})</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
