---
name: home-assistant
description: 智慧家庭控制技能：當使用者要求控制燈光、氣氛燈、開關、冷氣、查詢家電狀態，或是離家/到家模式時觸發。
---

# Home Assistant 智慧家居控制技能 (Home Assistant Skill)

本技能讓 AI 代理人透過 Home Assistant MCP Server 直接掌控智慧家居環境。

### 1. 餐廳燈與廚房燈控制
- **餐廳燈** (`switch.wall_switch_2_cbu_c13b6c_relay_2`)
- **廚房燈** (`switch.wall_switch_2_cbu_c13b6c_relay_1`)
- **八樓客廳燈** (`switch.wall_switch_2_cbu_c14e11_relay_2`)
- **戶外燈** (`switch.wall_switch_2_cbu_c14e11_relay_1`)

```powershell
# 點亮餐廳燈
node scripts/ha_control.js switch turn_on 餐廳燈

# 點亮廚房燈
node scripts/ha_control.js switch turn_on 廚房燈
```

## MCP 工具對照
掛載 `homeassistant` MCP Server 後，Agent 可直接發動：
- `ha_get_state` / `get_state`：查詢特定設備目前的開關或數值。
- `ha_call_service` / `call_service`：觸發 `light.turn_on`, `climate.set_temperature`, `scene.turn_on` 等 Service。
