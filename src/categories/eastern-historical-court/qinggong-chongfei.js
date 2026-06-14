/**
 * 寢宮寵妃｜深夜情話｜私密氛圍
 * Imperial Palace Consort - Evening Leisure
 */

export const QINGGONG_CHONGFEI_CATEGORY = {
  id: 'qinggong-chongfei',
  name: '寢宮寵妃｜深夜情話｜私密氛圍',
  themeGroup: 'eastern-historical-court',

  visualDNA: {
    atmosphere: [
      'luxury imperial resting chamber',
      'palace evening leisure',
      'warm candlelit atmosphere',
      'quiet palace residence',
    ],

    colors: {
      primary: ['crimson red', 'golden silk', 'peach blossom pink'],
      secondary: ['moonlight silver', 'candlelight warm', 'jade green'],
      accent: ['silk luster', 'pearl glow'],
    },

    iconicProps: [
      'luxury silk couch',
      'jade wine vessels',
      'ornate palace screens',
      'warm candlelight',
      'silk curtains',
      'incense burner',
      'embroidered wall hangings',
    ],

    costumeStyle: 'costume design in 10-layer structure from inner garments to outer silhouette, elegant pink-purple silk robe, layered palace loungewear, flowing embroidered silk dress, traditional palace indoor attire, high-quality silk garments, layered embroidered palace garments, gold hair ornaments, delicate pearl jewelry, refined court beauty aesthetic',

    bodyRequirements: {
      bodyType: 'imperial consort physique, elegant feminine silhouette, balanced mature proportions, defined elegant waist, graceful hips, long slender legs, mature feminine beauty, healthy adult proportions, natural realistic curves, palace beauty silhouette',
      emphasis: 'elegant curves with realistic draping, balanced proportions',
      legs: 'long graceful legs, elongated leg line, high waist silhouette, fashion photography leg proportions',
    },

    sceneTypes: [
      'imperial palace resting chamber',
      'palace residence interior',
      'luxury silk couch setting',
      'quiet palace evening scene',
    ],

    lighting: {
      keyLight: 'soft warm candlelight',
      fillLight: 'gentle moonlight through window',
      rimLight: 'silk fabric edge glow',
      ambience: 'warm elegant palace atmosphere',
    },

    photography: {
      focus: 'sophisticated palace scene',
      mood: 'palace elegance cinema quality',
    },

    prohibitions: [
      'no erotic or explicit content',
      'no modern lingerie',
      'must maintain elegant historical palace aesthetic',
      'no vulgar presentation',
    ],

    textureRequirements: [
      'luxury silk realistic draping',
      'soft candlelight on fabric',
      'elegant palace atmosphere',
      'authentic historical detail',
    ],

    costumeEnhancement: {
      bodyType: 'imperial consort physique, elegant feminine silhouette, balanced mature proportions, natural realistic curves, defined elegant waist, graceful hips, long slender legs, healthy adult proportions, palace beauty silhouette, refined feminine posture',
      attitude: 'graceful elegance, refined court beauty, confident noble presence, gentle composed expression',
      style: 'elegant pink-purple silk robe, layered embroidered palace garments, traditional indoor court attire, flowing silk dress with golden embroidery, high-quality palace loungewear, refined court aesthetic',
      mood: 'graceful elegance, palace evening leisure, warm candlelit atmosphere, refined nobility',
    },
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.3,
    lighting: 1.2,
    style: 1.0,
  },
};
