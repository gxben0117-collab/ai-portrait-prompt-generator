/**
 * 巴黎鐵塔｜世界地標｜旅拍時尚
 * Paris Eiffel Tower - World Landmarks - Fashion Travel
 */

export const WORLD_LANDMARKS_CATEGORY = {
  id: 'world-landmarks',
  name: '巴黎鐵塔｜世界地標｜旅拍時尚',
  themeGroup: 'world-fashion',

  visualDNA: {
    atmosphere: [
      'iconic world landmark atmosphere',
      'international travel fashion',
      'urban chic elegance',
      'cosmopolitan style',
    ],

    colors: {
      primary: ['Paris gray', 'urban black', 'fashionable white'],
      secondary: ['Eiffel Tower metallic', 'sunset golden', 'street lamp warm'],
      accent: ['city light bokeh', 'fashion accessories'],
    },

    iconicProps: [
      'Eiffel Tower backdrop',
      'European architecture',
      'cobblestone streets',
      'street lamps',
      'urban cafe setting',
      'fashion shopping bags',
      'city landmarks',
    ],

    costumeStyle: {
      layer1: 'fashionable urban outfit foundation',
      concept: 'international travel fashion style',
      keywords: [
        'elegant European fashion dress',
        'stylish coat or jacket',
        'fashionable accessories',
        'designer handbag',
        'trendy sunglasses',
        'stylish footwear',
      ],
      fabric: [
        'fashionable wool or cotton blends',
        'trendy urban fabrics',
        'designer quality materials',
      ],
    },

    bodyRequirements: {
      bodyType: 'fashionable urban silhouette',
      emphasis: 'international fashion model presence',
    },

    sceneTypes: [
      'Eiffel Tower landmark view',
      'European street with architecture',
      'urban cafe terrace',
      'city plaza with monuments',
    ],

    lighting: {
      keyLight: 'natural urban daylight or golden hour',
      fillLight: 'urban ambient reflection',
      rimLight: 'city light separation',
      ambience: 'cosmopolitan urban atmosphere',
    },

    photography: {
      framing: 'fashion travel photography composition',
      focus: 'urban portrait with landmark context',
      mood: 'international fashion magazine quality',
    },

    prohibitions: [
      'no tourist snapshot quality',
    ],

    textureRequirements: [
      'urban architecture realistic detail',
      'fashion fabric quality rendering',
      'natural urban lighting',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.3,
    costume: 1.2,
    lighting: 1.1,
    style: 1.0,
  },
};
