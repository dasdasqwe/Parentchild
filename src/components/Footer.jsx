import React from 'react';
import { Bot, Zap, ShieldCheck, Heart, Github, Globe } from 'lucide-react';

export default function Footer({ onOpenLineBotModal, onOpenConsole }) {
  return (
    <footer style={{
      maxWidth: '1320px',
      margin: '60px auto 0 auto',
      padding: '40px 16px 30px 16px',
      borderTop: '1px solid rgba(15, 23, 42, 0.08)',
      color: '#475569'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '32px',
        marginBottom: '36px'
      }}>

        {/* Column 1: Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#ffffff'
            }}>
              🏨
            </div>
            <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a' }}>
              StayPulse
            </span>
          </div>

          <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: '#475569' }}>
            全球平價住宿比價 • 超值旅遊包套行程 • 最新熱門親子景點展覽與劇團公演排程。整合 Apify Scraper Actor 模式與 LINE Bot 智慧機器人。
          </p>
        </div>

        {/* Column 2: Quick Features */}
        <div>
          <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
            系統核心服務
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <button onClick={onOpenLineBotModal} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', fontWeight: '700', padding: 0 }}>
                🤖 LINE 機器人關鍵字房價查詢
              </button>
            </li>
            <li>
              <button onClick={onOpenConsole} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 0 }}>
                ⚡ Apify / RapidAPI 爬蟲實時控制台
              </button>
            </li>
            <li>
              <span style={{ color: '#475569' }}>👑 全網最低價比價與防禦自動校正</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Status & Tech Stack */}
        <div>
          <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
            運作狀態與技術棧
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: '700' }}>
              <span className="pulsing-dot"></span>
              <span>雲端 API 服務：運作正常 (Port 3001)</span>
            </div>
            <div style={{ color: '#475569' }}>
              技術架構：Vite + React 18 + Node.js Express
            </div>
            <div style={{ color: '#475569' }}>
              爬蟲引擎：Apify Actor / Scraper Pool / Cheerio
            </div>
          </div>
        </div>

      </div>

      <div style={{
        paddingTop: '20px',
        borderTop: '1px solid rgba(15, 23, 42, 0.06)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.82rem'
      }}>
        <span>© 2026 StayPulse | 全球平價住宿比價 • LINE 機器人關鍵字查詢引擎</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} color="#f43f5e" fill="#f43f5e" /> for Smart Travelers
        </span>
      </div>
    </footer>
  );
}
