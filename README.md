# 個人簡歷一頁式網站

這是一個簡單的一頁式（single-page）個人簡歷範例，包含：

- 個人資訊區塊（Hero / Profile）
- 技能展示（包含能力條）
- 工作 / 經歷時間軸
- 專案作品集展示（可以點擊查看詳細內容，彈跳視窗）
- 聯絡表單（非後端送出，示範）
- 響應式設計與互動（滾動時進場動畫、技能條動畫、專案彈窗）

## 使用方式

1. 在本地開啟 `index.html`：
```markdown
# 個人簡歷一頁式網站

這是一個簡單的一頁式（single-page）個人簡歷範例，包含：

- 個人資訊區塊（Hero / Profile）
- 技能展示（包含能力條）
- 工作 / 經歷時間軸
- 專案作品集展示（可以點擊查看詳細內容，彈跳視窗）
- 聯絡表單（非後端送出，示範）
- 響應式設計與互動（滾動時進場動畫、技能條動畫、專案彈窗）

## 使用方式

1. 在本地開啟 `index.html`：

    ```powershell
    # Windows / PowerShell
    Start-Process index.html
    ```

    或者使用任何簡單的 HTTP server，例如：

    ```powershell
    # 若有 Python 安裝
    python -m http.server 8000
    # 然後在瀏覽器開啟 http://localhost:8000
    ```

## 檔案結構

- `index.html` - 網頁骨架
- `style.css` - 所有樣式
- `script.js` - 用於互動（滑動進場、技能條動畫、專案 Modal、主題切換）
- `README.md` - 使用說明

## 可擴充建議

- 加入後端或第三方服務（例如：Formspree / Netlify Forms）以處理聯絡表單。
- 使用 JSON 或 CMS 管理專案資料並載入動態內容。

## **A/B 測試與決策原因**

以下為兩個候選方案的對照表，說明各自特性與採用考量：

| 方案 | 描述 | 優點 | 缺點 | 最終決定 |
|---|---|---|---|---:|
| A — skills-bars | 使用橫向能力條（progress bars）呈現每項技能的熟練度（百分比） | 直觀呈現量化差異；可加動畫提升互動；適合快速比較技能強弱 | 對無障礙需補文字說明；較佔垂直空間（可優化為折疊或縮放） | 已採用 |
| B — skills-tags | 使用技能標籤（tags / chips）呈現技能名稱與分類 | 視覺輕量、易於排序與過濾；適合強調技能關鍵字 | 無法量化顯示熟練度，對快速比較不友善 | 未採用（保留作為補充視圖） |

專案採用 A（skills-bars）為主要呈現方式，並保留 B 作為未來擴充（例如切換視圖或加入過濾功能）。

## **Revert 練習與原因說明**

- 操作背景：在開發過程中，我建立了 `revert/practice` 分支並對 commit `c01a554`（示例）執行 `git revert`，練習以反向 commit 的方式還原特定變更，而不是使用 `reset`（保留歷史紀錄）。
- 為何使用 `git revert`：`revert` 會建立一個新的 commit，將先前變更以相反操作套回，適合作為公開倉儲的安全還原方式，不會改寫歷史，較適合教學與版本控制練習。
- 發生的問題：在嘗試執行 revert 時遇到本機 `.git/objects` 的檔案系統權限錯誤（Permission denied），導致 Git 無法寫入物件檔案。

- 處理步驟與學到的事：

下面是 Revert 練習的摘要表格，可快速傳達目的、問題與解法：

| 項目 | 說明 |
|---|---|
| 目的 | 練習使用 `git revert` 在保留歷史的情況下還原錯誤變更（教學與審核友好） |
| 遇到的問題 | 在執行 `git revert` 時出現 `.git/objects` 權限錯誤（Permission denied），導致無法寫入物件檔案 |
| 解決步驟 | 1) 用 `takeown`/`icacls` 修復 `.git` 權限；2) 重新執行 `git revert` 產生 revert commit；3) 推到遠端並合併到 `main` |
| 重要 commit（範例） | `2a889bf`（revert commit） / `37f2c6f`（merge revert/practice 到 main） |


## **重要提交（Commit hashes）**

- `37f2c6f` — chore: merge revert/practice (已把 revert 合併到 `main`)
- `2a889bf` — Revert "adjust options" (revert commit，在 `revert/practice` 分支建立)
- `5d409fc` — Merge pull request #2 from yyyehh/feature/skills-bars (A 方案合併 PR)
- `336528a` — Use repo assets for project thumbnails (把 index.html 改為使用 repo 內圖檔)
- `05542f0` — Add project thumbnail images (把三張圖片加入 repo)

你可以在本地使用 `git log --oneline` 或在 GitHub 上查看完整變更記錄。

---

## 注意：GitHub Pages 圖片可用性

- 現象：有時候剛推送靜態資產到 GitHub 後，Pages 會先出現 404，但原始檔案在 `raw.githubusercontent.com` 可以取得（HTTP 200）。這通常是 Pages 的部署或 CDN 傳播延遲造成的暫時狀態。
- 本專案情況：我已檢查過 `assets/project1.jpg`、`assets/project2.jpg`、`assets/project3.jpg` 的狀態，Raw URL 回傳 200；在 2025-12-02 我重新檢查時，Pages 上的三張圖也已回復為 200（可正常顯示）。
- 建議處理：若遇到類似 404，可先等待 2–5 分鐘再重試，並於瀏覽器用 `Ctrl+F5` 強制重新整理；若仍然 404，請至倉庫 Settings → Pages 檢查部署狀態或重新觸發一次推送以啟動新部署。
```