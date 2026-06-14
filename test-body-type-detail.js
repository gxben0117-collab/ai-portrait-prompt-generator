/**
 * 體態參數詳細測試
 * 展示「體態（預設）」從 UI 到最終咒語的完整流程
 */

import { SUCCUBUS_BANQUET_CATEGORY } from './src/categories/dark-romance/succubus-banquet.js';
import { buildPrompt } from './src/core/promptBuilder.js';
import { BODY_TYPES, generateUserControlPrompt } from './src/core/userControlEngine.js';

console.log('=== 體態參數處理流程詳解 ===\n');

// 步驟 1: UI 層定義
console.log('【步驟 1】UI 層 - 體態選項定義');
console.log('檔案: src/core/userControlEngine.js (106-117行)\n');
console.log('可選體態：');
Object.entries(BODY_TYPES).forEach(([key, value]) => {
  console.log(`  - ${key}: ${value.name}`);
  console.log(`    咒語: "${value.prompt}"`);
  console.log(`    說明: ${value.description}\n`);
});

// 步驟 2: 用戶選擇
console.log('\n【步驟 2】用戶在 UI 選擇體態');
console.log('檔案: src/ui/ProfileCard.jsx (10-16行)\n');

const userChoice1 = { bodyType: 'default' };
const userChoice2 = { bodyType: 'curvy' };

console.log(`用戶選擇 A: bodyType = "${userChoice1.bodyType}" (預設)`);
console.log(`用戶選擇 B: bodyType = "${userChoice2.bodyType}" (豐滿)\n`);

// 步驟 3: 參數處理
console.log('\n【步驟 3】userControlEngine 處理參數');
console.log('檔案: src/core/userControlEngine.js (122-157行)\n');

const controlPrompt1 = generateUserControlPrompt(userChoice1);
const controlPrompt2 = generateUserControlPrompt(userChoice2);

console.log('處理結果 A (預設):');
console.log(`  body.prompt = "${BODY_TYPES[userChoice1.bodyType].prompt}"`);
console.log(`  加入位置: positivePrompt[4] (第5個元素)\n`);

console.log('處理結果 B (豐滿):');
console.log(`  body.prompt = "${BODY_TYPES[userChoice2.bodyType].prompt}"`);
console.log(`  加入位置: positivePrompt[4] (第5個元素)\n`);

// 步驟 4: 組裝進最終咒語
console.log('\n【步驟 4】promptBuilder 組裝最終咒語');
console.log('檔案: src/core/promptBuilder.js (72-84行)\n');

const testRoleCard = {
  id: 'test-body',
  title: '體態測試',
  categoryId: 'succubus-banquet',
  scene: { location: 'chamber' },
  style: 'photorealistic',
};

console.log('組裝順序（positiveComponents）:');
console.log('  [0] faceLock.positive');
console.log('  [1] userControlPrompt.positive  ← 體態在這裡！');
console.log('  [2] optimizedScene.positive');
console.log('  [3] lightingPrompt');
console.log('  [4] optimizedCostume.positive');
console.log('  [5] actionPrompt');
console.log('  [6] optimizedPhotography.positive');
console.log('  [7] stylePrompt.positive');
console.log('  [8] generateTechnicalQuality()\n');

// 步驟 5: 最終結果對比
console.log('\n【步驟 5】最終咒語對比\n');

const result1 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, testRoleCard, {
  userControls: { bodyType: 'default' }
});

const result2 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, testRoleCard, {
  userControls: { bodyType: 'curvy' }
});

console.log('=== 預設體態 ===');
console.log('搜尋關鍵詞: "natural body proportions"');
console.log(`✅ 找到: ${result1.prompt.positive.includes('natural body proportions')}`);
console.log(`✅ 找到: ${result1.prompt.positive.includes('balanced figure')}`);
console.log(`✅ 找到: ${result1.prompt.positive.includes('realistic anatomy')}`);

// 提取包含體態的片段
const match1 = result1.prompt.positive.match(/natural body proportions[^,]*,[^,]*,[^,]*/);
if (match1) {
  console.log(`\n咒語片段:\n"${match1[0]}"\n`);
}

console.log('\n=== 豐滿體態 ===');
console.log('搜尋關鍵詞: "curvy figure"');
console.log(`✅ 找到: ${result2.prompt.positive.includes('curvy figure')}`);
console.log(`✅ 找到: ${result2.prompt.positive.includes('fuller bust')}`);
console.log(`✅ 找到: ${result2.prompt.positive.includes('hourglass silhouette')}`);

const match2 = result2.prompt.positive.match(/curvy figure[^,]*,[^,]*,[^,]*,[^,]*,[^,]*/);
if (match2) {
  console.log(`\n咒語片段:\n"${match2[0]}"\n`);
}

// 步驟 6: 與分類身材模板的關係
console.log('\n【步驟 6】體態參數 vs 分類身材模板\n');

console.log('❓ 問題: UI的體態參數 和 分類的 bodyRequirements 有什麼關係？\n');

console.log('答案: 兩者會「疊加」在最終咒語中！\n');

console.log('🔹 UI 體態參數 (Layer 0: User Controls)');
console.log('   - 位置: userControlPrompt.positive');
console.log('   - 來源: 用戶在 UI 選擇');
console.log('   - 預設: natural body proportions, balanced figure, realistic anatomy');
console.log('   - 豐滿: curvy figure, fuller bust, slim waist, hourglass silhouette\n');

console.log('🔹 分類身材模板 (Layer 3: Costume)');
console.log('   - 位置: costumePrompt.positive (在 bodyRequirements 中)');
console.log('   - 來源: visualDNA.bodyRequirements');
console.log('   - 魅魔: succubus queen physique, tall elegant silhouette, ...');
console.log('   - 寢宮: imperial consort physique, luxuriously feminine figure, ...\n');

console.log('📌 最終效果: 兩個描述都會出現在咒語中');
console.log('   例如選擇「豐滿」體態 + 魅魔分類:');
console.log('   ✅ "curvy figure, fuller bust, slim waist, hourglass silhouette" (UI層)');
console.log('   ✅ "succubus queen physique, tall elegant silhouette, ..." (分類層)\n');

console.log('💡 建議:');
console.log('   - 「預設」體態: 讓分類的身材模板自然發揮');
console.log('   - 「豐滿」體態: 加強胸部和腰部曲線，與分類模板疊加');

console.log('\n✅ 測試完成！');
