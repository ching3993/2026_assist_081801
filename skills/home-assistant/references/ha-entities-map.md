# Home Assistant 全屋實體與對照清單 (ha-entities-map.md)

本文件紀錄專案目前掃描出的所有硬體設備 Entity ID 與自然語言對照名稱。

---

## 1. 💡 燈光與壁面開關 (Lights & Switches)

| 自然語言名稱 (Alias) | 實體 ID (Entity ID) | Domain | 說明 / 狀態 |
| :--- | :--- | :--- | :--- |
| **餐廳燈** / `dining` / `dining_room` | `switch.wall_switch_2_cbu_c13b6c_relay_2` | `switch` | ✅ 實測成功控制 |
| **廚房燈** / `kitchen` | `switch.wall_switch_2_cbu_c13b6c_relay_1` | `switch` | ✅ 實測成功控制 |
| **八樓客廳燈** / `living_room` | `switch.wall_switch_2_cbu_c14e11_relay_2` | `switch` | ✅ 可用 |
| **戶外燈** / `outdoor` | `switch.wall_switch_2_cbu_c14e11_relay_1` | `switch` | ✅ 可用 |
| **壁面開關 1** | `switch.wall_switch_1_cbu_c2f7a6_realy_1` | `switch` | 實體開關 |
| **壁面開關 2 (按鈕 1)** | `switch.wall_switch_2_cbu_17d1d7_relay_1` | `switch` | 雙鍵開關 1 |
| **壁面開關 2 (按鈕 2)** | `switch.wall_switch_2_cbu_17d1d7_relay_2` | `switch` | 雙鍵開關 2 |
| **Zigbee 雙鍵開關 (上)** | `switch.0x54ef4410004bbe1d_top` | `switch` | 上鍵開關 |
| **Zigbee 雙鍵開關 (下)** | `switch.0x54ef4410004bbe1d_bottom` | `switch` | 下鍵開關 |
| **小米/Aqara 開關** | `switch.0x00158d000268d7af` | `switch` | Aqara 無線開關 |

---

## 2. ❄️ 空調與家電 (Climate & Appliances)

| 自然語言名稱 | 實體 ID (Entity ID) | Domain | 說明 |
| :--- | :--- | :--- | :--- |
| **客廳冷氣** | `climate.ke_ting_leng_qi` | `climate` | 支援 `heat_cool`, `off`, 溫度調整 |
| **客廳電視** | `media_player.ke_ting_dian_shi` | `media_player` | 影音播放器 |
| **TP-Link 延長線插座 1~6** | `switch.tp_link_power_strip_9050_cha_shang_1~6` | `switch` | 各插座單獨電源控制 |

---

## 3. 🤖 自動化與情境 (Automations & Scenes)

| 自動化名稱 | 實體 ID (Entity ID) | 說明 |
| :--- | :--- | :--- |
| **定時啟動** | `automation.jian_li_xin_de_zi_dong_hua` | 定時腳本 |
