/**
 * User Control Engine - 用戶可調控制層
 * 讓用戶在 UI 上自訂圖片比例、鏡頭構圖、布料動態、體態等參數
 */

/**
 * 根據比例生成明確的 aspect ratio prompt
 */
function buildAspectRatioPrompt(aspectRatioKey, ratioData) {
  const { ratio, name } = ratioData;

  // 判斷方向
  const isVertical = ratio.startsWith('9:16') || ratio.startsWith('2:3') || ratio.startsWith('3:4') || ratio.startsWith('4:5') || ratio.includes('21:29') || ratio.includes('14.8:21') || ratio.includes('25:35');
  const isHorizontal = ratio.startsWith('16:9') || ratio.startsWith('3:2') || ratio.startsWith('4:3');
  const isSquare = ratio === '1:1';

  if (isSquare) {
    return `${ratio} aspect ratio, square composition, ${name.toLowerCase()} format`;
  }

  if (isVertical) {
    return `${ratio} aspect ratio, portrait orientation, vertical cinematic composition, ${name.toLowerCase()} format`;
  }

  if (isHorizontal) {
    return `${ratio} aspect ratio, landscape orientation, horizontal cinematic composition, ${name.toLowerCase()} format`;
  }

  // Fallback
  return `${ratio} aspect ratio, ${name.toLowerCase()} format`;
}

/**
 * 圖片比例預設
 */
export const ASPECT_RATIOS = {
  '4:5': { ratio: '4:5', name: '商業海報', width: 832, height: 1040 },
  '1:1': { ratio: '1:1', name: '方形貼文', width: 1024, height: 1024 },
  '3:4': { ratio: '3:4', name: '直式肖像', width: 896, height: 1184 },
  '2:3': { ratio: '2:3', name: '電影直幅', width: 832, height: 1248 },
  '14.8:21': { ratio: '14.8:21', name: '直A5', width: 896, height: 1280 },
  '21:29': { ratio: '21:29', name: '直A4', width: 896, height: 1232 },
  '25:35': { ratio: '25:35', name: '直歐8K', width: 896, height: 1248 },
  '9:16': { ratio: '9:16', name: '手機桌布', width: 768, height: 1360 },
  '16:9': { ratio: '16:9', name: '橫式電影', width: 1344, height: 768 },
  '3:2': { ratio: '3:2', name: '攝影橫幅', width: 1216, height: 832 },
  '4:3': { ratio: '4:3', name: '經典畫幅', width: 1152, height: 896 },
  '2.39:1': { ratio: '2.39:1', name: '寬銀幕', width: 1344, height: 560 },
};

/**
 * 人物鏡頭構圖（固定 50mm 鏡頭）
 */
export const SHOT_COMPOSITIONS = {
  fullBody: {
    name: '全身',
    englishName: 'Full Body',
    framing: 'full body portrait, head to toe visible, complete figure in frame, full shoulder width visible, subject occupies 30-40% of frame',
    description: '完整人物從頭到腳',
  },
  halfBody: {
    name: '半身',
    englishName: 'Half Body',
    framing: 'three-quarter body portrait, upper thighs visible, full shoulder width visible, complete torso visible, subject occupies 35-45% of frame',
    description: '腰部以上',
  },
  kneeUp: {
    name: '膝蓋以上',
    englishName: 'Knee Up',
    framing: 'three-quarter body shot, knees visible, full shoulder width visible, complete torso visible, subject occupies 35-45% of frame',
    description: '膝蓋到頭部',
  },
  chestUp: {
    name: '胸部以上',
    englishName: 'Chest Up',
    framing: 'medium close-up portrait, chest up visible, full shoulder width visible, complete upper torso visible, subject occupies 40-50% of frame',
    description: '胸部到頭部',
  },
  distant: {
    name: '遠景',
    englishName: 'Distant',
    framing: 'distant portrait, full figure in environmental context, establishing shot, subject occupies 25-35% of frame',
    description: '人物與環境全景',
  },
};

/**
 * 布料動態
 */
export const FABRIC_DYNAMICS = {
  high: {
    name: '大動態飄紗',
    englishName: 'High Dynamic',
    prompt: 'dramatic fabric movement, flowing silk in wind, dynamic cloth motion, ethereal floating fabric, wind-swept garments',
    description: '強風吹拂，布料大幅飄動',
  },
  medium: {
    name: '中度流動',
    englishName: 'Medium Flow',
    prompt: 'gentle fabric flow, moderate cloth movement, subtle wind effect, graceful draping motion',
    description: '微風輕拂，自然流動',
  },
  static: {
    name: '靜態垂墜',
    englishName: 'Static',
    prompt: 'natural fabric draping, static cloth fall, elegant hanging fabric, calm garment pose',
    description: '無風狀態，自然垂墜',
  },
};

/**
 * 體態選項
 */
export const BODY_TYPES = {
  default: {
    name: '預設',
    englishName: 'Default',
    prompt: 'natural body proportions, balanced figure, realistic anatomy',
    description: '標準真實人體比例',
  },
  curvy: {
    name: '豐滿',
    englishName: 'Curvy',
    prompt: 'curvy figure, fuller bust, slim waist, hourglass silhouette, voluptuous body type',
    description: '胸部豐滿、腰部纖細',
  },
};

/**
 * 生成用戶控制層 Prompt
 */
export function generateUserControlPrompt(userConfig = {}) {
  const {
    aspectRatio = '3:4',
    shotComposition = 'halfBody',
    fabricDynamic = 'static',
    bodyType = 'default',
  } = userConfig;

  // 獲取各項配置
  const ratio = ASPECT_RATIOS[aspectRatio];
  const shot = SHOT_COMPOSITIONS[shotComposition];
  const fabric = FABRIC_DYNAMICS[fabricDynamic];
  const body = BODY_TYPES[bodyType];

  // 構建比例描述
  const aspectRatioPrompt = buildAspectRatioPrompt(aspectRatio, ratio);

  // 構建參數標籤（英文）
  const paramLabels = [
    `[Aspect Ratio: ${ratio.ratio}]`,
    `[Shot: ${shot.englishName}]`,
    `[Fabric Dynamic: ${fabric.englishName}]`,
    `[Body Type: ${body.englishName}]`,
  ].join(' ');

  // 構建 Prompt
  const positivePrompt = [
    paramLabels,
    '50mm cinema lens',
    aspectRatioPrompt,
    shot.framing,
    fabric.prompt,
    body.prompt,
  ].filter(Boolean).join(', ');

  return {
    positive: positivePrompt,
    metadata: {
      aspectRatio: ratio,
      shotComposition: shot.name,
      fabricDynamic: fabric.name,
      bodyType: body.name,
    },
  };
}

/**
 * 生成完整配置說明（用於 UI 顯示）
 */
export function getUserControlDescription(userConfig) {
  const {
    aspectRatio = '3:4',
    shotComposition = 'halfBody',
    fabricDynamic = 'static',
    bodyType = 'default',
  } = userConfig;

  return {
    比例: ASPECT_RATIOS[aspectRatio]?.name,
    尺寸: `${ASPECT_RATIOS[aspectRatio]?.width} × ${ASPECT_RATIOS[aspectRatio]?.height}`,
    構圖: SHOT_COMPOSITIONS[shotComposition]?.name,
    布料: FABRIC_DYNAMICS[fabricDynamic]?.name,
    體態: BODY_TYPES[bodyType]?.name,
  };
}
