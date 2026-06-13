/**
 * 高訂婚紗｜夢幻禮服｜浪漫婚禮
 * Haute Couture Wedding - Dream Bridal Gown
 */

export const HAUTE_COUTURE_WEDDING_CATEGORY = {
  id: 'haute-couture-wedding',
  name: '高訂婚紗｜夢幻禮服｜浪漫婚禮',
  themeGroup: 'world-fashion',

  visualDNA: {
    atmosphere: [
      'haute couture bridal elegance',
      'romantic wedding dream atmosphere',
      'luxury bridal fashion',
      'fairytale wedding grandeur',
    ],

    colors: {
      primary: ['bridal white', 'ivory cream', 'champagne beige'],
      secondary: ['blush pink', 'pearl silver', 'romantic rose'],
      accent: ['diamond sparkle', 'lace detail white'],
    },

    iconicProps: [
      'luxury wedding gown with long train',
      'bridal veil',
      'flower bouquet',
      'cathedral or elegant venue',
      'rose petals',
      'romantic lighting setup',
      'wedding arch or backdrop',
    ],

    costumeStyle: {
      layer1: 'haute couture bridal gown foundation',
      concept: 'luxury designer wedding dress',
      keywords: [
        'haute couture wedding gown',
        'elaborate lace and embroidery',
        'dramatic long train',
        'delicate bridal veil',
        'luxury jewelry',
        'bridal tiara or headpiece',
      ],
      fabric: [
        'luxury bridal silk and satin',
        'intricate French lace',
        'tulle and organza layers',
      ],
    },

    bodyRequirements: {
      bodyType: 'bridal elegance',
      emphasis: 'romantic wedding beauty',
    },

    sceneTypes: [
      'cathedral with grand architecture',
      'elegant wedding venue',
      'romantic garden ceremony',
      'luxury hotel ballroom',
    ],

    lighting: {
      keyLight: 'soft romantic bridal lighting',
      fillLight: 'gentle ambient glow',
      rimLight: 'backlight on veil and dress details',
      ambience: 'romantic wedding atmosphere',
      specialEffect: 'soft focus romantic glow',
    },

    photography: {
      framing: 'luxury bridal portrait composition',
      focus: 'haute couture dress detail emphasis',
      mood: 'high-end wedding magazine quality',
    },

    prohibitions: [
      'no cheap costume quality',
      'must show haute couture craftsmanship',
    ],

    textureRequirements: [
      'luxury fabric draping and flow',
      'intricate lace detail quality',
      'romantic soft-focus atmosphere',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.4,
    lighting: 1.2,
    style: 1.0,
  },
};
