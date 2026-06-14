# 更新記錄 / CHANGELOG

所有重要的專案變更都會記錄在這個檔案中。

版本號格式：`主版本.次版本.修訂號`
- 主版本：重大架構變更
- 次版本：新功能或大型優化
- 修訂號：Bug 修復、小優化（每次更新 +0.01）

---

## [2.0.7] - 2026-06-14

### 🎭 動作姿勢優先級修復

#### 問題
- v2.0.5/v2.0.6 新增的長化妝描述壓制了動作姿勢（action/pose）
- 威尼斯金面具等角色卡變成「乖乖站著」，沒有原本的擺姿動作

#### 解決方案
1. **提升動作姿勢優先級**：將 `actionPrompt` 從第6位提升到第3位
2. **加權重**：`(action:1.2)` 確保姿勢不被覆蓋

#### 新的咒語順序
```
1. Face Lock (1.8)
2. User Controls (50mm + 參數)
3. Action Pose (1.2) ← 提升到這裡並加權
4. Scene
5. Lighting
6. Costume (包含化妝)
7. Photography
8. Style
9. Technical Quality
```

#### 效果
- ✅ 威尼斯金面具恢復「靠在運河橋欄杆」姿勢
- ✅ 所有角色卡的動作姿勢不再被覆蓋

### 📝 技術改進
- `src/core/promptBuilder.js`: 調整 actionPrompt 位置並加權 1.2

### 📦 構建
- 構建時間: 520ms
- 主文件大小: 176.06 KB → 57.20 KB (gzip)

---

## [2.0.6] - 2026-06-14

### 🎨 化妝描述精確化

#### 核心理念
**人臉已鎖住 → 在正確的五官上追加配合服飾的化妝**

#### 優化內容
```
apply makeup on the locked facial features:
  - eyeshadow color matching costume palette
  - lipstick shade matching theme color
  - natural blush on existing cheeks
  - eyebrow color enhancement only

hairstyle design matching costume era and cultural background
hair accessories and ornaments matching outfit aesthetic
maintain all facial feature shapes and sizes unchanged
```

#### 明確表達
- ✅ 化妝是「追加」在已鎖定的五官上
- ✅ 眼影、口紅、腮紅顏色配合服飾色調
- ✅ 髮型設計配合服飾時代和文化背景
- ✅ 髮飾配合服裝美學
- ✅ 所有五官形狀和尺寸保持不變

### 📝 技術改進
- `src/core/costumeLayerEngine.js`: 精確化妝描述，強調在鎖定五官上追加

### 📦 構建
- 構建時間: 520ms
- 主文件大小: 176.04 KB → 57.18 KB (gzip)

---

## [2.0.5] - 2026-06-14

### 🔧 化妝與髮型優化

#### 修正過度限制
- v2.0.4 完全移除了化妝和髮型變化，但這是過度限制

#### 正確的區分

**✅ 允許變化（不影響臉部辨識）**:
- 化妝：眼影、口紅、腮紅（外加上去，不改變五官）
- 髮型：配合服飾和時代的髮型變化
- 髮飾：頭飾、髮簪、髮帶等

**❌ 禁止變化（會破壞臉部辨識）**:
- 眼睛大小和形狀
- 鼻子形狀和寬度
- 嘴巴形狀和大小
- 臉型輪廓
- 下巴形狀

#### 新增精確描述
```
makeup applied on existing facial features (eyeshadow, lipstick, blush only),
hairstyle matching costume era and theme,
hair accessories matching outfit design,
no facial feature alteration,
no face shape change
```

### 📝 技術改進
- `src/core/costumeLayerEngine.js`: 新增明確的化妝和髮型規則

### 📦 構建
- 構建時間: 510ms
- 主文件大小: 175.89 KB → 57.13 KB (gzip)

---

## [2.0.4] - 2026-06-14

### 🎯 臉部身份保留重大優化

#### 問題診斷
- 原系統臉部保留評分：60/100
- 主要問題：眼睛變大、鼻樑變挺、下巴變尖、臉部變窄 = AI Beauty Face

#### 解決方案：超強臉部鎖定

**Face Lock 權重提升**: 1.6 → **1.8**

**新增精確臉部特徵鎖定**:
```
preserve exact eye size
preserve exact eye spacing
preserve exact eyebrow shape
preserve exact nose shape
preserve exact mouth shape
preserve exact chin shape
maintain original age appearance
same woman from uploaded photo
recognizable as same person
```

**移除所有美化暗示詞彙**:
- ❌ `featured heroine`, `main character focus` (sceneEngine.js)
- ❌ `Layer7: makeup and beauty styling` (costumeLayerEngine.js)
- ❌ `ethereal immortal cultivator`, `transcendent supernatural presence` (xianxia-drama.js)
- ❌ `mature feminine beauty`, `palace beauty silhouette`, `refined court beauty` (qinggong-chongfei.js, succubus-banquet.js)

**負面提示詞大幅增強**:
```
beautified face, beauty pageant face, V-line face, slim face filter,
eye enlargement, larger eyes, nose enhancement, nose slimming,
lip augmentation, cosmetic surgery look, celebrity face,
asian beauty standard face, instagram model face,
xiaohongshu beauty face, douyin beauty filter, korean beauty filter,
different person, identity drift
```

### 🎯 預期效果
- **臉部保留評分**: 60 → **90+**
- **身份辨識度**: 大幅提升，「一眼看出還是媽媽」
- **場景服裝**: 保持 95 分高質量

### 📝 技術改進
- `src/core/faceLockEngine.js`: 全面升級臉部鎖定系統，權重 1.6→1.8
- `src/core/sceneEngine.js`: 移除 `featured heroine`, `main character focus`
- `src/core/costumeLayerEngine.js`: 移除 Layer7 美化暗示
- `src/categories/eastern-mythology/xianxia-drama.js`: 移除仙俠美化詞彙
- `src/categories/eastern-historical-court/qinggong-chongfei.js`: 移除宮廷美化詞彙
- `src/categories/dark-romance/succubus-banquet.js`: 移除美化詞彙

### 📦 構建
- 構建時間: 614ms
- 主文件大小: 175.67 KB → 57.03 KB (gzip)

---

## [2.0.3] - 2026-06-14

### 🔒 安全優化
- **寢宮寵妃審查優化**: 移除高風險性暗示詞彙，提升通過率
  - 移除：`deep V neckline`, `off-shoulder`, `sleepwear`, `nightgown`, `bedroom romance`, `seduction`, `tipsy`, `visible upper thighs`, `generous bust`, `voluptuous body type`
  - 改用：`elegant silk robe`, `palace loungewear`, `graceful elegance`, `refined court beauty`, `balanced mature proportions`
  - 場景改為：`luxury imperial resting chamber`, `palace evening leisure`, `warm candlelit atmosphere`

### 🔧 優化
- **50mm 全身防大頭**: 添加距離和比例描述，防止頭部過大、肩部過窄、軀幹過短
  - 新增：`camera positioned several meters away`, `full body captured from distance`, `natural human proportions`, `head size proportional to body`

### 📝 技術改進
- `src/categories/eastern-historical-court/qinggong-chongfei.js`: 全面安全詞彙替換
- `src/core/userControlEngine.js`: 50mm 鏡頭描述優化

### 📦 構建
- 構建時間: 546ms
- 主文件大小: 175.44 KB → 56.93 KB (gzip)

---

## [2.0.2] - 2026-06-14

### ✨ 新增
- 咒語開頭加入固定指令：「Use my uploaded character face as fixed template」明確告訴 AI 使用上傳的臉部作為固定模板

### 🔧 優化
- **UI 參數英文化**: Shot、Fabric Dynamic、Body Type 全部改為英文，提升 AI 理解度
  - 全身 → Full Body
  - 中度流動 → Medium Flow
  - 豐滿 → Curvy
- **參數位置優化**: 從咒語末端移到鎖臉層之後，提升參數優先級
- **參數格式改進**: 改為標籤形式 `[Key: Value]` 便於 AI 識別為元數據

### 📝 技術改進
- `src/core/faceLockEngine.js`: 添加開頭指令 "Use my uploaded character face as fixed template"
- `src/core/userControlEngine.js`: 為所有選項添加 `englishName` 屬性，生成英文參數標籤
- `src/ui/ProfileCard.jsx`: 移除複製功能中的中文參數描述

### ✅ 測試
- ✅ 開頭指令測試通過
- ✅ 參數英文化測試通過
- ✅ 參數位置測試通過（位於鎖臉層之後）

### 📦 構建
- 構建時間: 532ms
- 主文件大小: 175.31 KB → 56.88 KB (gzip)

---

## [2.0.1] - 2026-06-14

### ✨ 新增
- 建立版本管理系統和更新記錄檔

### 🔧 優化
- **Layer 寫法改進**: 移除機械化的 `costumeLayer1/Layer10` 標籤，改用自然描述讓 AI 自由發揮
- **UI 參數完整帶入**: 確保圖片比例、人物構圖、布料動態、體態等 4 個參數正確帶入最終咒語
- **魅魔寢宮身材模板優化**:
  - 寢宮寵妃：採用 `imperial consort physique` 身材模板，強調溫柔浪漫宮廷美學
  - 魅魔宇宙：採用 `succubus queen physique` 身材模板，強調超自然暗黑女王氣場
- **UI 文字優化**: 體態選項「豐滿(大胸瘦腰)」簡化為「豐滿」

### 📝 技術改進
- `src/core/costumeLayerEngine.js`: 支援新舊兩種 costume 格式，向後兼容
- `src/categories/eastern-historical-court/qinggong-chongfei.js`: 身材模板和服裝描述全面優化
- `src/categories/dark-romance/succubus-banquet.js`: 身材模板和服裝關鍵詞全面優化
- `src/core/userControlEngine.js`: UI 名稱簡化

### ✅ 測試
- ✅ Layer 寫法改進測試通過
- ✅ UI 參數帶入測試通過（4個參數 100% 帶入）
- ✅ 寢宮身材模板測試通過
- ✅ 魅魔身材模板測試通過
- ✅ 風格區隔度測試通過（兩種風格關鍵詞完全不重疊）

### 📦 構建
- 構建時間: 1.09s
- 主文件大小: 175.15 KB → 56.82 KB (gzip)
- 代碼分割: 30個分類模組 + 27個角色卡 JSON

---

## [2.0.0] - 2026-06-XX

### 🎉 重大更新
- 五層模組化 Prompt 引擎架構
- 27個分類 × 20張角色卡 = 540張
- Layer 0: User Controls（用戶參數）
- Layer 1: Face Lock（臉部鎖定）
- Layer 2: Scene（場景）
- Layer 3: Costume（10層服裝系統）
- Layer 4: Photography（攝影）
- Layer 5: Style（視覺風格）

### ✨ 功能
- 動態分類加載系統
- 角色卡批次生成
- UI 參數控制（比例、構圖、布料、體態）
- 一鍵複製完整咒語
- 品質驗證報告

### 🎨 分類系統
- 東方歷史宮廷 (8個)
- 東方民族區域 (3個)
- 東方神話 (2個)
- 江南旅拍 (3個)
- 世界時尚 (3個)
- 暗黑奇幻 (2個)
- 暗黑浪漫 (1個)
- 史詩經典 (3個)
- 其他分類 (5個)

---

## 版本更新規則

### 何時更新版本號

#### 修訂號 +0.01
- Bug 修復
- 文字優化
- UI 小調整
- 參數微調
- 文檔更新

#### 次版本 +0.1
- 新增分類
- 新增功能模組
- 重要優化
- API 變更（向後兼容）

#### 主版本 +1.0
- 架構重構
- 破壞性變更
- 重大功能改版

### 更新流程

1. **修改代碼**
2. **更新版本號**: 編輯 `package.json` 中的 `version`
3. **記錄更新**: 在 `CHANGELOG.md` 頂部新增記錄
4. **構建測試**: `npm run build`
5. **提交代碼**: 
   ```bash
   git add .
   git commit -m "v2.0.1: Layer寫法優化、魅魔寢宮身材模板優化"
   git tag v2.0.1
   git push origin master --tags
   ```
6. **部署上線**: `git subtree push --prefix dist origin gh-pages`

---

## 記錄格式說明

### 類別標籤
- `✨ 新增` - 新功能
- `🔧 優化` - 改進現有功能
- `🐛 修復` - Bug 修復
- `📝 技術改進` - 代碼重構、技術債務清理
- `✅ 測試` - 測試相關
- `📦 構建` - 構建系統、依賴更新
- `📚 文檔` - 文檔更新
- `⚠️ 破壞性變更` - 不兼容的 API 變更

### 版本連結格式
```markdown
## [版本號] - 日期

### 類別標籤
- 變更描述
```

---

## 待辦事項

### v2.0.2 (計劃中)
- [ ] 新增角色卡搜尋功能
- [ ] 優化手機端 UI
- [ ] 新增咒語歷史記錄

### v2.1.0 (未來)
- [ ] 新增 5 個分類
- [ ] 自定義角色卡功能
- [ ] 咒語對比功能

---

**最後更新**: 2026-06-14  
**當前版本**: v2.0.1
