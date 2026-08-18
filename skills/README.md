# Skills 技能庫說明與規範

本目錄存放專屬於本專案 `2026_assist_081801` 的**擴充技能 (Skills)**。

## 什麼是 Skill？
Skill 是將特定高頻任務的 SOP（包含語境說明、步驟、評估標準與輔助腳本）打包成的 Markdown 模組。

## 目錄結構
每一個 Skill 獨立為一個資料夾，並且必須包含 `SKILL.md`：

```
skills/
├── README.md                  # 本說明檔
└── my-custom-skill/           # 技能名稱
    ├── SKILL.md               # 核心 YAML 描述與標準 SOP 指引
    ├── scripts/               # (可選) 輔助 PowerShell / Python 腳本
    └── references/            # (可選) 參考資料或範本
```

## 新增 Skill 步驟
1. 複製 `template-skill/SKILL.md` 範本。
2. 填寫 YAML Frontmatter 裡面的 `name` 與 `description`（關鍵：`description` 寫明觸發情境，Agent 才能自動辨識！）。
3. 撰寫詳細的作業步驟。
