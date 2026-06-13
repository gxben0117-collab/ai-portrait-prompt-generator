/**
 * 盛唐教坊｜樂舞霓裳｜宮廷演藝
 * Tang Dynasty Music Academy - Dance Performance
 */

export const TANG_JIAOFANG_CATEGORY = {
  id: 'tang-jiaofang',
  name: '盛唐教坊｜樂舞霓裳｜宮廷演藝',
  themeGroup: 'eastern-historical-court',

  visualDNA: {
    atmosphere: [
      'Tang Dynasty music academy performance',
      'imperial dance ceremony atmosphere',
      'colorful silk ribbon motion',
      'theatrical stage grandeur',
    ],

    colors: {
      primary: ['vibrant crimson', 'imperial gold', 'peacock blue'],
      secondary: ['jade green', 'lotus pink', 'silk white'],
      accent: ['ribbon motion blur', 'stage light glow'],
    },

    iconicProps: [
      'flowing silk ribbons in motion',
      'traditional Chinese instruments (pipa, guzheng)',
      'palace stage architecture',
      'hanging lanterns',
      'decorative screens',
      'ceremonial fans',
      'flower petals falling',
    ],

    costumeStyle: {
      layer1: 'Tang Dynasty dance costume foundation with movement flow',
      concept: 'theatrical dance performance costume with dynamic motion',
      keywords: [
        'flowing wide sleeves with ribbon extensions',
        'layered dance skirt with movement',
        'golden ornate headdress',
        'performance jewelry',
        'silk sash trailing',
      ],
      fabric: [
        'lightweight silk for dance movement',
        'translucent gauze sleeves',
        'vibrant colored ribbons',
      ],
    },

    bodyRequirements: {
      bodyType: 'graceful dancer silhouette',
      emphasis: 'elegant movement and dance posture',
    },

    sceneTypes: [
      'palace music academy stage',
      'imperial performance hall',
      'courtyard dance ceremony',
      'theatrical stage with audience backdrop',
    ],

    lighting: {
      keyLight: 'warm stage lighting from front and sides',
      fillLight: 'palace lantern ambient glow',
      rimLight: 'backlight separation on ribbons and fabric',
      ambience: 'theatrical performance atmosphere',
      specialEffect: 'ribbon motion blur with light trails',
    },

    photography: {
      mood: 'dynamic performance capture with motion',
      focus: 'freeze motion with ribbon blur effect',
      mood: 'theatrical dance performance cinema',
    },

    prohibitions: [
      'no static pose',
      'no modern dance costume',
      'no anime idol outfit',
      'must show movement and dance energy',
    ],

    textureRequirements: [
      'realistic silk ribbon motion blur',
      'flowing fabric with wind and movement',
      'theatrical lighting on costume',
      'dynamic dance pose energy',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.3,
    lighting: 1.2,
    style: 1.0,
  },
};
