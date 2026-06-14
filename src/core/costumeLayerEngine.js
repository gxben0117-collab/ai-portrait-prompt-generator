/**
 * Costume Layer Engine - 10層服裝系統
 * Layer 3: Variable, 10-layer realistic wearable clothing physics
 */

/**
 * 從分類 visualDNA 和角色數據生成服裝 Prompt
 * 支援兩種格式：
 * 1. 新格式（推薦）: costume 直接是自由描述字串
 * 2. 舊格式（兼容）: costume.layer1 / costume.layers / costume.layer10
 *
 * @param {Object} categoryVisualDNA - 分類的 visualDNA 配置
 * @param {Object} roleCostumeData - 角色卡的服裝數據
 * @returns {Object} 服裝 Prompt
 */
export function generateCostumePrompt(categoryVisualDNA, roleCostumeData) {
  const { costumeStyle, bodyRequirements, textureRequirements, prohibitions, costumeEnhancement } = categoryVisualDNA;

  let costumeDescription = '';

  // 新格式：costume 直接是字串（自由描述）
  if (typeof roleCostumeData === 'string') {
    costumeDescription = roleCostumeData;
  }
  // 如果角色卡沒提供，直接用分類的 costumeStyle
  else if (!roleCostumeData && typeof costumeStyle === 'string') {
    costumeDescription = costumeStyle;
  }
  // 舊格式兼容：costume.layer1 / costume.layers / costume.layer10
  else if (roleCostumeData && typeof roleCostumeData === 'object') {
    const { layer1, layer10, layers } = roleCostumeData;

    const foundationLayer = layer1 || (typeof costumeStyle === 'object' ? costumeStyle.layer1 : '');
    const middleLayers = layers || (typeof costumeStyle === 'object' ? buildDefaultMiddleLayers(costumeStyle) : '');
    const silhouetteLayer = layer10 || (typeof costumeStyle === 'object' ? buildSilhouetteLayer(costumeStyle) : '');

    costumeDescription = [
      'costume design in 10-layer structure from foundation to outer silhouette, allow creative interpretation including garments, fabrics, embroidery, jewelry, accessories, hair ornaments, belts, ribbons, and thematic decorative elements appropriate to character and cultural setting',
      foundationLayer ? `${foundationLayer}` : '',
      middleLayers ? `${middleLayers}` : '',
      silhouetteLayer ? `${silhouetteLayer}` : '',
    ].filter(Boolean).join('; ');
  }
  // Fallback：用分類預設
  else if (typeof costumeStyle === 'object') {
    costumeDescription = buildDefaultCostumeDescription(costumeStyle);
  }

  // 身材要求
  const bodyDescription = buildBodyDescription(bodyRequirements);

  // 質感要求
  const textureDescription = textureRequirements?.slice(0, 3).join(', ') || '';

  // 服裝增強（如果分類有定義）
  const enhancementDescription = costumeEnhancement
    ? `${costumeEnhancement.bodyType}; ${costumeEnhancement.attitude}; ${costumeEnhancement.style}; ${costumeEnhancement.mood}`
    : '';

  // 組合完整服裝描述
  const positivePrompt = [
    costumeDescription,
    'Layer7: character-appropriate makeup and beauty styling matching theme, era, costume palette, and atmosphere while preserving original facial identity',
    bodyDescription,
    textureDescription,
    enhancementDescription,
  ].filter(Boolean).join('; ');

  // 禁止元素
  const negativePrompt = prohibitions
    ? prohibitions.map(p => p.replace('no ', '').replace('must be ', '').replace('must ', '')).join(', ')
    : '';

  return {
    positive: positivePrompt,
    negative: negativePrompt,
    weight: 1.3,
    layer: 'costume',
  };
}

/**
 * 構建默認服裝描述（從 costumeStyle）
 */
function buildDefaultCostumeDescription(costumeStyle) {
  const { concept, keywords, fabric } = costumeStyle;
  return `costume design in 10-layer structure, ${concept}, ${keywords.slice(0, 3).join(', ')}, ${fabric.slice(0, 2).join(', ')}`;
}

/**
 * 構建默認中間層服裝（舊格式兼容）
 */
function buildDefaultMiddleLayers(costumeStyle) {
  const { keywords, fabric } = costumeStyle;
  return keywords.slice(0, 4).join(', ') + '; ' + fabric.slice(0, 2).join(', ');
}

/**
 * 構建最終輪廓層描述（舊格式兼容）
 */
function buildSilhouetteLayer(costumeStyle) {
  const { concept, keywords } = costumeStyle;
  return `${concept}, forming ${keywords[0]} with cinematic silhouette`;
}

/**
 * 構建身材描述
 */
function buildBodyDescription(bodyRequirements) {
  if (!bodyRequirements) return '';

  const parts = [];

  if (bodyRequirements.bodyType) {
    parts.push(bodyRequirements.bodyType);
  }

  if (bodyRequirements.emphasis) {
    parts.push(bodyRequirements.emphasis);
  }

  if (bodyRequirements.legs) {
    parts.push(bodyRequirements.legs);
  }

  return parts.join(', ');
}

/**
 * 服裝層驗證
 */
export function validateCostumeLayers(costumePrompt) {
  const errors = [];
  const prompt = costumePrompt.positive.toLowerCase();

  // 必須包含 costume design 關鍵字
  if (!prompt.includes('costume')) {
    errors.push('Missing costume description');
  }

  // 必須描述質感物理
  const physicsKeywords = ['draping', 'fabric', 'texture', 'layered', 'flowing'];
  const hasPhysics = physicsKeywords.some(keyword => prompt.includes(keyword));

  if (!hasPhysics) {
    errors.push('Missing realistic fabric description');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 優化服裝描述，避免重複與衝突
 */
export function optimizeCostumePrompt(costumePrompt) {
  let optimized = costumePrompt.positive;

  // 移除重複的材質描述
  const materialWords = ['silk', 'satin', 'velvet', 'gauze', 'chiffon'];
  materialWords.forEach(material => {
    const regex = new RegExp(`\\b${material}\\b`, 'gi');
    const matches = optimized.match(regex);
    if (matches && matches.length > 2) {
      // 保留前兩次出現，移除其他
      let count = 0;
      optimized = optimized.replace(regex, match => {
        count++;
        return count <= 2 ? match : '';
      });
    }
  });

  return {
    ...costumePrompt,
    positive: optimized.replace(/\s+/g, ' ').replace(/[,;]\s*[,;]/g, ', ').trim(),
  };
}
