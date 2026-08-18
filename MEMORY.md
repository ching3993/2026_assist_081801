# 2026_assist_081801 - 短期工作記憶與索引 (MEMORY.md)

> [!NOTE]
> 本檔案為「三層記憶架構」的第一層（工作記憶與索引）。每次 AI Session 啟動時讀取，保持精簡，記錄核心偏好與專案狀態地圖。

---

## 1. 助手與使用者設定 (Profiles)
- **AI 助手名稱**：阿芝 (Antigravity Assistant)
- **對答語言**：繁體中文（Taiwan）
- **使用者稱呼**：主人 / 使用者
- **作業系統環境**：Windows (PowerShell)

## 2. 進行中專案與索引 (Active Projects Index)
- **`2026_assist_081801`**：
  - **目標**：打造個人化 AI Agent 代理人系統與工作流自動化。
  - **儲存庫**：[GitHub - ching3993/2026_assist_081801](https://github.com/ching3993/2026_assist_081801)
  - **Obsidian 專案工作摘要**：[`2026_assist_081801 專案工作摘要.md`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801%20專案工作摘要.md)

## 3. 核心偏好與工作流習慣 (Preferences & Standard Workflows)
- **開工流程**：觸發 `antigravity_workflow`，讀取 `AGENTS.md`、`MEMORY.md` 與工作摘要，回報進度。
- **收工流程**：觸發 `antigravity_workflow`，掃描敏感資料、記錄每日日誌 `daily/*.md`，精確 Git add & commit。
- **安全控制**：嚴禁提交 API key、token、憑證、學生真名及 `notebooks.json`。

## 4. 踩坑與注意事項 (Key Lessons & Constraints)
- Windows PowerShell 下命令須使用 `npm.cmd` / `npx.cmd`，嚴禁使用 `cd`。
- 記憶檔案須隨時保持動態更新，避免 Token 浪費。
