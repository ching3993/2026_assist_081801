import os
import sys
import requests

def load_env():
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    config = {}
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    config[k.strip()] = v.strip().strip('"').strip("'")
    return config

env = load_env()
HA_URL = os.getenv("HA_URL") or env.get("HA_URL", "").rstrip("/")
HA_TOKEN = os.getenv("HA_TOKEN") or env.get("HA_TOKEN", "")

def main():
    if not HA_URL or not HA_TOKEN or "請在此貼上" in HA_TOKEN:
        print("❌ 尚未設定 Home Assistant 連線資訊！")
        print("💡 請在專案根目錄的 `.env` 檔案中填寫實際的 HA_URL 與 HA_TOKEN。")
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {HA_TOKEN}",
        "Content-Type": "application/json",
    }

    # 命令解析: python scripts/ha_control.py light turn_on light.dining_room
    domain = sys.argv[1] if len(sys.argv) > 1 else "light"
    service = sys.argv[2] if len(sys.argv) > 2 else "turn_on"
    entity_id = sys.argv[3] if len(sys.argv) > 3 else "light.dining_room"

    url = f"{HA_URL}/api/services/{domain}/{service}"
    payload = {"entity_id": entity_id}

    try:
        res = requests.post(url, headers=headers, json=payload, timeout=10)
        if res.status_code == 200:
            print(f"✅ 成功執行：開啟 {entity_id} ({domain}.{service})")
        else:
            print(f"⚠️ 呼叫失敗 ({res.status_code}): {res.text}")
    except Exception as e:
        print(f"❌ 連線失敗: {e}")

if __name__ == "__main__":
    main()
