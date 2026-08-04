import React from 'react';
import { Heart, X, Download, Trash2, ExternalLink } from 'lucide-react';

export default function SavedStaysModal({ isOpen, onClose, savedItems, onRemoveItem, onClearAll }) {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (savedItems.length === 0) return;
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "名稱,類型/價格,價格,最低價平台/連結\n";
    
    savedItems.forEach(item => {
      const name = `"${(item.name || item.title).replace(/"/g, '""')}"`;
      const price = item.price || item.ticketPrice || 'N/A';
      const provider = item.lowestPriceProvider || 'N/A';
      csvContent += `${name},${item.type || item.category || '項'},${price},${provider}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `StayPulse_Saved_Itinerary_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '640px', padding: '24px', position: 'relative', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart color="#f43f5e" fill="#f43f5e" size={20} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
              我的行程收藏與清單 ({savedItems.length})
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* List Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '6px', marginBottom: '20px' }}>
          {savedItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              尚無收藏內容。點擊住宿、包套行程或親子景點卡片上的 ❤️ 即可加入收藏。
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>
                    {item.name || item.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                    {item.price && <span style={{ color: 'var(--primary)', fontWeight: '700' }}>NT$ {item.price.toLocaleString()}</span>}
                    {item.type && <span>{item.type}</span>}
                    {item.lowestPriceProvider && <span>最低價: {item.lowestPriceProvider}</span>}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px' }}
                  title="移除收藏"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedItems.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
            <button onClick={onClearAll} className="btn-secondary" style={{ color: 'var(--accent-rose)' }}>
              清空收藏
            </button>
            <button onClick={handleExportCSV} className="btn-primary">
              <Download size={16} /> 匯出 CSV 行程簡報
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
