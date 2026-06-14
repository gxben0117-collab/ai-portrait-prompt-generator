/**
 * 魏晉清談｜竹林名士｜玄學風流
 * Wei-Jin Qingtan - Bamboo Grove Scholars
 */

export const WEIJIN_QINGTAN_CATEGORY = {
  id: 'weijin-qingtan',
  name: '魏晉清談｜竹林名士｜玄學風流',
  themeGroup: 'eastern-historical-court',

  visualDNA: {
    atmosphere: [
      'Wei-Jin Dynasty scholarly elegance',
      'bamboo grove philosophical atmosphere',
      'refined intellectual gathering',
      'natural unrestrained spirit',
    ],

    colors: {
      primary: ['bamboo green', 'scholar white', 'ink black'],
      secondary: ['mountain mist blue', 'wine jar brown', 'scroll beige'],
      accent: ['moonlight silver', 'plum blossom white'],
    },

    iconicProps: [
      'bamboo forest backdrop',
      'wine jar and cup',
      'ancient scrolls and books',
      'guqin musical instrument',
      'stone table and seats',
      'incense burner',
      'plum blossom branches',
    ],

    costumeStyle: {
      layer1: 'Wei-Jin wide loose robe foundation',
      concept: 'unrestrained scholarly costume',
      keywords: [
        'wide loose flowing robes',
        'natural fabric draping',
        'minimal accessories',
        'scholarly headband or loose hair',
        'simple elegant style',
      ],
      fabric: [
        'natural linen and cotton blend',
        'loose flowing silk outer layer',
        'unstructured natural draping',
      ],
    },

    bodyRequirements: {
      bodyType: 'slender scholarly aesthetic',
      emphasis: 'natural unrestrained posture',
    },

    sceneTypes: [
      'bamboo grove gathering',
      'mountain retreat pavilion',
      'scholar studio with books',
      'natural landscape setting',
    ],

    lighting: {
      keyLight: 'natural outdoor bamboo-filtered light',
      fillLight: 'soft ambient forest light',
      rimLight: 'gentle edge separation through bamboo',
      ambience: 'philosophical contemplative atmosphere',
    },

    photography: {
      focus: 'soft natural atmosphere',
      mood: 'Wei-Jin period intellectual cinema',
    },

    prohibitions: [
      'no formal court costume',
      'no structured armor or official dress',
      'must show natural unrestrained spirit',
    ],

    textureRequirements: [
      'natural fabric loose draping',
      'bamboo forest realistic texture',
      'weathered wood and stone surfaces',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.1,
    lighting: 1.1,
    style: 1.0,
  },
};
