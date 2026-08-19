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

function isAscii(str) {
  return /^[\x00-\x7F]*$/.test(str);
}

// 常用自然語言對照表
const ENTITY_ALIAS = {
  '餐廳燈': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c13b6c_relay_2' },
  'dining': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c13b6c_relay_2' },
  'dining_room': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c13b6c_relay_2' },
  
  '廚房燈': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c13b6c_relay_1' },
  'kitchen': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c13b6c_relay_1' },
  
  '八樓客廳燈': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c14e11_relay_2' },
  '客廳燈': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c14e11_relay_2' },
  
  '戶外燈': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c14e11_relay_1' },
  'outdoor': { domain: 'switch', entity_id: 'switch.wall_switch_2_cbu_c14e11_relay_1' }
};

async function main() {
  if (!HA_URL || !HA_TOKEN || !isAscii(HA_TOKEN) || HA_TOKEN.includes('請在此貼上')) {
    console.log('❌ 尚未完成 Home Assistant 連線資訊設定！');
    process.exit(1);
  }

  let domain = process.argv[2] || 'switch';
  let service = process.argv[3] || 'turn_on';
  let target = process.argv[4] || '餐廳燈';

  // 檢查別名
  if (ENTITY_ALIAS[target]) {
    domain = ENTITY_ALIAS[target].domain;
    target = ENTITY_ALIAS[target].entity_id;
  }

  const cleanUrl = HA_URL.replace(/\/$/, '');
  const url = `${cleanUrl}/api/services/${domain}/${service}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HA_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entity_id: target })
    });

    if (res.ok) {
      console.log(`✅ 成功執行：已對 ${target} 發送 ${domain}.${service}`);
    } else {
      const text = await res.text();
      console.log(`⚠️ 呼叫失敗 (${res.status}): ${text}`);
    }
  } catch (err) {
    console.log(`❌ 連線 Home Assistant 失敗: ${err.message}`);
  }
}

main();
