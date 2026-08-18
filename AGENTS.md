# 2026_assist_081801 專案開發與 AI 助手規範 (AGENTS.md)

## 專案資訊
- **專案名稱**：2026_assist_081801
- **工作目錄**：`g:\我的雲端硬碟\secondbrain\2026_assist_081801`
- **專案工作摘要路徑**：`g:\我的雲端硬碟\secondbrain\2026_assist_081801 專案工作摘要.md`

## 三層記憶系統 (3-Layer Memory System)
本專案採用雷蒙《21 天創造雷小蒙》三層記憶架構：
1. **第一層 (`MEMORY.md`)**：工作記憶與索引，存放核心偏好、角色設定、專案狀態索引。
2. **第二層 (`memory.json`)**：知識圖譜，存放實體 (Entities) 與關係 (Relations)。
3. **第三層 (`daily/*.md`)**：時序對話日誌，記錄每日 Session 執行紀錄與跨 Session 追蹤點。

## 工作流程規範
1. **開工 (Start Work)**：
   - 觸發 `antigravity_workflow` 技能。
   - 讀取 `AGENTS.md`、`MEMORY.md` 與 Obsidian 專案工作摘要。
   - 執行 `git status` 回報進度，不自動變更。

2. **收工 (Finish Work)**：
   - 自動掃描敏感資料（API key, token, 憑證, 真名, `notebooks.json`）。
   - 更新每日對話日誌 `daily/YYYY-MM-DD.md` 與 Obsidian 工作摘要。
   - 精確 `git add` 相關變更，生成 Commit Message，確認後 Commit & Push。

## 安全與隱私控制
- 嚴禁 commit API Keys, Tokens, 憑證, NotebookLM `notebooks.json` 或 ID 清單。
- 絕不使用無差別 `git add .`。
- 專案與學生資料嚴禁儲存或提交真名（改用班級代號與座號）。
