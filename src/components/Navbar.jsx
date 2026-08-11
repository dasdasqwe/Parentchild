import React from 'react';
import { Building2, Package, Baby, Theater, TrendingUp, Bell, Heart, Terminal, Bot, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAlertModal, onOpenSavedModal, onOpenLineBotModal, savedCount, toggleConsole, isConsoleOpen }) {
  const tabs = [
    { id: 'stays', label: '平價住宿比價', icon: Building2 },
    { id: 'packages', label: '套裝行程', icon: Package },
    { id: 'family', label: '親子景點與展覽', icon: Baby },
    { id: 'theaters', label: '兒童劇場公演', icon: Theater },
    { id: 'trends', label: '價格走勢', icon: TrendingUp }
  ];

  return (
    <header style={{ position: 'sticky', top: '12px', zIndex: 90, padding: '0 16px', margin: '0 auto 20px auto', maxWidth: '1320px' }}>
      <nav className="glass-panel-glow glass-panel" style={{
        padding: '12px 20px',
        borderRadius: '20px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>

          {/* Brand Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => setActiveTab('stays')}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.45)',
              position: 'relative'
            }}>
              🏨
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 10px #34d399'
              }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-display" style={{ fontSize: '1.45rem', fontWeight: '900', letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #ffffff 0%, #a7f3d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  StayPulse
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(16, 185, 129, 0.18)', color: '#34d399', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
                  Apify / Scraper AI
                </span>
              </div>
              <span style={{ fontSize: '0.76rem', display: 'block', color: 'var(--text-muted)', fontWeight: '600', marginTop: '1px' }}>
                全球平價住宿 • 親子景點 • LINE Bot 房價比價引擎
              </span>
            </div>
          </div>

          {/* Segmented Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '4px',
            background: 'rgba(7, 10, 19, 0.65)',
            padding: '5px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {tabs.map(t => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? '800' : '600',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    background: isActive ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? '0 4px 16px rgba(16, 185, 129, 0.35)' : 'none'
                  }}
                >
                  <Icon size={16} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* LINE Bot Simulator Button */}
            <button
              onClick={onOpenLineBotModal}
              className="btn-secondary"
              title="開啟 LINE 機器人關鍵字房價查詢"
              style={{
                borderColor: 'rgba(6, 199, 85, 0.4)',
                color: '#34d399',
                background: 'rgba(6, 199, 85, 0.12)',
                boxShadow: '0 0 15px rgba(6, 199, 85, 0.2)',
                padding: '9px 15px'
              }}
            >
              <Bot size={18} color="#06c755" />
              <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>LINE 關鍵字查詢</span>
            </button>

            {/* Scraper Terminal Toggle */}
            <button
              onClick={toggleConsole}
              className="btn-secondary"
              title="開啟/關閉即時爬蟲日誌"
              style={{
                borderColor: isConsoleOpen ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                color: isConsoleOpen ? 'var(--primary)' : 'var(--text-main)',
                padding: '9px 14px'
              }}
            >
              <Terminal size={17} />
              <span style={{ fontSize: '0.85rem' }}>Console</span>
            </button>

            {/* Price Alert */}
            <button onClick={onOpenAlertModal} className="btn-secondary" title="設定降價提醒" style={{ padding: '9px 14px' }}>
              <Bell size={17} color="#f59e0b" />
            </button>

            {/* Saved Items */}
            <button onClick={onOpenSavedModal} className="btn-secondary" style={{ position: 'relative', padding: '9px 14px' }}>
              <Heart size={17} color="#f43f5e" fill={savedCount > 0 ? "#f43f5e" : "transparent"} />
              {savedCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#f43f5e',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: '900',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(244, 63, 94, 0.6)'
                }}>
                  {savedCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
}
