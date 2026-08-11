import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SearchHeader from './components/SearchHeader';
import ScraperConsole from './components/ScraperConsole';
import StayList from './components/StayList';
import PackageTourList from './components/PackageTourList';
import FamilyAttractionList from './components/FamilyAttractionList';
import FamilyTheaterList from './components/FamilyTheaterList';
import PriceChart from './components/PriceChart';
import PriceAlertModal from './components/PriceAlertModal';
import SavedStaysModal from './components/SavedStaysModal';
import LineBotModal from './components/LineBotModal';
import Footer from './components/Footer';
import { mockCities } from '../server/mockData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('stays');
  const [selectedCity, setSelectedCity] = useState('');
  const [stayType, setStayType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('price_asc');

  const getTodayStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowStr = (addDays = 2) => {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Dates & Guests Filter
  const [checkInDate, setCheckInDate] = useState(getTodayStr());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowStr(2));
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
  const [isLineBotModalOpen, setIsLineBotModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const local = localStorage.getItem('staypulse_saved_items');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('staypulse_saved_items', JSON.stringify(savedItems));
    } catch (err) {
      console.error('Failed to persist saved items:', err);
    }
  }, [savedItems]);

  const currentCityObj = mockCities.find(c => {
    if (!selectedCity) return false;
    const q = selectedCity.trim().toLowerCase();
    return c.id.toLowerCase() === q ||
      c.name.toLowerCase().includes(q) ||
      (c.aliases && c.aliases.some(a => a.toLowerCase() === q || q.includes(a.toLowerCase())));
  }) || mockCities[0];

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab === 'family') {
      setSelectedCity('台中');
    } else {
      setSelectedCity('');
    }
  };

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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* 1. Left Command Studio Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        stayType={stayType}
        setStayType={setStayType}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        adultsCount={adultsCount}
        setAdultsCount={setAdultsCount}
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
        onOpenAlertModal={() => setIsAlertModalOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenLineBotModal={() => setIsLineBotModalOpen(true)}
        toggleConsole={() => setIsConsoleOpen(!isConsoleOpen)}
        isConsoleOpen={isConsoleOpen}
        savedCount={savedItems.length}
        onTriggerScrape={fetchData}
        isScraping={isScraping}
      />

      {/* 2. Right Main Studio Canvas Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        
        <div style={{ padding: '24px 28px', flex: 1 }}>
          
          {/* Workspace Top Command Bar */}
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

          {/* Scraper Terminal Console Modal/Drawer */}
          {isConsoleOpen && (
            <ScraperConsole
              logs={logs}
              isScraping={isScraping}
              onClose={() => setIsConsoleOpen(false)}
              onClearLogs={() => setLogs([])}
            />
          )}

          {/* Main View Area */}
          <main>
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
                onCityChange={(city) => { setSelectedCity(city); }}
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

        </div>

        {/* Studio Footer */}
        <Footer
          onOpenLineBotModal={() => setIsLineBotModalOpen(true)}
          onOpenConsole={() => setIsConsoleOpen(true)}
        />

      </div>

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

      <LineBotModal
        isOpen={isLineBotModalOpen}
        onClose={() => setIsLineBotModalOpen(false)}
      />

    </div>
  );
}
