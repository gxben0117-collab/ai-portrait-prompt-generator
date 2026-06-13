/**
 * 明宮織金｜錦繡華服｜永樂盛世
 * Ming Dynasty Palace - Golden Brocade Splendor
 */

export const MING_ZHIJIN_CATEGORY = {
  id: 'ming-zhijin',
  name: '明宮織金｜錦繡華服｜永樂盛世',
  themeGroup: 'eastern-historical-court',

  visualDNA: {
    atmosphere: [
      'Ming Dynasty palace grandeur',
      'golden brocade splendor',
      'Yongle prosperity atmosphere',
      'imperial ceremonial magnificence',
    ],

    colors: {
      primary: ['imperial yellow', 'vermillion red', 'golden bronze'],
      secondary: ['sapphire blue', 'emerald green', 'crimson'],
      accent: ['gold thread embroidery', 'jade accessories'],
    },

    iconicProps: [
      'Ming Dynasty palace architecture',
      'golden dragon and phoenix patterns',
      'cloisonné enamel vessels',
      'large palace screens',
      'ceremonial incense burners',
      'Ming Dynasty lanterns',
      'jade ornamental pieces',
    ],

    costumeStyle: {
      layer1: 'Ming Dynasty layered ceremonial foundation',
      concept: 'ornate Ming court ceremonial dress',
      keywords: [
        'Ming Dynasty ao jacket and pleated skirt',
        'golden brocade with intricate patterns',
        'large elaborate headdress',
        'multiple jade accessories',
        'ceremonial collar and sleeves',
      ],
      fabric: [
        'golden brocade with woven patterns',
        'multiple layered silk',
        'embroidered dragon and phoenix motifs',
      ],
    },

    bodyRequirements: {
      bodyType: 'regal Ming Dynasty aesthetic',
      emphasis: 'imperial court grandeur',
    },

    sceneTypes: [
      'Ming Dynasty throne hall',
      'imperial palace courtyard',
      'ceremonial hall interior',
      'palace garden with architecture',
    ],

    lighting: {
      keyLight: 'golden palace interior lighting',
      fillLight: 'lantern warm ceremonial glow',
      rimLight: 'golden fabric edge highlights',
      ambience: 'Ming Dynasty imperial grandeur',
    },

    photography: {
      framing: 'imperial portrait composition',
      focus: 'ceremonial grandeur emphasis',
      mood: 'Ming Dynasty epic cinema quality',
    },

    prohibitions: [
      'no Qing Dynasty style',
      'no simplified modern hanfu',
      'must show Ming Dynasty specific patterns',
    ],

    textureRequirements: [
      'golden brocade realistic weaving texture',
      'jade and cloisonné material quality',
      'ornate palace architecture details',
    ],
  },

  promptWeights: {
    faceLock: 1.5,
    scene: 1.2,
    costume: 1.3,
    lighting: 1.1,
    style: 1.0,
  },
};
