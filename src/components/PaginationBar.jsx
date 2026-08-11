import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationBar({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } = pagination;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '20px',
      border: '1px solid rgba(15, 23, 42, 0.08)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
    }}>

      {/* Info Stats */}
      <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '600' }}>
        顯示第 <strong style={{ color: '#0f172a' }}>{currentPage}</strong> 頁，共 <strong style={{ color: '#059669' }}>{totalPages}</strong> 頁 (共 {totalCount} 筆飯店比價)
      </div>

      {/* Page Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

        {/* Prev Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          style={{
            height: '38px',
            padding: '0 12px',
            borderRadius: '10px',
            background: hasPrevPage ? '#ffffff' : '#f1f5f9',
            color: hasPrevPage ? '#0f172a' : '#cbd5e1',
            border: '1px solid rgba(15, 23, 42, 0.1)',
            cursor: hasPrevPage ? 'pointer' : 'not-allowed',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.84rem'
          }}
        >
          <ChevronLeft size={16} />
          <span>上一頁</span>
        </button>

        {/* Numbers */}
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: p === currentPage ? '#059669' : '#ffffff',
              color: p === currentPage ? '#ffffff' : '#0f172a',
              border: p === currentPage ? 'none' : '1px solid rgba(15, 23, 42, 0.1)',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.88rem'
            }}
          >
            {p}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          style={{
            height: '38px',
            padding: '0 12px',
            borderRadius: '10px',
            background: hasNextPage ? '#ffffff' : '#f1f5f9',
            color: hasNextPage ? '#0f172a' : '#cbd5e1',
            border: '1px solid rgba(15, 23, 42, 0.1)',
            cursor: hasNextPage ? 'pointer' : 'not-allowed',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.84rem'
          }}
        >
          <span>下一頁</span>
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}
