/**
 * 批次改寫 category 檔案的 costumeStyle 成自由描述格式
 * 從: { layer1, concept, keywords[], fabric[] }
 * 到: "costume design in 10-layer structure, ..."
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
  // 匹配 costumeStyle 區塊
  const regex = /costumeStyle:\s*\{[\s\S]*?(?=\n\s{4}\},?\n\s{4}\/\/|$)/;

  const match = src.match(regex);
  if (!match) return src;

  const block = match[0];

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

  // 替換整個 costumeStyle 區塊
  const newBlock = `costumeStyle: "${description}",`;

  return src.replace(regex, newBlock);
}

// 主程式
const categoriesDir = path.join(__dirname, 'src', 'categories');
const files = walk(categoriesDir);

let changed = 0;
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const newSrc = convertCostumeStyle(src);

  if (newSrc !== src) {
    fs.writeFileSync(file, newSrc, 'utf8');
    console.log('✓', path.relative(categoriesDir, file));
    changed++;
  }
}

console.log(`\n✅ 轉換完成: ${changed} 個檔案`);
