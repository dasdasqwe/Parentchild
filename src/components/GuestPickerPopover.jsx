import React, { useState, useRef, useEffect } from 'react';
import { Users, ChevronDown, Minus, Plus } from 'lucide-react';

export default function GuestPickerPopover({
  rooms = 1,
  setRooms,
  adults = 2,
  setAdults,
  childrenCount = 2,
  setChildrenCount,
  childAges = ['', ''],
  setChildAges
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const circleBtnStyle = (disabled) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid rgba(15, 23, 42, 0.18)',
    background: disabled ? '#f8fafc' : '#ffffff',
    color: disabled ? '#cbd5e1' : '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease'
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      
      {/* Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: '48px',
          padding: '0 16px',
          background: '#ffffff',
          border: '1px solid rgba(15, 23, 42, 0.12)',
          borderRadius: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '210px',
          justifyContent: 'space-between',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 2px rgba(5, 150, 105, 0.2)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={20} color="#334155" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
              {adults}位大人,{childrenCount}位兒童
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>
              {rooms}間客房
            </div>
          </div>
        </div>
        <ChevronDown
          size={18}
          color="#64748b"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '0',
          zIndex: 100,
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.08)',
          padding: '24px',
          width: '330px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>

          {/* Counter 1: 間客房 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>間客房</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                disabled={rooms <= 1}
                onClick={() => setRooms && setRooms(Math.max(1, rooms - 1))}
                style={circleBtnStyle(rooms <= 1)}
              >
                <Minus size={15} />
              </button>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', minWidth: '20px', textAlign: 'center', color: '#0f172a' }}>
                {rooms}
              </span>
              <button
                type="button"
                onClick={() => setRooms && setRooms(rooms + 1)}
                style={circleBtnStyle(false)}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Counter 2: 位大人 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>位大人</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>18歲（含）或以上</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                disabled={adults <= 1}
                onClick={() => setAdults && setAdults(Math.max(1, adults - 1))}
                style={circleBtnStyle(adults <= 1)}
              >
                <Minus size={15} />
              </button>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', minWidth: '20px', textAlign: 'center', color: '#0f172a' }}>
                {adults}
              </span>
              <button
                type="button"
                onClick={() => setAdults && setAdults(adults + 1)}
                style={circleBtnStyle(false)}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Counter 3: 位兒童 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>位兒童</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>0-17歲</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                disabled={childrenCount <= 0}
                onClick={() => setChildrenCount && setChildrenCount(Math.max(0, childrenCount - 1))}
                style={circleBtnStyle(childrenCount <= 0)}
              >
                <Minus size={15} />
              </button>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', minWidth: '20px', textAlign: 'center', color: '#0f172a' }}>
                {childrenCount}
              </span>
              <button
                type="button"
                onClick={() => setChildrenCount && setChildrenCount(childrenCount + 1)}
                style={circleBtnStyle(false)}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Dynamic Per-Child Age Dropdowns */}
          {childrenCount > 0 && (
            <>
              <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 0' }} />
              
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: '1.4', fontWeight: '500' }}>
                請務必輸入正確的兒童年齡以獲得準確房價。
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Array.from({ length: childrenCount }).map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '10px 14px 4px 14px',
                      background: '#ffffff'
                    }}
                  >
                    <label style={{
                      position: 'absolute',
                      top: '-9px',
                      left: '12px',
                      background: '#ffffff',
                      padding: '0 6px',
                      fontSize: '0.72rem',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      第{idx + 1}位兒童年齡
                    </label>

                    <select
                      value={childAges[idx] !== undefined ? childAges[idx] : ''}
                      onChange={(e) => {
                        if (!setChildAges) return;
                        const newAges = [...childAges];
                        newAges[idx] = e.target.value;
                        setChildAges(newAges);
                      }}
                      style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        cursor: 'pointer',
                        padding: '2px 0'
                      }}
                    >
                      <option value="">--請選擇年齡--</option>
                      <option value="0">0歲</option>
                      <option value="1">1歲</option>
                      <option value="2">2歲</option>
                      <option value="3">3歲</option>
                      <option value="4">4歲</option>
                      <option value="5">5歲</option>
                      <option value="6">6歲</option>
                      <option value="7">7歲</option>
                      <option value="8">8歲</option>
                      <option value="9">9歲</option>
                      <option value="10">10歲</option>
                      <option value="11">11歲</option>
                      <option value="12">12歲</option>
                      <option value="13">13歲</option>
                      <option value="14">14歲</option>
                      <option value="15">15歲</option>
                      <option value="16">16歲</option>
                      <option value="17">17歲</option>
                    </select>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}
