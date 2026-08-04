import React from 'react';
import { Terminal, ShieldCheck, Activity, X, Trash2 } from 'lucide-react';

export default function ScraperConsole({ logs, isScraping, onClose, onClearLogs }) {
  return (
    <div className="glass-panel" style={{
      margin: '0 auto 24px auto',
      maxWidth: '1280px',
      background: 'rgba(10, 15, 26, 0.95)',
      border: '1px solid var(--border-glass-glow)',
      overflow: 'hidden'
    }}>
      {/* Header Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        background: 'rgba(15, 23, 42, 0.9)',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.5px' }}>
            SCRAPER LIVE ENGINE CONSOLE
          </span>
          <span className="badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulsing-dot"></span>
            {isScraping ? '爬蟲抓取中...' : '引擎就緒 (READY)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onClearLogs}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem'
            }}
          >
            <Trash2 size={14} /> 清空 Log
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Metric Stats Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1px',
        background: 'var(--border-glass)',
        fontSize: '0.8rem'
      }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '8px 16px' }}>
          <span style={{ color: 'var(--text-muted)' }}>目標平台:</span> <strong style={{ color: '#ffffff' }}>Agoda, Booking, Trip</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '8px 16px' }}>
          <span style={{ color: 'var(--text-muted)' }}>防鎖代理:</span> <strong style={{ color: '#34d399' }}>Active Proxy Pool</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '8px 16px' }}>
          <span style={{ color: 'var(--text-muted)' }}>DOM 解析器:</span> <strong style={{ color: '#38bdf8' }}>Cheerio v1.0</strong>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '8px 16px' }}>
          <span style={{ color: 'var(--text-muted)' }}>回應延遲:</span> <strong style={{ color: '#fbbf24' }}>~320 ms</strong>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div style={{
        padding: '14px 18px',
        maxHeight: '220px',
        overflowY: 'auto',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        color: '#34d399',
        background: '#070a12'
      }}>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
            [SYSTEM] 等候抓取指令... 點擊上方「即時重新爬取」按鈕可體驗資料抓取與結構化日誌。
          </div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} style={{ marginBottom: '4px', wordBreak: 'break-all' }}>
              <span style={{ color: '#64748b', marginRight: '10px' }}>[{log.timestamp}]</span>
              <span style={{
                color: log.message.includes('COMPLETE') || log.message.includes('SUCCESS') ? '#34d399' :
                       log.message.includes('DOM') || log.message.includes('PARSE') ? '#38bdf8' :
                       log.message.includes('CONNECT') ? '#fbbf24' : '#cbd5e1'
              }}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
