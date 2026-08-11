import React from 'react';
import { Building2, Package, Baby, Theater, TrendingUp, Bot, Terminal, Bell, Heart, Sparkles, SlidersHorizontal, MapPin, DollarSign, Users, Calendar, Home } from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  stayType,
  setStayType,
  maxPrice,
  setMaxPrice,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adultsCount,
  setAdultsCount,
  childrenCount,
  setChildrenCount,
  onOpenAlertModal,
  onOpenSavedModal,
  onOpenLineBotModal,
  toggleConsole,
  isConsoleOpen,
  savedCount,
  onTriggerScrape,
  isScraping
}) {
  const navItems = [
    { id: 'stays', label: '房價比價雷達', desc: 'Agoda & Booking 比價', icon: Building2, badge: 'Hot' },
    { id: 'packages', label: '超值行程包套', desc: '住宿 + 門票/美食', icon: Package, badge: '省30%' },
    { id: 'family', label: '親子景點與展覽', desc: '常態景點 + 當期特展', icon: Baby },
    { id: 'theaters', label: '劇團公演巡迴', desc: '近半年早鳥搶票', icon: Theater, badge: '搶票' },
    { id: 'trends', label: '價格走勢分析', desc: '歷史高低價預測', icon: TrendingUp }
  ];

  const quickCities = ['宜蘭', '台北', '台中', '高雄', '花蓮', '沖繩', '東京'];

  return (
    <aside style={{
      width: '300px',
      flexShrink: 0,
      background: '#ffffff',
      borderRight: '1px solid rgba(15, 23, 42, 0.08)',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 18px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      overflowY: 'auto'
    }}>

      {/* Top Part: Brand Logo & Navigation */}
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', padding: '0 6px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)',
            position: 'relative'
          }}>
            🏨
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="font-display" style={{ fontSize: '1.45rem', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>
                StayPulse
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: '900', background: 'rgba(5, 150, 105, 0.12)', color: '#059669', padding: '2px 6px', borderRadius: '6px', border: '1px solid rgba(5, 150, 105, 0.25)' }}>
                v2.0
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: '600', display: 'block', marginTop: '2px' }}>
              AI 比價工作台 & LINE 機器人
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.5px', padding: '0 8px 4px 8px' }}>
            WORKSPACES
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: isActive ? '1px solid #059669' : '1px solid transparent',
                  background: isActive ? 'rgba(5, 150, 105, 0.08)' : 'transparent',
                  color: isActive ? '#059669' : '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: isActive ? 'var(--gradient-primary)' : '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#ffffff' : '#64748b'
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: isActive ? '800' : '600', color: isActive ? '#059669' : '#0f172a' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    background: isActive ? '#059669' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#475569',
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Filter Section in Sidebar */}
        {activeTab === 'stays' && (
          <div style={{
            background: '#f8fafc',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SlidersHorizontal size={14} color="#059669" /> 實時邊欄控制
            </div>

            {/* Quick Cities */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                熱門目的地
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {quickCities.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(c)}
                    style={{
                      background: selectedCity === c ? '#059669' : '#ffffff',
                      color: selectedCity === c ? '#ffffff' : '#475569',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Budget Slider */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>最高預算</span>
                <span style={{ color: '#059669', fontWeight: '800' }}>NT$ {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
            </div>

            {/* Stay Type */}
            <div>
              <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                住宿類型
              </label>
              <select
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                style={{
                  width: '100%',
                  height: '36px',
                  background: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  borderRadius: '8px',
                  padding: '0 8px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                <option value="all">全部分類</option>
                <option value="Hotel">平價飯店</option>
                <option value="Family Hotel">親子飯店</option>
                <option value="B&B">特色民宿</option>
              </select>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Action Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* LINE Bot Simulator Launcher Button */}
        <button
          onClick={onOpenLineBotModal}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '14px',
            background: 'rgba(6, 199, 85, 0.1)',
            border: '1px solid rgba(6, 199, 85, 0.3)',
            color: '#059669',
            fontWeight: '800',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(6, 199, 85, 0.15)'
          }}
        >
          <Bot size={18} color="#06c755" />
          <span>LINE 機器人關鍵字測試</span>
        </button>

        {/* Quick Tools Row */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={toggleConsole}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              background: '#ffffff',
              border: isConsoleOpen ? '1px solid #059669' : '1px solid rgba(15, 23, 42, 0.12)',
              color: isConsoleOpen ? '#059669' : '#334155',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Terminal size={15} /> Console
          </button>

          <button
            onClick={onOpenSavedModal}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              background: '#ffffff',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              color: '#334155',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Heart size={15} color="#f43f5e" fill={savedCount > 0 ? "#f43f5e" : "transparent"} />
            <span>收藏 ({savedCount})</span>
          </button>
        </div>

      </div>

    </aside>
  );
}
