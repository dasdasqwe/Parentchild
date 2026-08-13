import React, { useState, useEffect } from 'react';
import { Compass, Ticket, Sparkles, MapPin } from 'lucide-react';
import { AttractionCard, ShowCard } from './ExploreCards';

export default function ExplorePage() {
  const [activeSubTab, setActiveSubTab] = useState('attractions');
  const [city, setCity] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [shows, setShows] = useState([]);
  const [openDataExhibits, setOpenDataExhibits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [city, activeSubTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeSubTab === 'attractions') {
        const res = await fetch(`/api/explore/attractions?city=${encodeURIComponent(city)}`);
        const json = await res.json();
        setAttractions(json.data || []);
      } else if (activeSubTab === 'shows') {
        const res = await fetch(`/api/explore/shows?city=${encodeURIComponent(city)}`);
        const json = await res.json();
        setShows(json.data || []);
      } else if (activeSubTab === 'exhibits') {
        const res = await fetch(`/api/family-attractions`);
        const json = await res.json();
        setOpenDataExhibits(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass color="#10b981" />
            全台親子景點與特別展覽探索
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            探索手作農場、室內樂園與文化部精選兒童劇團演出
          </p>
        </div>

        {/* Sub Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.3rem', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveSubTab('attractions')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeSubTab === 'attractions' ? '#10b981' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🎠 親子景點
          </button>
          <button
            onClick={() => setActiveSubTab('shows')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeSubTab === 'shows' ? '#ec4899' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🎭 兒童劇場/表演
          </button>
          <button
            onClick={() => setActiveSubTab('exhibits')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeSubTab === 'exhibits' ? '#6366f1' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🏛 文化展覽 (Open Data)
          </button>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>正在加載熱門景點資訊...</div>
      ) : activeSubTab === 'attractions' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {attractions.map(a => <AttractionCard key={a.id} attraction={a} />)}
        </div>
      ) : activeSubTab === 'shows' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {shows.map(s => <ShowCard key={s.id} show={s} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {openDataExhibits.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700, marginBottom: '0.4rem' }}>
                文化部 Open Data 展覽
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem' }}>
                📍 {item.location}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, marginBottom: '0.3rem' }}>
                🎫 {item.price}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                📅 {item.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
