/**
 * Photography Engine - 攝影層引擎
 * Layer 4: Fixed or semi-fixed photography technical parameters
 */

/**
 * 標準攝影參數配置
 * 注意：framing 和 lens 由 userControlEngine 提供，此處不重複定義
 */
export const PHOTOGRAPHY_PRESETS = {
  // 人像標準配置
  portrait: {
    focus: 'shallow depth of field, f/2.8 equivalent',
    angle: 'eye-level natural perspective',
    composition: 'rule of thirds, balanced composition',
    bodyScale: 'subject occupies 35-45% of frame, head occupies no more than 30% of visible figure, full shoulder width visible, complete upper torso visible, real adult body mass, balanced head-to-shoulder ratio, avoid oversized head, avoid selfie proportions',
  },

  // 全身人像配置
  fullBody: {
    focus: 'moderate depth of field, f/4 equivalent',
    angle: 'eye-level natural perspective',
    composition: 'centered with environmental context',
    bodyScale: 'subject occupies 30-40% of frame, head occupies no more than 25% of visible figure, complete figure with environmental context, natural body proportions in scene, balanced character scale',
  },

  // 電影級構圖
  cinematic: {
    focus: 'cinematic shallow depth with environmental context',
    angle: 'eye-level natural perspective',
    composition: 'dramatic lighting with environmental context',
    bodyScale: 'subject occupies 35-45% of frame, head occupies no more than 30% of visible figure, full shoulder width visible, complete torso visible, character integrated into scene, real torso depth, avoid compressed torso',
  },

  // 旅拍攝影
  travelPhotography: {
    focus: 'balanced depth showing both subject and environment',
    angle: 'eye-level or slight low angle for grandeur',
    composition: 'subject as focal point within vast scene',
    bodyScale: 'subject occupies 25-35% of frame, environmental portrait, character within landscape context, natural scale in environment',
  },
};

/**
 * 生成攝影層 Prompt
 * @param {Object} categoryVisualDNA - 分類的 visualDNA 配置
 * @param {string} presetType - 預設類型 (portrait/fullBody/cinematic/travelPhotography)
 * @returns {Object} 攝影 Prompt 配置
 */
export function generatePhotographyPrompt(categoryVisualDNA, presetType = 'portrait') {
  const categoryPhotography = categoryVisualDNA.photography || {};
  const preset = PHOTOGRAPHY_PRESETS[presetType] || PHOTOGRAPHY_PRESETS.portrait;

  // 合併分類特定設定與預設
  const photography = {
    ...preset,
    ...categoryPhotography,
  };

  // 構建攝影描述（不包含 framing 和 lens，由 userControlEngine 提供）
  const photographyDescription = [
    photography.focus,
    photography.angle,
    photography.composition,
    photography.bodyScale,
  ].filter(Boolean).join(', ');

  // 攝影情緒/風格（移除重複的 quality）
  const moodDescription = photography.mood || '';

  return {
    positive: moodDescription ? `${photographyDescription}, ${moodDescription}` : photographyDescription,
    weight: 1.1,
    layer: 'photography',
  };
}

/**
 * 通用技術品質參數 (精簡版，避免重複)
 */
export const TECHNICAL_QUALITY = {
  resolution: 'high resolution',
  detail: 'sharp focus',
};

/**
 * 生成技術品質 Prompt (精簡，避免 token 浪費)
 */
export function generateTechnicalQuality() {
  const { resolution, detail } = TECHNICAL_QUALITY;
  return `${resolution}, ${detail}`;
}

/**
 * 負面技術參數 (加強版 - 避免常見問題)
 */
export const TECHNICAL_NEGATIVE = [
  'blurry',
  'low quality',
  'distorted',
  'pixelated',
  'overexposed',
  'underexposed',
  'wide angle distortion',
  'fish eye effect',
  'perspective distortion',
  'unnatural proportions',
  'warped perspective',
];

/**
 * 攝影層優化 - 移除重複的技術參數
 */
export function optimizePhotographyPrompt(photographyPrompt, _existingPrompt = '') {
  let optimized = photographyPrompt.positive;

  // 檢查是否已經包含類似的技術參數
  const technicalKeywords = ['depth of field', 'lens', 'focus', 'resolution', 'quality'];

  technicalKeywords.forEach(keyword => {
    const regex = new RegExp(`[^,;]*${keyword}[^,;]*`, 'gi');
    const matches = optimized.match(regex);

    if (matches && matches.length > 1) {
      // 保留第一個最具體的描述，移除重複
      optimized = optimized.replace(regex, (match, offset) => {
        return offset === optimized.search(regex) ? match : '';
      });
    }
  });

  return {
    ...photographyPrompt,
    positive: optimized.replace(/\s+/g, ' ').replace(/[,;]\s*[,;]/g, ', ').trim(),
  };
}

/**
 * 根據分類自動選擇攝影預設
 */
export function selectPhotographyPreset(categoryVisualDNA) {
  const { atmosphere } = categoryVisualDNA;

  // 根據氛圍關鍵詞判斷
  const atmosphereText = atmosphere ? atmosphere.join(' ').toLowerCase() : '';

  if (atmosphereText.includes('epic') || atmosphereText.includes('travel photography')) {
    return 'travelPhotography';
  }

  if (atmosphereText.includes('cinema') || atmosphereText.includes('cinematic')) {
    return 'cinematic';
  }

  // 預設使用 portrait
  return 'portrait';
}
