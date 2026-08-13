import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Share2, Check } from 'lucide-react';

export default function ItineraryBuilder() {
  const [title, setTitle] = useState('宜蘭二日經典親子渡假行程');
  const [items, setItems] = useState([
    { id: 1, type: 'hotel', name: '蘭城晶英酒店 (住宿)', time: 'Day 1 15:00 入住' },
    { id: 2, type: 'attraction', name: '張美阿嬤農場 (餵水豚君)', time: 'Day 2 10:00' },
    { id: 3, type: 'show', name: '童玩節偶戲特別公演', time: 'Day 2 14:00' }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    setItems([...items, { id: Date.now(), type: 'custom', name: newItemName, time: '自訂時間' }]);
    setNewItemName('');
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleSaveAndShare = async () => {
    try {
      const res = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, items })
      });
      const json = await res.json();
      if (json.shareCode) {
        const url = `${window.location.origin}/?shareCode=${json.shareCode}`;
        setShareUrl(url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar color="#6366f1" />
          親子旅遊行程編排助手
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>行程名稱</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}
          />
        </div>

        {/* List of items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {items.map((item, index) => (
            <div key={item.id} className="glass-card" style={{ padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}>
                  {index + 1}
                </span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.time}</div>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Add custom item */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="新增景點或飯店至行程..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '8px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }}
          />
          <button
            onClick={handleAddItem}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Plus size={18} /> 新增
          </button>
        </div>

        {/* Action */}
        <button
          onClick={handleSaveAndShare}
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            border: 'none',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
          }}
        >
          <Share2 size={18} /> 儲存行程並產生 LINE 分享連結
        </button>

        {shareUrl && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '0.5rem' }}>
            <input
              type="text"
              readOnly
              value={shareUrl}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}
            />
            <button
              onClick={copyToClipboard}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              {copied ? <Check size={16} /> : '複製網址'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
