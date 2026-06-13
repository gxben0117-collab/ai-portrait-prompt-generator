# 美圖咒語系統 v2.0 完整分析報告

**分析範圍**: 34 個 category × 681 張角色卡  
**分析日期**: 2026-06-13  
**分析者**: Claude Sonnet 4.6

---

## 第一部分：共同問題（影響多張角色卡）

### 🔴 問題 1: layer10 結構過時（影響 680/681 張）

**嚴重度**: 高  
**影響範圍**: 除了 dark-royalty-01，所有角色卡都使用 layer10

**問題描述**:
```json
"layer10": "dark monarch silhouette"
```

layer10 是一個「萬能垃圾桶」，混雜了：
- 服裝輪廓（silhouette）
- 配件（cape, train）
- 妝容（makeup, beauty styling）

**為什麼是問題**:
- 語義不清晰
- 難以精確控制生成
- 不符合 5 層模組化設計理念

**修正建議**:
拆分為：
```json
"layer6": "silhouette-defining cape/train/mantle",
"layer7": "makeup and beauty styling"
```

**參考案例**: dark-royalty-01 已修正
```json
"layer6": "silhouette-defining royal cape, obsidian train, shadow mantle",
"layer7": "dark coronation makeup and beauty styling"
```

---

### 🟡 問題 2: timeOfDay 光線衝突（影響 17+ 張）

**嚴重度**: 中  
**影響範圍**: 多個 category

**問題描述**:
角色卡的 `timeOfDay` 包含具體光線關鍵字，會與 category 的 `lighting` 層衝突。

**具體案例**:
- `"timeOfDay": "golden hour"` (haute-couture-wedding, world-landmarks)
- `"timeOfDay": "sunset rooftop"` (anime-street)
- `"timeOfDay": "moonlit midnight"` (qinggong-chongfei)
- `"timeOfDay": "fishing return sunset"` (jiangnan-misty)

**為什麼是問題**:
- category 的 lighting 層已經定義 keyLight/fillLight
- timeOfDay 的具體光線會產生雙重指令
- 例如: "golden hour" + "cold moonlight" 互相矛盾

**修正建議**:
timeOfDay 只寫情境，不寫光線：
- ❌ `"timeOfDay": "golden hour"`
- ✅ `"timeOfDay": "wedding ceremony moment"`
- ❌ `"timeOfDay": "moonlit midnight"`
- ✅ `"timeOfDay": "midnight intimate moment"`

**引擎層修正**: sceneEngine.js 的 `cleanLightingConflicts()` 已經在過濾，但源頭修正更好。

---

### 🟡 問題 3: "receiving" 等多人風險詞（影響 4 張）

**嚴重度**: 中  
**影響範圍**: 4 張角色卡

**問題描述**:
```json
"pose": "receiving shadow crown"
"pose": "receiving prophecy visions"
"pose": "receiving imperial gift"
"pose": "receiving Neo-Confucian teaching"
```

**為什麼是問題**:
- "receiving" 暗示有另一個人在給予
- 違反 solo character 設定
- AI 容易畫出第二個人

**修正建議**:
改為已完成狀態：
- ❌ `"receiving shadow crown"`
- ✅ `"wearing the completed shadow crown, already crowned"`
- ❌ `"receiving imperial gift"`
- ✅ `"holding received imperial treasure, examining gift"`
- ❌ `"receiving prophecy visions"`
- ✅ `"experiencing prophecy visions, in trance state"`

---

### 🟢 問題 4: costume.layers 重複模式詞（影響 300+ 張）

**嚴重度**: 低（token 浪費）  
**影響範圍**: 大部分角色卡

**問題描述**:
大量使用重複的模板詞：
- `styling` 出現 380 次
- `appearance` 出現 354 次
- `beauty` 出現 319 次

**具體例子**:
```json
"layers": "black royal robes, shadow styling, power darkness appearance, gothic royalty beauty"
```

每個角色卡都有 `styling`, `appearance`, `beauty` 三連。

**為什麼是問題**:
- 這三個詞本身語義很空
- 浪費 token，沒有實際描述價值
- 真正有用的是具體描述（black royal robes, gothic royalty）

**修正建議**:
刪除模板詞，保留具體描述：
- ❌ `"black royal robes, shadow styling, power darkness appearance, gothic royalty beauty"`
- ✅ `"black royal robes with shadow embroidery, gothic royal ornaments, dark power elegance"`

---

### 🟢 問題 5: props 過長描述（影響 5+ 張）

**嚴重度**: 低  
**影響範圍**: 主要在 jiangnan-misty

**問題描述**:
部分角色卡的 props 陣列包含完整句子，而不是關鍵詞列表。

**具體例子**:
```json
"props": [
  "rain, bridge, canal, willows, white walls, black tiles, boat, umbrella, mist - complete Jiangnan poetry",
  "eternal Jiangnan atmosphere",
  "all iconic elements together",
  "ultimate water town beauty",
  "timeless elegance"
]
```

**為什麼是問題**:
- props 應該是場景物件，不是形容詞
- "eternal atmosphere", "ultimate beauty" 這類詞應該在 atmosphere 層
- 混淆了物件（props）和氛圍（atmosphere）

**修正建議**:
props 只列物件：
```json
"props": [
  "stone bridge",
  "oil-paper umbrella",
  "canal waterway",
  "willow trees",
  "white walls and black tiles",
  "wooden boat"
]
```

氛圍描述移到 category 的 atmosphere 或角色卡的 weather。

---

### 🟢 問題 6: action.expression 冗余角色名稱（影響 10+ 張）

**嚴重度**: 低  
**影響範圍**: 少數角色卡

**問題描述**:
```json
"expression": "vampire queen eternal dominance"
"expression": "poison queen lethal charm"
"expression": "dark royalty ascension"
```

**為什麼是問題**:
- 角色身份已經在 title 和 costume 中定義
- expression 應該描述表情/情緒，不是重複身份
- "vampire queen" 在整個 prompt 中已經出現多次

**修正建議**:
expression 只寫情緒：
- ❌ `"vampire queen eternal dominance"`
- ✅ `"eternal dominance and cold authority"`
- ❌ `"poison queen lethal charm"`
- ✅ `"lethal charm with calculating smile"`

---

## 第二部分：個別角色卡問題

### 🔴 dark-royalty-16 "預言王子・命運窺視"

**問題**: 性別錯誤  
**描述**: title 寫 "王子"（prince），但系統是女性角色專用

**修正**:
- ❌ `"預言王子・命運窺視"`
- ✅ `"預言公主・命運窺視"` 或 `"預言女祭司・命運窺視"`

---

### 🔴 dark-royalty-18 "瘋狂國王・理智崩潰"

**問題**: 性別錯誤  
**描述**: title 寫 "國王"（king），但系統是女性角色專用

**修正**:
- ❌ `"瘋狂國王・理智崩潰"`
- ✅ `"瘋狂女王・理智崩潰"`

---

### 🔴 dark-royalty-19 "不死皇帝・永恆詛咒"

**問題**: 性別錯誤  
**描述**: title 寫 "皇帝"（emperor），但系統是女性角色專用

**修正**:
- ❌ `"不死皇帝・永恆詛咒"`
- ✅ `"不死女皇・永恆詛咒"`

---

### 🟡 world-landmarks-* 系列

**問題**: 地標名稱過於具體  
**影響**: world-landmarks 多張卡片

**描述**:
```json
"timeOfDay": "Paris golden hour"
"timeOfDay": "Santorini sunset"
"timeOfDay": "Sahara sunset"
```

地標名稱直接寫在 timeOfDay 中，混淆了時間和地點。

**修正建議**:
- 地點寫在 location
- 時間寫在 timeOfDay（避免具體光線）

```json
"location": "Eiffel Tower observation deck in Paris",
"timeOfDay": "romantic evening moment"
```

---

### 🟡 jiangnan-misty 系列

**問題**: props 描述過於文學化  
**影響**: 多張江南水鄉卡片

**描述**: 如問題 5 所述，props 包含 "complete Jiangnan poetry", "ultimate water town beauty" 等文學性描述。

**修正建議**: 分離物件和氛圍，如問題 5 的建議。

---

## 第三部分：優先修正建議

### 立即修正（高優先）

1. **修正 3 張性別錯誤卡片**
   - dark-royalty-16, 18, 19
   - 直接改 title 即可

2. **修正 4 張 receiving pose**
   - 改為已完成狀態
   - 避免多人風險

### 批量修正（中優先）

3. **timeOfDay 光線關鍵字**
   - 17 張卡片
   - 移除 golden hour, sunset, moonlit 等
   - 保留情境描述

4. **world-landmarks 地標時間混合**
   - 分離地點和時間

### 結構重構（低優先，但影響範圍最大）

5. **layer10 → layer6/layer7**
   - 影響 680 張卡片
   - 需要批量處理腳本
   - 建議分批次測試

6. **costume.layers 模板詞清理**
   - 影響 300+ 張卡片
   - 刪除 `styling`, `appearance`, `beauty`
   - 保留具體描述

---

## 總結

### 問題分布
- 🔴 嚴重問題: 4 個（layer10 結構 + 3 張性別錯誤）
- 🟡 中度問題: 3 個（光線衝突 + receiving pose + 地標混合）
- 🟢 輕微問題: 3 個（模板詞冗余 + props 描述 + expression 重複）

### 系統健康度
**8.5 / 10**

系統整體架構優秀，5 層模組化設計清晰，但存在：
- 歷史遺留問題（layer10）
- 細節一致性問題（性別、光線）
- Token 效率問題（模板詞冗余）

### 最值得保留的設計

1. **5 層模組化架構** - 清晰分離 faceLock/scene/costume/lighting/style
2. **引擎層過濾機制** - cleanLightingConflicts() 已經在補救 timeOfDay 問題
3. **文化考據完整** - 8 個朝代都有具體服飾描述
4. **電影級光線設計** - 如 dark-royalty 的冷月光+暖燭光對比

---

**報告完成**  
下一步：等待用戶確認優先處理哪些問題。
