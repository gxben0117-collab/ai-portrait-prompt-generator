# 版本管理指南

## 📌 當前版本
**v2.0.1** (2026-06-14)

---

## 🔢 版本號規則

格式：`主版本.次版本.修訂號`

### 修訂號 +0.01 (patch)
適用於：
- 🐛 Bug 修復
- 📝 文字優化
- 🎨 UI 小調整
- ⚙️ 參數微調
- 📚 文檔更新

### 次版本 +0.1 (minor)
適用於：
- ✨ 新增分類
- 🚀 新增功能模組
- 🔧 重要優化
- 🔄 API 變更（向後兼容）

### 主版本 +1.0 (major)
適用於：
- 🏗️ 架構重構
- ⚠️ 破壞性變更
- 🎉 重大功能改版

---

## 📝 更新流程

### 方法 1: 手動更新

#### 步驟 1: 修改版本號
編輯 `package.json`:
```json
{
  "version": "2.0.2"  // 從 2.0.1 改為 2.0.2
}
```

#### 步驟 2: 更新 CHANGELOG.md
在文件頂部新增：
```markdown
## [2.0.2] - 2026-06-14

### 🔧 優化
- 優化了某某功能

### 🐛 修復
- 修復了某某 Bug
```

#### 步驟 3: 構建測試
```bash
npm run build
```

#### 步驟 4: 提交代碼
```bash
git add .
git commit -m "v2.0.2: 優化描述"
git tag v2.0.2
git push origin master --tags
```

#### 步驟 5: 部署上線
```bash
git subtree push --prefix dist origin gh-pages
```

---

### 方法 2: 使用自動化腳本 (Windows)

```bash
# 修訂號更新 (+0.01)
update-version.bat patch "修復了某個 Bug"

# 次版本更新 (+0.1)
update-version.bat minor "新增了某個功能"

# 主版本更新 (+1.0)
update-version.bat major "架構重構"
```

腳本會自動：
1. ✅ 更新 package.json 版本號
2. ⏸️ 提示你手動更新 CHANGELOG.md
3. ✅ 執行構建
4. ✅ 提交代碼並打標籤
5. 📝 顯示下一步操作提示

---

### 方法 3: 使用 npm version (簡單)

```bash
# 修訂號 +0.01
npm version patch -m "v%s: Bug修復"

# 次版本 +0.1
npm version minor -m "v%s: 新增功能"

# 主版本 +1.0
npm version major -m "v%s: 重大更新"
```

**注意**: 仍需手動更新 CHANGELOG.md

---

## 📋 更新檢查清單

### 每次更新前
- [ ] 確認所有功能正常運作
- [ ] 執行測試（如果有）
- [ ] 檢查控制台無錯誤

### 更新時
- [ ] 修改 `package.json` 版本號
- [ ] 更新 `CHANGELOG.md` 記錄
- [ ] 執行 `npm run build` 構建
- [ ] 本地預覽 `npm run preview`
- [ ] 提交代碼並打標籤
- [ ] 推送到 GitHub

### 更新後
- [ ] 部署到 GitHub Pages
- [ ] 訪問線上網站驗證
- [ ] 測試主要功能
- [ ] 在不同瀏覽器測試

---

## 📚 CHANGELOG.md 格式

### 類別標籤
- `✨ 新增` - 新功能
- `🔧 優化` - 改進現有功能
- `🐛 修復` - Bug 修復
- `📝 技術改進` - 代碼重構
- `✅ 測試` - 測試相關
- `📦 構建` - 構建系統
- `📚 文檔` - 文檔更新
- `⚠️ 破壞性變更` - 不兼容的變更

### 記錄範例
```markdown
## [2.0.2] - 2026-06-15

### 🐛 修復
- 修復了角色卡加載失敗的問題
- 修正了複製咒語時的格式錯誤

### 🔧 優化
- 優化了分類加載速度
- 改進了手機端 UI 顯示

### 📝 技術改進
- 重構了 sceneEngine.js
- 優化了構建配置
```

---

## 🎯 常見更新場景

### 場景 1: 修復小 Bug
```bash
# 1. 修改代碼
# 2. 更新版本
npm version patch -m "v%s: 修復角色卡加載問題"
# 3. 更新 CHANGELOG.md
# 4. 構建並部署
npm run build
git push origin master --tags
git subtree push --prefix dist origin gh-pages
```

### 場景 2: 新增一個分類
```bash
# 1. 新增分類文件和角色卡
# 2. 更新版本（次版本）
npm version minor -m "v%s: 新增XX分類"
# 3. 更新 CHANGELOG.md
# 4. 構建並部署
npm run build
git push origin master --tags
git subtree push --prefix dist origin gh-pages
```

### 場景 3: 優化現有功能
```bash
# 1. 修改代碼
# 2. 更新版本（修訂號）
npm version patch -m "v%s: 優化身材模板"
# 3. 更新 CHANGELOG.md
# 4. 構建並部署
npm run build
git push origin master --tags
git subtree push --prefix dist origin gh-pages
```

---

## 🔗 相關文件

- [CHANGELOG.md](CHANGELOG.md) - 完整更新記錄
- [package.json](package.json) - 版本號配置
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - 部署指南

---

## 💡 提示

### 版本號建議
- **小改動** (文字、Bug): 2.0.1 → 2.0.2
- **中等改動** (新功能、優化): 2.0.9 → 2.1.0
- **大改動** (架構重構): 2.9.5 → 3.0.0

### Git 標籤
每次更新都應該打標籤，方便回溯：
```bash
git tag v2.0.2
git push origin v2.0.2
```

查看所有標籤：
```bash
git tag -l
```

回退到某個版本：
```bash
git checkout v2.0.1
```

---

## 📞 快速命令

```bash
# 查看當前版本
node -p "require('./package.json').version"

# 修訂號 +0.01
npm version patch --no-git-tag-version

# 次版本 +0.1
npm version minor --no-git-tag-version

# 構建
npm run build

# 提交並打標籤
git add . && git commit -m "v2.0.2: 更新描述" && git tag v2.0.2

# 推送
git push origin master --tags

# 部署
git subtree push --prefix dist origin gh-pages
```

---

**記住**: 每次有更新，版本號 +0.01，並更新 CHANGELOG.md！ 🎯
