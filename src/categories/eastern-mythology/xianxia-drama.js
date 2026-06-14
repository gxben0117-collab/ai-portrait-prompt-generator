/**
 * 仙俠劇風｜御劍飛行｜修仙世界
 * Xianxia Drama Style - Sword Flying Cultivation World
 */

export const XIANXIA_DRAMA_CATEGORY = {
  id: 'xianxia-drama',
  name: '仙俠劇風｜御劍飛行｜修仙世界',
  themeGroup: 'eastern-mythology',

  visualDNA: {
    atmosphere: [
      'Chinese xianxia fantasy epic',
      'sword flying cultivation atmosphere',
      'immortal cultivation world grandeur',
      'celestial realm aesthetic',
    ],

    colors: {
      primary: ['celestial white', 'immortal blue', 'sword silver'],
      secondary: ['cloud mist gray', 'spiritual jade green', 'golden light'],
      accent: ['sword gleam', 'spiritual energy glow'],
    },

    iconicProps: [
      'flying sword',
      'celestial clouds',
      'mountain peak pavilions',
      'floating islands',
      'spiritual energy effects',
      'ancient cultivation sect architecture',
      'mystical formations',
    ],

    costumeStyle: {
      layer1: 'cultivation sect robe foundation',
      concept: 'xianxia drama immortal cultivator costume',
      keywords: [
        'flowing white cultivation robes',
        'wide elegant sleeves',
        'sect emblem and accessories',
        'immortal jade ornaments',
        'hair ornament with tassel',
        'cultivation belt and sash',
      ],
      fabric: [
        'flowing white silk',
        'translucent outer layer',
        'celestial fabric with ethereal quality',
      ],
    },

    bodyRequirements: {
      bodyType: 'natural human proportions, elegant silhouette, balanced adult anatomy',
      emphasis: 'realistic human figure in fantasy setting',
    },

    sceneTypes: [
      'mountain peak with floating clouds',
      'celestial cultivation sect',
      'sword flying in sky',
      'mystical cave with spiritual energy',
    ],

    lighting: {
      keyLight: 'celestial natural light from sky',
      fillLight: 'spiritual energy ambient glow',
      rimLight: 'ethereal edge separation',
      ambience: 'xianxia fantasy epic atmosphere',
      specialEffect: 'spiritual energy particles and sword gleam',
    },

    photography: {
      focus: 'fantasy epic with special effects',
      mood: 'Chinese xianxia TV series cinema quality',
    },

    prohibitions: [
      'no anime magical girl',
      'no game character outfit',
      'must follow Chinese xianxia aesthetic',
    ],

    textureRequirements: [
      'flowing fabric with wind motion',
      'spiritual energy glow effects',
      'celestial atmosphere rendering',
      'realistic sword metal texture',
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
