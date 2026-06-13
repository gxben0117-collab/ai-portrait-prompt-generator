/**
 * Test Script for 10 Role Cards Prompt Quality
 */

import { buildPrompt, generateQualityReport } from './src/core/promptBuilder.js';
import { WORLD_LANDMARKS_CATEGORY } from './src/categories/world-fashion/world-landmarks.js';
import { WESTERN_EPIC_CATEGORY } from './src/categories/epic-classic/western-epic.js';
import { ANIME_STREET_CATEGORY } from './src/categories/world-fashion/anime-street.js';
import { TANG_DAMING_PALACE_CATEGORY } from './src/categories/eastern-historical-court/tang-daming-palace.js';
import { DUNHUANG_FEITIAN_CATEGORY } from './src/categories/eastern-ethnic-regional/dunhuang-feitian.js';
import { QING_QIZHUANG_CATEGORY } from './src/categories/eastern-historical-court/qing-qizhuang.js';
import { CYBERPUNK_MECHA_CATEGORY } from './src/categories/world-fashion/cyberpunk-mecha.js';
import { DARK_ROYALTY_CATEGORY } from './src/categories/dark-fantasy/dark-royalty.js';

import { readFileSync } from 'fs';

const worldLandmarksProfiles = JSON.parse(readFileSync('./src/profiles/world-landmarks-profiles.json', 'utf8'));
const westernEpicProfiles = JSON.parse(readFileSync('./src/profiles/western-epic-profiles.json', 'utf8'));
const animeStreetProfiles = JSON.parse(readFileSync('./src/profiles/anime-street-profiles.json', 'utf8'));
const tangDamingProfiles = JSON.parse(readFileSync('./src/profiles/tang-daming-palace-profiles.json', 'utf8'));
const dunhuangProfiles = JSON.parse(readFileSync('./src/profiles/dunhuang-feitian-profiles.json', 'utf8'));
const qingProfiles = JSON.parse(readFileSync('./src/profiles/qing-qizhuang-profiles.json', 'utf8'));
const cyberpunkProfiles = JSON.parse(readFileSync('./src/profiles/cyberpunk-neon-profiles.json', 'utf8'));
const vampireProfiles = JSON.parse(readFileSync('./src/profiles/vampire-gothic-profiles.json', 'utf8'));
const modernIdolProfiles = JSON.parse(readFileSync('./src/profiles/modern-idol-profiles.json', 'utf8'));

const testCases = [
  { category: WORLD_LANDMARKS_CATEGORY, profiles: worldLandmarksProfiles, targetId: 'world-landmarks-11', name: '威尼斯嘉年華・金色面具' },
  { category: WORLD_LANDMARKS_CATEGORY, profiles: worldLandmarksProfiles, targetId: 'world-landmarks-21', name: '旅行者日記・環球回憶' },
  { category: WESTERN_EPIC_CATEGORY, profiles: westernEpicProfiles, targetId: 'western-epic-20', name: '博物館策展人・文明守護' },
  { category: ANIME_STREET_CATEGORY, profiles: animeStreetProfiles, targetId: 'anime-street-20', name: '東京塔觀景台・城市全景' },
  { category: TANG_DAMING_PALACE_CATEGORY, profiles: tangDamingProfiles, targetId: 'tang-daming-01', name: '唐大明宮測試' },
  { category: DUNHUANG_FEITIAN_CATEGORY, profiles: dunhuangProfiles, targetId: 'dunhuang-feitian-01', name: '飛天伎樂・敦煌壁畫' },
  { category: QING_QIZHUANG_CATEGORY, profiles: qingProfiles, targetId: 'qing-qizhuang-01', name: '滿族旗裝・民族華服' },
  { category: CYBERPUNK_MECHA_CATEGORY, profiles: cyberpunkProfiles, targetId: 'cyberpunk-neon-01', name: '霓虹街頭・賽博武士 (using CYBERPUNK_MECHA fallback)' },
  { category: DARK_ROYALTY_CATEGORY, profiles: vampireProfiles, targetId: 'vampire-gothic-01', name: '血族宮廷・午夜女伯爵 (using DARK_ROYALTY fallback)' },
  { category: ANIME_STREET_CATEGORY, profiles: modernIdolProfiles, targetId: 'modern-idol-01', name: '出道舞台・首次亮相 (using ANIME_STREET fallback)' },
];

function checkPromptQuality(prompt, roleCardId, cardTitle) {
  const issues = [];
  const positivePrompt = prompt.prompt.positive.toLowerCase();

  // Check 1: Costume layer structure
  if (!positivePrompt.includes('costume design in 7-layer structure from foundation to outer accessories, plus layer-8 character-appropriate makeup design')) {
    issues.push('❌ Missing 7-layer costume structure phrase');
  } else {
    console.log('  ✅ 7-layer costume structure present');
  }

  // Check 2: Face Lock
  if (!positivePrompt.includes('preserve uploaded face identity')) {
    issues.push('❌ Missing Face Lock instruction (preserve uploaded face identity)');
  } else {
    console.log('  ✅ Face Lock instruction present');
  }

  // Check 3: 50mm cinema lens
  if (!positivePrompt.includes('50mm')) {
    issues.push('❌ Missing 50mm cinema lens');
  } else {
    console.log('  ✅ 50mm cinema lens present');
  }

  // Check 4: Theme pollution detection
  const themePollutionPatterns = [
    { pattern: /venice|venetian/i, allowedIds: ['world-landmarks-11'] },
    { pattern: /eiffel|paris/i, allowedIds: ['world-landmarks-01'] },
    { pattern: /tokyo tower/i, allowedIds: ['anime-street-20'] },
    { pattern: /museum/i, allowedIds: ['western-epic-20'] },
    { pattern: /tang.*palace|daming/i, allowedIds: ['tang-daming-palace-01', 'tang-daming-01'] },
    { pattern: /dunhuang/i, allowedIds: ['dunhuang-feitian-01'] },
    { pattern: /qing|manchu|qizhuang/i, allowedIds: ['qing-qizhuang-01'] },
    { pattern: /cyberpunk|neon/i, allowedIds: ['cyberpunk-neon-01'] },
    { pattern: /vampire|gothic.*castle/i, allowedIds: ['vampire-gothic-01'] },
    { pattern: /idol|stage.*concert/i, allowedIds: ['modern-idol-01'] },
  ];

  const fullPrompt = prompt.prompt.positive;
  for (const { pattern, allowedIds } of themePollutionPatterns) {
    if (pattern.test(fullPrompt) && !allowedIds.includes(roleCardId)) {
      issues.push(`❌ Theme pollution detected: Found "${pattern}" in card ${roleCardId}`);
    }
  }

  if (issues.length === 0) {
    console.log('  ✅ No theme pollution detected');
  }

  return { issues, prompt: fullPrompt };
}

console.log('='.repeat(80));
console.log('Testing 10 Role Cards for Prompt Quality');
console.log('='.repeat(80));
console.log();

let passCount = 0;
let failCount = 0;

for (const testCase of testCases) {
  const roleCard = testCase.profiles.find(p => p.id === testCase.targetId);

  if (!roleCard) {
    console.log(`\n🔴 CARD NOT FOUND: ${testCase.targetId} (${testCase.name})`);
    failCount++;
    continue;
  }

  console.log(`\n${'─'.repeat(80)}`);
  console.log(`Testing: ${testCase.targetId} - ${roleCard.title}`);
  console.log(`${'─'.repeat(80)}`);

  try {
    const builtPrompt = buildPrompt(testCase.category, roleCard);
    const qualityCheck = checkPromptQuality(builtPrompt, testCase.targetId, roleCard.title);
    const qualityReport = generateQualityReport(builtPrompt);

    console.log(`\nQuality Report:`);
    console.log(`  Overall: ${qualityReport.overall}`);
    console.log(`  Token Count: ${qualityReport.tokenCount} (${qualityReport.tokenEfficiency})`);
    console.log(`  Face Lock: ${qualityReport.validationStatus.faceLock}`);
    console.log(`  Scene: ${qualityReport.validationStatus.scene}`);
    console.log(`  Costume: ${qualityReport.validationStatus.costume}`);
    console.log(`  Style Conflict: ${qualityReport.validationStatus.styleConflict}`);

    if (qualityCheck.issues.length > 0) {
      console.log(`\n⚠️  Issues Found:`);
      qualityCheck.issues.forEach(issue => console.log(`  ${issue}`));
      failCount++;
    } else {
      console.log(`\n✅ ALL CHECKS PASSED`);
      passCount++;
    }

    // Show first 500 chars of prompt for verification
    console.log(`\nPrompt Preview (first 500 chars):`);
    console.log(`  ${qualityCheck.prompt.substring(0, 500)}...`);

    // For failed cards, show more details
    if (qualityCheck.issues.length > 0 && testCase.targetId === 'world-landmarks-11') {
      console.log(`\n🔍 Full Prompt for Debugging:`);
      console.log(qualityCheck.prompt);
    }

  } catch (error) {
    console.log(`\n🔴 ERROR: ${error.message}`);
    console.error(error.stack);
    failCount++;
  }
}

console.log(`\n${'='.repeat(80)}`);
console.log(`SUMMARY: ${passCount} passed, ${failCount} failed out of ${testCases.length} cards`);
console.log(`${'='.repeat(80)}`);
