import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export default function LineBotDrawer({ isOpen, onClose }) {
  const [query, setQuery] = useState('宜蘭 3000');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleKeywords = ['宜蘭 3000', '台北 飯店', '沖繩 5000', '東京 4000', '花蓮 民宿'];

  if (!isOpen) return null;

  const handleTestQuery = async (keywordToTest) => {
    const target = keywordToTest || query;
    if (!target.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/line/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: target.trim() })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      zIndex: 999,
      display: 'flex',
      justify: 'flex-end'
    }}>

      <div style={{
        width: '440px',
        maxWidth: '100%',
        height: '100%',
        background: '#ffffff',
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        position: 'relative'
      }}>

        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#06c755', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Bot size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                LINE 機器人關鍵字測試
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '600' }}>
                ● 在線服務中 (格式：地點 + 預算)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Quick Keywords */}
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', marginBottom: '8px' }}>
              點擊快速測試關鍵字：
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {sampleKeywords.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(kw); handleTestQuery(kw); }}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid rgba(15, 23, 42, 0.1)',
                    color: '#059669',
                    fontSize: '0.82rem',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Test Input Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleTestQuery(); }} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="輸入關鍵字 (例如：沖繩 5000 或 東京 4000)..."
              style={{
                flex: 1,
                height: '42px',
                padding: '0 12px',
                borderRadius: '10px',
                background: '#f8fafc',
                color: '#0f172a',
                border: '1px solid rgba(15, 23, 42, 0.12)',
                outline: 'none',
                fontSize: '0.88rem',
                fontWeight: '600'
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                height: '42px',
                padding: '0 18px',
                borderRadius: '10px',
                background: '#06c755',
                color: '#ffffff',
                border: 'none',
                fontWeight: '800',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              {isLoading ? '解析中...' : '傳送'}
              <Send size={15} />
            </button>
          </form>

          {/* LINE Response Preview */}
          {response && (
            <div style={{
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(6, 199, 85, 0.3)'
            }}>
              <div style={{ fontWeight: '800', color: '#059669', marginBottom: '12px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> LINE Flex 輪播卡片 (已成功為您找到 {response.count} 筆飯店)
              </div>

              {response.data && response.data.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {response.data.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '12px',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                          ⭐ {item.rating} ({item.cityName})
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#059669', marginTop: '4px' }}>
                          NT$ {(item.price || 0).toLocaleString()} /晚起
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  未找到相符飯店，請嘗試放大預算額度！
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
