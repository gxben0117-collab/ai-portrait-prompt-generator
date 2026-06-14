/**
 * 測試需求1和需求2
 * 需求1: 參數改英文，移到鎖臉後面
 * 需求2: 開頭加入「用我上傳角色的臉做固定的模板」
 */

import { SUCCUBUS_BANQUET_CATEGORY } from './src/categories/dark-romance/succubus-banquet.js';
import { buildPrompt } from './src/core/promptBuilder.js';

console.log('=== 測試需求1和需求2 ===\n');

const testRoleCard = {
  id: 'test-01',
  title: '測試角色卡',
  categoryId: 'succubus-banquet',
  scene: { location: 'chamber' },
  style: 'photorealistic',
};

const testUserControls = {
  aspectRatio: '9:16',
  shotComposition: 'fullBody',
  fabricDynamic: 'medium',
  bodyType: 'curvy',
};

const result = buildPrompt(SUCCUBUS_BANQUET_CATEGORY, testRoleCard, {
  userControls: testUserControls,
});

console.log('【需求2測試】咒語開頭檢查\n');
const promptStart = result.prompt.positive.substring(0, 100);
console.log(`前100字符: ${promptStart}...\n`);
console.log(`✅ 包含 "Use my uploaded character face as fixed template": ${result.prompt.positive.includes('Use my uploaded character face as fixed template')}`);

console.log('\n【需求1測試】參數位置檢查\n');

// 找到參數標籤的位置
const paramPattern = /\[Aspect Ratio:.*?\]\s*\[Shot:.*?\]\s*\[Fabric Dynamic:.*?\]\s*\[Body Type:.*?\]/;
const match = result.prompt.positive.match(paramPattern);

if (match) {
  const paramPosition = result.prompt.positive.indexOf(match[0]);
  const faceLockEnd = result.prompt.positive.indexOf('looking toward camera');

  console.log(`參數標籤位置: 第 ${paramPosition} 字符`);
  console.log(`鎖臉結束位置: 第 ${faceLockEnd} 字符`);
  console.log(`✅ 參數在鎖臉後面: ${paramPosition > faceLockEnd}`);

  console.log(`\n參數標籤內容:\n${match[0]}`);
} else {
  console.log('❌ 未找到參數標籤');
}

console.log('\n【需求1測試】參數內容英文化\n');
console.log(`✅ Aspect Ratio: ${result.prompt.positive.includes('[Aspect Ratio: 9:16]')}`);
console.log(`✅ Shot: ${result.prompt.positive.includes('[Shot: 全身]')}`);
console.log(`✅ Fabric Dynamic: ${result.prompt.positive.includes('[Fabric Dynamic: 中度流動]')}`);
console.log(`✅ Body Type: ${result.prompt.positive.includes('[Body Type: 豐滿]')}`);

console.log('\n【完整咒語結構】\n');
const lines = result.prompt.positive.split(', ');
console.log('前10個元素:');
lines.slice(0, 10).forEach((line, i) => {
  console.log(`  ${i + 1}. ${line.substring(0, 80)}${line.length > 80 ? '...' : ''}`);
});

console.log('\n【咒語開頭200字符預覽】\n');
console.log(result.prompt.positive.substring(0, 200) + '...\n');

console.log('\n✅ 測試完成！');
