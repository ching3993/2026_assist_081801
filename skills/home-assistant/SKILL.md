---
name: home-assistant
description: 智慧家庭控制技能：當使用者發出控制燈光（開燈、關燈、餐廳燈、廚房燈、客廳燈、戶外燈）、家電（冷氣、電視）、離家/到家模式，或查詢智慧家居狀態等自然語言指令時自動觸發。
---

# Home Assistant 智慧家居控制技能 (Home Assistant Skill)

本技能授權 AI 代理人（阿芝）透過 Home Assistant REST API 腳本與 MCP Server 進行智慧家庭設備控制與狀態查詢。

---

## 🎯 核心運作 SOP

當收到使用者關於智慧家庭的指令時，請按照以下步驟執行：

### 步驟 1：識別目標設備與控制語意
- **開燈 / 開啟**：`turn_on`
- **關燈 / 關閉**：`turn_off`
- **狀態查詢**：執行 `node scripts/ha_diagnose.js` 或查詢 API

### 步驟 2：對照核心家電設備 ID (Alias Mapping)
參考對照表（詳細清單見 [`references/ha-entities-map.md`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801/skills/home-assistant/references/ha-entities-map.md)）：

- **餐廳燈** ➔ `switch.wall_switch_2_cbu_c13b6c_relay_2` (Domain: `switch`)
- **廚房燈** ➔ `switch.wall_switch_2_cbu_c13b6c_relay_1` (Domain: `switch`)
- **八樓客廳燈** ➔ `switch.wall_switch_2_cbu_c14e11_relay_2` (Domain: `switch`)
- **戶外燈** ➔ `switch.wall_switch_2_cbu_c14e11_relay_1` (Domain: `switch`)
- **客廳冷氣** ➔ `climate.ke_ting_leng_qi` (Domain: `climate`)

### 步驟 3：執行 Node.js 控制腳本
使用 `run_command` 工具發送終端命令：

```powershell
# 控制指令格式：node scripts/ha_control.js <domain> <service> <target_name_or_entity_id>

# 範例 1：點亮餐廳燈
node scripts/ha_control.js switch turn_on 餐廳燈

# 範例 2：關閉廚房燈
node scripts/ha_control.js switch turn_off 廚房燈

# 範例 3：控制特定 Entity ID
node scripts/ha_control.js switch turn_on switch.wall_switch_2_cbu_c14e11_relay_2
```

### 步驟 4：未知或新設備之診斷與定位 SOP
若使用者要求控制未包含在對照表中的設備，請自動執行深層掃描診斷腳本：

```powershell
node scripts/ha_diagnose.js
```

從掃描結果中找出對應的 Entity ID，並向使用者回報或自動擴充至 `scripts/ha_control.js` 的 `ENTITY_ALIAS` 中。

---

## 🛠️ 輔助工具腳本一覽
- [`scripts/ha_control.js`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801/scripts/ha_control.js)：主要家電控制腳本（自動載入 `.env`）。
- [`scripts/ha_diagnose.js`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801/scripts/ha_diagnose.js)：關鍵字設備診斷與離線實體掃描。
- [`scripts/ha_full_scan.js`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801/scripts/ha_full_scan.js)：全量實體分類統計腳本。
