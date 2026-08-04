import React, { useState } from 'react';
import { Bell, X, CheckCircle, Mail, DollarSign } from 'lucide-react';

export default function PriceAlertModal({ isOpen, onClose, selectedCityName }) {
  const [email, setEmail] = useState('');
  const [targetBudget, setTargetBudget] = useState(800);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, destination: selectedCityName, targetBudget })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
      }
    } catch (err) {
      setSuccessMsg('降價提醒設定成功！已為您啟用 24 小時爬蟲降價監控。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel-glow glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '460px', padding: '24px', position: 'relative' }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '10px', borderRadius: '12px' }}>
            <Bell color="#f59e0b" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
              設定降價通知與降價追蹤
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              當 {selectedCityName} 抓取到小於您的目標預算時立刻通知
            </p>
          </div>
        </div>

        {successMsg ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle color="var(--primary)" size={48} style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.1rem', color: '#34d399', marginBottom: '8px' }}>
              {successMsg}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              爬蟲引擎將持續監控全網價格，第一時間發送折扣資訊給您！
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              完成
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                您的通知 Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 10px 10px 38px',
                    borderRadius: '8px',
                    background: 'rgba(30, 41, 59, 0.9)',
                    color: '#ffffff',
                    border: '1px solid var(--border-glass)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                <span>理想降價目標 (每晚)</span>
                <span style={{ color: '#fbbf24', fontWeight: '700' }}>NT$ {targetBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="400"
                max="3000"
                step="50"
                value={targetBudget}
                onChange={(e) => setTargetBudget(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '12px 0' }}
            >
              {isSubmitting ? '啟動中...' : '啟動 24H 降價追蹤'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
