# 2026_assist_081801 專案開發與 AI 助手規範 (AGENTS.md)

## 專案資訊
- **專案名稱**：2026_assist_081801
- **工作目錄**：`g:\我的雲端硬碟\secondbrain\2026_assist_081801`
- **專案工作摘要路徑**：`g:\我的雲端硬碟\secondbrain\2026_assist_081801 專案工作摘要.md`

## 工作流程規範
1. **開工 (Start Work)**：
   - 觸發 `antigravity_workflow` 技能。
   - 檢查 `AGENTS.md` 與 Obsidian 專案工作摘要。
   - 執行 `git status` 回報進度，不自動變更。

2. **收工 (Finish Work)**：
   - 自動掃描敏感資料（API key, token, 憑證, 真名, `notebooks.json`）。
   - 更新 Obsidian 工作摘要（今日完成事項、下一步行動、心得）。
   - 精確 `git add` 相關變更，生成 Commit Message，確認後 Commit & Push。

## 安全與隱私控制
- 嚴禁 commit API Keys, Tokens, 憑證, NotebookLM `notebooks.json` 或 ID 清單。
- 絕不使用無差別 `git add .`。
- 專案與學生資料嚴禁儲存或提交真名（改用班級代號與座號）。
