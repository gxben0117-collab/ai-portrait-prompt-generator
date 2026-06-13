/**
 * 漢宮長信｜飛燕趙姬｜西漢宮廷
 * Han Dynasty Changxin Palace - Western Han Court
 */

export const HAN_CHANGXIN_CATEGORY = {
  id: 'han-changxin',
  name: '漢宮長信｜飛燕趙姬｜西漢宮廷',
  themeGroup: 'eastern-historical-court',

  visualDNA: {
    atmosphere: [
      'Han Dynasty imperial palace elegance',
      'Changxin Palace historical atmosphere',
      'Western Han court ceremony',
      'classical Chinese palace grandeur',
    ],

    colors: {
      primary: ['Han red', 'imperial yellow', 'jade green'],
      secondary: ['bronze brown', 'silk white', 'ink black'],
      accent: ['gold accessories', 'jade ornament green'],
    },

    iconicProps: [
      'Han Dynasty palace columns',
      'bronze ceremonial vessels',
      'jade accessories',
      'silk screens',
      'palace lanterns',
      'Han Dynasty furniture',
      'ceremonial fans',
    ],

    costumeStyle: {
      layer1: 'Han Dynasty curved-hem robe foundation',
      concept: 'historically accurate Han court dress',
      keywords: [
        'Han Dynasty qu-ju curved robe',
        'wide flowing sleeves',
        'layered ceremonial dress',
        'jade belt ornaments',
        'Han Dynasty hairstyle accessories',
      ],
      fabric: [
        'Han Dynasty silk weaving',
        'embroidered ceremonial patterns',
        'layered gauze outer robes',
      ],
    },

    bodyRequirements: {
      bodyType: 'elegant Han Dynasty aesthetic',
      emphasis: 'classical Han court posture',
    },

    sceneTypes: [
      'Changxin Palace interior',
      'Han palace courtyard',
      'ceremonial hall',
      'imperial garden pavilion',
    ],

    lighting: {
      keyLight: 'soft palace interior lighting',
      fillLight: 'lantern warm ambient glow',
      rimLight: 'silk fabric edge separation',
      ambience: 'Han Dynasty palace atmosphere',
    },

    photography: {
      mood: 'classical Chinese portrait composition',
      focus: 'historical drama cinema quality',
      mood: 'Western Han period film aesthetic',
    },

    prohibitions: [
      'no Tang Dynasty style confusion',
      'no anime hanfu costume',
      'must be historically accurate Han Dynasty',
    ],

    textureRequirements: [
      'authentic Han Dynasty silk texture',
      'bronze and jade material realism',
      'palace architecture weathered surface',
    ],

    historicalAccuracy: {
      period: 'Western Han Dynasty (202 BCE - 9 CE)',
      reference: 'Changxin Palace historical records',
      costume: 'Han Dynasty court dress standards',
    },
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.3,
    lighting: 1.1,
    style: 1.0,
  },
};
