# 觸發詞工作流手冊 (WORKFLOWS.md)

本文件紀錄專案中常用的自然語言「觸發詞」及其對應的 Agent 自動化處理流程。

---

## 常用觸發詞列表

### 1. 🚀 `開工` / `Start Work`
- **觸發目的**：載入歷史背景，準備開始工作。
- **Agent 動作**：
  1. 讀取 `AGENTS.md` 與 `MEMORY.md`。
  2. 讀取 Obsidian [`2026_assist_081801 專案工作摘要.md`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801%20專案工作摘要.md) 最近記錄。
  3. 執行 `git status` 檢查專案狀態。
  4. 向使用者回報狀態與下一步建議。

### 2. 🏁 `收工` / `Finish Work`
- **觸發目的**：儲存今日成果，安全的完成版本控制。
- **Agent 動作**：
  1. 掃描專案變更，執行安全敏感資料檢查（排除金鑰、真名、`notebooks.json`）。
  2. 更新每日日誌 [`daily/YYYY-MM-DD.md`](file:///g:/我的雲端硬碟/secondbrain/2026_assist_081801/daily/)。
  3. 更新 Obsidian 專案工作摘要。
  4. 精確 `git add` 變更並產生 commit message，經使用者確認後進行 commit 與 push。

### 3. 🔍 `RDQ 訪談` / `跑 RDQ`
- **觸發目的**：在進行大型新任務前，使用四象限法釐清需求。
- **Agent 動作**：
  1. 啟動 `rdq` 技能。
  2. 進行結構化訪談，詢問明說、隱含與未想到的需求。
  3. 產出一頁需求規格卡。

### 4. 🛠️ `新專案初始化`
- **觸發目的**：從零建立標準 Agentic AI 專案環境。
- **Agent 動作**：
  1. 詢問專案細節（名稱、目錄、Repo、Obsidian 位置）。
  2. 建立 `AGENTS.md`、`MEMORY.md`、`memory.json`、`daily/*.md` 與 `.gitignore`。
  3. 初始化 Git 並創建 GitHub Repository。
