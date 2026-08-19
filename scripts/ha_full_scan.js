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
      console.log(`=== Home Assistant 全量實體掃描 (共 ${states.length} 個實體) ===\n`);

      // 分類整理
      const categories = {};

      states.forEach(s => {
        const domain = s.entity_id.split('.')[0];
        if (!categories[domain]) {
          categories[domain] = [];
        }
        categories[domain].push(s);
      });

      console.log('📊 Domain 分類統計：');
      Object.keys(categories).forEach(d => {
        console.log(`  - ${d}: ${categories[d].length} 個實體`);
      });
      console.log('\n========================================\n');

      // 列出所有 light, switch, scene, automation, group, button, climate 實體
      const targetDomains = ['light', 'switch', 'scene', 'automation', 'group', 'button', 'climate', 'cover', 'fan'];

      targetDomains.forEach(domain => {
        if (categories[domain] && categories[domain].length > 0) {
          console.log(`\n🔹 Domain: [${domain}] (${categories[domain].length} 個)`);
          categories[domain].forEach(s => {
            const name = s.attributes.friendly_name || '無名稱';
            console.log(`   └─ Entity ID: ${s.entity_id}`);
            console.log(`      名稱: ${name}`);
            console.log(`      狀態: ${s.state}`);
          });
        }
      });

    } else {
      console.log(`⚠️ 失敗 (${res.status}): ${await res.text()}`);
    }
  } catch (err) {
    console.log(`❌ 錯誤: ${err.message}`);
  }
}

main();
