/**
 * 宋韻汴梁｜清明上河｜兩宋繁華
 * Song Dynasty Bianliang - Qingming Festival Prosperity
 */

export const SONG_BIANLIANG_CATEGORY = {
  id: 'song-bianliang',
  name: '宋韻汴梁｜清明上河｜兩宋繁華',
  themeGroup: 'eastern-historical-court',

  visualDNA: {
    atmosphere: [
      'Song Dynasty capital prosperity',
      'Qingming Festival riverside atmosphere',
      'elegant Song aesthetic refinement',
      'cultural golden age ambience',
    ],

    colors: {
      primary: ['Song celadon green', 'scholar gray-blue', 'elegant beige'],
      secondary: ['vermillion red', 'jade white', 'ink wash gray'],
      accent: ['gold embroidery', 'pearl accessories'],
    },

    iconicProps: [
      'Song Dynasty architecture',
      'willow trees by riverside',
      'traditional shops and stalls',
      'scholar paintings and calligraphy',
      'tea ceremony items',
      'Song Dynasty furniture',
      'elegant folding fans',
    ],

    costumeStyle: {
      layer1: 'Song Dynasty layered robe foundation',
      concept: 'elegant Song court and merchant class costume',
      keywords: [
        'Song Dynasty beizi jacket over robe',
        'elegant narrow sleeves',
        'high-waist layered skirt',
        'refined accessories',
        'Song Dynasty hairstyle',
      ],
      fabric: [
        'Song Dynasty silk weaving',
        'elegant embroidered patterns',
        'refined gauze outer layers',
      ],
    },

    bodyRequirements: {
      bodyType: 'slender elegant Song aesthetic',
      emphasis: 'refined cultural sophistication',
    },

    sceneTypes: [
      'Bianliang riverside during Qingming',
      'Song Dynasty courtyard garden',
      'elegant tea house interior',
      'scholar studio with paintings',
    ],

    lighting: {
      keyLight: 'soft spring daylight',
      fillLight: 'riverside ambient reflection',
      rimLight: 'gentle separation on elegant costume',
      ambience: 'Song Dynasty cultural elegance',
    },

    photography: {
      mood: 'elegant Song Dynasty portrait',
      focus: 'refined cultural atmosphere',
      mood: 'Song Dynasty period drama cinema',
    },

    prohibitions: [
      'no Tang Dynasty style confusion',
      'no overly ornate Qing Dynasty style',
      'must maintain Song Dynasty elegance',
    ],

    textureRequirements: [
      'refined Song Dynasty silk texture',
      'elegant celadon ceramic quality',
      'authentic Song architecture details',
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
