/**
 * 江南煙雨｜水鄉詩畫｜古鎮旅拍
 * Jiangnan Misty Rain - Watertown Poetic Photography
 */

export const JIANGNAN_MISTY_CATEGORY = {
  id: 'jiangnan-misty',
  name: '江南煙雨｜水鄉詩畫｜古鎮旅拍',
  themeGroup: 'jiangnan-travel-photography',

  visualDNA: {
    atmosphere: [
      'Jiangnan water town misty rain atmosphere',
      'poetic ancient bridge scenery',
      'gentle rain diffusion light',
      'classical Chinese landscape painting mood',
    ],

    colors: {
      primary: ['misty gray-blue', 'rain white', 'stone gray'],
      secondary: ['willow green', 'terracotta roof red', 'wooden brown'],
      accent: ['water reflection silver', 'umbrella warm tone'],
    },

    iconicProps: [
      'stone arch bridge over water',
      'white walls and black roof tiles',
      'wooden boats',
      'oil-paper umbrella',
      'willow trees hanging',
      'rain ripples on water',
      'ancient town alleyways',
      'lanterns reflecting on water',
    ],

    costumeStyle: {
      layer1: 'light flowing fabric suitable for rain',
      concept: 'elegant Jiangnan style travel costume',
      keywords: [
        'flowing light-colored hanfu',
        'translucent rain-wet fabric effect',
        'simple elegant accessories',
        'oil-paper umbrella as focal point',
      ],
      fabric: [
        'light silk with rain-wet texture',
        'translucent gauze',
        'water-resistant outer layer',
      ],
    },

    bodyRequirements: {
      bodyType: 'slender elegant silhouette',
      emphasis: 'poetic graceful presence in rain',
    },

    sceneTypes: [
      'stone bridge in misty rain',
      'water town alleyway with umbrella',
      'riverside willows in rain',
      'ancient town canal scene',
    ],

    lighting: {
      keyLight: 'soft diffused rainy day light',
      fillLight: 'water surface reflection bounce',
      rimLight: 'gentle mist separation light',
      ambience: 'misty rain poetic atmosphere',
      specialEffect: 'rain droplets visible with soft bokeh',
    },

    photography: {
      focus: 'soft focus with rain and mist diffusion',
      mood: 'Chinese ink painting cinema quality',
    },

    prohibitions: [
      'no bright saturated colors',
      'no modern urban background',
      'no clear sunny day',
      'must have rain or mist atmosphere',
    ],

    textureRequirements: [
      'realistic rain droplets and mist',
      'wet fabric texture with water',
      'stone and wood weathered surface',
      'water reflection with ripples',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.3,
    costume: 1.1,
    lighting: 1.2,
    style: 1.0,
  },
};
