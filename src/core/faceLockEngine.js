/**
 * Face Lock Engine - 咒語鎖臉系統
 * Highest priority layer - preserves uploaded face identity
 */

export const FACE_LOCK_ENGINE = {
  // 強制性臉部保留指令 (Highest Weight)
  mandatory: [
    'preserve uploaded face identity',
    'maintain original face shape',
    'maintain original eye shape',
    'maintain original nose shape',
    'maintain original mouth shape',
    'maintain original jawline',
    'preserve facial proportions',
    'preserve natural asymmetry',
    'retain authentic skin texture',
    'no beautification',
    'no face replacement',
    'no generic AI beauty face',
  ],

  // 真實人體解剖結構鎖定
  anatomyLock: [
    'realistic adult female anatomy',
    'balanced shoulder width',
    'natural clavicle structure',
    'real torso depth',
    'correct ribcage volume',
    'natural waist and hip proportions',
    'realistic limb length',
  ],

  // 視角鎖定 (避免變形，但不包含鏡頭和構圖，由 UI 控制)
  perspectiveLock: [
    'eye-level camera',
    'natural perspective',
    'front-facing or slight three-quarter angle',
    'looking toward camera',
  ],

  // 禁止的臉部修改 (Critical - 更完整)
  prohibitions: [
    'no AI beauty filter',
    'no face swap',
    'no generic pretty face template',
    'no facial feature standardization',
    'no Instagram beauty filter',
    'no anime face conversion',
    'no game character face template',
    'doll face',
    'baby face',
    'oversized eyes',
    'plastic skin',
    'airbrushed skin',
    'beauty app filter',
    'overly smooth skin',
    'tiny shoulders',
    'large head',
    'short torso',
    'unrealistic anatomy',
    'cgi skin',
    'fashion doll proportions',
    'western fantasy costume',
    'fantasy armor',
    'cosplay look',
  ],

  // Prompt 權重設定
  weight: 1.6,

  // 生成完整臉部鎖定 Prompt
  generate() {
    const mandatoryPrompt = this.mandatory.join(', ');
    const anatomyPrompt = this.anatomyLock.join(', ');
    const perspectivePrompt = this.perspectiveLock.join(', ');
    const negativePrompt = this.prohibitions.map(p => p.replace(/^no /, '')).join(', ');

    return {
      positive: `(${mandatoryPrompt}:${this.weight}), ${anatomyPrompt}, ${perspectivePrompt}`,
      negative: negativePrompt,
      priority: 'highest',
    };
  },
};

/**
 * 臉部鎖定驗證函數
 * @param {Object} promptConfig - 完整的 prompt 配置
 * @returns {boolean} 是否包含臉部鎖定層
 */
export function validateFaceLock(promptConfig) {
  const required = ['preserve uploaded face', 'maintain original facial'];
  const hasRequired = required.every(keyword =>
    promptConfig.positive.toLowerCase().includes(keyword)
  );

  if (!hasRequired) {
    console.warn('⚠️ Face lock layer missing or incomplete!');
  }

  return hasRequired;
}
