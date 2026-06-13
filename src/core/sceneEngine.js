/**
 * Scene Engine - 場景層引擎
 * Layer 2: Variable, category-specific scene construction
 */

/**
 * 從分類的 visualDNA 生成場景 Prompt
 * @param {Object} categoryVisualDNA - 分類的 visualDNA 配置
 * @param {Object} roleSceneData - 角色卡的場景具體數據
 * @returns {Object} 場景 Prompt 配置
 */
export function generateScenePrompt(categoryVisualDNA, roleSceneData) {
  const { sceneTypes, iconicProps, atmosphere, lighting } = categoryVisualDNA;
  const { location, props, timeOfDay, weather } = roleSceneData;

  // 構建場景主體描述（只用角色卡的 location，不加分類的 sceneTypes 避免污染）
  const sceneBase = location;

  // 選擇關鍵道具 (最多 5 個以避免 token 浪費)
  const selectedProps = props || iconicProps.slice(0, 5);
  const propsDescription = selectedProps.join(', ');

  // 氛圍描述
  const atmosphereDescription = atmosphere.slice(0, 2).join(', ');

  // 時間與天氣（移除具體光線時間，避免與 lighting 層衝突）
  const cleanedTimeOfDay = cleanLightingConflicts(timeOfDay);
  const environmentalContext = [cleanedTimeOfDay, weather].filter(Boolean).join(', ');

  // Solo Character Control（確保只有主角一人）
  const soloCharacterControl = 'solo female character, single person only, only one human in entire image, featured heroine, main character focus, empty environment, no attendants, no crowd, no background characters';

  // 組合完整場景描述
  const positivePrompt = [
    sceneBase,
    propsDescription,
    atmosphereDescription,
    environmentalContext,
    soloCharacterControl,
  ].filter(Boolean).join('; ');

  return {
    positive: positivePrompt,
    weight: 1.2,
    layer: 'scene',
  };
}

/**
 * 清理光線衝突關鍵字
 * 移除具體光線時間，保留情境描述
 */
function cleanLightingConflicts(timeOfDay) {
  if (!timeOfDay) return '';

  // 具體光線時間關鍵字（會與 lighting 層衝突）
  const lightingKeywords = [
    'golden hour', 'sunset', 'sunrise', 'morning light',
    'afternoon light', 'daylight', 'dawn', 'dusk',
    'moonlit', 'candlelit', 'moonlight', 'candlelight'
  ];

  let cleaned = timeOfDay;

  // 移除光線關鍵字
  lightingKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    cleaned = cleaned.replace(regex, '').trim();
  });

  // 清理多餘空格和標點
  cleaned = cleaned.replace(/\s+/g, ' ').replace(/^[,\s]+|[,\s]+$/g, '');

  // 如果清理後為空，返回通用時間
  return cleaned || 'atmospheric moment';
}

/**
 * 場景驗證函數
 * @param {Object} scenePrompt - 生成的場景 Prompt
 * @param {Object} categoryVisualDNA - 分類的 visualDNA
 * @returns {Object} 驗證結果
 */
export function validateScene(scenePrompt, categoryVisualDNA) {
  const { criticalValidation } = categoryVisualDNA;

  if (!criticalValidation) {
    return { valid: true };
  }

  const errors = [];
  const prompt = scenePrompt.positive.toLowerCase();

  // 檢查必須包含的元素
  if (criticalValidation.mustHave) {
    const mustHaveList = Array.isArray(criticalValidation.mustHave)
      ? criticalValidation.mustHave
      : [criticalValidation.mustHave];

    mustHaveList.forEach(required => {
      const keyword = required.toLowerCase();
      if (!prompt.includes(keyword)) {
        errors.push(`Missing critical element: ${required}`);
      }
    });
  }

  // 檢查標誌性元素
  if (criticalValidation.signature) {
    const signature = criticalValidation.signature.toLowerCase();
    if (!prompt.includes(signature)) {
      errors.push(`Missing signature element: ${criticalValidation.signature}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 場景 Prompt 優化器
 * 移除重複描述並精簡 token 使用
 */
export function optimizeScenePrompt(scenePrompt) {
  const words = scenePrompt.positive.split(/[,;]\s*/);
  const uniqueWords = [...new Set(words)];

  return {
    ...scenePrompt,
    positive: uniqueWords.join(', '),
  };
}
