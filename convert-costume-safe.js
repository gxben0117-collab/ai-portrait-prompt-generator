/**
 * 安全批次改寫 category 檔案的 costumeStyle
 * 從結構化物件改成自由描述字串
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.js')) {
      results.push(filePath);
    }
  }
  return results;
}

function convertCostumeStyle(src) {
  // 更精確的 regex：匹配 costumeStyle: { ... }, 包含結尾的逗號和換行
  // 使用 non-greedy + 明確的結束標記
  const regex = /costumeStyle:\s*\{\s*\n([\s\S]*?)\n\s*\},/;

  const match = src.match(regex);
  if (!match) {
    console.warn('  ⚠️  找不到 costumeStyle 區塊');
    return src;
  }

  const block = match[1]; // 只取大括號內部的內容

  // 提取各個欄位
  const layer1Match = block.match(/layer1:\s*'([^']+)'/);
  const conceptMatch = block.match(/concept:\s*'([^']+)'/);
  const keywordsMatch = block.match(/keywords:\s*\[([\s\S]*?)\]/);
  const fabricMatch = block.match(/fabric:\s*\[([\s\S]*?)\]/);

  const layer1 = layer1Match ? layer1Match[1] : '';
  const concept = conceptMatch ? conceptMatch[1] : '';

  let keywords = [];
  if (keywordsMatch) {
    keywords = keywordsMatch[1]
      .split('\n')
      .map(line => line.trim().replace(/^'|'[,;]?$/g, ''))
      .filter(Boolean);
  }

  let fabrics = [];
  if (fabricMatch) {
    fabrics = fabricMatch[1]
      .split('\n')
      .map(line => line.trim().replace(/^'|'[,;]?$/g, ''))
      .filter(Boolean);
  }

  // 組合成自由描述
  const description = [
    'costume design in 10-layer structure from inner garments to outer silhouette',
    layer1,
    concept,
    ...keywords,
    ...fabrics,
  ].filter(Boolean).join(', ');

  // 替換整個 costumeStyle 區塊（保留縮排和逗號）
  const newBlock = `costumeStyle: "${description}",`;

  return src.replace(regex, newBlock);
}

// 主程式
const categoriesDir = path.join(__dirname, 'src', 'categories');
const files = walk(categoriesDir);

let successCount = 0;
let failCount = 0;

for (const file of files) {
  try {
    const original = fs.readFileSync(file, 'utf8');
    const converted = convertCostumeStyle(original);

    if (converted === original) {
      console.log('⏭️ ', path.relative(categoriesDir, file), '— 無需轉換');
      continue;
    }

    // 先寫入備份
    fs.writeFileSync(file + '.backup', original, 'utf8');

    // 寫入轉換結果
    fs.writeFileSync(file, converted, 'utf8');

    // 語法驗證（簡單檢查：能否再次讀取）
    const verify = fs.readFileSync(file, 'utf8');
    if (verify.length < original.length * 0.5) {
      throw new Error('轉換後檔案大小異常縮小，可能有內容遺失');
    }

    console.log('✅', path.relative(categoriesDir, file));
    successCount++;

    // 刪除備份
    fs.unlinkSync(file + '.backup');
  } catch (err) {
    console.error('❌', path.relative(categoriesDir, file), '—', err.message);

    // 復原備份
    if (fs.existsSync(file + '.backup')) {
      fs.copyFileSync(file + '.backup', file);
      fs.unlinkSync(file + '.backup');
      console.log('   ↩️  已復原');
    }

    failCount++;
  }
}

console.log(`\n📊 轉換完成: ${successCount} 成功, ${failCount} 失敗`);

if (failCount > 0) {
  console.log('\n⚠️  部分檔案轉換失敗，請手動檢查');
  process.exit(1);
}
