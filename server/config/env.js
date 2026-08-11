import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env into process.env if present
try {
  const envPath = path.join(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        const value = vals.join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    });
  }
} catch (e) {
  // Silent fail if .env not accessible
}

export const config = {
  port: process.env.PORT || 3001,
  lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  lineChannelSecret: process.env.LINE_CHANNEL_SECRET || '',
  serpApiKey: process.env.SERPAPI_KEY || ''
};
