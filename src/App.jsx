import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchPanel from './components/SearchPanel';
import HotelGrid from './components/HotelGrid';
import PaginationBar from './components/PaginationBar';
import LineBotDrawer from './components/LineBotDrawer';
import SavedStaysModal from './components/SavedStaysModal';
import Footer from './components/Footer';

export default function App() {
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

  // State Management
  const [destination, setDestination] = useState('');
  const [sortBy, setSortBy] = useState('price_asc'); // 'price_asc' | 'price_desc' | 'rating_desc'
  const [maxPrice, setMaxPrice] = useState(10000);
  const [stayType, setStayType] = useState('all');
  const [checkInDate, setCheckInDate] = useState(getTodayStr());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowStr(2));
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Data & Loading States
  const [stays, setStays] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [isSearching, setIsSearching] = useState(false);

  // Modals
  const [isLineBotDrawerOpen, setIsLineBotDrawerOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
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

  // Reset page to 1 when search inputs change
  useEffect(() => {
    setCurrentPage(1);
  }, [destination, sortBy, maxPrice, stayType, checkInDate, checkOutDate]);

  // Fetch hotel data from backend API
  useEffect(() => {
    fetchStaysData();
  }, [destination, sortBy, maxPrice, stayType, checkInDate, checkOutDate, currentPage]);

  const fetchStaysData = async () => {
    setIsSearching(true);
    try {
      const query = new URLSearchParams({
        destination: destination.trim(),
        sort: sortBy,
        maxPrice,
        type: stayType,
        page: currentPage,
        pageSize: pageSize,
        checkIn: checkInDate,
        checkOut: checkOutDate
      });

      const res = await fetch(`/api/stays/search?${query}`);
      const data = await res.json();
      if (data.success) {
        setStays(data.data || []);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      }
    } catch (err) {
      console.error('Fetch Stays Error:', err);
    } finally {
      setIsSearching(false);
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      {/* 1. Clean Minimalist Navbar */}
      <Navbar
        onOpenLineBotDrawer={() => setIsLineBotDrawerOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        savedCount={savedItems.length}
      />

      {/* 2. Main Page Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', flex: 1, width: '100%' }}>
        
        {/* Search & Sort Panel */}
        <SearchPanel
          destination={destination}
          setDestination={setDestination}
          sortBy={sortBy}
          setSortBy={setSortBy}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          stayType={stayType}
          setStayType={setStayType}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          onSearch={fetchStaysData}
          isSearching={isSearching}
        />

        {/* Hotel Grid Canvas */}
        <HotelGrid
          stays={stays}
          savedStays={savedItems}
          onToggleSave={handleToggleSave}
          destination={destination}
        />

        {/* Multi-page Pagination Bar */}
        <PaginationBar
          pagination={pagination}
          onPageChange={(p) => setCurrentPage(p)}
        />

      </main>

      {/* 3. LINE Bot Testing Drawer */}
      <LineBotDrawer
        isOpen={isLineBotDrawerOpen}
        onClose={() => setIsLineBotDrawerOpen(false)}
      />

      {/* 4. Saved Stays Modal */}
      <SavedStaysModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedItems={savedItems}
        onRemoveItem={handleRemoveSavedItem}
        onClearAll={handleClearSaved}
      />

      {/* 5. Clean Footer */}
      <Footer
        onOpenLineBotModal={() => setIsLineBotDrawerOpen(true)}
        onOpenConsole={() => {}}
      />

    </div>
  );
}
