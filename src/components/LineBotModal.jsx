import React, { useState } from 'react';
import { Bot, Send, X, ExternalLink, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function LineBotModal({ isOpen, onClose, onQuerySelect }) {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      text: '👋 你好！我是 StayPulse 房價比價 LINE 機器人。\n請輸入關鍵字查詢房價，例如：\n• 「宜蘭 3000」（查詢宜蘭 NT$ 3,000 以下住宿）\n• 「台北 飯店」（查詢台北地區優質飯店）\n• 「花蓮 民宿」（查詢花蓮人氣特色民宿）\n• 「沖繩 房價」（查詢沖繩平價飯店）',
      timestamp: '15:00'
    }
  ]);

  if (!isOpen) return null;

  const handleSimulateSubmit = async (e) => {
    e?.preventDefault();
    if (!keyword.trim() || isLoading) return;

    const userText = keyword.trim();
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: userText, timestamp: userTime }
    ]);
    setKeyword('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/line/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText })
      });
      const data = await res.json();

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (data.success && data.data && data.data.length > 0) {
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            type: 'flex_carousel',
            destination: data.destination,
            category: data.category,
            count: data.count,
            items: data.data,
            timestamp: botTime
          }
        ]);
      } else {
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `🔍 找不到符合「${userText}」的相關資訊。建議放寬預算金額或換個地點關鍵字再試一次！`,
            timestamp: botTime
          }
        ]);
      }
    } catch (err) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `⚠️ 系統模擬查詢發生錯誤：${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickKeyword = (kw) => {
    setKeyword(kw);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--border-glass-glow)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #06c755, #059669)',
          padding: '16px 20px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot color="#06c755" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                LINE 機器人關鍵字房價查詢
                <span style={{ fontSize: '0.7rem', background: 'rgba(255, 255, 255, 0.25)', padding: '2px 8px', borderRadius: '12px' }}>
                  Apify / RapidAPI 串接
                </span>
              </h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, margin: '2px 0 0 0' }}>
                傳送關鍵字即時抓取 Booking/Agoda 房價並回傳 Flex 卡片
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Webhook Connection Guide Banner */}
        <div style={{
          background: 'rgba(6, 199, 85, 0.1)',
          borderBottom: '1px solid rgba(6, 199, 85, 0.2)',
          padding: '10px 20px',
          fontSize: '0.82rem',
          color: '#34d399',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} color="#06c755" />
            <span>Webhook API 節點：<code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#a7f3d0' }}>/api/line/webhook</code></span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            支援運作：Apify Scraper Actor + Flex Carousel
          </span>
        </div>

        {/* Chat History Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#0b1329'
        }}>

          {chatHistory.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: msg.type === 'flex_carousel' ? '12px' : '12px 16px',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.sender === 'user' ? '#06c755' : 'rgba(30, 41, 59, 0.95)',
                color: '#ffffff',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-glass)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                whiteSpace: 'pre-line',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>

                {/* Text Message */}
                {msg.text && (
                  <div>{msg.text}</div>
                )}

                {/* Flex Carousel Card Simulation */}
                {msg.type === 'flex_carousel' && (
                  <div>
                    <div style={{
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#34d399',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Sparkles size={16} />
                      LINE Flex Carousel：已傳送「{msg.destination}」精選房價與比價卡片 (共 {msg.count} 筆)
                    </div>

                    {/* Carousel Horizontal Scroll Container */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      overflowX: 'auto',
                      paddingBottom: '8px'
                    }}>
                      {msg.items.slice(0, 5).map((item, idx) => {
                        const lowestProvider = item.providers?.find(p => p.isLowest) || item.providers?.[0];
                        const providerName = item.lowestPriceProvider || lowestProvider?.name || 'Agoda';
                        const targetUrl = lowestProvider?.url || item.url || 'https://agoda.com';

                        return (
                          <div
                            key={idx}
                            style={{
                              minWidth: '220px',
                              maxWidth: '220px',
                              background: '#1e293b',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <div style={{ position: 'relative', height: '110px' }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <span style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: '#10b981',
                                color: '#fff',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                👑 {providerName} 最低
                              </span>
                            </div>

                            <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                  {item.name || item.title}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#f59e0b', margin: '2px 0' }}>
                                  ⭐ {item.rating || '4.8'} ({item.reviewsCount || 100}則評價)
                                </div>
                              </div>

                              <div style={{ marginTop: '8px' }}>
                                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#34d399', textAlign: 'right', marginBottom: '8px' }}>
                                  NT$ {(item.price || 0).toLocaleString()}
                                </div>

                                <a
                                  href={targetUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    background: '#06c755',
                                    color: '#ffffff',
                                    padding: '6px',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    textDecoration: 'none'
                                  }}
                                >
                                  前往 {providerName} 預訂
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06c755', fontSize: '0.85rem' }}>
              <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid #06c755', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
              <span>LINE 機器人正在透過 Apify Scraper 抓取最新房價...</span>
            </div>
          )}

        </div>

        {/* Quick Keyword Pills */}
        <div style={{
          padding: '10px 16px',
          background: '#0f172a',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            快速測試關鍵字：
          </span>
          {['宜蘭 3000', '台北 飯店', '花蓮 民宿', '沖繩 房價', '台中 2500', '礁溪 包套'].map((kw, i) => (
            <button
              key={i}
              onClick={() => handleQuickKeyword(kw)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#a7f3d0',
                fontSize: '0.78rem',
                borderRadius: '12px',
                padding: '4px 10px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSimulateSubmit} style={{
          padding: '12px 16px',
          background: '#1e293b',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="輸入 LINE 查詢關鍵字 (例：宜蘭 3000 或 台北 飯店)..."
            style={{
              flex: 1,
              height: '42px',
              padding: '0 14px',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              border: '1px solid var(--border-glass)',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !keyword.trim()}
            style={{
              height: '42px',
              padding: '0 20px',
              borderRadius: '10px',
              background: keyword.trim() ? '#06c755' : 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: 'none',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: keyword.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            <Send size={16} /> 模擬傳送
          </button>
        </form>

      </div>
    </div>
  );
}
