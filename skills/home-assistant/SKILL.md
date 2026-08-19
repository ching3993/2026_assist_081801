---
name: home-assistant
description: 智慧家庭控制技能：當使用者要求控制燈光、氣氛燈、開關、冷氣、查詢家電狀態，或是離家/到家模式時觸發。
---

# Home Assistant 智慧家居控制技能 (Home Assistant Skill)

本技能讓 AI 代理人透過 Home Assistant MCP Server 直接掌控智慧家居環境。

## 常用指令與情境

### 1. 💡 燈光與情境控制
- **開啟/關閉燈光**：對特定房間或設備進行控制。
- **調整亮度與顏色**：將書房燈光調整為暖黃光或專注白光。

### 2. ❄️ 空調與氣候控制
- **開啟冷氣/暖氣**：設定特定溫度與模式（如 26 度冷氣）。

### 3. 🏠 全屋模式 (Scenes)
- **離家模式**：關閉全屋燈光、空調與插座。
- **專注工作模式**：開啟書房燈光、設定背景音樂或情境。

## MCP 工具對照
掛載 `homeassistant` MCP Server 後，Agent 可直接發動：
- `ha_get_state` / `get_state`：查詢特定設備目前的開關或數值。
- `ha_call_service` / `call_service`：觸發 `light.turn_on`, `climate.set_temperature`, `scene.turn_on` 等 Service。
