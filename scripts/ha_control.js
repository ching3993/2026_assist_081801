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

        // 如果值被雙引號包圍，提取雙引號內部的字元 (解決行尾註解問題)
        const doubleQuoteMatch = val.match(/^"([^"]*)"/);
        const singleQuoteMatch = val.match(/^'([^']*)'/);

        if (doubleQuoteMatch) {
          val = doubleQuoteMatch[1];
        } else if (singleQuoteMatch) {
          val = singleQuoteMatch[1];
        } else {
          // 沒有引號時，裁切第一個 # 之前的內容
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

async function main() {
  if (!HA_URL || !HA_TOKEN || !isAscii(HA_TOKEN) || HA_TOKEN.includes('請在此貼上')) {
    console.log('❌ 尚未完成 Home Assistant 連線資訊設定！');
    console.log('💡 原因：.env 檔案中的 HA_TOKEN 包含中文字或預設樣板文字。');
    console.log('👉 請編輯專案根目錄的 `.env` 檔案，填入您在 Home Assistant 產生的英數長效 Token。');
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
