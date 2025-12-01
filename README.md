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