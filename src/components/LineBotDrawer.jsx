import React, { useState } from 'react';
import { X, Send, Bot, MessageSquare } from 'lucide-react';

export default function LineBotDrawer({ isOpen, onClose }) {
  const [inputCommand, setInputCommand] = useState('搜尋飯店 宜蘭');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 您好！我是 StayPulse 親子資訊 LINE Bot。\n請輸入關鍵字指令（例如：搜尋飯店 宜蘭、比價 蘭城晶英、親子景點 台北）開始體驗！' }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend) => {
    const cmd = textToSend || inputCommand;
    if (!cmd.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: cmd }];
    setMessages(newMsgs);
    setInputCommand('');
    setLoading(true);

    try {
      const res = await fetch('/api/line/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cmd })
      });
      const json = await res.json();
      if (json.success) {
        setMessages([...newMsgs, { sender: 'bot', flex: json.message }]);
      }
    } catch (e) {
      setMessages([...newMsgs, { sender: 'bot', text: '⚠️ 發生連線錯誤，請確定後端伺服器運作中。' }]);
    } finally {
      setLoading(false);
    }
  };

  const quickCommands = [
    '搜尋飯店 宜蘭',
    '比價 蘭城晶英酒店',
    '訂房 蘭城晶英 0815-0817 2大2小',
    '親子景點 台北',
    '親子表演 宜蘭',
    '展覽 台中',
    '幫助'
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '420px',
      maxWidth: '100vw',
      height: '100vh',
      zIndex: 1000,
      background: '#0f172a',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.6)'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem',
        background: 'linear-gradient(135deg, #06C755 0%, #00B900 100%)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
          <Bot size={22} />
          LINE Bot 關鍵字線上模擬測試器
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      {/* Quick Quick Commands Tag Cloud */}
      <div style={{ padding: '0.75rem', background: '#1e293b', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
        {quickCommands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(cmd)}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#a5b4fc',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer'
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Message Chat Body */}
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%'
          }}>
            {m.sender === 'user' ? (
              <div style={{ padding: '0.75rem 1rem', borderRadius: '16px 16px 0 16px', background: '#06C755', color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                {m.text}
              </div>
            ) : m.text ? (
              <div style={{ padding: '0.75rem 1rem', borderRadius: '16px 16px 16px 0', background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                {m.text}
              </div>
            ) : m.flex ? (
              <div style={{ padding: '0.75rem', borderRadius: '16px', background: '#1e293b', border: '1px solid rgba(6, 199, 85, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#06C755', fontWeight: 800, marginBottom: '0.5rem' }}>
                  📱 LINE Flex Message 回覆模擬:
                </div>
                <pre style={{ fontSize: '0.7rem', color: '#a5b4fc', background: '#0f172a', padding: '0.5rem', borderRadius: '6px', overflowX: 'auto', maxHeight: 220 }}>
                  {JSON.stringify(m.flex, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        ))}
        {loading && <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>🤖 Bot 正在思考回覆中...</div>}
      </div>

      {/* Input Footer */}
      <div style={{ padding: '1rem', background: '#1e293b', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="輸入指令... (例: 搜尋飯店 宜蘭)"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            flex: 1,
            padding: '0.65rem',
            borderRadius: '8px',
            background: '#0f172a',
            border: '1px solid #334155',
            color: '#fff'
          }}
        />
        <button
          onClick={() => handleSendMessage()}
          style={{
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            background: '#06C755',
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
