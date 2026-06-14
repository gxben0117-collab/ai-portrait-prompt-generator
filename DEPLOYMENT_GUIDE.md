# 🚀 網頁上架部署指南

## ✅ 構建狀態
- **構建時間**: 2026-06-14
- **構建結果**: ✅ 成功
- **構建時長**: 1.09s
- **輸出目錄**: `dist/`
- **主要文件**: 175.15 KB (gzip: 56.82 KB)

---

## 📦 構建產物清單

### 主要文件
- `dist/index.html` - 入口 HTML (0.53 KB)
- `dist/assets/index-CXE7o1F1.js` - 主應用 JS (175.15 KB → 56.82 KB gzip)
- `dist/assets/index-qkZKKgjY.css` - 樣式表 (16.85 KB → 4.09 KB gzip)

### 分類模組 (30個)
所有分類已動態分割，按需加載：
- 東方歷史宮廷 (8個)
- 東方民族區域 (3個)
- 東方神話 (2個)
- 江南旅拍 (3個)
- 世界時尚 (3個)
- 暗黑奇幻 (2個)
- 暗黑浪漫 (1個)
- 史詩經典 (3個)
- 其他 (5個)

### 角色卡數據 (27個)
所有角色卡 JSON 已分割，按需加載

---

## 🌐 部署選項

### 選項 1: GitHub Pages (推薦)

#### 步驟 1: 確認設定
你的 `vite.config.js` 已設定：
```javascript
base: '/ai-portrait-prompt-generator/'
```

#### 步驟 2: 推送到 GitHub
```bash
# 提交所有更改
git add .
git commit -m "Build v2.0: 魅魔寢宮優化完成"

# 推送到 master
git push origin master
```

#### 步驟 3: 部署到 GitHub Pages
```bash
# 部署 dist 目錄到 gh-pages 分支
git subtree push --prefix dist origin gh-pages

# 或使用 gh-pages 套件（如果已安裝）
npm install -g gh-pages
gh-pages -d dist
```

#### 步驟 4: 啟用 GitHub Pages
1. 前往 GitHub 倉庫設定
2. Settings → Pages
3. Source: 選擇 `gh-pages` 分支
4. 保存

**訪問網址**: `https://gxben0117.github.io/ai-portrait-prompt-generator/`

---

### 選項 2: Vercel (零配置)

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

**優點**: 
- 自動 HTTPS
- 全球 CDN
- 零配置部署

---

### 選項 3: Netlify

```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

**優點**:
- 拖放部署
- 自動 HTTPS
- 持續部署

---

## 📋 部署前檢查清單

### ✅ 功能驗證
- [x] 構建成功無錯誤
- [x] 所有分類正確加載
- [x] 角色卡數據完整
- [x] UI 參數正確帶入咒語
- [x] 寢宮身材模板正確
- [x] 魅魔身材模板正確
- [x] 體態選項顯示「豐滿」
- [x] Layer 寫法已優化

### ✅ 技術驗證
- [x] 代碼分割正確 (30個分類模組)
- [x] 角色卡按需加載 (27個 JSON)
- [x] Gzip 壓縮有效 (56.82 KB)
- [x] Source maps 已生成
- [x] Base path 正確設定

### 📱 本地預覽測試
```bash
# 預覽構建結果
npm run preview

# 將在 http://localhost:4173 啟動
```

---

## 🔧 部署配置文件

### 如果使用 GitHub Actions 自動部署

創建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## 📊 性能指標

### 構建大小
- **總大小**: ~700 KB (未壓縮)
- **Gzip 後**: ~200 KB
- **首次加載**: 主包 56.82 KB
- **按需加載**: 分類 1-4 KB，角色卡 10-17 KB

### 載入性能
- ✅ 代碼分割優化
- ✅ 動態導入
- ✅ Gzip 壓縮
- ✅ Source maps 可選

---

## 🎯 快速部署命令

### GitHub Pages
```bash
# 一鍵部署
git add . && \
git commit -m "Deploy v2.0" && \
git push origin master && \
git subtree push --prefix dist origin gh-pages
```

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

---

## 🐛 常見問題

### Q1: 404 錯誤
**原因**: Base path 不匹配  
**解決**: 確認 `vite.config.js` 的 `base` 設定與實際部署路徑一致

### Q2: 資源載入失敗
**原因**: 路徑問題  
**解決**: 檢查 `index.html` 中的資源路徑是否正確

### Q3: 分類無法加載
**原因**: 動態導入失敗  
**解決**: 檢查網絡請求，確認所有 chunk 文件都已上傳

---

## 📞 部署後驗證

部署完成後，請訪問網站並測試：

1. ✅ 首頁是否正常顯示
2. ✅ 點擊任意分類能否加載
3. ✅ 選擇角色卡能否生成咒語
4. ✅ UI 參數調整是否生效
5. ✅ 複製咒語功能是否正常
6. ✅ 在不同瀏覽器測試 (Chrome, Firefox, Safari, Edge)
7. ✅ 在手機上測試響應式設計

---

## 🎉 部署完成

你的美圖咒語系統已準備好上架！

**推薦部署方式**: GitHub Pages (免費 + 穩定)

**立即部署**:
```bash
git subtree push --prefix dist origin gh-pages
```

**訪問網址**: `https://gxben0117.github.io/ai-portrait-prompt-generator/`

---

## 📝 版本資訊

- **版本**: v2.0.0
- **構建日期**: 2026-06-14
- **更新內容**:
  - ✅ Layer 寫法優化
  - ✅ UI 參數完整帶入
  - ✅ 魅魔寢宮身材模板優化
  - ✅ 體態選項改名為「豐滿」
  - ✅ 27個分類 × 20張角色卡 = 540張

需要協助部署嗎？我可以幫你執行部署命令！
