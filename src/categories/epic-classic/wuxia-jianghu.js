/**
 * 武俠江湖｜刀光劍影｜快意恩仇
 * Wuxia Martial World - Sword Fighting Epic
 */

export const WUXIA_JIANGHU_CATEGORY = {
  id: 'wuxia-jianghu',
  name: '武俠江湖｜刀光劍影｜快意恩仇',
  themeGroup: 'epic-classic',

  visualDNA: {
    atmosphere: [
      'Chinese martial arts epic atmosphere',
      'sword fighting dynamic energy',
      'ancient wuxia world grandeur',
      'heroic adventure spirit',
    ],

    colors: {
      primary: ['steel silver', 'warrior black', 'blood red'],
      secondary: ['bamboo forest green', 'mountain mist blue', 'sunset gold'],
      accent: ['sword gleam flash', 'motion blur trails'],
    },

    iconicProps: [
      'Chinese sword (jian) or saber (dao)',
      'bamboo forest backdrop',
      'ancient inn or tavern',
      'mountain cliff scenery',
      'falling autumn leaves',
      'wine jug and cup',
      'martial arts robes flowing',
    ],

    costumeStyle: {
      layer1: 'martial arts inner garment foundation',
      concept: 'wuxia hero fighting costume with movement',
      keywords: [
        'flowing martial arts robe',
        'warrior sash and belt',
        'sword holder accessories',
        'dynamic fabric motion',
        'practical fighting outfit',
      ],
      fabric: [
        'durable cotton-linen blend',
        'flowing outer robe',
        'leather belt and accessories',
      ],
    },

    bodyRequirements: {
      bodyType: 'athletic warrior build',
      emphasis: 'martial artist dynamic posture',
    },

    sceneTypes: [
      'bamboo forest sword fighting scene',
      'mountain cliff duel backdrop',
      'ancient tavern interior',
      'riverside martial arts training',
    ],

    lighting: {
      keyLight: 'dramatic directional light for action',
      fillLight: 'ambient forest or mountain light',
      rimLight: 'strong edge separation on moving fabric',
      ambience: 'epic martial arts cinema atmosphere',
      specialEffect: 'sword gleam and motion blur',
    },

    photography: {
      focus: 'freeze action with motion blur on fabric and weapon',
      mood: 'Chinese wuxia film epic quality',
    },

    prohibitions: [
      'no anime ninja costume',
      'no game character armor',
      'no static pose',
      'must show martial arts energy',
    ],

    textureRequirements: [
      'realistic fabric motion blur',
      'metal sword realistic texture',
      'natural outdoor environment',
      'dynamic action pose energy',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.3,
    costume: 1.2,
    lighting: 1.2,
    style: 1.0,
  },
};
