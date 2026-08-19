const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const config = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const idx = line.indexOf('=');
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();

        const doubleQuoteMatch = val.match(/^"([^"]*)"/);
        const singleQuoteMatch = val.match(/^'([^']*)'/);

        if (doubleQuoteMatch) {
          val = doubleQuoteMatch[1];
        } else if (singleQuoteMatch) {
          val = singleQuoteMatch[1];
        } else {
          const commentIdx = val.indexOf('#');
          if (commentIdx !== -1) {
            val = val.slice(0, commentIdx).trim();
          }
        }
        config[key] = val;
      }
    });
  }
  return config;
}

const env = loadEnv();
const HA_URL = process.env.HA_URL || env.HA_URL;
const HA_TOKEN = process.env.HA_TOKEN || env.HA_TOKEN;

async function main() {
  if (!HA_URL || !HA_TOKEN) {
    console.log('❌ 尚未設定 HA_URL 或 HA_TOKEN');
    process.exit(1);
  }

  const cleanUrl = HA_URL.replace(/\/$/, '');
  const url = `${cleanUrl}/api/states`;

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${HA_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const states = await res.json();
      console.log(`🔍 全屋共找到 ${states.length} 個設備。\n以下為所有 active / 具備中文名稱的燈光與開關：\n`);

      states.forEach(s => {
        const id = s.entity_id;
        const name = s.attributes.friendly_name || '';
        // 印出非 unavailable 或是含有中文 friendly_name 的設備
        if ((id.startsWith('light.') || id.startsWith('switch.') || name) && s.state !== 'unavailable') {
          console.log(`📌 Entity ID: ${id}`);
          console.log(`   名稱: ${name}`);
          console.log(`   狀態: ${s.state}`);
          console.log('----------------------------------------');
        }
      });
    }
  } catch (err) {
    console.log(`❌ 連線失敗: ${err.message}`);
  }
}

main();
