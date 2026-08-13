import React, { useState } from 'react';
import { Users, Plus, Minus, X } from 'lucide-react';

export default function GuestPickerPopover({ adults, setAdults, children, setChildren, childAges, setChildAges, onClose }) {
  const handleChildCountChange = (delta) => {
    const nextCount = Math.max(0, children + delta);
    setChildren(nextCount);
    if (nextCount > childAges.length) {
      setChildAges([...childAges, 6]);
    } else if (nextCount < childAges.length) {
      setChildAges(childAges.slice(0, nextCount));
    }
  };

  const handleAgeChange = (index, ageVal) => {
    const updated = [...childAges];
    updated[index] = parseInt(ageVal, 10);
    setChildAges(updated);
  };

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      top: '110%',
      left: 0,
      width: '320px',
      padding: '1.25rem',
      zIndex: 100,
      background: '#1e293b'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>選擇入住人數</h4>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      {/* Adult Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>大人</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>18歲以上</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setAdults(Math.max(1, adults - 1))}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #475569', background: 'none', color: '#fff', cursor: 'pointer' }}
          >
            -
          </button>
          <span style={{ fontWeight: 700 }}>{adults}</span>
          <button
            onClick={() => setAdults(adults + 1)}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #475569', background: 'none', color: '#fff', cursor: 'pointer' }}
          >
            +
          </button>
        </div>
      </div>

      {/* Children Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>兒童</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>0 - 17歲</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => handleChildCountChange(-1)}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #475569', background: 'none', color: '#fff', cursor: 'pointer' }}
          >
            -
          </button>
          <span style={{ fontWeight: 700 }}>{children}</span>
          <button
            onClick={() => handleChildCountChange(1)}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #475569', background: 'none', color: '#fff', cursor: 'pointer' }}
          >
            +
          </button>
        </div>
      </div>

      {/* Child Ages Dropdowns */}
      {children > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>請選擇兒童年齡：</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {Array.from({ length: children }).map((_, idx) => (
              <select
                key={idx}
                value={childAges[idx] ?? 6}
                onChange={(e) => handleAgeChange(idx, e.target.value)}
                style={{
                  padding: '0.4rem',
                  borderRadius: '6px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid #334155'
                }}
              >
                {Array.from({ length: 18 }).map((_, age) => (
                  <option key={age} value={age}>{age} 歲</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '0.5rem',
          borderRadius: '8px',
          background: 'var(--primary)',
          color: '#fff',
          border: 'none',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        完成
      </button>
    </div>
  );
}
