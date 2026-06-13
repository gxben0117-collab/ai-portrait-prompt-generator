/**
 * 田園花海｜鄉村牧歌｜自然清新
 * Countryside Flower Fields - Pastoral Idyll
 */

export const COUNTRYSIDE_FLOWER_CATEGORY = {
  id: 'countryside-flower',
  name: '田園花海｜鄉村牧歌｜自然清新',
  themeGroup: 'jiangnan-travel-photography',

  visualDNA: {
    atmosphere: [
      'pastoral countryside natural beauty',
      'flower field romantic atmosphere',
      'fresh air sunshine vitality',
      'peaceful rural landscape',
    ],

    colors: {
      primary: ['vibrant flower colors', 'grass green', 'sky blue'],
      secondary: ['sunflower yellow', 'lavender purple', 'daisy white'],
      accent: ['golden sunshine', 'natural bokeh'],
    },

    iconicProps: [
      'vast flower fields',
      'windmill or farm structures',
      'straw hat',
      'wicker basket',
      'rural fence',
      'blue sky with white clouds',
      'natural landscape',
    ],

    costumeStyle: {
      layer1: 'light comfortable country dress foundation',
      concept: 'fresh pastoral style costume',
      keywords: [
        'flowing light summer dress',
        'simple natural style',
        'straw hat accessory',
        'comfortable sandals',
        'minimal natural accessories',
      ],
      fabric: [
        'light cotton or linen',
        'breathable summer materials',
        'natural fiber textures',
      ],
    },

    bodyRequirements: {
      bodyType: 'natural healthy appearance',
      emphasis: 'fresh vitality and natural beauty',
    },

    sceneTypes: [
      'vast flower field landscape',
      'countryside with windmill',
      'rural farm scenery',
      'natural meadow with wildflowers',
    ],

    lighting: {
      keyLight: 'warm natural sunlight',
      fillLight: 'sky ambient light',
      rimLight: 'backlight glow through flowers',
      ambience: 'bright natural outdoor atmosphere',
      specialEffect: 'natural bokeh and lens flare',
    },

    photography: {
      framing: 'natural landscape travel photography',
      focus: 'fresh outdoor portrait style',
      mood: 'pastoral romantic cinema quality',
    },

    prohibitions: [
      'no urban background',
      'no studio artificial setting',
      'must be genuine outdoor natural scene',
    ],

    textureRequirements: [
      'natural flower field detail',
      'realistic grass and plants',
      'natural sunlight quality',
      'authentic outdoor atmosphere',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.3,
    costume: 1.0,
    lighting: 1.2,
    style: 1.0,
  },
};
