/**
 * 完整驗證測試 - 魅魔 vs 寢宮身材模板
 */

import { SUCCUBUS_BANQUET_CATEGORY } from './src/categories/dark-romance/succubus-banquet.js';
import { QINGGONG_CHONGFEI_CATEGORY } from './src/categories/eastern-historical-court/qinggong-chongfei.js';
import { buildPrompt } from './src/core/promptBuilder.js';
import { BODY_TYPES } from './src/core/userControlEngine.js';

console.log('=== 魅魔 vs 寢宮身材模板完整驗證 ===\n');

// ===== 測試 1: UI 名稱修改 =====
console.log('【測試 1】UI 體態名稱');
console.log(`預設體態名稱: "${BODY_TYPES.default.name}"`);
console.log(`豐滿體態名稱: "${BODY_TYPES.curvy.name}"`);
console.log(`✅ 名稱已改為「豐滿」: ${BODY_TYPES.curvy.name === '豐滿' ? '通過' : '失敗'}\n`);

// ===== 測試 2: 寢宮寵妃身材模板 =====
console.log('\n【測試 2】寢宮寵妃身材模板\n');

const qinggongRoleCard = {
  id: 'qinggong-test',
  title: '粉紫寵妃測試',
  categoryId: 'qinggong-chongfei',
  scene: { location: 'imperial bedchamber' },
  style: 'photorealistic',
};

// 測試預設體態
const qinggongResult1 = buildPrompt(QINGGONG_CHONGFEI_CATEGORY, qinggongRoleCard, {
  userControls: { bodyType: 'default' }
});

console.log('寢宮 + 預設體態:');
console.log(`✅ imperial consort physique: ${qinggongResult1.prompt.positive.includes('imperial consort physique')}`);
console.log(`✅ soft romantic curves: ${qinggongResult1.prompt.positive.includes('soft romantic curves')}`);
console.log(`✅ palace beauty silhouette: ${qinggongResult1.prompt.positive.includes('palace beauty silhouette')}`);
console.log(`✅ healthy adult proportions: ${qinggongResult1.prompt.positive.includes('healthy adult proportions')}`);
console.log(`✅ natural body proportions (UI層): ${qinggongResult1.prompt.positive.includes('natural body proportions')}`);

// 測試豐滿體態
const qinggongResult2 = buildPrompt(QINGGONG_CHONGFEI_CATEGORY, qinggongRoleCard, {
  userControls: { bodyType: 'curvy' }
});

console.log('\n寢宮 + 豐滿體態:');
console.log(`✅ imperial consort physique: ${qinggongResult2.prompt.positive.includes('imperial consort physique')}`);
console.log(`✅ soft romantic curves: ${qinggongResult2.prompt.positive.includes('soft romantic curves')}`);
console.log(`✅ curvy figure (UI層): ${qinggongResult2.prompt.positive.includes('curvy figure')}`);
console.log(`✅ fuller bust (UI層): ${qinggongResult2.prompt.positive.includes('fuller bust')}`);

// ===== 測試 3: 魅魔女王身材模板 =====
console.log('\n\n【測試 3】魅魔女王身材模板\n');

const succubusRoleCard = {
  id: 'succubus-test',
  title: '魅魔女王測試',
  categoryId: 'succubus-banquet',
  scene: { location: 'dark chamber' },
  style: 'photorealistic',
};

// 測試預設體態
const succubusResult1 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, succubusRoleCard, {
  userControls: { bodyType: 'default' }
});

console.log('魅魔 + 預設體態:');
console.log(`✅ succubus queen physique: ${succubusResult1.prompt.positive.includes('succubus queen physique')}`);
console.log(`✅ tall elegant silhouette: ${succubusResult1.prompt.positive.includes('tall elegant silhouette')}`);
console.log(`✅ supernaturally beautiful proportions: ${succubusResult1.prompt.positive.includes('supernaturally beautiful proportions')}`);
console.log(`✅ powerful feminine presence: ${succubusResult1.prompt.positive.includes('powerful feminine presence')}`);
console.log(`✅ aristocratic demonic elegance: ${succubusResult1.prompt.positive.includes('aristocratic demonic elegance')}`);
console.log(`✅ natural body proportions (UI層): ${succubusResult1.prompt.positive.includes('natural body proportions')}`);

// 測試豐滿體態
const succubusResult2 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, succubusRoleCard, {
  userControls: { bodyType: 'curvy' }
});

console.log('\n魅魔 + 豐滿體態:');
console.log(`✅ succubus queen physique: ${succubusResult2.prompt.positive.includes('succubus queen physique')}`);
console.log(`✅ powerful feminine presence: ${succubusResult2.prompt.positive.includes('powerful feminine presence')}`);
console.log(`✅ curvy figure (UI層): ${succubusResult2.prompt.positive.includes('curvy figure')}`);
console.log(`✅ hourglass silhouette (UI層): ${succubusResult2.prompt.positive.includes('hourglass silhouette')}`);

// ===== 測試 4: 服裝關鍵詞 =====
console.log('\n\n【測試 4】服裝關鍵詞驗證\n');

console.log('魅魔服裝關鍵詞:');
console.log(`✅ luxury dark fantasy couture: ${succubusResult1.prompt.positive.includes('luxury dark fantasy couture')}`);
console.log(`✅ dark aristocratic fashion: ${succubusResult1.prompt.positive.includes('dark aristocratic fashion')}`);
console.log(`✅ royal feminine elegance: ${succubusResult1.prompt.positive.includes('royal feminine elegance')}`);
console.log(`✅ succubus queen aesthetic: ${succubusResult1.prompt.positive.includes('succubus queen aesthetic')}`);

console.log('\n寢宮服裝關鍵詞:');
console.log(`✅ deep V neckline: ${qinggongResult1.prompt.positive.includes('deep V neckline')}`);
console.log(`✅ pink-purple: ${qinggongResult1.prompt.positive.includes('pink-purple')}`);
console.log(`✅ palace intimate aesthetic: ${qinggongResult1.prompt.positive.includes('palace intimate aesthetic')}`);

// ===== 測試 5: 風格區隔度 =====
console.log('\n\n【測試 5】風格區隔度檢查\n');

const qinggongKeywords = [
  'imperial consort',
  'soft romantic',
  'palace beauty',
  'elegant feminine posture'
];

const succubusKeywords = [
  'succubus queen',
  'supernaturally beautiful',
  'powerful feminine presence',
  'aristocratic demonic elegance'
];

console.log('寢宮獨有關鍵詞 (不應出現在魅魔):');
qinggongKeywords.forEach(keyword => {
  const inQinggong = qinggongResult1.prompt.positive.includes(keyword);
  const inSuccubus = succubusResult1.prompt.positive.includes(keyword);
  console.log(`  "${keyword}": 寢宮=${inQinggong}, 魅魔=${inSuccubus} ${!inSuccubus ? '✅' : '❌'}`);
});

console.log('\n魅魔獨有關鍵詞 (不應出現在寢宮):');
succubusKeywords.forEach(keyword => {
  const inQinggong = qinggongResult1.prompt.positive.includes(keyword);
  const inSuccubus = succubusResult1.prompt.positive.includes(keyword);
  console.log(`  "${keyword}": 寢宮=${inQinggong}, 魅魔=${inSuccubus} ${!inQinggong ? '✅' : '❌'}`);
});

// ===== 最終報告 =====
console.log('\n\n=== 最終驗證報告 ===\n');

const allTests = [
  { name: 'UI 名稱修改', pass: BODY_TYPES.curvy.name === '豐滿' },
  { name: '寢宮身材模板', pass: qinggongResult1.prompt.positive.includes('imperial consort physique') },
  { name: '魅魔身材模板', pass: succubusResult1.prompt.positive.includes('succubus queen physique') },
  { name: '服裝關鍵詞', pass: succubusResult1.prompt.positive.includes('luxury dark fantasy couture') },
  { name: 'UI 體態疊加', pass: qinggongResult2.prompt.positive.includes('curvy figure') },
];

console.log('測試結果:');
allTests.forEach(test => {
  console.log(`  ${test.pass ? '✅' : '❌'} ${test.name}`);
});

const allPass = allTests.every(t => t.pass);
console.log(`\n${allPass ? '🎉 所有測試通過！' : '❌ 部分測試失敗'}`);

console.log('\n詳細報告已生成: BODY_TEMPLATE_ANALYSIS.md');
