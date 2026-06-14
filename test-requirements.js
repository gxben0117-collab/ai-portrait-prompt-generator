/**
 * Test Script - 測試三個需求
 * 需求1: Layer寫法改進
 * 需求2: UI參數確實帶入
 * 需求3: 魅魔寢宮優化
 */

import { SUCCUBUS_BANQUET_CATEGORY } from './src/categories/dark-romance/succubus-banquet.js';
import { QINGGONG_CHONGFEI_CATEGORY } from './src/categories/eastern-historical-court/qinggong-chongfei.js';
import { buildPrompt } from './src/core/promptBuilder.js';

console.log('=== 測試需求 1: Layer寫法改進 ===\n');

// 測試角色卡 - 使用舊格式（應該不再出現 costumeLayer1/Layer10 標籤）
const oldFormatRoleCard = {
  id: 'test-01',
  title: '測試舊格式 Layer',
  categoryId: 'succubus-banquet',
  scene: { location: 'test chamber' },
  costume: {
    layer1: 'foundation layer',
    layers: 'middle layers',
    layer10: 'outer silhouette',
  },
  style: 'photorealistic',
};

const result1 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, oldFormatRoleCard);
const hasOldFormat = result1.prompt.positive.includes('costumeLayer1') ||
                     result1.prompt.positive.includes('costumeLayer10') ||
                     result1.prompt.positive.includes('costume middle layers');

console.log('✅ 需求1測試:');
console.log(`   舊格式標籤已移除: ${!hasOldFormat ? '✅ 成功' : '❌ 失敗'}`);
console.log(`   咒語包含服裝描述: ${result1.prompt.positive.includes('costume design') ? '✅ 成功' : '❌ 失敗'}`);

console.log('\n=== 測試需求 2: UI參數確實帶入 ===\n');

// 測試用戶控制參數
const testUserControls = {
  aspectRatio: '9:16',
  shotComposition: 'fullBody',
  fabricDynamic: 'medium',
  bodyType: 'default',
};

const testRoleCard2 = {
  id: 'test-02',
  title: '測試UI參數',
  categoryId: 'succubus-banquet',
  scene: { location: 'test chamber' },
  style: 'photorealistic',
};

const result2 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, testRoleCard2, {
  userControls: testUserControls,
});

console.log('✅ 需求2測試 - 4個參數檢查:');
console.log(`   1. 圖片比例 (9:16): ${result2.prompt.positive.includes('9:16') ? '✅ 已帶入' : '❌ 未帶入'}`);
console.log(`   2. 人物構圖 (全身): ${result2.prompt.positive.includes('full body portrait') ? '✅ 已帶入' : '❌ 未帶入'}`);
console.log(`   3. 布料動態 (中度): ${result2.prompt.positive.includes('gentle fabric flow') || result2.prompt.positive.includes('moderate cloth movement') ? '✅ 已帶入' : '❌ 未帶入'}`);
console.log(`   4. 體態 (預設): ${result2.prompt.positive.includes('natural body proportions') ? '✅ 已帶入' : '❌ 未帶入'}`);

console.log('\n=== 測試需求 3: 魅魔寢宮優化 ===\n');

// 測試魅魔宇宙身材模板
const testRoleCard3 = {
  id: 'test-03',
  title: '測試魅魔身材模板',
  categoryId: 'succubus-banquet',
  scene: { location: 'dark chamber' },
  style: 'photorealistic',
};

const result3 = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, testRoleCard3);

console.log('✅ 需求3測試 - 魅魔宇宙 (Succubus Banquet):');
console.log(`   身材模板 (succubus queen physique): ${result3.prompt.positive.includes('succubus queen physique') ? '✅ 已套用' : '❌ 未套用'}`);
console.log(`   服裝關鍵詞 (luxury dark fantasy couture): ${result3.prompt.positive.includes('luxury dark fantasy couture') ? '✅ 已套用' : '❌ 未套用'}`);
console.log(`   服裝關鍵詞 (dark aristocratic fashion): ${result3.prompt.positive.includes('dark aristocratic fashion') ? '✅ 已套用' : '❌ 未套用'}`);

// 測試寢宮寵妃身材模板
const testRoleCard4 = {
  id: 'test-04',
  title: '測試寢宮身材模板',
  categoryId: 'qinggong-chongfei',
  scene: { location: 'imperial bedchamber' },
  style: 'photorealistic',
};

const result4 = buildPrompt(QINGGONG_CHONGFEI_CATEGORY, testRoleCard4);

console.log('\n✅ 需求3測試 - 寢宮寵妃 (Qinggong Chongfei):');
console.log(`   身材模板 (imperial consort physique): ${result4.prompt.positive.includes('imperial consort physique') ? '✅ 已套用' : '❌ 未套用'}`);
console.log(`   新服裝描述 (deep V neckline): ${result4.prompt.positive.includes('deep V neckline') ? '✅ 已套用' : '❌ 未套用'}`);
console.log(`   粉紫色系 (pink-purple): ${result4.prompt.positive.includes('pink-purple') ? '✅ 已套用' : '❌ 未套用'}`);

console.log('\n=== 完整咒語預覽 (寢宮寵妃) ===\n');
console.log('Positive Prompt (前200字符):');
console.log(result4.prompt.positive.substring(0, 200) + '...\n');

console.log('\n✅ 所有測試完成！');
