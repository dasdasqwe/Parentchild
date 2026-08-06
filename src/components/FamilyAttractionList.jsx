function isExhibitionItem(item) {
  if (!item) return false;
  if (item.exhibitionInfo && item.exhibitionInfo.name) return true;
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('展') || cat.includes('快閃') || cat.includes('季') || cat.includes('祭')) return true;
  const name = (item.name || '').toLowerCase();
  if (name.includes('展') || name.includes('特展') || name.includes('快閃') || name.includes('博覽')) return true;
  return false;
}

export default function FamilyAttractionList({ attractions, savedItems, onToggleSave }) {
  const [subFilter, setSubFilter] = React.useState('all'); // 'all' | 'spots' | 'exhibitions'
  const savedIds = new Set(savedItems.map(s => s.id));

  // 自動分類與數量計算
  const spotItems = attractions.filter(item => !isExhibitionItem(item));
  const exhibitionItems = attractions.filter(item => isExhibitionItem(item));

  const renderCard = (item, idx) => {
    const isSaved = savedIds.has(item.id);
    const locationText = item.location || item.address || `${item.cityName || item.cityId || ''} 熱門觀光景點區`;
    
    // 1. 官網/官方介紹連結 (標題與圖片)
    const officialUrl = item.websiteUrl || item.blogUrl || `https://www.google.com/search?q=${encodeURIComponent(item.name + ' 官網')}`;
    
    // 2. 地圖導覽連結 (下方的地址列)
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + (item.location || item.address || ''))}`;

    return (
      <div key={item.id || idx} className="glass-panel" style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* 1. 圖片 (連結至官網/介紹) */}
        <div style={{ position: 'relative', height: '200px', width: '100%' }}>
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', height: '100%' }}
            title="點擊前往景點官網或介紹"
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </a>
          
          {item.rating && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#fbbf24',
              fontSize: '0.8rem',
              fontWeight: '700',
              pointerEvents: 'none'
            }}>
              <Star size={14} fill="#fbbf24" /> {item.rating}
            </div>
          )}

          <button
            onClick={() => onToggleSave(item)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2
            }}
          >
            <Heart size={18} color="#f43f5e" fill={isSaved ? "#f43f5e" : "transparent"} />
          </button>
        </div>

        {/* 詳情內文 */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            {/* 大標題: 官網/官方介紹超連結 */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-amber)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                title="點擊開啟景點官網 / 介紹"
              >
                <span>{item.name}</span> 🌐
              </a>
            </h3>

            {/* 2. 下方地址: Google Maps 地圖超連結 */}
            <div style={{ marginBottom: '14px' }}>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  maxWidth: '100%'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-amber)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                title="點擊開啟 Google Maps 地圖導覽"
              >
                <MapPin size={16} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  {locationText} 📍
                </span>
              </a>
            </div>

            {/* 3. 特色 */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              borderLeft: '3px solid var(--accent-amber)',
              padding: '10px 12px',
              borderRadius: '0 8px 8px 0',
              fontSize: '0.85rem',
              color: '#fef3c7',
              marginBottom: '14px',
              lineHeight: '1.5'
            }}>
              <span style={{ fontWeight: '700', color: 'var(--accent-amber)', marginRight: '6px' }}>
                💡 特色:
              </span>
              {item.highlights || item.description}
            </div>

            {/* 3.5. 當前熱門展覽 / 特展資訊 */}
            {item.exhibitionInfo && (
              <div style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '10px 12px',
                borderRadius: '8px',
                marginBottom: '14px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  flexWrap: 'wrap',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#a5b4fc' }}>
                    🎨 當前展覽 / 特展活動:
                  </span>
                  {item.exhibitionInfo.date && (
                    <span style={{ fontSize: '0.73rem', color: '#818cf8', background: 'rgba(99, 102, 241, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>
                      📅 {item.exhibitionInfo.date}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                  {item.exhibitionInfo.name}
                </div>
                {item.exhibitionInfo.description && (
                  <div style={{ fontSize: '0.78rem', color: '#c7d2fe', lineHeight: '1.4' }}>
                    {item.exhibitionInfo.description}
                  </div>
                )}
              </div>
            )}

            {/* 4. 設施 */}
            {item.features && item.features.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '6px' }}>
                  🛠️ 設施服務:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.features.map((feat, fIdx) => (
                    <span key={fIdx} style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#6ee7b7',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      fontSize: '0.75rem',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 5. 部落格原文連結 */}
            {item.blogUrl && (
              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
                <a
                  href={item.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                  }}
                >
                  📖 閱讀部落格完整文章導覽
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Baby color="var(--accent-amber)" size={22} />
            熱門親子景點與展覽活動
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            自動歸類為「常態親子景點」與「當期熱門展覽」，並自動即時剔除過期活動
          </p>
        </div>

        {/* 景點 vs 展覽 分離選擇按鈕組 (含自動統計數量) */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubFilter('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: subFilter === 'all' ? '700' : '500',
              background: subFilter === 'all' ? 'var(--accent-amber)' : 'rgba(255, 255, 255, 0.05)',
              color: subFilter === 'all' ? '#0f172a' : 'var(--text-muted)',
              border: subFilter === 'all' ? '1px solid var(--accent-amber)' : '1px solid var(--border-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🌟 全部項目 ({attractions.length})
          </button>
          <button
            onClick={() => setSubFilter('spots')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: subFilter === 'spots' ? '700' : '500',
              background: subFilter === 'spots' ? 'var(--accent-amber)' : 'rgba(255, 255, 255, 0.05)',
              color: subFilter === 'spots' ? '#0f172a' : 'var(--text-muted)',
              border: subFilter === 'spots' ? '1px solid var(--accent-amber)' : '1px solid var(--border-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🎡 親子景點與樂園 ({spotItems.length})
          </button>
          <button
            onClick={() => setSubFilter('exhibitions')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: subFilter === 'exhibitions' ? '700' : '500',
              background: subFilter === 'exhibitions' ? '#818cf8' : 'rgba(255, 255, 255, 0.05)',
              color: subFilter === 'exhibitions' ? '#0f172a' : 'var(--text-muted)',
              border: subFilter === 'exhibitions' ? '1px solid #818cf8' : '1px solid var(--border-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🎨 當期展覽 / 特展活動 ({exhibitionItems.length})
          </button>
        </div>
      </div>

      {/* 根據 subFilter 進行分區展示 */}
      {subFilter === 'all' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {/* 分區一: 常態親子景點與樂園 */}
          {spotItems.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--accent-amber)' }}>
                  🎡 熱門親子景點與樂園 ({spotItems.length})
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {spotItems.map((item, idx) => renderCard(item, idx))}
              </div>
            </div>
          )}

          {/* 分區二: 當期熱門展覽與特展 */}
          {exhibitionItems.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#a5b4fc' }}>
                  🎨 當期熱門展覽與特展活動 ({exhibitionItems.length})
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {exhibitionItems.map((item, idx) => renderCard(item, idx))}
              </div>
            </div>
          )}
        </div>
      )}

      {subFilter === 'spots' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {spotItems.map((item, idx) => renderCard(item, idx))}
        </div>
      )}

      {subFilter === 'exhibitions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {exhibitionItems.map((item, idx) => renderCard(item, idx))}
        </div>
      )}

    </div>
  );
}

