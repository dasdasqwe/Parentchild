import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchPanel from './components/SearchPanel';
import HotelGrid from './components/HotelGrid';
import ExplorePage from './components/ExplorePage';
import ItineraryBuilder from './components/ItineraryBuilder';
import LineBotDrawer from './components/LineBotDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLineDrawerOpen, setIsLineDrawerOpen] = useState(false);

  useEffect(() => {
    // Initial Hotel Load
    handleSearch({});
  }, []);

  const handleSearch = async (params) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/stays/search?${query}`);
      const json = await res.json();
      setHotels(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleLineDrawer={() => setIsLineDrawerOpen(true)}
      />

      <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {activeTab === 'hotels' && (
          <div>
            <SearchPanel onSearch={handleSearch} />
            <HotelGrid hotels={hotels} loading={loading} />
          </div>
        )}

        {activeTab === 'explore' && <ExplorePage />}

        {activeTab === 'itinerary' && <ItineraryBuilder />}
      </main>

      {/* LINE Bot Simulator Drawer */}
      <LineBotDrawer
        isOpen={isLineDrawerOpen}
        onClose={() => setIsLineDrawerOpen(false)}
      />

      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#64748b',
        fontSize: '0.85rem'
      }}>
        © 2026 StayPulse 親子資訊 LINE Bot — 全方位親子旅遊比價與景點探索平台
      </footer>
    </div>
  );
}
