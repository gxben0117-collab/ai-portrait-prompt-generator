/**
 * 夜宴魅魔｜暗黑浪漫｜哥德禮服
 * Succubus Night Banquet - Dark Romance Gothic Gown Cinema
 */

export const SUCCUBUS_BANQUET_CATEGORY = {
  id: 'succubus-banquet',
  name: '夜宴魅魔｜暗黑浪漫｜哥德禮服',
  themeGroup: 'dark-romance',

  visualDNA: {
    // 核心氛圍
    atmosphere: [
      'dark romantic velvet chamber',
      'gothic luxury bedroom cinema',
      'candlelit purple amethyst ambience',
      'mature elegant dark glamour',
    ],

    // 色彩基因
    colors: {
      primary: ['deep purple', 'amethyst violet', 'obsidian black'],
      secondary: ['dark crimson', 'moon silver', 'ruby red'],
      accent: ['candlelight warm glow', 'purple crystal reflection'],
    },

    // 標誌性道具
    iconicProps: [
      'gothic carved mirror',
      'amethyst wine glass',
      'black rose arrangement',
      'velvet canopy bed',
      'obsidian mirror surface',
      'gothic carved screen',
      'crystal chandelier',
      'lace spider-web curtain',
    ],

    // 服裝風格
    costumeStyle: 'costume design in 10-layer structure from inner garments to outer silhouette, luxury dark fantasy couture, dark aristocratic fashion, royal feminine elegance, succubus queen aesthetic, high fashion fantasy costume, cinematic luxury garments, black satin foundation slip dress, succubus seduction dress with short front long back design, body-hugging short front dress revealing long legs, deep V neckline with black lace, fitted waist corset-inspired design, high slit for leg emphasis, flowing long back train, sheer black outer robe, black satin body-skimming fit, sheer black lace overlay, velvet ribbon accents, amethyst crystal jewelry, gothic ornamental details',

    // 身材要求
    bodyRequirements: {
      bodyType: 'succubus queen physique, tall elegant silhouette, luxuriously feminine figure, full feminine curves, generous bust, defined elegant waist, graceful hips, long elegant legs, supernaturally beautiful proportions, powerful feminine presence, aristocratic demonic elegance, queen-like posture, balanced anatomy despite supernatural beauty, ',
      emphasis: 'seductive curves with realistic fabric physics, balanced proportions',
      legs: 'long elegant legs prominently featured, elongated leg line, visible upper thighs, high waist cut, fashion photography leg proportions',
    },

    // 場景類型
    sceneTypes: [
      'dark purple velvet bedroom chamber',
      'gothic candlelit palace interior',
      'moonlight high window chamber',
      'luxury dark romantic boudoir',
    ],

    // 光線偏好
    lighting: {
      keyLight: 'soft warm candlelight from low position',
      fillLight: 'cool purple moonlight from high window',
      rimLight: 'moonlight edge separation on silk and hair',
      ambience: 'purple haze with warm ruby reflection',
      catchlight: 'visible in eyes, jewelry has soft specular highlights',
    },

    // 攝影風格
    photography: {
      focus: 'shallow depth of field with velvet bokeh',
      mood: 'mature dark romantic cinema quality',
    },

    // 禁止元素 (Critical)
    prohibitions: [
      'no bra-and-panty lingerie set',
      'no erotic underwear costume',
      'no game character skin outfit',
      'no anime magical girl dress',
      'no overly exposed body',
      'dress must be one-piece nightgown covering chest and lower body',
    ],

    // 質感要求
    textureRequirements: [
      'realistic silk fabric draping physics',
      'natural candlelight reflection on satin',
      'soft skin-close fabric contact',
      'cinematic fabric weight and flow',
      'velvet realistic texture with depth',
    ],

    // 服裝增強（魅魔系專屬）
    costumeEnhancement: {
      bodyType: 'succubus queen physique, tall elegant silhouette, luxuriously feminine figure, full feminine curves, generous bust, defined elegant waist, graceful hips, long elegant legs with elongated leg line, visible upper thighs, balanced leg-to-torso ratio, fashion photography proportions, powerful feminine presence, aristocratic demonic elegance',
      attitude: 'seductive confidence, captivating gaze, commanding presence, dangerous allure, succubus queen aura',
      style: 'deep plunging V-neckline revealing decolletage, body-hugging short front skirt exposing long legs, high slit design for leg line emphasis, flowing long back train, lavender lace detailing on thighs, fitted waist with corset-inspired silhouette, sheer purple silk outer robe, amethyst crystal jewelry, butterfly-inspired embroidery, gothic luxury fashion',
      mood: 'dangerous seduction, active temptation, succubus queen energy, dark sensual power',
    },
  },

  // 提示詞權重配置
  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.3,
    lighting: 1.1,
    style: 1.0,
  },
};
