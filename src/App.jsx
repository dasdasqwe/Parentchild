import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchHeader from './components/SearchHeader';
import ScraperConsole from './components/ScraperConsole';
import StayList from './components/StayList';
import PackageTourList from './components/PackageTourList';
import FamilyAttractionList from './components/FamilyAttractionList';
import FamilyTheaterList from './components/FamilyTheaterList';
import PriceChart from './components/PriceChart';
import PriceAlertModal from './components/PriceAlertModal';
import SavedStaysModal from './components/SavedStaysModal';
import { mockCities } from '../server/mockData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('stays'); // 'stays' | 'packages' | 'family' | 'theaters' | 'trends'
  const [selectedCity, setSelectedCity] = useState(''); // 預設目的地不設任何地點
  const [stayType, setStayType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('price_asc');

  // Dates & Guests Filter
  const [checkInDate, setCheckInDate] = useState('2026-08-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-12');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);

  // Data states
  const [stays, setStays] = useState([]);
  const [packages, setPackages] = useState([]);
  const [familyAttractions, setFamilyAttractions] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [trendData, setTrendData] = useState([]);

  // Scraper console states
  const [logs, setLogs] = useState([]);
  const [isScraping, setIsScraping] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  // Modals
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  const currentCityObj = mockCities.find(c => c.id === selectedCity) || mockCities[0];

  // 處理頁籤切換 (僅「親子景點與展覽」預設台中市，其它預設不設任何地點)
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab === 'family') {
      setSelectedCity('台中');
    } else {
      setSelectedCity('');
    }
  };

  // Fetch initial data when parameters change
  useEffect(() => {
    fetchData();
  }, [selectedCity, stayType, maxPrice, sortBy, checkInDate, checkOutDate, adultsCount, childrenCount, activeTab]);

  const fetchData = async () => {
    setIsScraping(true);
    try {
      if (activeTab === 'stays') {
        const query = new URLSearchParams({
          cityId: selectedCity,
          type: stayType,
          maxPrice,
          sort: sortBy,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults: adultsCount,
          children: childrenCount
        });
        const res = await fetch(`/api/search?${query}`);
        const data = await res.json();
        if (data.success) {
          setStays(data.data);
          if (data.logs) setLogs(prev => [...data.logs, ...prev].slice(0, 30));
        }
      } else if (activeTab === 'packages') {
        const query = new URLSearchParams({ cityId: selectedCity });
        const res = await fetch(`/api/packages?${query}`);
        const data = await res.json();
        if (data.success) {
          setPackages(data.data);
          if (data.logs) setLogs(prev => [...data.logs, ...prev].slice(0, 30));
        }
      } else if (activeTab === 'family') {
        const familyCity = selectedCity || '台中';
        const query = new URLSearchParams({ cityId: familyCity });
        const res = await fetch(`/api/family-attractions?${query}`);
        const data = await res.json();
        if (data.success) {
          setFamilyAttractions(data.data);
          if (data.logs) setLogs(prev => [...data.logs, ...prev].slice(0, 30));
        }
      } else if (activeTab === 'theaters') {
        const query = new URLSearchParams({ cityId: selectedCity });
        const res = await fetch(`/api/theaters?${query}`);
        const data = await res.json();
        if (data.success) {
          setTheaters(data.data);
          if (data.logs) setLogs(prev => [...data.logs, ...prev].slice(0, 30));
        }
      } else if (activeTab === 'trends') {
        const query = new URLSearchParams({ cityId: selectedCity });
        const res = await fetch(`/api/trends?${query}`);
        const data = await res.json();
        if (data.success) {
          setTrendData(data.data);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsScraping(false);
    }
  };

  const handleToggleSave = (item) => {
    setSavedItems(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveSavedItem = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearSaved = () => {
    setSavedItems([]);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAlertModal={() => setIsAlertModalOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        savedCount={savedItems.length}
        toggleConsole={() => setIsConsoleOpen(!isConsoleOpen)}
        isConsoleOpen={isConsoleOpen}
      />

      {/* Search Header */}
      <SearchHeader
        cities={mockCities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        stayType={stayType}
        setStayType={setStayType}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        adultsCount={adultsCount}
        setAdultsCount={setAdultsCount}
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
        onTriggerScrape={fetchData}
        isScraping={isScraping}
        activeTab={activeTab}
      />

      {/* Live Scraper Terminal Console */}
      {isConsoleOpen && (
        <ScraperConsole
          logs={logs}
          isScraping={isScraping}
          onClose={() => setIsConsoleOpen(false)}
          onClearLogs={() => setLogs([])}
        />
      )}

      {/* Main View Area based on activeTab */}
      <main style={{ padding: '0 16px' }}>
        {activeTab === 'stays' && (
          <StayList
            stays={stays}
            savedStays={savedItems}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'packages' && (
          <PackageTourList
            packages={packages}
            savedItems={savedItems}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'family' && (
          <FamilyAttractionList
            attractions={familyAttractions}
            savedItems={savedItems}
            onToggleSave={handleToggleSave}
            onJumpToStay={() => setActiveTab('stays')}
          />
        )}

        {activeTab === 'theaters' && (
          <FamilyTheaterList
            theaters={theaters}
            savedItems={savedItems}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'trends' && (
          <PriceChart
            trendData={trendData}
            cityId={selectedCity}
            cityName={currentCityObj.name}
          />
        )}
      </main>

      {/* Modals */}
      <PriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        selectedCityName={currentCityObj.name}
      />

      <SavedStaysModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedItems={savedItems}
        onRemoveItem={handleRemoveSavedItem}
        onClearAll={handleClearSaved}
      />

      {/* Footer */}
      <footer style={{
        maxWidth: '1280px',
        margin: '60px auto 0 auto',
        padding: '24px 16px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-glass)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p>© 2026 StayPulse | 平價住宿比價 • 親子劇場 • 超值包套 • 動態抓取引擎</p>
      </footer>

    </div>
  );
}
