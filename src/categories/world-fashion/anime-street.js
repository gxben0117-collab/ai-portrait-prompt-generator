/**
 * 二次元街拍｜JK制服｜動漫現實
 * Anime Street Photography - JK Uniform - 2D to Reality
 */

export const ANIME_STREET_CATEGORY = {
  id: 'anime-street',
  name: '二次元街拍｜JK制服｜動漫現實',
  themeGroup: 'world-fashion',

  visualDNA: {
    atmosphere: [
      'anime-inspired street photography',
      'Japanese youth culture',
      'vibrant energetic atmosphere',
      '2D aesthetic in real world',
    ],

    colors: {
      primary: ['school uniform navy', 'white shirt', 'plaid skirt pattern'],
      secondary: ['sakura pink', 'sky blue', 'vibrant accessories'],
      accent: ['anime-style color saturation', 'backpack accessories'],
    },

    iconicProps: [
      'Japanese school uniform (JK)',
      'colorful backpack',
      'anime merchandise',
      'urban Japanese street',
      'vending machines',
      'Japanese signage',
      'trendy accessories',
    ],

    costumeStyle: {
      layer1: 'school uniform foundation',
      concept: 'Japanese youth street fashion',
      keywords: [
        'JK school uniform (sailor or blazer)',
        'pleated skirt',
        'knee-high socks',
        'trendy sneakers or loafers',
        'colorful accessories',
        'anime-inspired styling',
      ],
      fabric: [
        'school uniform cotton blend',
        'plaid pattern skirt',
        'clean white shirt',
      ],
    },

    bodyRequirements: {
      bodyType: 'youthful energetic appearance',
      emphasis: 'anime character charm in reality',
    },

    sceneTypes: [
      'Japanese urban street (Shibuya/Harajuku style)',
      'school exterior or street crossing',
      'trendy shopping district',
      'urban park or plaza',
    ],

    lighting: {
      keyLight: 'bright vibrant daylight',
      fillLight: 'urban ambient light',
      rimLight: 'clean separation light',
      ambience: 'energetic youth culture atmosphere',
    },

    photography: {
      focus: 'vibrant street photography style',
      mood: 'youth culture documentary with anime aesthetic',
    },

    prohibitions: [
      'no overly sexualized costume',
      'must maintain appropriate school uniform standard',
    ],

    textureRequirements: [
      'clean uniform fabric texture',
      'vibrant urban environment',
      'anime-inspired color grading',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.2,
    lighting: 1.1,
    style: 1.0,
  },
};
