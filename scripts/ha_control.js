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
        const val = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
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
  if (!HA_URL || !HA_TOKEN || HA_TOKEN.includes('請在此貼上')) {
    console.log('❌ 尚未設定 Home Assistant 連線資訊！');
    console.log('💡 請在專案根目錄的 `.env` 檔案中設定：');
    console.log('   HA_URL="http://your-ha-ip:8123"');
    console.log('   HA_TOKEN="your_long_lived_token"');
    process.exit(1);
  }

  const domain = process.argv[2] || 'light';
  const service = process.argv[3] || 'turn_on';
  const entityId = process.argv[4] || 'light.dining_room';

  const cleanUrl = HA_URL.replace(/\/$/, '');
  const url = `${cleanUrl}/api/services/${domain}/${service}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HA_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entity_id: entityId })
    });

    if (res.ok) {
      console.log(`✅ 成功執行：已開啟 ${entityId} (${domain}.${service})`);
    } else {
      const text = await res.text();
      console.log(`⚠️ 呼叫失敗 (${res.status}): ${text}`);
    }
  } catch (err) {
    console.log(`❌ 連線 Home Assistant 失敗: ${err.message}`);
  }
}

main();
