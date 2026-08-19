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

  try {
    const res = await fetch(`${cleanUrl}/api/states`, {
      headers: {
        'Authorization': `Bearer ${HA_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const states = await res.json();
      console.log(`🔍 正在診斷 HA 中的「廚房燈」與「餐廳燈」狀態...`);
      console.log(`總實體數: ${states.length}\n`);

      // 1. 關鍵字搜尋 (廚, 房, 餐, 廳, kit, din)
      const keywords = ['廚', '房', '餐', '廳', 'kit', 'din', 'cook'];
      const matched = states.filter(s => {
        const id = s.entity_id.toLowerCase();
        const name = (s.attributes.friendly_name || '').toLowerCase();
        return keywords.some(k => id.includes(k) || name.includes(k));
      });

      console.log(`🎯 關鍵字 (廚/餐/kit/din) 匹配結果 (${matched.length} 個):`);
      if (matched.length === 0) {
        console.log('   ⚠️ 未在目前活躍實體中發現包含「廚房」或「餐廳」關鍵字的 Entity！');
      } else {
        matched.forEach(s => {
          console.log(`   - Entity ID: ${s.entity_id} (${s.attributes.friendly_name || '無名稱'}) [狀態: ${s.state}]`);
        });
      }

      console.log('\n----------------------------------------\n');

      // 2. 檢視所有處於 unavailable (離線/停用) 的燈光與開關
      const unavailableSwitches = states.filter(s => (s.entity_id.startsWith('light.') || s.entity_id.startsWith('switch.')) && (s.state === 'unavailable' || s.state === 'unknown'));

      console.log(`🔌 目前處於 離線/停用 (unavailable/unknown) 的燈具與開關 (${unavailableSwitches.length} 個):`);
      unavailableSwitches.forEach(s => {
        console.log(`   - Entity ID: ${s.entity_id}`);
        console.log(`     名稱: ${s.attributes.friendly_name || '無名稱'}`);
      });

    } else {
      console.log(`⚠️ API 錯誤 (${res.status})`);
    }
  } catch (err) {
    console.log(`❌ 錯誤: ${err.message}`);
  }
}

main();
