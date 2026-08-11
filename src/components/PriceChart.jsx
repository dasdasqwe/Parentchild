import React from 'react';
import { TrendingUp, Calendar, Lightbulb, Info } from 'lucide-react';

export default function PriceChart({ trendData, cityId, cityName }) {
  if (!trendData || trendData.length === 0) return null;

  const maxPriceVal = Math.max(...trendData.map(d => d.avgPrice)) * 1.25;

  return (
    <div className="glass-panel" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
      
      {/* Header Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp color="var(--primary)" size={22} />
            {cityName} 近 6 個月平價住宿價格走勢與預算分析
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            根據過去 12 個月爬蟲歷史數據計算之月度平均價格變化
          </p>
        </div>

        <div className="badge-green" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
          💡 避開旺季淡季可省下約 35% ~ 50% 住宿開銷
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${trendData.length}, 1fr)`,
          gap: '16px',
          alignItems: 'flex-end',
          height: '200px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-glass)'
        }}>
          {trendData.map((d, idx) => {
            const heightPercent = (d.avgPrice / maxPriceVal) * 100;
            const isPeak = d.month.includes('季') || d.month.includes('節');

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isPeak ? '#fb7185' : '#34d399', marginBottom: '6px' }}>
                  {d.avgPrice}
                </span>

                <div style={{
                  width: '100%',
                  maxWidth: '48px',
                  height: `${heightPercent}%`,
                  background: isPeak 
                    ? 'linear-gradient(to top, var(--accent-rose), #fb7185)' 
                    : 'linear-gradient(to top, var(--primary), var(--accent-cyan))',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.5s ease',
                  boxShadow: isPeak ? '0 0 12px rgba(244, 63, 94, 0.4)' : '0 0 12px rgba(16, 185, 129, 0.4)'
                }}></div>
              </div>
            );
          })}
        </div>

        {/* X-Axis Labels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${trendData.length}, 1fr)`,
          gap: '16px',
          marginTop: '12px',
          textAlign: 'center'
        }}>
          {trendData.map((d, idx) => (
            <div key={idx}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block' }}>
                {d.month}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {d.budgetRange}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Insight Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#34d399', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lightbulb size={16} /> 最佳入手訂房時機
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            建議提前 30~45 天完成搶訂。淡季月份 (如 5月與 6月) Hostel 床位經常有少於 NT$600/晚 的閃電超值價。
          </p>
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#fbbf24', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={16} /> 旺季避坑提示
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            賞櫻季/潑水節等特殊節慶房價漲幅達 80% 以上，建議搭配「超值包套行程」鎖定免費體驗券，分攤房價開銷。
          </p>
        </div>
      </div>

    </div>
  );
}
