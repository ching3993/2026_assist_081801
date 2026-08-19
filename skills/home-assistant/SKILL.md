---
name: home-assistant
description: 智慧家庭控制技能：當使用者要求控制燈光、氣氛燈、開關、冷氣、查詢家電狀態，或是離家/到家模式時觸發。
---

# Home Assistant 智慧家居控制技能 (Home Assistant Skill)

本技能讓 AI 代理人透過 Home Assistant MCP Server 直接掌控智慧家居環境。

## 常用指令與情境

### 1. 餐廳燈光控制 (餐廳燈)
```powershell
node scripts/ha_control.js light turn_on light.dining_room
```

### 2. 離家模式（關閉全屋燈光與開關）
```powershell
node scripts/ha_control.js scene turn_on scene.leaving_home
```

### 3. 開啟專注工作燈
```powershell
node scripts/ha_control.js light turn_on light.study_room
```

## MCP 工具對照
掛載 `homeassistant` MCP Server 後，Agent 可直接發動：
- `ha_get_state` / `get_state`：查詢特定設備目前的開關或數值。
- `ha_call_service` / `call_service`：觸發 `light.turn_on`, `climate.set_temperature`, `scene.turn_on` 等 Service。
