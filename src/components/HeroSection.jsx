import React, { useState } from 'react';
import { Bot, Zap, Sparkles, Send, ExternalLink, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onOpenLineBotModal, onOpenConsole }) {
  const [heroKeyword, setHeroKeyword] = useState('');
  const [heroChatResult, setHeroChatResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const quickKeywords = ['宜蘭 3000', '台北 飯店', '花蓮 民宿', '沖繩 房價', '台中 2500'];

  const handleHeroQuery = async (kw) => {
    const targetQuery = kw || heroKeyword;
    if (!targetQuery.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const res = await fetch('/api/line/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: targetQuery.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setHeroChatResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto 28px auto', padding: '0 16px' }}>
      <div style={{
        borderRadius: '28px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(7, 10, 19, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        padding: '36px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* Ambient Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>

          {/* Left Column: Hero Title & Badges */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px' }}>
                <Zap size={15} /> Apify / RapidAPI 房價 Scraper 引擎
              </span>
              <span className="badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px' }}>
                <Bot size={15} /> LINE 機器人關鍵字查詢
              </span>
            </div>

            <h1 className="font-display" style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              lineHeight: '1.25',
              letterSpacing: '-1px',
              marginBottom: '16px'
            }}>
              智慧尋找 <span className="text-gradient-primary">全網平價住宿</span>
              <br />
              一鍵對比 Agoda 與 Booking 最低價
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '24px', maxWidth: '540px' }}>
              即時透過 Apify / Scraper AI 抓取跨平台飯店房價、超值套裝行程與全台最新親子展覽活動。傳送 LINE 關鍵字即可秒查房價！
            </p>

            {/* Quick Hero Features List */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '28px', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '600' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span>無效連結防禦校正</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span>全網最低價 👑 標籤</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span>LINE Flex 輪播卡片</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenLineBotModal}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1.02rem', borderRadius: '14px' }}
              >
                <Bot size={20} />
                <span>LINE 機器人關鍵字房價查詢</span>
              </button>

              <button
                onClick={onOpenConsole}
                className="btn-secondary"
                style={{ padding: '14px 22px', fontSize: '0.96rem', borderRadius: '14px' }}
              >
                <span>即時爬蟲日誌 (Console)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive LINE Bot Showcase Widget */}
          <div style={{
            background: 'rgba(7, 10, 19, 0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(6, 199, 85, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 199, 85, 0.15)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            
            {/* Widget Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#06c755', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#fff' }}>
                  <Bot size={22} style={{ margin: 'auto' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>LINE Bot 房價即時查詢展示</h4>
                  <span style={{ fontSize: '0.75rem', color: '#34d399' }}>● 支援關鍵字：地點 + 預算 (如 宜蘭 3000)</span>
                </div>
              </div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(6, 199, 85, 0.15)', color: '#34d399', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
                Scraper Live
              </span>
            </div>

            {/* Quick Keyword Pills */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
                點擊測試關鍵字：
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {quickKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => { setHeroKeyword(kw); handleHeroQuery(kw); }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#a7f3d0',
                      fontSize: '0.8rem',
                      borderRadius: '10px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleHeroQuery(); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={heroKeyword}
                onChange={(e) => setHeroKeyword(e.target.value)}
                placeholder="輸入關鍵字 (例：宜蘭 3000 或 台北 飯店)..."
                style={{
                  flex: 1,
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  outline: 'none',
                  fontSize: '0.86rem'
                }}
              />
              <button
                type="submit"
                disabled={isSearching}
                style={{
                  height: '42px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  background: '#06c755',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                {isSearching ? <span className="animate-spin">⏳</span> : <Send size={15} />}
                <span>測試</span>
              </button>
            </form>

            {/* Hero Chat Result Preview */}
            {heroChatResult && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '14px',
                padding: '12px',
                border: '1px solid rgba(6, 199, 85, 0.3)',
                fontSize: '0.84rem'
              }}>
                <div style={{ fontWeight: '800', color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={15} />
                  LINE Flex 輪播卡片：已成功獲取「{heroChatResult.destination}」房價數據 ({heroChatResult.count}筆)
                </div>

                {heroChatResult.data && heroChatResult.data.length > 0 ? (
                  <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {heroChatResult.data.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{
                        minWidth: '180px',
                        maxWidth: '180px',
                        background: '#0f172a',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '8px'
                      }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '6px' }} />
                        <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#34d399', marginTop: '4px' }}>
                          NT$ {(item.price || 0).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    暫無符合條件資料，請放大預算重試！
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
